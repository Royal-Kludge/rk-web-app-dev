import type { IPacket } from "@/keyboard/interface";
import { Packet_Dongle_Get } from "@/keyboard/rk_l87/packets/dongle/getPacket";
import { Macros } from "../../macros";

export class GetMacrosPacket extends Packet_Dongle_Get {

    block: number;

    constructor(callback: (event: any) => void) {
        super(0x43, callback);
        this.block = 0;
    }

    command(): Uint8Array {
        super.command();

        this.setReport[3] = (0x0F & this.dataLength) | 0x02;
        this.setReport[4] = 512 >> 8;
        this.setReport[5] = 512 & 0x00FF;
        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        if (this.packageNum - 1 == this.packageIndex) {
            if (this.buffer != undefined) {
                this.getReport = new DataView(this.buffer.buffer);
                if (this.getReport.byteLength >= 4) {
                    let marcros = Macros.deserialize(this.getReport);
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: marcros }));
                }
            }
        }

        return this;
    }
}