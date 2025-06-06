import type { IPacket } from "@/mouse/beiying/interface";
import { Packet_Big_Report } from "@/mouse/beiying/rk_k3/packets/packet";

export const MACRO_BYTES_PER_PACKET = 0x19;

export class SetMacroDataPacket extends Packet_Big_Report {

    macroData?: DataView;
    packetIndex: number = 0;
    packetCount: number = 0;
    macroCrc: number = 0;

    constructor() {
        super(0x50);
        this.setReport[1] = this.fixVal;
        this.setReport[2] = this.dataLength;
        this.setReport[5] = this.cmdId;
    }

    // Macro data
    setPayload(buffer: DataView) : IPacket {
        this.payloadLength = ((this.packetIndex + 1) * MACRO_BYTES_PER_PACKET) > buffer.byteLength ? buffer.byteLength - (this.packetIndex * MACRO_BYTES_PER_PACKET) : MACRO_BYTES_PER_PACKET;

        this.setReport[3] = this.sn;
        this.setReport[4] = this.device;
        this.setReport[6] = this.rfSn;
        this.setReport[7] = this.payloadLength;
        this.setReport[8] = this.opCodeId;
        
        if (this.packetIndex % 40 == 0) this.macroCrc = 0;

        for (let i = 0; i < MACRO_BYTES_PER_PACKET; i++) {
            let index = i + (this.packetIndex * MACRO_BYTES_PER_PACKET);
            if (index < buffer.byteLength) {
                this.setReport[i + 8] = buffer.getUint8(index);
                this.macroCrc = this.macroCrc + buffer.getUint8(index);
            } else {
                this.setReport[i + 8] = 0x00;
            }
            
        }

        this.setReport[0] = this.crc();

        return this;
    }
}