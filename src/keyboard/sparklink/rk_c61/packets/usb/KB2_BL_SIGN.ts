import { BL_Controls, ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_BL_SIGN extends Packet {

    unlock: BL_Controls = BL_Controls.BL_NONE;
    sn?: Uint8Array;
    data?: Uint8Array;

    constructor(callback: (event: any) => void) {
        super(0x08, callback);
        this.len = 0x27;

        this.cmdBuffer = new Uint8Array(39);
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.sn != undefined && this.data != undefined) {
            let index = 0x00;
            this.cmdBuffer[index++] = this.unlock;

            this.cmdBuffer[index++] = 0x10;
            for (let i = 0; i < 16; i++) {
                this.cmdBuffer[index++] = this.data[i];
            }

            this.cmdBuffer[index++] = 0x10;
            for (let i = 0; i < 16; i++) {
                this.cmdBuffer[index++] = this.sn[i];
            }

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
            const unlock: BL_Controls = this.recivedBuffer.getUint8(1);
            const signture = new Uint8Array(this.recivedBuffer.buffer.slice(3, 16 + 3));

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { isSuccess: this.errCode == ErrorCodeEnum.Success, unlock: unlock, signture: signture }
            }));
        }
    }
}