import type { IPacket } from "@/keyboard/interface";
import { Packet_Dongle } from "@/keyboard/rk_l87/packets/packet";

export class GetDongleStatusPacket extends Packet_Dongle {

    setReport: Uint8Array;
    isConnected: boolean;

    constructor() {
        super(0x07);
        this.cmdVal = 0x00;
        this.dataLength = 0x0E;
        this.setReport = new Uint8Array(17);
        this.setReport[0] = this.cmdId;
        this.setReport[1] = 0x01;

        this.isConnected = false;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        
        if (buffer.byteLength >= this.dataLength) {
            this.isConnected = buffer.getUint8(4) > 0;
        }

        return this;
    }
}