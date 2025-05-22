import { KeyMappingType } from '@/common/enum'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from '@/device/enum'
import type { HidDeviceDefine, IHidDevice } from '@/device/interface';
import { Device } from '@/device/device';

const REPORT_ID_DONGLE: number = 0x13;

const COMMAND_ID: {
    ActivelyReport: number;
    GetDongleStatus: number;
    GetPassword: number;
} = {
    ActivelyReport: 0x0A,
    GetDongleStatus: 0x07,
    GetPassword: 0x05,
}

export const RK_DONGLE_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnPasswordGotten: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnPasswordGotten: 'OnPasswordGotten',
}

/**
 * Main class.
 */
export class Keyboard extends Device {

    constructor() {
        super();
    }

    async init(deviceDefine: HidDeviceDefine) {

    }
    /**
     * Close current opened device
     */
    async close() {

    }

}

declare class KeyboardEvent extends CustomEvent<Keyboard> {
    constructor(type: string, keyboard: Keyboard);
    public readonly keyboard: Keyboard;
}

export const keyboard: Keyboard = new Keyboard();