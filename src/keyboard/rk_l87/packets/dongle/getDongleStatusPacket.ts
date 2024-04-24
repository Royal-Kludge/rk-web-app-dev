import type { IPacket } from "@/keyboard/interface";
import { Packet_Dongle } from "@/keyboard/rk_l87/packets/packet";

export class GetDongleStatusPacket extends Packet_Dongle {

    constructor(callback: (event: any) => void) {
        super(0x07, callback);
    }

    command(): Uint8Array {
        super.command();
        this.setReport[1] = 0x01;
        this.setReport[this.setReport.length - 1] = this.crc();
        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);
        
        if (buffer.byteLength >= this.dataLength) {
            let isConnected = buffer.getUint8(4) > 0;
            this.getReport = buffer;
            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: isConnected }));
        }

        return this;
    }
}