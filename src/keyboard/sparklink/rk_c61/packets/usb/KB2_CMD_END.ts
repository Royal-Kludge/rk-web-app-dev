import type { KeyDefineEnum } from "@/common/keyCode";
import { RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { ENDInfo } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";
import tool from "@/keyboard/sparklink/tool";

export class KB2_CMD_END extends Packet {

    rw: RWTypeEnum;
    keys?: Array<KeyDefineEnum>;
    endInfos?: Array<ENDInfo>;
    version?: string;

    constructor(callback: (event: any) => void) {
        super(0x28, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.keys != undefined && this.endInfos != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            if (tool.isFeatureSupported('advancedKeyV2', this.version)) {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.endInfos[i].DKS & 0xff;
                    this.cmdBuffer[index++] = (this.endInfos[i].DKS >> 8) & 0xff;
                }
            } else {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.endInfos[i].DKS;
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
            detail: { cmd: 0x28, errCode: this.errCode} 
        }));
    }
}