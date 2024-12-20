import type { IProtocol, MouseDefine } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '../device/enum'
import { defaultState } from './state'
import type { HidDeviceDefine } from '@/device/interface';
import { Device } from '@/device/device';

const REPORT_ID_DONGLE: number = 0x13;

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

    loadDefaultValue() {
        
    }

    async onReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (data.byteLength == 19 && reportId == REPORT_ID_DONGLE) {
                let cmd = data.getUint8(0);
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