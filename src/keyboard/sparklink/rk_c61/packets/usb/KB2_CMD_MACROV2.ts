import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Action, ActionType } from "@/keyboard/sparklink/macros";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_MACROV2 extends Packet {

    rw: RWTypeEnum;
    actions?: Array<Action | null>;
    count: number = 0;
    offset: number = 0;

    constructor(callback: (event: any) => void) {
        super(0x20, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(58);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.actions != undefined) {
            let index = 0;
            this.cmdBuffer[index++] = this.rw;
            this.cmdBuffer[index++] = this.offset & 0xff;
            this.cmdBuffer[index++] = (this.offset >> 8) & 0xff;
            this.cmdBuffer[index++] = this.count;

            for (let i = 0; i < this.actions.length; i++) {
                let action = this.actions[i];
                if (action != null) {
                    this.cmdBuffer[index++] = action.key & 0xff;
                    this.cmdBuffer[index++] = (action.key >> 8) & 0xff;

                    let data = 0;
                    let prefix = action.action == ActionType.Up ? 0x08 : 0x01;
                    data |= prefix << 24;
                    data |= action.delay & 0x00ffffff;
                    
                    this.cmdBuffer[index++] = data & 0xff;
                    this.cmdBuffer[index++] = (data >> 8) & 0xff;
                    this.cmdBuffer[index++] = (data >> 16) & 0xff;
                    this.cmdBuffer[index++] = (data >> 24) & 0xff;
                } else {
                    this.cmdBuffer[index++] = 0x00;
                    this.cmdBuffer[index++] = 0x00;
                    this.cmdBuffer[index++] = 0x00;
                    this.cmdBuffer[index++] = 0x00;
                    this.cmdBuffer[index++] = 0x00;
                    this.cmdBuffer[index++] = 0x00;
                }
            }

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            detail: { cmd: 0x20, errCode: this.errCode} 
        }));
    }
}