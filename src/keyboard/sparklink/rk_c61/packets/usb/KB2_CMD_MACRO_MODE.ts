import { KeyDefineEnum, type KeyCodeEnum } from "@/common/keyCode_sparklink";
import { ErrorCodeEnum, LayoutTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Action, ActionType } from "@/keyboard/sparklink/macros";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_MACRO_MODE extends Packet {

    rw: RWTypeEnum;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    index: number = 0;
    stepLen: number = 0;
    mode: number = 0;
    repeatConut: number = 0;
    delay: number = 0;

    constructor(callback: (event: any) => void) {
        super(0x21, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(57);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            let index = 0;
            this.cmdBuffer[index++] = this.rw;
            this.cmdBuffer[index++] = this.key;
            this.cmdBuffer[index++] = this.index & 0xff;
            this.cmdBuffer[index++] = (this.index >> 8) & 0xff;
            this.cmdBuffer[index++] = this.stepLen;
            this.cmdBuffer[index++] = this.mode;
            this.cmdBuffer[index++] = this.repeatConut & 0xff;
            this.cmdBuffer[index++] = (this.repeatConut >> 8) & 0xff;
            this.cmdBuffer[index++] = this.delay & 0xff;
            this.cmdBuffer[index++] = (this.delay >> 8) & 0xff;
            this.cmdBuffer[index++] = (this.delay >> 16) & 0xff;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            let key = this.recivedBuffer.getUint8(1);
            let index = this.recivedBuffer.getUint16(2, true);
            let mode = this.recivedBuffer.getUint8(5);
            let repeatCount = this.recivedBuffer.getUint16(6, true);
            let delay = this.recivedBuffer.getUint32(8, true);

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { key: key, index: index, mode: mode, repeatCount: repeatCount, delay: delay } 
            }));
        }
    }
}