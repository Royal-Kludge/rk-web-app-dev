import type { IPacket } from "@/keyboard/interface";
import { PROFILE_LENGTH } from "@/keyboard/rk_l87/packets/packet";
import { Packet_Dongle_Get } from "@/keyboard/rk_l87/packets/dongle/getPacket";
import { Profile } from "../../profile";

export class GetProfilePacket extends Packet_Dongle_Get {

    constructor(callback: (event: any) => void) {
        super(0x44, callback);
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        if (this.packageNum - 1 == this.packageIndex) {
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