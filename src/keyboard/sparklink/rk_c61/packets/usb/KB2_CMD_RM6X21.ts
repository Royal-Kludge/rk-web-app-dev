import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import { ErrorCodeEnum, LayoutTypeEnum, OrderTypeEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_RM6X21 extends Packet {

    type: number;
    page: number;

    constructor(callback: (event: any) => void) {
        super(0x12, callback);
        this.len = 0x04;

        this.cmdBuffer = new Uint8Array(4);

        this.type = 0xff;
        this.page = 0xff;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = this.type;
            this.cmdBuffer[1] = this.page;
            this.cmdBuffer[2] = 0xff;
            this.cmdBuffer[3] = 0xff;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);

        // this.recivedBuffer = undefined;
        // this.len = buffer.getUint8(1);
        // this.recivedBuffer = new DataView(buffer.buffer.slice(4, buffer.byteLength));
        // this.errCode = this.recivedBuffer.getUint8(0);

        
        if (this.recivedBuffer != undefined && this.errCode == ErrorCodeEnum.Success) {
            let index = 1;
            // let isAdjusting: boolean = false;
            // let adjustingCount: number = 0;
            // let keyPressTestCount: number = 0;

            // // 判断当前页数
            // let page = 0;
            // if (isAdjusting) {
            //     page = (adjustingCount % 2) + 1;
            // } else {
            //     page = (keyPressTestCount % 2) + 1;
            // }

            // // 开始取值的位置
            // let buff = 0;
            // let i = 0;
            // let j = 0;

            let dataType = this.recivedBuffer.getUint8(index++);
            let values = this.recivedBuffer.buffer.slice(index, this.recivedBuffer.buffer.byteLength);
            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { dataType: dataType, values: values }
            }));

            // switch (dataType) {
            //     case 0x02:
            //         if (page == 1 || page == 2) {
            //             let add = page == 1 ? 0 : 3;
            //             for (i = 0; i < 3; i++) {
            //                 for (j = 0; j < 21; j++) {
            //                     buff = (this.recivedBuffer.getUint8(index + 1) << 8) | this.recivedBuffer.getUint8(index);
            //                     values.push({
            //                         row: i + 3,
            //                         col: j,
            //                         value: buff / 100
            //                     });
            //                     index += 2;
            //                 }
            //             }
            //         }

            //         this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            //             detail: { dataType: dataType, values: values }
            //         }));
            //         break;
            //     case 0x03:
            //         for (i = 0; i < 6; i++) {
            //             for (j = 0; j < 21; j++) {
            //                 buff = this.recivedBuffer.getUint8(index);;
            //                 values.push({
            //                     row: i,
            //                     col: j,
            //                     value: buff
            //                 });
            //                 length += 1;
            //             }
            //         }

            //         this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            //             detail: { dataType: dataType, values: values }
            //         }));
            //         break;
            //     case 0x06:
            //         if (page == 1 || page == 2) {
            //             let add = page == 1 ? 0 : 3;
            //             for (i = 0; i < 3; i++) {
            //                 for (j = 0; j < 21; j++) {
            //                     buff = (this.recivedBuffer.getUint8(index + 1) << 8) | this.recivedBuffer.getUint8(index);
            //                     values.push({
            //                         row: i + 3,
            //                         col: j,
            //                         value: buff
            //                     });
            //                     length += 2;
            //                 }
            //             }
            //         }
            //         this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
            //             detail: { dataType: dataType, values: values }
            //         }));
            //         break;
            // }
        }
    }
}