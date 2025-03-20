import type { IPacket } from "../../interface";

export const PROFILE_LENGTH: number = 128;
export const LED_COLOR_COUNT: number = 126;
export const LED_COLOR_LENGTH: number = 3;
export const LED_EFFECT_COLOR_COUNT: number = 7;
export const LED_EFFECT_COUNT: number = 20;
export const KEY_MAXTRIX_LINE: number = 6;
export const KEY_MAXTRIX_COLOUMN: number = 21;
export const PACKET_HEAD_LENGTH: number = 7;
export const MACRO_PER_BLOCK_LENGTH: number = 512;
export const MACRO_MAX_LENGTH: number = 4096;
export const REPORT_ID_LENGTH: number = 1;
export const REPORT_ID_USB: number = 0x03;
export const REPORT_ID_DONGLE: number = 0x13;
export const REPORT_PAYLOAD_LENGTH: number = 0x0E;
export const REPORT_MAX_RETRY: number = 0x0A;
export const REPORT_ID_POPUP: number = 0x09;
export const POPUP_CMD_ID: number = 0xFA;

/**
 * Abstract class of packet base
 */
export abstract class Packet_Usb implements IPacket {
    fixVal: number = 0x50;
    sn: number;
    cmdId: number;
    dataOffset: number;
    dataLength: number;

    setReport: Uint8Array;

    constructor(cmdId: number) {
        this.cmdId = cmdId;
        this.sn = 0;
        this.dataOffset = 0;
        this.dataLength = 0;

        this.setReport = new Uint8Array(64);
    }

    fromReportData(buffer: DataView) : IPacket {
        this.dataLength = buffer.getUint8(3);

        return this;
    }

    crc(): number {
        let crc = 0x00;
        let i: any;
        for (i = 1; i < this.setReport.length - 1; i++) {
            crc = crc + this.setReport[i];
        }

        return crc & 0xFF;
    }
}

/**
 * Abstract class of packet base
 */
export abstract class Packet_Dongle extends EventTarget implements IPacket {

    setReport: Uint8Array;
    getReport?: DataView;

    cmdId: number;
    cmdVal: number;
    packageNum: number;
    packageIndex: number;
    dataLength: number;
    callback?: (event: any) => void

    constructor(cmdId: number, callback: (event: any) => void) {
        super();
        this.setReport = new Uint8Array(19);
        this.cmdId = cmdId;
        this.cmdVal = 0;
        this.packageNum = 0;
        this.packageIndex = 0;
        this.dataLength = 0;

        this.callback = callback;
        this.addEventListener('onReportDataRecvied', this.callback, false);
    }

    command(): Uint8Array {
        this.setReport.fill(0x00, 0, this.setReport.length - 1);
        this.setReport[0] = this.cmdId;

        return this.setReport;
    }

    fromReportData(buffer: DataView) : IPacket {
        return this;
    }

    crc(): number {
        let crc = REPORT_ID_DONGLE;
        let i: any;
        for (i = 2; i < this.setReport.length - 1; i++) {
            crc = crc + this.setReport[i];
        }

        return crc & 0xFF;
    }

    async destroy(): Promise<void> {
        if (this.callback != undefined) {
            this.removeEventListener("inputreport", this.callback);
        }
    }
}

/**
 * Abstract class of packet base
 */
export abstract class Packet_Big_Report implements IPacket {
    fixVal: number = 0x65;     // byte[2]
    dataLength: number;        // byte[3]
    sn: number;                // byte[4]
    device: number;            // byte[5]
    cmdId: number;             // byte[6]
    rfSn: number;              // byte[7]
    payloadLength: number;     // byte[8]
    opCodeId: number;          // byte[9]

    setReport: Uint8Array;

    constructor(cmdId: number) {
        this.dataLength = 0x3A; // byte[3]
        this.sn = 0;            // byte[4]
        this.device = 0;        // byte[5]
        this.cmdId = cmdId;     // byte[6]
        this.rfSn = 0;          // byte[7]
        this.payloadLength = 0; // byte[8]
        this.opCodeId = 0;      // byte[9]

        this.setReport = new Uint8Array(64);
    }

    fromReportData(buffer: DataView) : IPacket {
        this.dataLength = buffer.getUint8(3);

        return this;
    }

    crc(): number {
        let crc = 0x00;
        let i: any;
        for (i = 1; i < this.setReport.length - 1; i++) {
            crc = crc + this.setReport[i];
        }

        return crc & 0xFF;
    }
}

export abstract class Packet_Big_Respone implements IPacket {
    fixVal?: number = 0x65;     // byte[1]
    //执行结果 ,含义是CMD_RSP_SUCCESS = 0x00, CMD_RSP_FAIL =0x01,CMD_RSP_WAIT = 0x02. 代表下位机的操作结果是否正常,不正常则上位机需要做处理
    cmdRsp?: number;        // byte[2] 
    //len， HID包的数据的长度 = 0x25=37，所以in包的固定大小是42 = 37+5， 5个头字节 + 数据内容 37 个；
    dataLength?: number;        // byte[3]
    //GET 包的SN1, IN包的SN1数值. 和前面的SET report的out包的sn1一致表示下位机对应的CMD 回复完成.
    sn?: number;                // byte[4]
    //命令包第一个字节，代表 cmd操作的执行结果是否正常，ota_rsp_ok = 0； 非00 表示有错误发生. 一般有些SET 命令到这里就可以判断执行结果ok，可以不需要判断 byte6 以后的数据了。
    otaRsp?: number;            // byte[5]
    //执行结果， 基本上都是 0x0E 字符。代表success。 上位机注意：有些SET包的应答只需要判断这里为止，是不需要读取7-41的数据的。请注意。 上位机主要判断的是2,4,6 字节的数据是否和SET包对应的协议符合，5是否是00即可。
    result?: number;            // byte[6]
    //有效字节长度，代表8-41的有效数据长度。具体含义由每个cmd 命令表指定。有一些cmd 的应答是只需要判断byte6 为止，不需要解析byte7 以后的内容。而且下位机的回复IN包是不会清buffer的，所以有时候看到byte7 后面的内容可能是有部分重叠的，都是无效数据请忽略。
    payloadLength?: number;     // byte[7]

    payloadData?: DataView;

    constructor() {
 
    }

    fromReportData(buffer: DataView) : IPacket {
        this.fixVal = buffer.getUint8(1);
        this.cmdRsp = buffer.getUint8(2);            // byte[2] 
        this.dataLength = buffer.getUint8(3);        // byte[3]
        this.sn = buffer.getUint8(4);                // byte[4]
        this.otaRsp = buffer.getUint8(5);            // byte[5]
        this.result = buffer.getUint8(6);            // byte[6]
        this.payloadLength = buffer.getUint8(7);     // byte[7]

        this.payloadData = new DataView(buffer.buffer.slice(8, 8 + this.payloadLength));
        
        return this;
    }
}