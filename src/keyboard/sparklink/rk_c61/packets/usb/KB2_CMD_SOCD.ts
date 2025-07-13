import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket, SOCDInfo } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";
import tool from "@/keyboard/sparklink/tool";
import type { AdvKeyTGL } from "../../AdvKeys";

export class KB2_CMD_SOCD extends Packet {

    rw: RWTypeEnum;
    socdInfos?: Array<SOCDInfo>;
    version?: string;

    constructor(callback: (event: any) => void) {
        super(0x2C, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.socdInfos != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            for (let i = 0; i < this.socdInfos.length; i++) {
                this.cmdBuffer[index++] = this.socdInfos[i].DKS[0];
                this.cmdBuffer[index++] = this.socdInfos[i].DKS[1];
                this.cmdBuffer[index++] = this.socdInfos[i].DKSV[0] & 0xff;
                this.cmdBuffer[index++] = (this.socdInfos[i].DKSV[1] >> 8) & 0xff;
                this.cmdBuffer[index++] = this.socdInfos[i].DKSV[1] & 0xff;
                this.cmdBuffer[index++] = (this.socdInfos[i].DKSV[1] >> 8) & 0xff;
                this.cmdBuffer[index++] = this.socdInfos[i].type;
                this.cmdBuffer[index++] = this.socdInfos[i].mode;
                this.cmdBuffer[index++] = 0x00;
                this.cmdBuffer[index++] = 0x00;
            }

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);

        this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            detail: { cmd: 0x2C, errCode: this.errCode} 
        }));
    }
}