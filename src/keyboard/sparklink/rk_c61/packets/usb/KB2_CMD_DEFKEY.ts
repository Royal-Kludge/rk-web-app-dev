import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum, RWTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket, KeyInfo } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_DEFKEY extends Packet {

    rw: RWTypeEnum;
    rowX: number;
    rowY: number;

    constructor(callback: (event: any) => void) {
        super(0x2B, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(3);

        this.rw = RWTypeEnum.Read;
        this.rowX = 0x00;
        this.rowY = 0x00;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = this.rw;

            this.cmdBuffer[1] = this.rowX;
            this.cmdBuffer[2] = this.rowY;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            let row = this.recivedBuffer.getUint8(1);

            if (row == 0) {
                this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                    detail: { isReset: true }
                }));
            }

            for (let i = 0; i < 21; i++) {
                if (this.recivedBuffer.getUint8(i + 2) == 0) {
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { isReset: false, row: row, col: i, keyInfo: null }
                    }));
                } else {
                    const info = this.initKeyInfo();
                    info.keyValue = this.recivedBuffer.getUint8(i + 2);
                    info.row = row;
                    info.col = i;
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { isReset: false, row: row, col: i, keyInfo: info }
                    }));
                }
            }

            const rowNums = this.recivedBuffer.getUint8(23);
            row = rowNums;
            for (let j = 0; j < 21; j++) {
                if (this.recivedBuffer.getUint8(j + 24) == 0) {
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { isReset: false, row: row, col: j, keyInfo: null }
                    }));
                } else {
                    const info = this.initKeyInfo();
                    info.keyValue = this.recivedBuffer.getUint8(j + 24);
                    info.row = row;
                    info.col = j;
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                        detail: { isReset: false, row: row, col: j, keyInfo: info }
                    }));
                }
            }
        }
    }

    initKeyInfo() : KeyInfo {
        return {
            keyValue: 0,
            row: 0,
            col: 0,
            color: 
            {
                red: 0,
                green: 255,
                blue: 255,
                color: `#00FFFF`
            },
            touchTravel: 1.5,
            touchRelease: 0.3,
            quickTouchPress: 0.3,
            quickTouchRelease: 0.3,
            deadPress: 0.2,
            deadRelease: 0.2,
            isCheck: false,
            isSingleTouch: false,
            isQuickTouch: false,
            isAdvancedKey: false,
            advanceKeyType: 0,
            macroBreak: false,
            fn0_keyValue: 0,
            fn1_keyValue: 0,
            fn2_keyValue: 0,
            fn3_keyValue: 0,
            fn_keyValue: [0, 0, 0, 0],
            DKSInfo: {
              DKS: [0, 0, 0, 0],
              TRPS: [0, 0, 0, 0],
              DB: 1.4,
              DB2: 3.0,
            },
            MPTInfo: {
              DKS: [0, 0, 0],
              DB: [0.5, 1.0, 1.5],
            },
            MTInfo: {
              DKS: [0, 0],
              delay: 200,
            },
            TGLInfo: {
              DKS: 0,
              delay: 200,
            },
            ENDInfo: {
              DKS: 0,
            },
            SOCDInfo: {
              DKS: [0, 0],
              DKSV: [0, 0],
              type: 0,
              mode: 0,
            },
            RSInfo: {
              DKS: [0, 0],
            },
            axisID: 0,
            adjustingMM: 0,
            adjustingADC: 0,
            adjustingPress: 0,
            adjustingSuccess: false,
        };
    }
}