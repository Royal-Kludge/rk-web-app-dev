import type { IPacket } from "@/keyboard/beiying/interface";
import { Packet_Usb, PROFILE_LENGTH, PACKET_HEAD_LENGTH } from "@/keyboard/beiying/rk_m87/packets/packet";

export class GetPasswordPacket extends Packet_Usb {

    setReport: Uint8Array;
    getReport?: DataView;
    fwVersion?: string;

    constructor() {
        super(0x82);
        this.cmdVal = 0x01;
        this.dataLength = 0x0A;
        this.setReport = new Uint8Array(519);
        this.setReport[0] = this.cmdId;
        this.setReport[1] = this.cmdVal;
        this.setReport[3] = 0x01;
        this.setReport[5] = this.dataLength;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        this.getReport = new DataView(buffer.buffer.slice(1, this.dataLength + PACKET_HEAD_LENGTH + 1));
        if (this.getReport.byteLength >= 10 + PACKET_HEAD_LENGTH) {
            this.fwVersion = `${this.getReport.getUint8(13).toString(14).padStart(2, '0')}${this.getReport.getUint8(14).toString(16).padStart(2, '0')}`
        }
        return this;
    }
}