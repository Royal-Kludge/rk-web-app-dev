import type { Device } from "./device";
import { ConnectionEventEnum, DeviceType, ProtocolType } from "./enum";
import type { HidDeviceDefine } from "./interface";
import { DeviceDefineList } from "./state";
import { keyboard as keyboard_beiying } from "@/keyboard/beiying/keyboard";
import { keyboard as keyboard_sparklink } from "@/keyboard/sparklink/keyboard";
import { mouse as mouse_beiying } from "@/mouse/beiying/mouse";

/**
 * Main class.
 */
export class HidConnection extends EventTarget {

    hidDevideDefine?: HidDeviceDefine;
    hidDevice?: Device;

    /** Internal WebHID device */
    device?: HIDDevice;

    /** WebHid object */
    hid?: HID;

    devices: Array<HIDDevice>;

    /** Is the hid feature available */
    isHidAvailable: boolean;

    constructor() {
        super();
        
        this.devices = new Array<HIDDevice>();

        if (!navigator.hid || !navigator.hid.requestDevice) {
            this.isHidAvailable = false;
            //throw new Error('WebHID not supported by browser or not available.')
        } else {
            this.hid = navigator.hid;
            this.isHidAvailable = true;

            this.hid.addEventListener("disconnect", async (event: HIDConnectionEvent) => {
                if (this.hidDevice != undefined && this.hidDevice.device != undefined &&
                    (this.hidDevice.device == event.device || 
                    (this.hidDevice.device.productId == event.device.productId && this.hidDevice.device.vendorId == event.device.vendorId))) {
                    await this.hidDevice.close();
                }
            }, false);

            const callback = async (event: Event) => {
                let device = event.currentTarget as Device

                if (device != undefined && device.deviceState != undefined &&
                    (device.deviceState.connectionEvent == ConnectionEventEnum.Disconnect || device.deviceState.connectionEvent == ConnectionEventEnum.Close)) {
                    this.device = undefined;
                    this.hidDevice = undefined;
                    this.hidDevideDefine = undefined;
                }
            };

            keyboard_beiying.addEventListener("connection", callback);
            keyboard_sparklink.addEventListener("connection", callback);
            mouse_beiying.addEventListener("connection", callback);
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
        for (item in DeviceDefineList) {
            let filters: HIDDeviceFilter = { 
                vendorId: DeviceDefineList[item].vendorId, 
                productId: DeviceDefineList[item].productId,
                usagePage: DeviceDefineList[item].usagePage, 
                usage: DeviceDefineList[item].usage 
            };
            option.filters.push(filters);
        }

        if (this.hid == null) {
            return;
        }

        const devices = await this.hid.requestDevice(option);

        if (devices.length > 0) {
            this.device = devices[0];
            if (this.device != undefined) {
                
                for (item in DeviceDefineList) {
                    if (this.device.vendorId == DeviceDefineList[item].vendorId && 
                        this.device.productId == DeviceDefineList[item].productId) {
                        this.hidDevideDefine = DeviceDefineList[item];

                        switch (this.hidDevideDefine.deviceType) {
                            case DeviceType.Keyboard:
                                switch (this.hidDevideDefine.protocolType) {
                                    case ProtocolType.BeiYing:
                                        this.hidDevice = keyboard_beiying;
                                        break;
                                    case ProtocolType.SparkLink:
                                        this.hidDevice = keyboard_sparklink;
                                        break;
                                }
                                this.hidDevice.device = this.device;
                                this.hidDevice.hid = this.hid;
                                break;
                            case DeviceType.Mouse:
                                this.hidDevice = mouse_beiying;
                                this.hidDevice.device = this.device;
                                this.hidDevice.hid = this.hid;
                                break;
                        }
                        break;
                    }
                }

            }
        }
    }
}

export const hidConnection: HidConnection = new HidConnection();