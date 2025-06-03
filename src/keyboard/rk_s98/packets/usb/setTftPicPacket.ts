import type { IPacket } from "@/keyboard/interface";
import { Packet_Usb } from "@/keyboard/rk_s98/packets/packet";

const maxPlayload: number = 512;

export class SetTftPicPacket extends Packet_Usb {

    isDuring: boolean;
    setReport: Uint8Array;
    frameIndex: number;
    delay: number;
    buffers: Array<Uint8Array>

    constructor() {
        super(0x0c);
        this.frameIndex = 0x00;
        this.delay = 0x00;
        this.isDuring = false;
        this.buffers = new Array<Uint8Array>();
        this.setReport = new Uint8Array(519);
    }

    setPayload() : IPacket {
        this.packageNum = Math.ceil(this.buffers[this.frameIndex].length / maxPlayload);

        let index = 0;
        this.setReport[index++] = this.cmdId;
        this.setReport[index++] = 0x00;
        this.setReport[index++] = this.frameIndex;
        this.setReport[index++] = this.packageIndex;
        
        // Skip crc at here, it's need add after calculation
        index++;

        // The max length per package is 512, so if it's last package, then calculate the package length.
        let packageLen = (this.packageIndex < this.packageNum - 1) ? maxPlayload : this.buffers[this.frameIndex].length % maxPlayload;
        this.setReport[index++] = packageLen & 0x00FF;
        this.setReport[index++] = packageLen >> 8;

        // Calculate crc = 0xFF & (package[0]~package[N])
        let start = this.packageIndex * maxPlayload;
        let end = start + packageLen;
        let crc = 0x00;
        let i: number = 0;
        for (i = start; i < end ; i++) {
            this.setReport[index++] = this.buffers[this.frameIndex][i];
            crc = crc + this.buffers[this.frameIndex][i];
        }

        this.setReport[4] = 0xFF & crc;

        return this;
    }
}