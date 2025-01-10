import { Protocol } from '@/mouse/protocol'
import type { Macros } from './macros';

export const RK_K3_EVENT_DEFINE: {
    OnReportFinish: string;
    OnReportStart: string;
    OnMacrosGotten: string;
} = {
    OnReportFinish: 'OnReportFinish',
    OnReportStart: 'OnReportStart',
    OnMacrosGotten: 'OnMacrosGotten',
}

export const COMMAND_ID: {
    ActivelyReport: number;
} = {
    ActivelyReport: 0x0A,
}

export class RK_K3_Data {
    donglePwd: number = 0;
    macros?: Macros;
}

export abstract class RK_K3 extends Protocol {

    data: RK_K3_Data = new RK_K3_Data();

    abstract onGetReport(reportId: number, data: DataView): Promise<void>;
    abstract getMacros(): Promise<void>;
    abstract setMacros(): Promise<void>;

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

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);

            if (this.onGetReport != null) {
                await this.onGetReport(reportId, data);
            }
        } catch (e) {
            this.device.close();
        }
    }
}