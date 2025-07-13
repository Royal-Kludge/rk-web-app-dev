import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { DKSInfo, IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";
import tool from "@/keyboard/sparklink/tool";

export class KB2_CMD_DKS extends Packet {

    rw: RWTypeEnum;
    keys?: Array<KeyDefineEnum>;
    dksInfos?: Array<DKSInfo>;
    version?: string;

    constructor(callback: (event: any) => void) {
        super(0x26, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(15);

        this.rw = RWTypeEnum.Read;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined && this.keys != undefined && this.dksInfos != undefined) {
            this.cmdBuffer[0] = this.rw;
            let index = 1;
            if (tool.isFeatureSupported('advancedKeyV2', this.version)) {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];

                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[0] & 0xff;
                    this.cmdBuffer[index++] = (this.dksInfos[i].DKS[0] >> 8) & 0xff;

                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[1] & 0xff;
                    this.cmdBuffer[index++] = (this.dksInfos[i].DKS[1] >> 8) & 0xff;

                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[2] & 0xff;
                    this.cmdBuffer[index++] = (this.dksInfos[i].DKS[2] >> 8) & 0xff;

                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[3] & 0xff;
                    this.cmdBuffer[index++] = (this.dksInfos[i].DKS[3] >> 8) & 0xff;

                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[0];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[1];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[2];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[3];

                    let db = this.dksInfos[i].DB * 1000;
                    let db2 = this.dksInfos[i].DB2 * 1000;

                    this.cmdBuffer[index++] = db & 0xff;
                    this.cmdBuffer[index++] = (db >> 8) & 0xff;

                    this.cmdBuffer[index++] = db2 & 0xff;
                    this.cmdBuffer[index++] = (db2 >> 8) & 0xff;
                }
            } else {
                for (let i = 0; i < this.keys.length; i++) {
                    this.cmdBuffer[index++] = this.keys[i];
                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[0];
                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[1];
                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[2];
                    this.cmdBuffer[index++] = this.dksInfos[i].DKS[3];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[0];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[1];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[2];
                    this.cmdBuffer[index++] = this.dksInfos[i].TRPS[3];

                    let db = this.dksInfos[i].DB * 1000;
                    let db2 = this.dksInfos[i].DB2 * 1000;

                    this.cmdBuffer[index++] = db & 0xff;
                    this.cmdBuffer[index++] = (db >> 8) & 0xff;

                    this.cmdBuffer[index++] = db2 & 0xff;
                    this.cmdBuffer[index++] = (db2 >> 8) & 0xff;
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
            detail: { cmd: 0x26, errCode: this.errCode} 
        }));
    }
}