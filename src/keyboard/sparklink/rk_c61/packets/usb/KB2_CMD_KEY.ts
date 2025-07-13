import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_KEY extends Packet {

    rw: RWTypeEnum;
    layouts?: Array<LayoutTypeEnum>;
    keys?: Array<KeyDefineEnum>;
    values?: Array<number>;

    constructor(callback: (event: any) => void) {
        super(0x23, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(57);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.layouts != undefined &&
            this.keys != undefined && this.values != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            for (let i = 0; i < this.keys.length; i++) {
                this.cmdBuffer[index++] = this.keys[i];
                this.cmdBuffer[index++] = this.layouts[i];
                this.cmdBuffer[index++] = this.values[i] & 0xff; // 低字节
                this.cmdBuffer[index++] = (this.values[i] >> 8) & 0xff; // 高字节
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
                const layout = this.recivedBuffer.getUint8(index++);
                const value = (this.recivedBuffer.getUint8(index + 1) << 8) | this.recivedBuffer.getUint8(index);
                index += 2;

                if (keyValue != 0 && keyValue != 255) {
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { keyValue: keyValue, layout: layout, value: value } 
                    }));
                }
            }
        }
    }
}