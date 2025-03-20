import type { IPacket } from "@/mouse/interface";
import { Packet_Big_Report } from "@/mouse/rk_m3/packets/packet";

export class SetStartDataTransPacket extends Packet_Big_Report {

    constructor() {
        super(0x44);
        this.setReport[1] = this.fixVal;
        this.setReport[2] = this.dataLength;
        this.setReport[5] = this.cmdId;
    }

    // 44 00 00 00 00 00 00 00 00 
    setPayload(buffer: DataView) : IPacket {
        this.payloadLength = buffer.byteLength;

        this.setReport[3] = this.sn;
        this.setReport[4] = this.device;
        this.setReport[6] = this.rfSn;
        this.setReport[7] = this.payloadLength;
        this.setReport[8] = this.opCodeId;
        
        for (let i = 0; i < buffer.byteLength; i++) {
            this.setReport[i + 8] = buffer.getUint8(i);
        }

        this.setReport[0] = this.crc();

        return this;
    }
}