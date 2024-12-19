import type { IPacket } from "@/keyboard/interface";
import { Packet_Usb, LED_COLOR_LENGTH, LED_EFFECT_COLOR_COUNT, LED_EFFECT_COUNT, PACKET_HEAD_LENGTH } from "@/keyboard/rk_l75/packets/packet";

export class SetWebKeyTabPacket extends Packet_Usb {

    setReport: Uint8Array;

    constructor() {
        super(0x12);
        this.cmdVal = 0x00;
        this.dataLength = 0x00;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[2] = this.cmdVal;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength & 0x00FF;
        this.setReport[6] = this.dataLength >> 8;
    }

    setPayload(buffer: DataView) : IPacket {

        this.setReport[5] = buffer.byteLength & 0x00FF;
        this.setReport[6] = buffer.byteLength >> 8;

        for (let i = 0; i < buffer.byteLength; i++) {
            this.setReport[i + 7] = buffer.getUint8(i);
        }

        return this;
    }
}