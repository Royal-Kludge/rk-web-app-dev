import type { IPacket } from "@/keyboard/interface";
import { Packet_Usb } from "@/keyboard/rk_m87/packets/packet";

export class SetTftPretreatmentPacket extends Packet_Usb {

    setReport: Uint8Array;

    constructor() {
        super(0x0d);
        this.dataLength = 0x05;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[1] = 0x00;
        this.setReport[2] = 0x00;
        this.setReport[3] = 0x01;
        this.setReport[4] = 0x00;
        this.setReport[5] = this.dataLength;
    }

    setPayload(frameCount: number, action: number, delay: number) : IPacket {
        this.setReport[7] = action << 6;
        this.setReport[8] = frameCount;
        this.setReport[10] = delay & 0x00FF;
        this.setReport[11] = delay >> 8;

        return this;
    }
}