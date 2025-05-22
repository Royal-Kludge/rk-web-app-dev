import { Mouse_Report } from '../mouse_report';
import { GetOnlinePacket } from './packets/getOnlinePacket';
import { POPUP_CMD_ID, REPORT_ID_POPUP, REPORT_ID_USB } from './packets/packet';
import type { MouseState, IMouseReport } from '../interface'
import { RK_MOUSE_EVENT_DEFINE } from '../state';
import { GetBatteryPacket } from './packets/getBatteryPacket';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { GetPasswordPacket } from './packets/getPasswordPacket';
import { GetConfigPacket } from './packets/getConfigPacket';

export class RK_M30_Mouse_Report extends Mouse_Report  {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
    }

    static create(state: MouseState, device: HIDDevice): IMouseReport {
        return new RK_M30_Mouse_Report(state, device);
    }

    async getOnline(): Promise<void> {
        let onLinePacket = new GetOnlinePacket();
        let pwdPacket = new GetPasswordPacket();
        let u8Data = new DataView(new Uint8Array(1).buffer);
        
        let status = ConnectionStatusEnum.Disconnected;

        if (this.device != undefined) {
            onLinePacket.setPayload(u8Data);
            await this.device.sendFeatureReport(REPORT_ID_USB, onLinePacket.setReport);
            console.log(`SetFeature [${onLinePacket.setReport.byteLength}] bytes -> ${onLinePacket.setReport.toString()}`);

            await this.sleep(50);
            let data = await this.device.receiveFeatureReport(REPORT_ID_USB);

            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

            if (data.byteLength >= 9 && data.getUint8(2) == 0x07 && data.getUint8(8) == 0x01) {
                status = ConnectionStatusEnum.Connected;
            }

            await this.sleep(100);
            pwdPacket.setPayload(u8Data);
            await this.device.sendFeatureReport(REPORT_ID_USB, pwdPacket.setReport);
            console.log(`SetFeature [${pwdPacket.setReport.byteLength}] bytes -> ${pwdPacket.setReport.toString()}`);

            await this.sleep(50);
            data = await this.device.receiveFeatureReport(REPORT_ID_USB);

            u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

            if (data.byteLength >= 14 && data.getUint8(2) == 0x05) {
                let tmp = new DataView(new Uint8Array(8).buffer);
                let index = 0;
                for (index = 2;index <= 7; index++) {
                    tmp.setUint8(index, u8[index + 6]);
                }
                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, { detail: { pwd: tmp.getBigUint64(0), status: status } }));
            }
        }
    }

    async getBattery(): Promise<void> {

        if (this.state.connectType == ConnectionType.Dongle) {
            let packet = new GetBatteryPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);
            
            if (this.device != undefined) {
                packet.setPayload(u8Data);
                await this.device.sendFeatureReport(REPORT_ID_USB, packet.setReport);
                console.log(`SetFeature [${packet.setReport.byteLength}] bytes -> ${packet.setReport.toString()}`);

                await this.sleep(50);
                let data = await this.device.receiveFeatureReport(REPORT_ID_USB);

                let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
                console.log(`GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

                if (data.byteLength >= 9 && data.getUint8(2) == 0x09) {
                    let val = data.getUint8(8);
                    let batState = val == 0xFF ? 1 : 0;
                    let batValue = val == 0xFF ? 100 : val;
                    this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: batState, value: batValue } }));
                }
            }
        } else {
            this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: 1, value: 100 } }));
        }
    }

    async onReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (data.byteLength == 7 && reportId == REPORT_ID_POPUP) {
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
                            let batState = data.getUint8(2) == 0xFF ? 1 : 0;
                            let batValue = data.getUint8(2) == 0xFF ? 100 : data.getUint8(2);
                            this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: batState, value: batValue } }));
                            break;
                    }
                }
            }
        } catch (e) {

        }
    }
}