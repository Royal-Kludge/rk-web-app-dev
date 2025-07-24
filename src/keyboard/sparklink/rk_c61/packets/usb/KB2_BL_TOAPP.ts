import { BL_Controls, ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_BL_TOAPP extends Packet {

    size: number = 0;
    crc: number = 0;

    constructor(callback: (event: any) => void) {
        super(0x0b, callback);
        this.len = 0x0a;

        this.cmdBuffer = new Uint8Array(10);
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

            this.cmdBuffer[index++] = this.crc & 0xff; // 低位字节
            this.cmdBuffer[index++] = (this.crc >> 8) & 0xff; // 次低位字节

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            detail: { cmd: 0x0a, errCode: this.errCode} 
        }));
    }
}