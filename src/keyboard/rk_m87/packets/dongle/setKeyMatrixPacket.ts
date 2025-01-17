import { Packet_Dongle_Set } from "@/keyboard/rk_m87/packets/dongle/setPacket";
import { KeyMatrixLayer, MatrixTable } from "@/keyboard/enum"
import type { IPacket } from "@/keyboard/interface";
import { Packet_Dongle, REPORT_PAYLOAD_LENGTH, MACRO_PER_BLOCK_LENGTH, REPORT_MAX_RETRY } from "@/keyboard/rk_m87/packets/packet";

export class BufferPackage {
    buffer?: Uint8Array;
    layer: KeyMatrixLayer = KeyMatrixLayer.Nomal;
    table: MatrixTable = MatrixTable.WIN;
    board: number = 0;
}

export class SetKeyMatrixPacket extends Packet_Dongle_Set {

    layer: KeyMatrixLayer = KeyMatrixLayer.Nomal;
    table: MatrixTable = MatrixTable.WIN;
    bufferPackages: Array<BufferPackage>;
    isRunning: boolean = false;

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x01, callback, pktFinish);

        this.bufferPackages = new Array<BufferPackage>();
    }

    command(): Uint8Array {
        super.command();

        // if (this.buffer == null || this.buffer == undefined) {
        //     let pkg = this.bufferPackages[0];
        //     if (pkg != undefined) {
        //         this.bufferPackages.splice(0, 1);
        //         this.layer = pkg.layer;
        //         this.table = pkg.table;
        //         this.packageIndex = 0;
        //         this.board = pkg.board;
        //         this.buffer = pkg.buffer;
        //         this.retry = REPORT_MAX_RETRY;
        //     } else {
        //         this.dispatchEvent(new CustomEvent('onReportPacketFinish', { detail: this }));
        //         return new Uint8Array();
        //     }
        // }

        // this.setReport.fill(0x00, 0, this.setReport.length - 1);
        // this.setReport[0] = this.cmdId;

        // if (this.buffer != undefined) {
        //     this.packageNum = Math.floor(this.buffer.length / REPORT_PAYLOAD_LENGTH) + ((this.buffer.length % REPORT_PAYLOAD_LENGTH) > 0 ? 1 : 0);
        //     this.dataLength = (this.packageIndex + 1) * REPORT_PAYLOAD_LENGTH > this.buffer.length ? this.buffer.length - (this.packageIndex * REPORT_PAYLOAD_LENGTH) : REPORT_PAYLOAD_LENGTH;
        //     let i: any;
        //     for (i = 0; i < this.dataLength; i++) {
        //         this.setReport[i + 4] = this.buffer[i + this.packageIndex * REPORT_PAYLOAD_LENGTH];
        //     }
        // }
        
        // this.setReport[1] = 0x7F & this.packageNum;
        // this.setReport[2] = 0x7F & this.packageIndex;
        // this.setReport[3] = (0x0F & this.dataLength) | ((this.board << 4) & 0xF0);
    
        // this.setReport[this.setReport.length - 1] = this.crc();

        this.setReport[2] = (0x7F & this.packageIndex) | (this.table << 7);
        this.setReport[3] = (0x0F & this.dataLength) | ((this.layer << 4) & 0x30) | ((this.board << 6) & 0xC0);
        this.setReport[this.setReport.length - 1] = this.crc();

        return this.setReport;
    }

    
    fromReportData(buffer: DataView) : IPacket {
        let success = buffer.getUint8(1) >> 7;
     
        if (success == 0) {
            this.packageIndex += 1;
        } else {
            this.retry -= 1;
        }
     
        if (this.packageIndex < this.packageNum && this.retry > 0) {
            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: this }));
        } else if (this.bufferPackages != undefined && this.bufferPackages.length > 0) {
            let pkg = this.bufferPackages[0];
            if (pkg != undefined) {
                this.bufferPackages.splice(0, 1);
                this.layer = pkg.layer;
                this.table = pkg.table;
                this.packageIndex = 0;
                this.board = pkg.board;
                this.buffer = pkg.buffer;
                this.retry = REPORT_MAX_RETRY;
                console.log(`Set Key Matrix [board:${this.board}] [table:${this.table}] [layer:${this.layer}]`);
                this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: this }));
            } else {
                this.isRunning = false;
                this.dispatchEvent(new CustomEvent('onReportPacketFinish', { detail: this }));
            }
        } else {
            this.isRunning = false;
            this.buffer = undefined;
            this.dispatchEvent(new CustomEvent('onReportPacketFinish', { detail: this }));
        }
     
        return this;
    }
    
}