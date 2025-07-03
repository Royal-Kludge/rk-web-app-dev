import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_FAIL extends Packet {

    ackCmd?: number;
    sArg?: Uint8Array;

    constructor(callback: (event: any) => void) {
        super(0xFF, callback);
        this.len = 0x00;
    }

    command(): Uint8Array {
        super.command();
        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        this.ackCmd = undefined;
        this.sArg = undefined;

        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len) {
            this.ackCmd = this.recivedBuffer.getUint8(1);
            this.sArg = new Uint8Array(this.recivedBuffer.buffer.slice(2, this.len));

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { ackCmd: this.ackCmd, sArg: this.sArg} 
            }));
        }
    }
}