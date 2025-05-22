import type { IPacket } from "../../interface";

export const REPORT_ID_LENGTH: number = 1;
export const REPORT_ID_USB: number = 0x06;
export const REPORT_MAX_RETRY: number = 0x0A;

/**
 * Abstract class of packet base
 */
export abstract class Packet_Usb implements IPacket {
    cmdId: number;

    constructor(cmdId: number) {
        this.cmdId = cmdId;
    }

    fromReportData(buffer: DataView) : IPacket {
        return this;
    }
}