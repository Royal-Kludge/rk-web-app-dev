import type { IPacket } from "@/mouse/interface";
import { Packet_Usb } from "@/mouse/rk_m30/packets/packet";

export class GetFwVerPacket extends Packet_Usb {

    constructor() {
        super(0x05);
        this.cmdPara = 0x01;
        this.dataLength = 0x00;
        this.packageNum = 0x01;
        this.packageIndex = 0x00;
        this.setReport[0] = 0x00;
        this.setReport[1] = this.cmdId;
        this.setReport[2] = this.cmdPara;
        this.setReport[3] = this.packageNum;
        this.setReport[4] = this.packageIndex;
    }

    setPayload(buffer: DataView) : IPacket {
        this.setReport[5] = buffer.byteLength & 0x00FF;
        this.setReport[6] = buffer.byteLength >> 8;
        
        for (let i = 0; i < buffer.byteLength; i++) {
            this.setReport[i + 7] = buffer.getUint8(i);
        }

        this.setReport[0] = this.crc();

        return this;
    }
}