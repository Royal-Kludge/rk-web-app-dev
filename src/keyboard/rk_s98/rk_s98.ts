import { Protocol } from '@/keyboard/protocol'
import { KeyMatrixLayer, MatrixTable } from '@/keyboard/enum'

import type { KeyMatrix } from "./keyMatrix";
import type { LedEffect } from "./ledEffect";
import type { BoardProfile } from "./boardProfile";
import type { Macros } from './macros';
import type { LedColors } from './ledColors';
import type { LedColor } from '../interface';

export const RK_S98_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnPasswordGotten: string;
    OnKeyMatrixGotten: string;
    OnLedEffectGotten: string;
    OnLedColorsGotten: string;
    OnProfileGotten: string;
    OnMacrosGotten: string;
    OnSetFactorySuccess: string;
    OnReportFinish: string;
    OnReportStart: string;
    OnTftSetEvent: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnPasswordGotten: 'OnPasswordGotten',
    OnKeyMatrixGotten: 'OnKeyMatrixGotten',
    OnLedEffectGotten: 'OnLedEffectGotten',
    OnLedColorsGotten: 'OnLedColorsGotten',
    OnProfileGotten: 'OnProfileGotten',
    OnMacrosGotten: 'OnMacrosGotten',
    OnSetFactorySuccess: 'OnSetFactorySuccess',
    OnReportFinish: 'OnReportFinish',
    OnReportStart: 'OnReportStart',
    OnTftSetEvent: 'OnTftSetEvent',
}

export const COMMAND_ID: {
    ActivelyReport: number;
    GetDongleStatus: number;
    GetPassword: number;
    GetProfile: number;
    GetLedEffect: number;
    GetLedColors: number;
    GetKeyMatrix: number;
    GetMacros: number;
    SetProfile: number;
    SetLedEffect: number;
    SetLedColors: number;
    SetKeyMatrix: number;
    SetMacros: number;
    SetTftPic: number;
    StopTFTPicDownload: number;
} = {
    ActivelyReport: 0x0A,
    GetDongleStatus: 0x07,
    GetPassword: 0x05,
    GetProfile: 0x44,
    GetLedEffect: 0x49,
    GetLedColors: 0x42,
    GetKeyMatrix: 0x41,
    GetMacros: 0x43,
    SetProfile: 0x04,
    SetLedEffect: 0x09,
    SetLedColors: 0x02,
    SetKeyMatrix: 0x01,
    SetMacros: 0x03,
    SetTftPic: 0x08,
    StopTFTPicDownload: 0x0B,
}

export class RK_S98_Data {
    boardProfile?: BoardProfile;
    ledEffect?: LedEffect;
    keyMatrixs: Record<number, Record<number, KeyMatrix>> = {};
    ledColors?: LedColors;
    macros?: Macros;
    donglePwd: number = 0;
}

export abstract class RK_S98 extends Protocol {

    data: RK_S98_Data = new RK_S98_Data();

    abstract getProfile(board: number): Promise<void>;
    abstract setProfile(board: number): Promise<void>;
    abstract getLedEffect(board: number): Promise<void>;
    abstract setLedEffect(board: number): Promise<void>;
    abstract getKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void>;
    abstract setKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void>;
    abstract getMacros(): Promise<void>;
    abstract setMacros(): Promise<void>;
    abstract getLedColors(board: number): Promise<void>;
    abstract setLedColors(board: number): Promise<void>;
    abstract setFactory(): Promise<void>;
    abstract setTftPic(buffers: Array<Uint16Array>, delay: number): Promise<void>;
    abstract stopTFTPicDownload(): Promise<void>;
    
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
        await this.device.sendFeatureReport(reportId, data);
        console.log(`SetFeature [${data.byteLength}] bytes -> ${data.toString()}`);
    }

    async setReport(reportId: number, data: Uint8Array): Promise<void> {
        console.log(`SetReport [${data.byteLength}] bytes -> ${data.toString()}`);
        await this.device.sendReport(reportId, data);
    }

    private async processKeyboardReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;
        
        console.log(`Received reportId: ${reportId}`);
        console.log(`Received data: ${data}`);

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (this.onGetReport != null) {
                await this.onGetReport(reportId, data);
            }
        } catch (e) {
            console.error('Error processing report:', e);
            this.device.close();
        }
    }
}