import type { IPacket } from "../../interface";
import { Packet, PROFILE_LENGTH, PACKET_HEAD_LENGTH } from "../packet";
import { Profile } from "../profile";

export class GetProfilePacket extends Packet {

    setReport: Uint8Array;
    getReport?: DataView;
    profile?: Profile;

    constructor(index: number) {
        super(0x84);
        this.cmdVal = index;
        this.dataLength = 0x80;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[2] = this.cmdVal;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        this.getReport = new DataView(buffer.buffer.slice(1, this.dataLength + PACKET_HEAD_LENGTH + 1));
        this.profile = Profile.fromReportData(this.getReport);

        return this;
    }
}