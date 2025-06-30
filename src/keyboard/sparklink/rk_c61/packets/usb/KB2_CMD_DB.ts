import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_DB extends Packet {

    rw: RWTypeEnum;
    globalTouchTravel: number;
    pressDead: number;
    releaseDead: number;

    constructor(callback: (event: any) => void) {
        super(0x29, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
        this.globalTouchTravel = 0x00;
        this.pressDead = 0x00;
        this.releaseDead = 0x00;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = this.rw;

            this.cmdBuffer[1] = 0x00;
            this.cmdBuffer[2] = 0x00;

            this.cmdBuffer[3] = this.globalTouchTravel & 0xff;
            this.cmdBuffer[4] = (this.globalTouchTravel >> 8) & 0xff;

            this.cmdBuffer[5] = this.pressDead & 0xff;
            this.cmdBuffer[6] = (this.pressDead >> 8) & 0xff;

            this.cmdBuffer[7] = this.releaseDead & 0xff;
            this.cmdBuffer[8] = (this.releaseDead >> 8) & 0xff;

            this.cmdBuffer[9] = 0x00;
            this.cmdBuffer[10] = 0x00;
            this.cmdBuffer[11] = 0x00;
            this.cmdBuffer[12] = 0x00;
            this.cmdBuffer[13] = 0x00;
            this.cmdBuffer[14] = 0x00;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            const globalTouchTravel: number = ((this.recivedBuffer.getUint8(4) << 8) | this.recivedBuffer.getUint8(3)) / 1000.0;
            const pressDead: number = ((this.recivedBuffer.getUint8(6) << 8) | this.recivedBuffer.getUint8(5)) / 1000.0;
            const releaseDead: number = ((this.recivedBuffer.getUint8(8) << 8) | this.recivedBuffer.getUint8(7)) / 1000.0;

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { globalTouchTravel: globalTouchTravel, pressDead: pressDead, releaseDead: releaseDead }
            }));
        }
    }
}