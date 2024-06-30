import { Packet_Dongle_Set } from "@/keyboard/rk_l87/packets/dongle/setPacket";
import { MatrixTable } from "../../keyMatrix";
import { KeyMatrixLayer } from "@/keyboard/enum"

export class SetKeyMatrixPacket extends Packet_Dongle_Set {

    layer: KeyMatrixLayer = KeyMatrixLayer.Nomal;
    table: MatrixTable = MatrixTable.WIN;

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x01, callback, pktFinish);
    }

    command(): Uint8Array {
        super.command();

        this.setReport[2] = (0x7F & this.packageIndex) | (this.table << 7);
        this.setReport[3] = (0x0F & this.dataLength) | ((this.layer << 4) & 0x30) | ((this.board << 6) & 0xC0);
        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }
}