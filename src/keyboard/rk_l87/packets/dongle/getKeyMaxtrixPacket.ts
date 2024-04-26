import type { IPacket } from "@/keyboard/interface";
import { KEY_MAXTRIX_LINE, KEY_MAXTRIX_COLOUMN } from "@/keyboard/rk_l87/packets/packet";
import { Packet_Dongle_Get } from "@/keyboard/rk_l87/packets/dongle/getPacket";
import { KeyMaxtrix, MaxtrixLayer, MaxtrixTable } from "../../keyMaxtrix";

export class GetKeyMaxtrixPacket extends Packet_Dongle_Get {

    layer: MaxtrixLayer = MaxtrixLayer.NORMAL;
    table: MaxtrixTable = MaxtrixTable.WIN;

    constructor(callback: (event: any) => void) {
        super(0x41, callback);
    }

    command(): Uint8Array {
        super.command();

        this.setReport[2] = (0x7F & this.packageIndex) | (this.table << 7);
        this.setReport[3] = (0x0F & this.dataLength) | ((this.layer << 4) & 0x30) | ((this.board << 6) & 0xC0);
        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        if (this.packageNum - 1 == this.packageIndex) {
            if (this.buffer != undefined) {
                this.getReport = new DataView(this.buffer.buffer);
                if (this.getReport.byteLength >= KEY_MAXTRIX_LINE * KEY_MAXTRIX_COLOUMN) {
                    let keyMaxtrix = KeyMaxtrix.fromReportData(this.getReport);
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: keyMaxtrix }));
                }
            }
        }

        return this;
    }
}