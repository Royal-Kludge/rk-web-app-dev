import { ErrorCodeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_SYNC extends Packet {

    constructor(callback: (event: any) => void) {
        super(0x01, callback);
        this.len = 0x02;

        this.cmdBuffer = new Uint8Array(6);
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = 0x01;
            this.cmdBuffer[1] = 0x02;
            this.cmdBuffer[2] = 0x03;
            this.cmdBuffer[3] = 0x04;
            this.cmdBuffer[4] = 0xff;
            this.cmdBuffer[5] = 0xff;
            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            let boardId = this.recivedBuffer.getUint32(1, true);
            let kbLayout = this.recivedBuffer.getUint8(4);
            let axisType = this.recivedBuffer.getUint8(3);
            let runMode = this.recivedBuffer.getUint8(7);
            let hwVersion = (this.recivedBuffer.getUint8(6) << 8) | this.recivedBuffer.getUint8(5);
            let kbSn = this.recivedBuffer.buffer.slice(9, 25);
            let fwVersion = this.recivedBuffer.buffer.slice(26, 54);

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { boardId: boardId, kbLayout: kbLayout, axisType: axisType, runMode: runMode, hwVersion: hwVersion, kbSn: kbSn, fwVersion: fwVersion } 
            }));
        }
    }
}