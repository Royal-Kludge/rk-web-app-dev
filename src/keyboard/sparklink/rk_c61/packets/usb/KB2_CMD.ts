import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD extends Packet {

    order: OrderTypeEnum;
    arg: number;

    constructor(callback: (event: any) => void) {
        super(0x00, callback);
        this.len = 0x02;

        this.cmdBuffer = new Uint8Array(4);

        this.order = OrderTypeEnum.GetProtoVer;
        this.arg = 0xff;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = this.order;
            this.cmdBuffer[1] = this.arg;
            this.cmdBuffer[2] = 0xff;
            this.cmdBuffer[3] = 0xff;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            let index = 1;
            const order: KeyDefineEnum = this.recivedBuffer.getUint8(index++);
            const s_arg = new Uint8Array(this.recivedBuffer.buffer.slice(2, this.len));

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { order: order, s_arg: s_arg }
            }));
        }
    }
}