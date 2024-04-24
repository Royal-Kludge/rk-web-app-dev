import type { KeyboardState  } from '../interface'
import { ConnectionStatusEnum, ConnectionType } from '../enum';
import { Packet_Dongle, REPORT_ID_DONGLE } from './packets/packet';
import { GetDongleStatusPacket } from './packets/dongle/getDongleStatusPacket';
import type { MaxtrixLayer, MaxtrixTable } from './keyMaxtrix';
import { RK_L87, COMMAND_ID, RK_L87_EVENT_DEFINE } from './rk_l87';
import { GetProfilePacket } from './packets/dongle/getProfilePacket';
import type { Profile } from './profile';

export class RK_L87_Dongle extends RK_L87 {

    pktGetDongleStatus: GetDongleStatusPacket;
    pktGetProfile: GetProfilePacket;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.Dongle;

        this.pktGetDongleStatus = new GetDongleStatusPacket(this.dongleStatusReport.bind(this));
        this.pktGetProfile = new GetProfilePacket(this.profileReport.bind(this));
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
                    this.activelyReport(data);
                    break;
                case COMMAND_ID.GetDongleStatus:
                    this.pktGetDongleStatus.fromReportData(data);
                    break;
                case COMMAND_ID.GetProfile:
                    this.pktGetProfile.fromReportData(data);
                    break;
            }
        }
    }

    activelyReport(data: DataView): void {
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
        await this.setReport(REPORT_ID_DONGLE, this.pktGetDongleStatus.command());
    }

    async getProfile(index: number): Promise<void> {
        this.pktGetProfile.index = index;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetProfile.command());
    }

    async setProfile(index: number): Promise<void> {

    }

    async getLedColors(): Promise<void> {

    }

    async setLedColors(): Promise<void> {

    }

    async getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {

    }

    async setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {

    }
    
    dongleStatusReport(event: any) {
        let status = event.detail as boolean ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
        this.state.ConnectionStatus = status;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: status }));
    }

    profileReport(event: any) {
        this.data.profile = event.detail as Profile;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnProfileGotten, { detail: this.data.profile }));
    }

    async destroy(): Promise<void> {
        super.destroy();
        this.pktGetDongleStatus.destroy();
        this.pktGetProfile.destroy();
    }
}