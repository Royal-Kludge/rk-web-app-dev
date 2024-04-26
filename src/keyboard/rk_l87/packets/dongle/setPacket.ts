import type { IPacket } from "@/keyboard/interface";
import { Packet_Dongle, REPORT_PAYLOAD_LENGTH } from "@/keyboard/rk_l87/packets/packet";

export class Packet_Dongle_Set extends Packet_Dongle {
    buffer?: Uint8Array;
    board: number = 0;
    retry: number = 10;

    constructor(cmdId: number, callback: (event: any) => void) {
        super(cmdId, callback);
    }

    command(): Uint8Array {
        super.command();

        if (this.buffer != undefined) {
            this.packageNum = this.buffer.length / REPORT_PAYLOAD_LENGTH + ((this.buffer.length % REPORT_PAYLOAD_LENGTH) > 0 ? 1 : 0);
            this.dataLength = (this.packageIndex + 1) * REPORT_PAYLOAD_LENGTH > this.buffer.length ? this.buffer.length - (this.packageIndex * REPORT_PAYLOAD_LENGTH) : REPORT_PAYLOAD_LENGTH;
            let i: any;
            for (i = 0; i < this.dataLength; i++) {
                this.setReport[i + 4] = this.buffer[i + this.packageIndex * REPORT_PAYLOAD_LENGTH];
            }
        }
        
        this.setReport[1] = 0x7F & this.packageNum;
        this.setReport[2] = 0x7F & this.packageIndex;
        this.setReport[3] = (0x0F & this.dataLength) | ((this.board << 4) & 0xF0);

        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        let success = buffer.getUint8(1) >> 7;

        if (success == 0) {
            this.packageIndex += 1;
        } else {
            this.retry -= 1;
        }

        if (this.packageIndex < this.packageNum && this.retry > 0) {
            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: this }));
        }

        return this;
    }
}