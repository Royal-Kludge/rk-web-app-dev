import { ErrorCodeEnum } from "../../enum";
import type { IPacket } from "../../interface";

export const REPORT_HEAD_LENGTH: number = 4;
export const REPORT_HEAD: number = 0x5C;
export const REPORT_LENGTH: number = 0x40;
export const REPORT_ID_LENGTH: number = 1;
export const REPORT_ID_USB: number = 0x00;
export const REPORT_MAX_RETRY: number = 0x0A;

/**
 * Abstract class of packet base
 */
export abstract class Packet extends EventTarget implements IPacket {

    setReport: Uint8Array;

    recivedBuffer?: DataView;
    cmdBuffer?: Uint8Array;

    head: number = 0x5c;
    len: number = 0x00;
    cmd: number;
    crc: number = 0x00;

    errCode: ErrorCodeEnum = ErrorCodeEnum.Success;

    callback?: (event: any) => void

    constructor(cmdId: number, callback: (event: any) => void) {
        super();
        this.cmd = cmdId;
        this.setReport = new Uint8Array(64);

        this.callback = callback;
        this.addEventListener('onReportDataRecvied', this.callback, false);
    }

    command(): Uint8Array {

        this.setReport[0] = this.head;
        this.setReport[1] = this.len;
        this.setReport[2] = this.cmd;

        if (this.cmdBuffer != undefined) {
            for (let i = 0; i < this.cmdBuffer.length; i++) {
                this.setReport[i + 3] = this.cmdBuffer[i];
            }
        }

        this.setReport[3] = this.CheckSum();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        this.recivedBuffer = undefined;
        this.len = buffer.getUint8(1);
        if (buffer.byteLength == this.len + REPORT_HEAD_LENGTH) {
            this.recivedBuffer = new DataView(buffer.buffer.slice(4, this.len + REPORT_HEAD_LENGTH));
            this.errCode = this.recivedBuffer.getUint8(0);
        }
    }

    async destroy(): Promise<void> {
        if (this.callback != undefined) {
            this.removeEventListener("inputreport", this.callback);
        }
    }

    CheckSum() : number {
        let checkSum = 0x35;
        
        checkSum += this.head;
        checkSum += this.len;
        checkSum += this.setReport[2];

        if (this.len > 0 && this.len <= 63 * 4) {
            checkSum += this.setReport[this.len + 4 - 1];
        }

        return checkSum;
    }
}