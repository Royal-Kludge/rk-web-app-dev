import type { IPacket } from "../../interface";
import { Packet, PROFILE_LENGTH, PACKET_HEAD_LENGTH } from "../packet";
import { Profile } from "../profile";

export class SetProfilePacket extends Packet {

    setReport: Uint8Array;

    constructor(index: number) {
        super(0x04);
        this.cmdVal = index;
        this.dataLength = 0x80;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[2] = this.cmdVal;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength;
    }

    setPayload(buffer: DataView) : IPacket {
        for (let i = 0; i < buffer.byteLength; i++) {
            this.setReport[i + 7] = buffer.getUint8(i);
        }

        return this;
    }
}