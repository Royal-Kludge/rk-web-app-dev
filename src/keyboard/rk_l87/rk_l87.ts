import { Protocol } from '@/keyboard/protocol'
import type { MaxtrixLayer, MaxtrixTable } from '@/keyboard/rk_l87/keyMaxtrix';

import type { KeyMaxtrix } from "./keyMaxtrix";
import type { LedColors } from "./ledColors";
import type { Profile } from "./profile";
import type { Macros } from './macros';

export const RK_L87_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnPasswordGotten: string;
    OnKeyMaxtrixGotten: string;
    OnLedColorsGotten: string;
    OnProfileGotten: string;
    OnMacrosGotten: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnPasswordGotten: 'OnPasswordGotten',
    OnKeyMaxtrixGotten: 'OnKeyMaxtrixGotten',
    OnLedColorsGotten: 'OnLedColorsGotten',
    OnProfileGotten: 'OnProfileGotten',
    OnMacrosGotten: 'OnMacrosGotten'
}

export const COMMAND_ID: {
    ActivelyReport: number;
    GetDongleStatus: number;
    GetPassword: number;
    GetProfile: number;
    GetLedColors: number;
    GetKeyMaxtrix: number;
    GetMacros: number;
    SetProfile: number;
    SetLedColors: number;
    SetKeyMaxtrix: number;
    SetMacros: number;
} = {
    ActivelyReport: 0x0A,
    GetDongleStatus: 0x07,
    GetPassword: 0x05,
    GetProfile: 0x44,
    GetLedColors: 0x49,
    GetKeyMaxtrix: 0x41,
    GetMacros: 0x43,
    SetProfile: 0x04,
    SetLedColors: 0x09,
    SetKeyMaxtrix: 0x01,
    SetMacros: 0x03
}

export class RK_L87_Data {
    profile?: Profile;
    ledColors?: LedColors;
    keyMaxtrix?: KeyMaxtrix;
    macros?: Macros;
}

export abstract class RK_L87 extends Protocol {

    data: RK_L87_Data = new RK_L87_Data();

    abstract getProfile(board: number): Promise<void>;
    abstract setProfile(board: number): Promise<void>;
    abstract getLedColors(board: number): Promise<void>;
    abstract setLedColors(board: number): Promise<void>;
    abstract getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    abstract setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    abstract getMacros(): Promise<void>;
    abstract setMacros(block: number): Promise<void>;
    
    abstract onGetReport(reportId: number, data: DataView): Promise<void>;

    callback = (e: HIDInputReportEvent) => this.processKeyboardReport(e);

    async init(): Promise<void> {
        this.device.addEventListener("inputreport", this.callback);
    }

    async destroy(): Promise<void> {
        this.device.removeEventListener("inputreport", this.callback);
    }

    async getFeature(reportId: number): Promise<DataView> {
        let data = await this.device.receiveFeatureReport(reportId);

        let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
        console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

        return data;
    }

    async setFeature(reportId: number, data: Uint8Array): Promise<void> {
        console.log(`SetFeature [${data.byteLength}] bytes -> ${data.toString()}`);
        await this.device.sendFeatureReport(reportId, data);
    }

    async setReport(reportId: number, data: Uint8Array): Promise<void> {
        console.log(`SetReport [${data.byteLength}] bytes -> ${data.toString()}`);
        await this.device.sendReport(reportId, data);
    }

    private async processKeyboardReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;

        let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
        console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);

        if (this.onGetReport != null) {
            await this.onGetReport(reportId, data);
        }
    }
}