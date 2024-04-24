import type { IPacket } from "@/keyboard/interface";
import { PROFILE_LENGTH, Packet_Dongle } from "@/keyboard/rk_l87/packets/packet";
import { Profile } from "../../profile";

export class GetProfilePacket extends Packet_Dongle {
    buffer?: Uint8Array;
    index: number = 0;

    constructor(callback: (event: any) => void) {
        super(0x44, callback);
    }

    command(): Uint8Array {
        super.command();
        this.setReport[1] = 0x00 | this.packageNum;
        this.setReport[2] = 0x00 | this.packageIndex;
        this.setReport[3] = 0x00 | this.index << 4 | this.dataLength;
        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        let success = buffer.getUint8(1) >> 7;
        let pkgCount = buffer.getUint8(1) & 0x3F;
        let pkgIndex = buffer.getUint8(2) & 0x3F;
        let dataLength = buffer.getUint8(3) & 0x0F;

        let u8 = new Uint8Array(buffer.buffer.slice(4, 4 + dataLength));

        if (pkgIndex == 0) {
            this.dataLength = dataLength;
            this.buffer = u8;
        } else {
            this.dataLength += dataLength;
            let tmp = new Uint8Array(this.dataLength);
            if (this.buffer != undefined) {
                tmp.set(this.buffer, 0);
                tmp.set(u8, this.buffer?.length);
            }
            this.buffer = tmp;
        }

        if (pkgCount - 1 == pkgIndex) {
            if (this.buffer != undefined) {
                this.getReport = new DataView(this.buffer.buffer);
                if (this.getReport.byteLength >= PROFILE_LENGTH) {
                    let profile = Profile.fromReportData(this.getReport);
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: profile }));
                }
            }
        }

        return this;
    }
}