import { Protocol } from '@/mouse/beiying/protocol'
import type { Macros } from './macros';
import type { ConfigTable } from './configTable';
import type { KeyTable } from './keyTable';
import { mouse } from '../mouse';
import type { LeftSideKey } from '../interface';

export class RK_M30_Data {
    donglePwd: number = 0;
    leftSideKey?: LeftSideKey;
    macros?: Macros;
    config?: ConfigTable;
    keys?: KeyTable;
    isDestroy: boolean = false;
    
    loadDefaultValue() {
        if (mouse.mouseDefine != undefined) {
            let index: number;
            if (this.keys != undefined && this.keys.keyLayout != undefined) {
                for (index = 0; index < mouse.mouseDefine.layout.length; index++) {
                    this.keys.keyLayout[index].keyStr = mouse.mouseDefine.layout[index].keyStr;
                    this.keys.keyLayout[index].keyCode = mouse.mouseDefine.layout[index].keyCode;
                    this.keys.keyLayout[index].index = mouse.mouseDefine.layout[index].index;
                    this.keys.keyLayout[index].keyMappingData.keyStr =  mouse.mouseDefine.layout[index].keyMappingData.keyStr;
                    this.keys.keyLayout[index].keyMappingData.keyFunctionType = mouse.mouseDefine.layout[index].keyMappingData.keyFunctionType;
                    this.keys.keyLayout[index].keyMappingData.keyMappingType = mouse.mouseDefine.layout[index].keyMappingData.keyMappingType;
                    this.keys.keyLayout[index].keyMappingData.keyTypeCode = mouse.mouseDefine.layout[index].keyMappingData.keyTypeCode;
                    this.keys.keyLayout[index].keyMappingData.keyParam1 = mouse.mouseDefine.layout[index].keyMappingData.keyParam1;
                    this.keys.keyLayout[index].keyMappingData.keyParam2 = mouse.mouseDefine.layout[index].keyMappingData.keyParam2;
                    this.keys.keyLayout[index].keyMappingData.keyRaw = mouse.mouseDefine.layout[index].keyMappingData.keyRaw;
                }

                this.keys.loadDefualtData();
            }

            if (this.config != undefined) {
                this.config.loadDefualtData();
            }
        }
    }
}

export abstract class RK_M30 extends Protocol {

    data: RK_M30_Data = new RK_M30_Data();

    abstract onGetReport(reportId: number, data: DataView): Promise<void>;
    abstract getFwVer(): Promise<void>
    abstract getOnline(): Promise<void>;
    abstract getBattery(): Promise<void>;
    abstract setFactory(): Promise<void>;
    abstract setConfigData(): Promise<void>;
    abstract setKeyMapping(): Promise<void>;

    callback = (e: HIDInputReportEvent) => this.processKeyboardReport(e);

    async init(): Promise<void> {
        this.device.addEventListener("inputreport", this.callback);
    }

    async destroy(): Promise<void> {
        this.device.removeEventListener("inputreport", this.callback);
        this.data.leftSideKey = undefined;
        this.data.macros = undefined;
        this.data.keys = undefined;
        this.data.config = undefined;
        this.data.isDestroy = true;
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

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}