import { BL_Controls, ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_BL_WRITE extends Packet {

    addr: number = 0;
    size: number = 0;
    data?: Uint8Array;

    constructor(callback: (event: any) => void) {
        super(0x0c, callback);
        this.len = 0xfa;
        this.setReport = new Uint8Array(256);
        this.cmdBuffer = new Uint8Array(250);
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            let index = 0x00;

            this.cmdBuffer[index++] = this.addr & 0xff; // 低位字节
            this.cmdBuffer[index++] = (this.addr >> 8) & 0xff; // 次低位字节
            this.cmdBuffer[index++] = (this.addr >> 16) & 0xff; // 次高位字节
            this.cmdBuffer[index++] = (this.addr >> 24) & 0xff; // 高位字节

            this.cmdBuffer[index++] = this.size & 0xff; // 低位字节
            this.cmdBuffer[index++] = (this.size >> 8) & 0xff; // 次低位字节

            if (this.data != undefined) {
                for (let i = 0; i < 244; i++) {
                    if (this.data.length == i) break;
                    this.cmdBuffer[index++] = this.data[i];
                }
            }

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len) {
            const addr = this.recivedBuffer.getUint32(1, true);
            const size = this.recivedBuffer.getUint16(5, true);

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { isSuccess: this.errCode == ErrorCodeEnum.Success, addr: addr, size: size }
            }));
        }
    }
}