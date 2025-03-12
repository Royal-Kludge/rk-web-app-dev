import type { IPacket } from "../interface";

export const PROFILE_LENGTH: number = 128;
export const LED_COLOR_COUNT: number = 126;
export const LED_COLOR_LENGTH: number = 3;
export const LED_EFFECT_COLOR_COUNT: number = 7;
export const LED_EFFECT_COUNT: number = 20;
export const KEY_MAXTRIX_LINE: number = 6;
export const KEY_MAXTRIX_COLOUMN: number = 21;
export const PACKET_HEAD_LENGTH: number = 7;
export const MACRO_PER_BLOCK_LENGTH: number = 512;
export const MACRO_MAX_LENGTH: number = 4096;
export const REPORT_ID_LENGTH: number = 1;
export const REPORT_ID_USB: number = 0x03;
export const REPORT_ID_DONGLE: number = 0x13;
export const REPORT_PAYLOAD_LENGTH: number = 0x0E;
export const REPORT_MAX_RETRY: number = 0x0A;
export const REPORT_ID_POPUP: number = 0x09;
export const POPUP_CMD_ID: number = 0xFA;

/**
 * Abstract class of packet base
 */
export abstract class Packet_Usb implements IPacket {
    fixVal: number = 0x50;
    sn: number;
    cmdId: number;
    dataOffset: number;
    dataLength: number;

    setReport: Uint8Array;

    constructor(cmdId: number) {
        this.cmdId = cmdId;
        this.sn = 0;
        this.dataOffset = 0;
        this.dataLength = 0;

        this.setReport = new Uint8Array(64);
    }

    fromReportData(buffer: DataView) : IPacket {
        this.dataLength = buffer.getUint8(3);

        return this;
    }

    crc(): number {
        let crc = 0x00;
        let i: any;
        for (i = 1; i < this.setReport.length - 1; i++) {
            crc = crc + this.setReport[i];
        }

        return crc & 0xFF;
    }
}