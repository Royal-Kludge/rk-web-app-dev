import { Protocol } from '@/keyboard/protocol'
import type { MaxtrixLayer, MaxtrixTable } from '@/keyboard/rk_l87/keyMaxtrix';

import type { KeyMaxtrix } from "./keyMaxtrix";
import type { LedColors } from "./ledColors";
import type { Profile } from "./profile";
import { ConnectionType } from '../enum'

export const RK_L87_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnKeyMaxtrixGotten: string;
    OnLedColorsGotten: string;
    OnProfileGotten: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnKeyMaxtrixGotten: 'OnKeyMaxtrixGotten',
    OnLedColorsGotten: 'OnLedColorsGotten',
    OnProfileGotten: 'OnProfileGotten'
}

export const COMMAND_ID: {
    ActivelyReport: number;
    GetDongleStatus: number;
    GetProfile: number;
} = {
    ActivelyReport: 0x0A,
    GetDongleStatus: 0x07,
    GetProfile: 0x44
}

export class RK_L87_Data {
    profile?: Profile;
    ledColors?: LedColors;
    keyMaxtrix?: KeyMaxtrix;
}

export abstract class RK_L87 extends Protocol {

    data: RK_L87_Data = new RK_L87_Data();

    abstract getProfile(index: number): Promise<void>;
    abstract setProfile(index: number): Promise<void>;
    abstract getLedColors(): Promise<void>;
    abstract setLedColors(): Promise<void>;
    abstract getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    abstract setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    
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