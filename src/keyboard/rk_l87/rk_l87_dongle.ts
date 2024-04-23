import type { KeyboardState  } from '../interface'
import { ConnectionStatusEnum, ConnectionType } from '../enum';
import { Packet_Dongle, REPORT_ID_DONGLE } from './packets/packet';
import { GetDongleStatusPacket } from './packets/dongle/getDongleStatusPacket';
import type { MaxtrixLayer, MaxtrixTable } from './keyMaxtrix';
import { RK_L87, COMMAND_ID, RK_L87_EVENT_DEFINE } from './rk_l87';

export class RK_L87_Dongle extends RK_L87 {

    buffer: DataView;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        this.buffer = new DataView(new ArrayBuffer(519));
        state.connectType = ConnectionType.Dongle;
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_L87_Dongle(state, device);
    }

    async init(): Promise<void> {
        super.init();
        await this.getDongleStatus();
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (data.byteLength == 19 && reportId == REPORT_ID_DONGLE) {
            let cmd = data.getUint8(0);
            let packet: Packet_Dongle | null = null;
            switch (cmd) {
                case COMMAND_ID.ActivelyReport:
                    this.onActivelyReport(data);
                    break;
                case COMMAND_ID.GetDongleStatus:
                    packet = new GetDongleStatusPacket();
                    packet.fromReportData(data);
                    break;
            }
        }
    }

    onActivelyReport(data: DataView): void {
        let id = data.getUint8(4);
        let val = data.getUint8(5);
        switch (id) {
            case 0x02:
                this.state.ConnectionStatus = val == 1 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
                this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
                break;
        }
    }

    async getDongleStatus(): Promise<void> {
        let packet = new GetDongleStatusPacket();
        await this.device.sendReport(REPORT_ID_DONGLE, packet.setReport);
    }

    onGetDongleStatusReport(packet: GetDongleStatusPacket) {
        this.state.ConnectionStatus = packet .isConnected ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
    }

    async getProfile(): Promise<void> {

    }

    async setProfile(): Promise<void> {

    }

    async getLedColors(): Promise<void> {

    }

    async setLedColors(): Promise<void> {

    }

    async getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {

    }

    async setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {

    }
}