import type { IMouseReport, IProtocol, MouseDefine } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '../device/enum'
import { defaultState, MouseReportList } from './state'
import type { HidDeviceDefine } from '@/device/interface';
import { Device } from '@/device/device';
import type { Mouse_Report } from './mouse_report';

/**
 * Main class.
 */
export class Mouse extends Device {

    /** Device protocol */
    protocol?: IProtocol;
    report?: Mouse_Report;

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

                this.report = MouseReportList[deviceDefine.name.valueOf()](this.state, this.device) as Mouse_Report;
                
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
            this.report = undefined;

            this.dispatchEvent(new MouseEvent("connection", this));
        }
    }

    async getOnline(): Promise<void> {
        if (this.report != undefined) {
            this.report.getOnline();
        }
    }

    async getBattery(): Promise<void> {
        if (this.report != undefined) {
            this.report.getBattery();
        }
    }

    async onReport(report: HIDInputReportEvent) {
        if (this.report != undefined) {
            this.report.onReport(report);
        }
    };
}

declare class MouseEvent extends CustomEvent<Mouse> {
    constructor(type: string, mouse: Mouse);
    public readonly mouse: Mouse;
}

export const mouse: Mouse = new Mouse();