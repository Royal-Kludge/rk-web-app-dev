import type { KeyboardState } from '../interface'
import { REPORT_HEAD, REPORT_HEAD_LENGTH, REPORT_ID_USB, REPORT_LENGTH } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { BoardId, COMMAND_ID, FwVersion, HwVersion, RK_C61, RK_C61_EVENT_DEFINE } from './rk_c61';

import { LOG_TYPE, Logging } from '@/common/logging';
import { KB2_CMD_SYNC } from './packets/usb/KB2_CMD_SYNC';
import { KB2_CMD_FAIL } from './packets/usb/KB2_CMD_FAIL';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_C61_Usb extends RK_C61 {

    KB2_CMD_SYNC: KB2_CMD_SYNC;
    KB2_CMD_FAIL: KB2_CMD_FAIL;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;

        this.KB2_CMD_SYNC = new KB2_CMD_SYNC(this.onSyncCmd.bind(this));
        this.KB2_CMD_FAIL = new KB2_CMD_FAIL(this.onFailCmd.bind(this));
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_C61_Usb(state, device);
    }

    async init(): Promise<void> {
        super.init();
        this.state.ConnectionStatus = ConnectionStatusEnum.Connected;

        worker.onmessage = async (event) => {
            if (event.data == 'heartbeat') {
            } else {
                try {
                    await this.setReport(REPORT_ID_USB, event.data as Uint8Array);
                } catch (e) {
                    this.device.close();
                }
            }
        };
        
        worker.postMessage('start');

        this.Sync();
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (reportId == REPORT_ID_USB && data.byteLength == REPORT_LENGTH && data.getUint8(0) == REPORT_HEAD) {
            let cmd = data.getUint8(2) - 0x80;
            switch (cmd) {
                case COMMAND_ID.KB2_CMD_SYNC:
                    this.KB2_CMD_SYNC.fromReportData(data);
                    break;
            }
        }
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async Sync() : Promise<void> {
        worker.postMessage(this.KB2_CMD_SYNC.command());
        Logging.console(LOG_TYPE.INFO, `Push profile data to queue.`);
    }

    async getMacros(): Promise<void> {
        this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    async setMacros(): Promise<void> {
        
    }

    //#region Data analysis
    private onFailCmd(event: any) {
        let ackCmd: number = event.detail.ackCmd;
        let sArg: Uint8Array = event.detail.ackCmd;

        Logging.console(LOG_TYPE.ERROR, `Comand fail [${ackCmd}] arg [${sArg.toString()}]`);
    }

    private onSyncCmd(event: any) {
        let boardId: BoardId = {
            id: event.detail.boardId,
            kbLayout: event.detail.kbLayout,
            axisType: event.detail.axisType
        };

        let hwVersion: HwVersion = new HwVersion();

        if (event.detail.hwVersion < 1000) {
            hwVersion.major = Math.floor(event.detail.hwVersion / 100);
            hwVersion.minor = Math.floor((event.detail.hwVersion % 100) / 10);
            hwVersion.patch = event.detail.hwVersion % 10;
            hwVersion.version = `V${hwVersion.major}.${hwVersion.minor}.${hwVersion.patch}`;
        } else {
            hwVersion.fwSize = event.detail.hwVersion * 256;
        }

        const decoder = new TextDecoder('utf-8');
        let sn = decoder.decode(event.detail.kbSn);

        let fwVersion: FwVersion = new FwVersion();
        const versionBuff = decoder.decode(event.detail.fwVersion.slice(0, 4));
        if (versionBuff.startsWith('Boot')) {
            fwVersion.appVersion = decoder.decode(event.detail.fwVersion.slice(0, 11));
        } else {
            fwVersion.appVersion = decoder.decode(event.detail.fwVersion.slice(0, 10));
        }

        fwVersion.buildDate = decoder.decode(event.detail.fwVersion.slice(17, 28));

        this.data.boardId = boardId;
        this.data.runMode = event.detail.runMode;
        this.data.sn = sn;
        this.data.hwVersion = hwVersion;
        this.data.fwVersion = fwVersion;

        Logging.console(LOG_TYPE.SUCCESS, `\nID: ${boardId.id}\nLayout: ${boardId.kbLayout}\nAxisType: ${boardId.axisType}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nRunMode: ${event.detail.runMode}\nSN：${sn}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nFwSize: ${hwVersion.fwSize}\nHwVersion: ${hwVersion.version}\nFwVersion: ${fwVersion.appVersion}\nBuildDate: ${fwVersion.buildDate}`,);
    }
    //#endregion
}