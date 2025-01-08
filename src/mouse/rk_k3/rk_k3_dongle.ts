import type { MouseState } from '../interface'
import { ConnectionStatusEnum, ConnectionType } from '../../device/enum';
import { Packet_Dongle, REPORT_ID_DONGLE, REPORT_MAX_RETRY, MACRO_PER_BLOCK_LENGTH, MACRO_MAX_LENGTH } from './packets/packet';
import { Packet_Dongle_Block_Set } from './packets/dongle/setPacket';

import { COMMAND_ID, RK_M300, RK_M300_EVENT_DEFINE } from './rk_k3';

const dongleWorker = new Worker(new URL('@/common/dongleCommunication.ts', import.meta.url));

export class RK_M300_Dongle extends RK_M300 {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.Dongle;
    }

    static async create(state: MouseState, device: HIDDevice) {
        return new RK_M300_Dongle(state, device);
    }

    async init(): Promise<void> {
        super.init();

        dongleWorker.onmessage = (async (event: any) => {
            if (event.data == 'finish' || event.data == 'timeout') {
                this.dispatchEvent(new CustomEvent(RK_M300_EVENT_DEFINE.OnReportFinish, { detail: event.data }));
            } else {
                
            }
        }).bind(this);
        
        dongleWorker.postMessage('start');
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (data.byteLength == 19 && reportId == REPORT_ID_DONGLE) {
            let cmd = data.getUint8(0);
            //let packet: Packet_Dongle | null = null;
            switch (cmd) {
                case COMMAND_ID.ActivelyReport:
                    await this.activelyReport(data);
                    break;
            }
        }
    }

    async activelyReport(data: DataView): Promise<void> {
        let id = data.getUint8(4);
        let val = data.getUint8(5);
        switch (id) {
            case 0x02:
                this.state.ConnectionStatus = val == 1 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
                if (this.state.ConnectionStatus == ConnectionStatusEnum.Connected) {
                    //setTimeout(this.getPassword, 1000);
                } else {
                    this.data.donglePwd = 0;
                }
                //this.dispatchEvent(new CustomEvent(RK_M300_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
                break;
        }
    }

    private async nextReport(event: any) {
        let pkt = event.detail as Packet_Dongle;
        this.dispatchEvent(new CustomEvent(RK_M300_EVENT_DEFINE.OnReportStart, { detail: true }));
        await this.setReport(REPORT_ID_DONGLE, pkt.command());
    }

    private packetFinished(event: any) {
        dongleWorker.postMessage('finish');
    }

    private async nextBlock(event: any) {
        let pkt = event.detail as Packet_Dongle_Block_Set;
        pkt.block = pkt.block + 1;
        if (pkt.block < pkt.blockCount) {
            await this.setReport(REPORT_ID_DONGLE, pkt.command());
        }
    }

    async destroy(): Promise<void> {
        super.destroy();
        dongleWorker.onmessage = null;
        dongleWorker.postMessage('stop');
    }
}