import type { IProtocol, KeyTableData, LightEffect, LightInfo, KeyboardDefine } from './interface'
import { ConnectionType, ConnectionEventEnum, KeyMappingType, ConnectionStatusEnum } from './enum'
import { defaultState, KeyboardDefineList } from './state'

/**
 * Main class.
 */
export class Keyboard extends EventTarget {
    devices: Array<HIDDevice>

    /** Internal WebHID device */
    device?: HIDDevice;

    /** Device protocol */
    protocol?: IProtocol;

    /** WebHid object */
    hid?: HID;

    /** Is the hid feature available */
    isHidAvailable: boolean;

    /** Current keyboard state */
    state = defaultState;

    keyboardDefine?: KeyboardDefine;

    constructor() {
        super();
        
        this.devices = new Array<HIDDevice>();

        if (!navigator.hid || !navigator.hid.requestDevice) {
            this.isHidAvailable = false;
            //throw new Error('WebHID not supported by browser or not available.')
        } else {
            this.hid = navigator.hid;
            this.isHidAvailable = true;
        }
    }

    /**
     * Initializes the WebHID API and requests access to the device.
     * 
     * This function must be called in the context of user interaction
     * (i.e in a click event handler), otherwise it might not work.
     */
    async init() {
        if (this.device && this.device.opened)
        {
            this.device.close();
            return;
        }

        var option: HIDDeviceRequestOptions = { filters: []};
        var item: any;
        for (item in KeyboardDefineList) {
            let keyboard: HIDDeviceFilter = { 
                vendorId: KeyboardDefineList[item].vendorId, 
                productId: KeyboardDefineList[item].productId,
                usagePage: KeyboardDefineList[item].usagePage, 
                usage: KeyboardDefineList[item].usage 
            };
            option.filters.push(keyboard);
        }

        if (this.hid == null) {
            return;
        }

        const devices = await this.hid.requestDevice(option);

        if (devices.length > 0) {
            this.device = devices[0];
            if (this.device != undefined) {

                if (!this.device.opened) {
                    await this.device.open();
                }

                if (this.device.opened) {
                    this.state.deviceName = this.device.productName;
                    this.state.connectType = ConnectionType.USB;
                    this.state.connectionEvent = ConnectionEventEnum.Open;
                    this.state.productId = this.device.productId;

                    for (item in KeyboardDefineList) {
                        if (this.device.vendorId == KeyboardDefineList[item].vendorId && 
                            this.device.productId == KeyboardDefineList[item].productId) {
                            this.keyboardDefine = KeyboardDefineList[item];
                            break;
                        }
                    }

                    if (this.keyboardDefine == null || this.keyboardDefine == undefined) {
                        await this.close();
                        this.dispatchEvent(new KeyboardEvent("NotSupport", this));
                        return;
                    }

                    this.protocol = await this.keyboardDefine.protocol(this.state, this.device);

                    this.loadDefaultValue(this.state.keyTableData, this.state.lightInfo);
                    
                    const connectionEventCallback = (event: HIDConnectionEvent) => {
                        event.device.close();
                        this.protocol?.destroy();
                        this.state.ConnectionStatus = ConnectionStatusEnum.Disconnected;
                        this.state.connectionEvent = ConnectionEventEnum.Disconnect;
                        this.dispatchEvent(new KeyboardEvent("connection", this));
                        this.hid?.removeEventListener("disconnect", connectionEventCallback, false);
                        this.device = undefined;
                        this.protocol = undefined;
                    };

                    this.hid.addEventListener("disconnect", connectionEventCallback, false);
                    this.dispatchEvent(new KeyboardEvent("connection", this));
                }
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
            this.keyboardDefine = undefined;
            this.device = undefined;
            this.protocol = undefined;
            this.dispatchEvent(new KeyboardEvent("connection", this)); 
        }
    }

    loadDefaultValue(keyTableDatas: Record<number, Record<number, Array<KeyTableData>>>, lightInfo: LightInfo) {
        var l:any, t:any, i:any;
        if (this.device != undefined && this.keyboardDefine != undefined) {
            for (t in this.keyboardDefine.keyMatrixTable) {
                let table = this.keyboardDefine.keyMatrixTable[t];
                if (!keyTableDatas.hasOwnProperty(table)) {
                    keyTableDatas[table] = {};
                }

                for (l in this.keyboardDefine.keyMatrixLayer) {
                    let layer = this.keyboardDefine.keyMatrixLayer[l];
                    if (!keyTableDatas[table].hasOwnProperty(layer)) {
                        keyTableDatas[table][layer] = [];
                    }

                    let layout = keyTableDatas[table][layer];
                    if (layout.length > 0) {
                        layout.splice(0, layout.length);
                    }
                
                    for (i = 0; i < this.keyboardDefine.keyLayout[table][layer].length; i++) {
                        let code = this.keyboardDefine.keyLayout[table][layer][i];
                        let key: KeyTableData = {
                            keyStr: this.keyboardDefine.keyText[code],
                            keyCode: code,
                            index: i,
                            keyMappingData: {
                                keyStr: this.keyboardDefine.keyText[code],
                                keyCode: code,
                                keyMappingType: KeyMappingType.KeyBoard,
                                keyMappingPara: 0,
                                keyRaw: code
                            }
                        }
                        layout.push(key);
                    }
                }
            }

            if (lightInfo.lightEffects.length > 0) {
                lightInfo.lightEffects.splice(0, this.state.lightInfo.lightEffects.length);
            }

            for (i = 0; i < this.keyboardDefine.lightEffects.length; i++) {
                let tmp: LightEffect = {
                    effect: this.keyboardDefine.lightEffects[i].effect,
                    speed: this.keyboardDefine.lightEffects[i].speed,
                    brightness: this.keyboardDefine.lightEffects[i].brightness,
                    color: this.keyboardDefine.lightEffects[i].color,
                    mixColor: this.keyboardDefine.lightEffects[i].mixColor,
                    sleep: this.keyboardDefine.lightEffects[i].sleep
                }
                lightInfo.lightEffects.push(tmp);
            }
        }
    }
}

declare class KeyboardEvent extends CustomEvent<Keyboard> {
    constructor(type: string, keyboard: Keyboard);
    public readonly keyboard: Keyboard;
}

export const keyboard: Keyboard = new Keyboard();