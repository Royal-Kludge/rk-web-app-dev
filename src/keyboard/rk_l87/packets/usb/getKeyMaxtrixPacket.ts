import type { IPacket } from "@/keyboard/interface";
import { Packet_Usb, KEY_MAXTRIX_LINE, KEY_MAXTRIX_COLOUMN, PACKET_HEAD_LENGTH } from "@/keyboard/rk_l87/packets/packet";
import { KeyMaxtrix, MaxtrixLayer, MaxtrixTable } from "@/keyboard/rk_l87/keyMaxtrix";

export class GetKeyMaxtrixPacket extends Packet_Usb {

    setReport: Uint8Array;
    getReport?: DataView;
    keyMaxtrix?: KeyMaxtrix;

    constructor(layer: MaxtrixLayer,  table: MaxtrixTable, board: number) {
        super(0x83);
        this.cmdVal = 0x00;
        this.dataLength = KEY_MAXTRIX_LINE * KEY_MAXTRIX_COLOUMN * 4;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[1] = this.cmdVal | layer | table;
        this.setReport[2] = board;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength & 0x00FF;
        this.setReport[6] = this.dataLength >> 8;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        this.getReport = new DataView(buffer.buffer.slice(1, this.dataLength + PACKET_HEAD_LENGTH + 1));
        this.keyMaxtrix = KeyMaxtrix.fromReportData(this.getReport);

        return this;
    }
}