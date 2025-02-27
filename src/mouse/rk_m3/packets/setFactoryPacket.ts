import type { IPacket } from "@/mouse/interface";
import { Packet_Usb } from "@/mouse/rk_m3/packets/packet";

export class SetFactoryPacket extends Packet_Usb {

    constructor() {
        super(0x06);
        this.dataLength = 0x01;
        this.dataOffset = 0x00;
        //this.setReport = new Uint8Array(64);
        this.setReport[0] = 0x00;
        this.setReport[1] = this.fixVal;
        this.setReport[2] = this.dataLength + 2;
        this.setReport[3] = this.sn;
        this.setReport[4] = this.cmdId;
        this.setReport[5] = this.dataOffset;
    }

    setPayload(buffer: DataView) : IPacket {
        for (let i = 0; i < buffer.byteLength; i++) {
            this.setReport[i + 6] = buffer.getUint8(i);
        }

        this.setReport[0] = this.crc();

        return this;
    }
}