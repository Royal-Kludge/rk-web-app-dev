import type { IPacket } from "../../interface";

export const PROFILE_LENGTH: number = 128;
export const LED_COLOR_LENGTH: number = 3;
export const LED_EFFECT_COLOR_COUNT: number = 7;
export const LED_EFFECT_COUNT: number = 20;
export const KEY_MAXTRIX_LINE: number = 6;
export const KEY_MAXTRIX_COLOUMN: number = 21;
export const PACKET_HEAD_LENGTH: number = 7;
export const REPORT_ID_LENGTH: number = 1;
export const REPORT_ID_USB: number = 0x06;
export const REPORT_ID_DONGLE: number = 0x13;


/**
 * Abstract class of packet base
 */
export abstract class Packet_Usb implements IPacket {
    cmdId: number;
    cmdVal: number;
    packageNum: number;
    packageIndex: number;
    dataLength: number;

    constructor(cmdId: number) {
        this.cmdId = cmdId;
        this.cmdVal = 0;
        this.packageNum = 0;
        this.packageIndex = 0;
        this.dataLength = 0;
    }

    fromReportData(buffer: DataView) : IPacket {
        //this.cmdVal = buffer.getUint8(1);
        this.packageNum = buffer.getUint8(4);
        this.packageIndex = buffer.getUint8(5);
        this.dataLength = buffer.getUint8(6) | buffer.getUint8(7) << 8;

        return this;
    }
}

/**
 * Abstract class of packet base
 */
export abstract class Packet_Dongle implements IPacket {
    cmdId: number;
    cmdVal: number;
    packageNum: number;
    packageIndex: number;
    dataLength: number;
    crc: number;

    constructor(cmdId: number) {
        this.cmdId = cmdId;
        this.cmdVal = 0;
        this.packageNum = 0;
        this.packageIndex = 0;
        this.dataLength = 0;
        this.crc = 0;
    }

    fromReportData(buffer: DataView) : IPacket {
        //this.cmdVal = buffer.getUint8(1);
        // this.packageNum = buffer.getUint8(4);
        // this.packageIndex = buffer.getUint8(5);
        // this.dataLength = buffer.getUint8(6) | buffer.getUint8(7) << 8;

        return this;
    }
}