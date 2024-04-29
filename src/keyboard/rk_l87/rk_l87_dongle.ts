import type { KeyboardState  } from '../interface'
import { ConnectionStatusEnum, ConnectionType } from '../enum';
import { Packet_Dongle,  REPORT_ID_DONGLE, REPORT_MAX_RETRY, MACRO_PER_BLOCK_LENGTH } from './packets/packet';
import { Packet_Dongle_Block_Set } from './packets/dongle/setPacket';

import type { KeyMaxtrix, MaxtrixLayer, MaxtrixTable } from './keyMaxtrix';
import { RK_L87, COMMAND_ID, RK_L87_EVENT_DEFINE } from './rk_l87';

import type { Profile } from './profile';
import type { LedColors } from './ledColors';
import type { Macros } from './macros';

import { GetLedColorsPacket } from './packets/dongle/getLedColorsPacket';
import { GetPasswordPacket } from './packets/dongle/getPasswordPacket';
import { GetProfilePacket } from './packets/dongle/getProfilePacket';
import { GetDongleStatusPacket } from './packets/dongle/getDongleStatusPacket';
import { GetKeyMaxtrixPacket } from './packets/dongle/getKeyMaxtrixPacket';
import { GetMacrosPacket } from './packets/dongle/getMacrosPacket';

import { SetProfilePacket } from './packets/dongle/setProfilePacket';
import { SetLedColorsPacket } from './packets/dongle/setLedColorsPacket';
import { SetKeyMaxtrixPacket } from './packets/dongle/setKeyMaxtrixPacket';
import { SetMacrosPacket } from './packets/dongle/setMacrosPacket';


export class RK_L87_Dongle extends RK_L87 {

    pktGetDongleStatus: GetDongleStatusPacket;
    pktGetPassword: GetPasswordPacket;
    pktGetProfile: GetProfilePacket;
    pktGetLedColors: GetLedColorsPacket;
    pktGetKeyMaxtrix: GetKeyMaxtrixPacket;
    pktGetMacros: GetMacrosPacket;
    pktSetProfile: SetProfilePacket;
    pktSetLedColors: SetLedColorsPacket;
    pktSetKeyMaxtrix: SetKeyMaxtrixPacket;
    pktSetMacros: SetMacrosPacket;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.Dongle;

        this.pktGetDongleStatus = new GetDongleStatusPacket(this.dongleStatusReport.bind(this));
        this.pktGetPassword = new GetPasswordPacket(this.passwordReport.bind(this));
        this.pktGetProfile = new GetProfilePacket(this.getProfileReport.bind(this));
        this.pktGetLedColors = new GetLedColorsPacket(this.getLedColorsReport.bind(this));
        this.pktGetKeyMaxtrix = new GetKeyMaxtrixPacket(this.getKeyMaxtrixReport.bind(this));
        this.pktGetMacros = new GetMacrosPacket(this.getMacrosReport.bind(this));
        this.pktSetProfile = new SetProfilePacket(this.nextReport.bind(this));
        this.pktSetLedColors = new SetLedColorsPacket(this.nextReport.bind(this));
        this.pktSetKeyMaxtrix = new SetKeyMaxtrixPacket(this.nextReport.bind(this));
        this.pktSetMacros = new SetMacrosPacket(this.nextReport.bind(this), this.nextBlock.bind(this));
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
            //let packet: Packet_Dongle | null = null;
            switch (cmd) {
                case COMMAND_ID.ActivelyReport:
                    this.activelyReport(data);
                    break;
                case COMMAND_ID.GetDongleStatus:
                    this.pktGetDongleStatus.fromReportData(data);
                    break;
                case COMMAND_ID.GetPassword:
                    this.pktGetPassword.fromReportData(data);
                    break;
                case COMMAND_ID.GetProfile:
                    this.pktGetProfile.fromReportData(data);
                    break;
                case COMMAND_ID.GetLedColors:
                    this.pktGetLedColors.fromReportData(data);
                    break;
                case COMMAND_ID.GetKeyMaxtrix:
                    this.pktGetKeyMaxtrix.fromReportData(data);
                    break;
                case COMMAND_ID.GetMacros:
                    this.pktGetMacros.fromReportData(data);
                    if (this.pktGetMacros.packageNum - 1 == this.pktGetMacros.packageIndex && this.pktGetMacros.block < this.pktGetMacros.blockCount) {
                        await this.setReport(REPORT_ID_DONGLE, this.pktGetMacros.command());
                    }
                    break;
                case COMMAND_ID.SetProfile:
                    this.pktSetProfile.fromReportData(data);
                    break;
                case COMMAND_ID.SetLedColors:
                    this.pktSetLedColors.fromReportData(data);
                    break;
                case COMMAND_ID.SetKeyMaxtrix:
                    this.pktSetKeyMaxtrix.fromReportData(data);
                    break;
                case COMMAND_ID.SetMacros:
                    this.pktSetMacros.fromReportData(data);
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

    async getPassword(): Promise<void> {
        await this.setReport(REPORT_ID_DONGLE, this.pktGetPassword.command());
    }

    async getProfile(board: number): Promise<void> {
        this.pktGetProfile.board = board;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetProfile.command());
    }

    async setProfile(board: number): Promise<void> {
        if (this.data.profile != undefined) {
            this.pktSetProfile.board = board;
            this.pktSetProfile.packageIndex = 0;
            this.pktSetProfile.retry = REPORT_MAX_RETRY;
            this.pktSetProfile.buffer = new Uint8Array(this.data.profile?.buffer.buffer.slice(0, this.data.profile?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetProfile.command());
        }
    }

    async getLedColors(board: number): Promise<void> {
        this.pktGetLedColors.board = board;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetLedColors.command());
    }

    async setLedColors(board: number): Promise<void> {
        if (this.data.ledColors != undefined) {
            this.pktSetLedColors.board = board;
            this.pktSetLedColors.packageIndex = 0;
            this.pktSetLedColors.retry = REPORT_MAX_RETRY;
            this.pktSetLedColors.buffer = new Uint8Array(this.data.ledColors?.buffer.buffer.slice(0, this.data.ledColors?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetLedColors.command());
        }
    }

    async getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {
        this.pktGetKeyMaxtrix.board = board;
        this.pktGetKeyMaxtrix.layer = layer;
        this.pktGetKeyMaxtrix.table = table;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetKeyMaxtrix.command());
    }

    async setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void> {
        if (this.data.keyMaxtrix != undefined) {
            this.pktSetKeyMaxtrix.board = board;
            this.pktSetKeyMaxtrix.layer = layer;
            this.pktSetKeyMaxtrix.table = table;
            this.pktSetKeyMaxtrix.packageIndex = 0;
            this.pktSetKeyMaxtrix.retry = REPORT_MAX_RETRY;
            this.pktSetKeyMaxtrix.buffer = new Uint8Array(this.data.keyMaxtrix?.buffer.buffer.slice(0, this.data.keyMaxtrix?.buffer.byteLength));
            await this.setReport(REPORT_ID_DONGLE, this.pktSetKeyMaxtrix.command());
        }
    }

    async getMacros(): Promise<void> {
        this.pktGetMacros.block = 0x00;
        this.pktGetMacros.blockCount = 4096 / MACRO_PER_BLOCK_LENGTH;
        await this.setReport(REPORT_ID_DONGLE, this.pktGetMacros.command());
    }

    async setMacros(block: number): Promise<void> {
        if (this.data.macros != undefined) {
            this.pktSetMacros.block = block;
            this.pktSetMacros.packageIndex = 0;
            this.pktSetMacros.retry = REPORT_MAX_RETRY;
            this.pktSetMacros.buffer = this.data.macros.serialize();
            this.pktSetMacros.blockCount = Math.ceil(this.pktSetMacros.buffer.length / MACRO_PER_BLOCK_LENGTH);
            await this.setReport(REPORT_ID_DONGLE, this.pktSetMacros.command());
        }
    }
    
    private dongleStatusReport(event: any) {
        let status = event.detail as boolean ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
        this.state.ConnectionStatus = status;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, { detail: status }));
        if (status == ConnectionStatusEnum.Connected) {
            this.getPassword();
        }
    }

    private passwordReport(event: any) {
        let password = event.detail as number;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnPasswordGotten, { detail: password }));
    }

    private getProfileReport(event: any) {
        this.data.profile = event.detail as Profile;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnProfileGotten, { detail: this.data.profile }));
    }

    private getLedColorsReport(event: any) {
        this.data.ledColors = event.detail as LedColors;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnLedColorsGotten, { detail: this.data.ledColors }));
    }

    private getKeyMaxtrixReport(event: any) {
        this.data.keyMaxtrix = event.detail as KeyMaxtrix;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnKeyMaxtrixGotten, { detail: this.data.keyMaxtrix }));
    }

    private getMacrosReport(event: any) {
        this.data.macros = event.detail as Macros;
        this.dispatchEvent(new CustomEvent(RK_L87_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    private async nextReport(event: any) {
        let pkt = event.detail as Packet_Dongle;
        await this.setReport(REPORT_ID_DONGLE, pkt.command());
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
        this.pktGetDongleStatus.destroy();
        this.pktGetProfile.destroy();
    }
}