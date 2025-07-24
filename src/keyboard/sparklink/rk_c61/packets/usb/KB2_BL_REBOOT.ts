import { BL_Controls, ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_BL_REBOOT extends Packet {

    constructor(callback: (event: any) => void) {
        super(0x0a, callback);
        this.len = 0x02;

        this.cmdBuffer = new Uint8Array(2);
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            let index = 0x00;
            this.cmdBuffer[index++] = 0xff;
            this.cmdBuffer[index++] = 0xff;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            detail: { cmd: 0x0a, errCode: this.errCode} 
        }));
    }
}