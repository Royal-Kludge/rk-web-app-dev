import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket, LedColor } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_KRGB extends Packet {

    rw: RWTypeEnum;
    keys?: Array<KeyDefineEnum>;
    r?: Array<number>;
    g?: Array<number>;
    b?: Array<number>;
    isLastCmd: boolean = false;

    constructor(callback: (event: any) => void) {
        super(0x2a, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(57);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.keys != undefined && this.r != undefined && this.g != undefined && this.b != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            for (let i = 0; i < this.keys.length; i++) {
                this.cmdBuffer[index++] = this.keys[i];
                this.cmdBuffer[index++] = this.r[i];
                this.cmdBuffer[index++] = this.g[i];
                this.cmdBuffer[index++] = this.b[i];
            }

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            let index = 1;

            for (let i = 0; i < 14; i++) {
                const keyValue = this.recivedBuffer.getUint8(index++);
                const R = this.recivedBuffer.getUint8(index++);
                const G = this.recivedBuffer.getUint8(index++);
                const B = this.recivedBuffer.getUint8(index++);
                if (keyValue !== 0) {
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { key: keyValue, r: R, g: G, b: B } 
                    }));
                }
            }

            if (this.isLastCmd) {
                this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                    detail: { isLastCmd: true } 
                }));
                this.isLastCmd = false;
            }
        }
    }
}