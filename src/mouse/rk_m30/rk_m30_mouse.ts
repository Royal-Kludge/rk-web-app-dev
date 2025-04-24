import type { MouseState } from '../interface';
import { RK_M30 } from './rk_m30';
import { POPUP_CMD_ID, REPORT_ID_POPUP, REPORT_ID_USB } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { SetConfigPacket } from './packets/setConfigPacket';
import { SetKeyPacket } from './packets/setKeyPacket';
import { GetOnlinePacket } from './packets/getOnlinePacket';
import { RK_MOUSE_EVENT_DEFINE } from '../state';
import { PopupCmdId } from '../enum';
import { GetFwVerPacket } from './packets/getFwVerPacket';
import { GetBatteryPacket } from './packets/getBatteryPacket';

const worker = new Worker(new URL('@/common/mouseCommunication.ts', import.meta.url));

export enum GetReportCmdId {
    None = 0x00,
    SetKeyCmd = 0x01,
    GetKeyCmd = 0x41,
    SetMacroCmd = 0x03,
    GetMacroCmd = 0x43,
    SetConfigCmd = 0x04,
    GetConfigCmd = 0x44,
    GetPwdCmd = 0x05,
    GetDongleStatusCmd = 0x07,
    GetFwVerCmd = 0x09,
}

export class RK_M30_Mouse extends RK_M30 {

    getReportCmd: GetReportCmdId = GetReportCmdId.None;
    retry: number = 0;

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
        //state.connectType = ConnectionType.USB;
    }

    static async create(state: MouseState, device: HIDDevice) {
        return new RK_M30_Mouse(state, device);
    }

    async init(): Promise<void> {
        super.init();
        this.state.ConnectionStatus = ConnectionStatusEnum.Connected;

        worker.onmessage = async (event) => {
            if (event.data == 'getReport') {
                var data = await this.getFeature(REPORT_ID_USB);
                if (data.byteLength > 0) {
                    worker.postMessage("stopGet");
                    switch (this.getReportCmd) {
                        case GetReportCmdId.GetFwVerCmd:
                            if (data.byteLength >= 14 && data.getUint8(2) == GetReportCmdId.GetFwVerCmd) {
                                let tmp = new DataView(new Uint8Array(8).buffer);
                                let index = 0;
                                for (index = 2;index <= 7; index++) {
                                    tmp.setUint8(index, data.getUint8(index + 6));
                                }
                                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, { detail: { pwd: tmp.getBigUint64(0), status: ConnectionStatusEnum.Connected } }));
                            }
                        break;
                    }
                } else {
                    this.retry -= 1;
                    if (this.retry <= 0) {
                        worker.postMessage("stopGet");
                    }
                }
            } else {
                try {
                    await this.setFeature(REPORT_ID_USB, event.data as Uint8Array);
                    if (this.getReportCmd == GetReportCmdId.GetFwVerCmd) {
                        this.retry = 30;
                        worker.postMessage("getReport");
                    }
                } catch (e) {
                    this.device.close();
                }
            }
        };
        
        worker.postMessage('start');
    }

    async getOnline(): Promise<void> {

    }

    async getBattery(): Promise<void> {

    }

    async setFactory(): Promise<void> {
        console.log(`Push set factory data to queue.`);
    }

    async setConfigData(): Promise<void> {
        if (this.data.config != undefined) {
            let packet = new SetConfigPacket();

            packet.setPayload(this.data.config.buffer);

            worker.postMessage(packet.setReport);
            this.getReportCmd = GetReportCmdId.SetConfigCmd;

            console.log(`Push set report config data to queue.`);
        }
    }

    async setKeyMapping(): Promise<void> {
        if (this.data.keys != undefined) {
            let packet = new SetKeyPacket();

            packet.setPayload(this.data.keys.buffer);

            worker.postMessage(packet.setReport);
            this.getReportCmd = GetReportCmdId.SetKeyCmd;

            console.log(`Push set key mapping data to queue.`);
        }
    }

    async getFwVer(): Promise<void> {
        await new Promise(resolve => this.setGetFwVer());
    }

    setGetFwVer() {
        let packet = new GetFwVerPacket();
        let u8Data = new DataView(new Uint8Array(1).buffer);

        packet.setPayload(u8Data);
        
        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.GetFwVerCmd;

        console.log(`Push set get fw ver to queue.`);
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        try {
            //let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            //console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
        } catch (e) {

        }
    }
}