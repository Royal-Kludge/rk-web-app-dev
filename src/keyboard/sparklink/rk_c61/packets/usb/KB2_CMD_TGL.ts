import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { MTInfo, IPacket, TGLInfo } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";
import tool from "@/keyboard/sparklink/tool";
import type { AdvKeyTGL } from "../../AdvKeys";

export class KB2_CMD_TGL extends Packet {

    rw: RWTypeEnum;
    keys?: Array<KeyDefineEnum>;
    tglInfos?: Array<TGLInfo>;
    version?: string;

    constructor(callback: (event: any) => void) {
        super(0x25, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.keys != undefined && this.tglInfos != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            if (tool.isFeatureSupported('advancedKeyV2', this.version)) {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.tglInfos[i].DKS & 0xff;
                    this.cmdBuffer[index++] = (this.tglInfos[i].DKS >> 8) & 0xff;
                    this.cmdBuffer[index++] = this.tglInfos[i].delay / 10;
                }
            } else {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.tglInfos[i].DKS;
                    this.cmdBuffer[index++] = this.tglInfos[i].delay / 10;
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
            detail: { cmd: 0x25, errCode: this.errCode} 
        }));
    }
}