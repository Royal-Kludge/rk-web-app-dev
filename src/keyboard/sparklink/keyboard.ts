import { KeyMappingType } from '@/common/enum'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '@/device/enum'
import type { HidDeviceDefine, IHidDevice } from '@/device/interface';
import { Device } from '@/device/device';
import type { IProtocol, KeyboardDefine, KeyTableData } from './interface';
import { defaultState } from './state';

/**
 * Main class.
 */
export class Keyboard extends Device {

    /** Device protocol */
    protocol?: IProtocol;

    /** Current keyboard state */
    state = defaultState;
    
    keyboardDefine?: KeyboardDefine;

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
                this.state.protocolType = deviceDefine.protocolType;
                this.state.connectType = deviceDefine.connectType;

                this.dispatchEvent(new KeyboardEvent("connection", this));
            }
        }
    }
    /**
     * Close current opened device
     */
    async close() {
        if (this.device && this.device.opened) {

            await this.device.close();
            await this.device.forget();

            this.protocol?.destroy();

            this.state.connectionEvent = ConnectionEventEnum.Close;
            this.state.ConnectionStatus = ConnectionStatusEnum.Disconnected;

            this.keyboardDefine = undefined;
            this.device = undefined;
            this.protocol = undefined;

            this.dispatchEvent(new KeyboardEvent("connection", this));
        }
    }

    loadDefaultValue(keyTableDatas: Record<number, Record<number, Array<KeyTableData>>>) {
            
    }
}

declare class KeyboardEvent extends CustomEvent<Keyboard> {
    constructor(type: string, keyboard: Keyboard);
    public readonly keyboard: Keyboard;
}

export const keyboard: Keyboard = new Keyboard();