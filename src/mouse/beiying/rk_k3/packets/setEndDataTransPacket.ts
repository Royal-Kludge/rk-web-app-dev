import type { IPacket } from "@/mouse/beiying/interface";
import { Packet_Big_Report } from "@/mouse/beiying/rk_k3/packets/packet";

export class setEndDataTransPacket extends Packet_Big_Report {

    constructor() {
        super(0x5E);
        this.setReport[1] = this.fixVal;
        this.setReport[2] = this.dataLength;
        this.setReport[5] = this.cmdId;
    }

    // 5E
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