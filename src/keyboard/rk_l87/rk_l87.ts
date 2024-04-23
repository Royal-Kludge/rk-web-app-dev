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
} = {
    ActivelyReport: 0x0A,
    GetDongleStatus: 0x07
}

export class RK_L87_Data {
    profile?: Profile;
    ledColors?: LedColors;
    keyMaxtrix?: KeyMaxtrix;
}

export abstract class RK_L87 extends Protocol {

    data: RK_L87_Data = new RK_L87_Data();

    abstract getProfile(): Promise<void>;
    abstract setProfile(): Promise<void>;
    abstract getLedColors(): Promise<void>;
    abstract setLedColors(): Promise<void>;
    abstract getKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    abstract setKeyMaxtrix(layer: MaxtrixLayer, table: MaxtrixTable, board: number): Promise<void>;
    
    abstract onGetReport(reportId: number, data: DataView): Promise<void>;

    async init(): Promise<void> {
        this.device.oninputreport = (e: HIDInputReportEvent) => this.processKeyboardReport(e);
    }

     private async processKeyboardReport(report: HIDInputReportEvent) {
         let reportId = report.reportId;
         const { data } = report

         console.log(`Reviced [${data.byteLength}] bytes report data`);

         if (this.onGetReport != null) {
             await this.onGetReport(reportId, data);
         }
     }
}