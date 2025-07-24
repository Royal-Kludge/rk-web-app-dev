import { BL_Controls, ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_BL_ERASE extends Packet {

    size: number = 0;

    constructor(callback: (event: any) => void) {
        super(0x09, callback);
        this.len = 0x09;

        this.cmdBuffer = new Uint8Array(9);
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            let index = 0x00;

            this.cmdBuffer[index++] = 0x00;
            this.cmdBuffer[index++] = 0x00;
            this.cmdBuffer[index++] = 0x00;
            this.cmdBuffer[index++] = 0x00;

            this.cmdBuffer[index++] = this.size & 0xff; // 低位字节
            this.cmdBuffer[index++] = (this.size >> 8) & 0xff; // 次低位字节
            this.cmdBuffer[index++] = (this.size >> 16) & 0xff; // 次高位字节
            this.cmdBuffer[index++] = (this.size >> 24) & 0xff; // 高位字节

            this.cmdBuffer[index++] = 0xff;
            this.cmdBuffer[index++] = 0xff;
            this.cmdBuffer[index++] = 0xff;
            this.cmdBuffer[index++] = 0xff;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len) {
            const process = this.recivedBuffer.getUint8(1);

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { isSuccess: this.errCode == ErrorCodeEnum.Success, process: process }
            }));
        }
    }
}