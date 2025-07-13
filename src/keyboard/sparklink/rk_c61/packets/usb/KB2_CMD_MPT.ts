import type { KeyDefineEnum } from "@/common/keyCode";
import { RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { MPTInfo } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";
import tool from "@/keyboard/sparklink/tool";

export class KB2_CMD_MPT extends Packet {

    rw: RWTypeEnum;
    keys?: Array<KeyDefineEnum>;
    mptInfos?: Array<MPTInfo>;
    version?: string;

    constructor(callback: (event: any) => void) {
        super(0x27, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.keys != undefined && this.mptInfos != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            if (tool.isFeatureSupported('advancedKeyV2', this.version)) {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[0] & 0xff;
                    this.cmdBuffer[index++] = (this.mptInfos[i].DKS[0] >> 8) & 0xff;
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[1] & 0xff;
                    this.cmdBuffer[index++] = (this.mptInfos[i].DKS[1] >> 8) & 0xff;
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[2] & 0xff;
                    this.cmdBuffer[index++] = (this.mptInfos[i].DKS[2] >> 8) & 0xff;

                    let db1 = this.mptInfos[i].DB[0] * 1000;
                    let db2 = this.mptInfos[i].DB[1] * 1000;
                    let db3 = this.mptInfos[i].DB[2] * 1000;

                    this.cmdBuffer[index++] = db1 & 0xff;
                    this.cmdBuffer[index++] = (db1 >> 8) & 0xff;
                    this.cmdBuffer[index++] = db2 & 0xff;
                    this.cmdBuffer[index++] = (db2 >> 8) & 0xff;
                    this.cmdBuffer[index++] = db3 & 0xff;
                    this.cmdBuffer[index++] = (db3>> 8) & 0xff;
                }
            } else {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[0];
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[1];
                    this.cmdBuffer[index++] = this.mptInfos[i].DKS[2];
                    let db1 = this.mptInfos[i].DB[0] * 1000;
                    let db2 = this.mptInfos[i].DB[1] * 1000;
                    let db3 = this.mptInfos[i].DB[2] * 1000;

                    this.cmdBuffer[index++] = db1 & 0xff;
                    this.cmdBuffer[index++] = (db1 >> 8) & 0xff;
                    this.cmdBuffer[index++] = db2 & 0xff;
                    this.cmdBuffer[index++] = (db2 >> 8) & 0xff;
                    this.cmdBuffer[index++] = db3 & 0xff;
                    this.cmdBuffer[index++] = (db3>> 8) & 0xff;
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
            detail: { cmd: 0x27, errCode: this.errCode} 
        }));
    }
}