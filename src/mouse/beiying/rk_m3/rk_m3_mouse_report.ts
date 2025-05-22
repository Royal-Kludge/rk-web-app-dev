import { Mouse_Report } from '../mouse_report';
import { GetOnlinePacket } from './packets/getOnlinePacket';
import { POPUP_CMD_ID, REPORT_ID_POPUP, REPORT_ID_USB } from './packets/packet';
import type { MouseState, IMouseReport } from '../interface'
import { RK_MOUSE_EVENT_DEFINE } from '../state';
import { GetBatteryPacket } from './packets/getBatteryPacket';
import { ConnectionStatusEnum } from '@/device/enum';

export class RK_M3_Mouse_Report extends Mouse_Report  {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
    }

    static create(state: MouseState, device: HIDDevice): IMouseReport {
        return new RK_M3_Mouse_Report(state, device);
    }

    async getOnline(): Promise<void> {
        let packet = new GetOnlinePacket();
        let u8Data = new DataView(new Uint8Array(0).buffer);
        
        if (this.device != undefined) {
            packet.setPayload(u8Data);
            await this.device.sendFeatureReport(REPORT_ID_USB, packet.setReport);
            console.log(`SetFeature [${packet.setReport.byteLength}] bytes -> ${packet.setReport.toString()}`);
            
            await this.sleep(50);
            let data = await this.device.receiveFeatureReport(REPORT_ID_USB);

            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

            if (u8.length >= 16 && u8[2] == 0x00) {
                let tmp = new DataView(new Uint8Array(8).buffer);
                let index = 0;
                for (index = 2;index <= 7; index++) {
                    tmp.setUint8(index, u8[index + 5]);
                }
                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, { detail: { pwd: tmp.getBigUint64(0), status: (u8[6] == 0x01 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected) } }));
            }
        }
    }

    async getBattery(): Promise<void> {
        let packet = new GetBatteryPacket();
        packet.sn = 0x02;
        packet.dataOffset = (0x02 << 6) | 0x01;
        let u8Data = new DataView(new Uint8Array(0).buffer);
        
        if (this.device != undefined) {
            packet.setPayload(u8Data);
            await this.device.sendFeatureReport(REPORT_ID_USB, packet.setReport);
            console.log(`SetFeature [${packet.setReport.byteLength}] bytes -> ${packet.setReport.toString()}`);
            
            await this.sleep(100);
            let data = await this.device.receiveFeatureReport(REPORT_ID_USB);

            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

            if (data.byteLength >= 16 && data.getUint8(2) == 0x00 && data.getUint8(5) == 0x01) {
                let batState = data.getUint8(6) >> 7;
                let batValue = data.getUint8(6) & 0x7F;
                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: batState, value: batValue } }));
            }
        }
    }

    async onReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (data.byteLength == 31 && reportId == REPORT_ID_POPUP) {
                if (data.getUint8(0) == POPUP_CMD_ID) {
                    let id = data.getUint8(1);
                    switch (id) {
                        case 0x02:
                            let val = data.getUint8(2);
                            this.state.ConnectionStatus = val == 0x01 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
                            this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
                            break;
                        case 0x03:
                            let dpiLevel = data.getUint8(2);
                            this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnDpiLevelChanged, { detail: dpiLevel }));
                            break;
                        case 0x05:
                            let batState = data.getUint8(2) >> 7;
                            let batValue = data.getUint8(2) & 0x7F;
                            this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: batState, value: batValue } }));
                            break;
                    }
                }
            }
        } catch (e) {

        }
    }
}