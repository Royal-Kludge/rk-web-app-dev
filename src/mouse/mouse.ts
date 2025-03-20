import type { IProtocol, MouseDefine } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '../device/enum'
import { defaultState } from './state'
import type { HidDeviceDefine } from '@/device/interface';
import { Device } from '@/device/device';
import { GetOnlinePacket } from './packets/getOnlinePacket';
import { REPORT_ID_POPUP, REPORT_ID_USB, POPUP_CMD_ID } from './packets/packet';

export const RK_MOUSE_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnPasswordGotten: string;
    OnReportFinish: string;
    OnReportStart: string;
    OnMacrosGotten: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnPasswordGotten: 'OnPasswordGotten',
    OnReportFinish: 'OnReportFinish',
    OnReportStart: 'OnReportStart',
    OnMacrosGotten: 'OnMacrosGotten',
}

/**
 * Main class.
 */
export class Mouse extends Device {

    /** Device protocol */
    protocol?: IProtocol;

    /** Current keyboard state */
    state = defaultState;

    mouseDefine?: MouseDefine;

    callback = (e: HIDInputReportEvent) => this.onReport(e);

    constructor() {
        super();

        this.deviceState = this.state;
    }

    async init(deviceDefine: HidDeviceDefine) {
        if (this.device != undefined) {
            
            if (!this.device.opened) {
                await this.device.open();
            }

            if (this.device.opened) {
                this.state.deviceName = this.device.productName;
                this.state.connectType = ConnectionType.USB;
                this.state.connectionEvent = ConnectionEventEnum.Open;
                this.state.productId = this.device.productId;

                this.state.connectType = deviceDefine.connectType;
                
                this.dispatchEvent(new MouseEvent("connection", this));
            }
        }
    }

    /**
     * Close current opened device
     */
    async close() {
        if (this.device && this.device.opened) {
            this.device.removeEventListener("inputreport", this.callback);

            await this.device.close();
            await this.device.forget();

            this.protocol?.destroy();

            this.state.connectionEvent = ConnectionEventEnum.Close;
            this.state.ConnectionStatus = ConnectionStatusEnum.Disconnected;

            this.mouseDefine = undefined;
            this.device = undefined;
            this.protocol = undefined;

            this.dispatchEvent(new MouseEvent("connection", this));
        }
    }

    async getOnline(): Promise<void> {
        let packet = new GetOnlinePacket();
        let u8Data = new DataView(new Uint8Array(0).buffer);
        
        if (this.device != undefined) {
            packet.setPayload(u8Data);
            await this.device.sendFeatureReport(REPORT_ID_USB, packet.setReport);
            console.log(`SetFeature [${packet.setReport.byteLength}] bytes -> ${packet.setReport.toString()}`);
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
                    }
                }
            }
        } catch (e) {

        }
    };
}

declare class MouseEvent extends CustomEvent<Mouse> {
    constructor(type: string, mouse: Mouse);
    public readonly mouse: Mouse;
}

export const mouse: Mouse = new Mouse();