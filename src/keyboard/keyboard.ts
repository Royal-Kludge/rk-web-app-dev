import type { IProtocol, KeyTableData, LightEffect, LightInfo, KeyboardDefine } from './interface'
import { ConnectionType, ConnectionEventEnum } from './enum'
import { defaultState, KeyboardDefineList } from './state'

/**
 * Main class.
 */
export class Keyboard extends EventTarget {
    /** Internal WebHID device */
    device?: HIDDevice;

    /** Raw contents of the last HID Report sent by the controller. */
    lastReport?: ArrayBuffer;
    /** Raw contents of the last HID Report sent to the controller. */
    lastSentReport?: ArrayBuffer;

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
        if (this.device && this.device.opened) return;

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

        const devices = await this.hid.requestDevice(option)

        if (devices.length > 0) {
            this.device = devices[0];
            await this.device.open();

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

                this.protocol = this.keyboardDefine.protocol(this.state, this.device);

                this.loadDefaultValue(this.state.keyTableData, this.state.lightInfo);

                this.device.oninputreport = (e: HIDInputReportEvent) => this.processKeyboardReport(e);
                const connectionEventCallback = (event: HIDConnectionEvent) => {
                    event.device.close();
                    this.device = undefined;
                    this.state.connectionEvent = ConnectionEventEnum.Disconnect;
                    this.dispatchEvent(new KeyboardEvent("connection", this));
                    this.hid?.removeEventListener("disconnect", connectionEventCallback, false);
                };

                this.hid.addEventListener("disconnect", connectionEventCallback, false);
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
            this.state.connectionEvent = ConnectionEventEnum.Close;
            this.keyboardDefine = undefined;
            this.device = undefined;
            this.dispatchEvent(new KeyboardEvent("connection", this)); 
        }
    }

    loadDefaultValue(keyTableDatas: Array<KeyTableData>, lightInfo: LightInfo) {
        var item: any;
        if (this.device != undefined && this.keyboardDefine != undefined) {
            if (keyTableDatas.length > 0) {
                keyTableDatas.splice(0, this.state.keyTableData.length);
            }

            for (item in this.keyboardDefine.keyLayout) {
                let code = this.keyboardDefine.keyLayout[item];
                let key: KeyTableData = {
                    key: this.keyboardDefine.keyText[code],
                    keyCode: code,
                    index: item,
                    selected: false,
                    keyMappingData: {
                        key: this.keyboardDefine.keyText[code],
                        keyCode: code,
                    }
                }
                keyTableDatas.push(key);
            }

            if (lightInfo.lightEffects.length > 0) {
                lightInfo.lightEffects.splice(0, this.state.lightInfo.lightEffects.length);
            }

            for (item in this.keyboardDefine.lightEffects) {
                let tmp: LightEffect = {
                    effect: this.keyboardDefine.lightEffects[item].effect,
                    speed: this.keyboardDefine.lightEffects[item].speed,
                    brightness: this.keyboardDefine.lightEffects[item].brightness,
                    color: this.keyboardDefine.lightEffects[item].color,
                    mixColor: this.keyboardDefine.lightEffects[item].mixColor,
                    sleep: this.keyboardDefine.lightEffects[item].sleep
                }
                lightInfo.lightEffects.push(tmp);
            }
        }
    }

    /**
     * Parses a report sent from the keyboard and updates the state.
     * 
     * This function is called internally by the library each time a report is received.
     * 
     * @param report - HID Report sent by the keyboard.
     */
    private async processKeyboardReport(report: HIDInputReportEvent) {
        const { data } = report
        this.lastReport = data.buffer

        console.log(`Reviced [${this.lastReport?.byteLength}] bytes report data`);
    }
}

declare class KeyboardEvent extends CustomEvent<Keyboard> {
    constructor(type: string, keyboard: Keyboard);
    public readonly keyboard: Keyboard;
}

export const keyboard: Keyboard = new Keyboard();