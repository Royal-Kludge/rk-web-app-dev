// 地址偏移       功能              默认值示例           描述
// 0              Sensor信息        0x01/0x02           bit7-bit6：00 表示Down
//                                                                01 表示 Right
//                                                                10 表示 Left
//                                                                11表示 Up
//                                                     bit5-bit0：sensor编码，指明当前鼠标用的哪个sensor，目前只支持2个sensor硬件。
//                                                                01： P3395
//                                                                02： P3950
// 1              XY分调及回报率     0x44               bit7：1为XY分调， 目前预留，固件暂不支持。
//                                                     bit6-bit4: USB reportrate,
//                                                     bit3: 预留
//                                                     bit2-bit0: 2.4G reportrate,
//                                                     有线下驱动设置回报率，同步到2.4G的回报率一起修改。
//                                                     无线下驱动设置回报率，分2个情况：
//                                                     1.如果dongle的最大回报率是1k，则有线无线的回报率可以同步保存；
//                                                     2.如果dongle的最大回报率是8k，则有线无线的回报率 不能同步保存，分开处理；
//                                                     0:    1ms(1000HZ)
//                                                     1:    2ms(500HZ)
//                                                     2:    4ms(250HZ)
//                                                     3:    8ms(125HZ)
//                                                     4:    125us(8000HZ)
//                                                     5:    250us(4000HZ)
//                                                     6:    500us(2000HZ)
// 2              DPI               0x26               高4bit当前dpi在第几档（1-10）
//                                                     低4bit 有几档dpi（1-10）
// 3              LOD高度            0x01              高4bit预留， 
//                                                     低4bit：取值 0- N， 取决于sensor 特性
//                                                     3395,取值 1 or 2.
//                                                     3950 取值 1,2,3
// 4              按键去抖           0x05               按键去抖次数，单位 ms
// 5              性能相关           0x50               bit0 Angle Snapping  直线 修正
//                                                      0: Disable  1: Enable
//                                                      bit1 Glass mode玻璃模式 (P3950专用)
//                                                      0: Disable  1: Enable
//                                                      bit2 –bit 3 :预留
//                                                      bit4    ripple enable 波纹
//                                                      bit5    motion sync 
//                                                      bit6-bit7 0: office mode, 1: HP game ,2: CodedGaming;
// 
// 6              广播休眠时间       0x20                N步进1s， 
// 7              回连休眠时间       0x10                N步进1s， 
// 8              工作休眠时间       0x04                N*30(S)步进30s，0为不休眠
// 9              当前Profile       0x1                 取值1-max profile N，目前最大支持3个profile
// 10             预留              00                  --
// 11-26          Dpi数值数组                            8档dpi的值，每2个byte对应一档，对应sensor实际的参数
// 27-50          DPI颜色                               8档dpi的RGB值，3个byte对应一组RGB
// 51-53          预留              00                  --
// 54-55          校验码            0xa5                驱动无需理会，设备保存flash 的校验码
//                                  0x5a

import { KeyFunctionType } from "../enum";
import type { KeyMappingData, KeyTableData, LedColor } from "../interface";


/**
 * Profile Field
 */
export enum KeyTableEnum {
    LeftKey = 0,                // 左键
    RightKey = 1,               // 右键
    MiddleKey = 2,              // 中键
    BackKey = 3,                // 后退键
    ForwardKey = 4,             // 前进键
    DpiKey = 5,                 // DPI键
}

export const KEY_TABLE_DATA: Uint8Array = new Uint8Array([
    0x01,  0x01,  0x01,  0x00,
    0x01,  0x02,  0x01,  0x00,
    0x01,  0x03,  0x01,  0x00,
    0x01,  0x04,  0x01,  0x00,
    0x01,  0x05,  0x01,  0x00,
    0x05,  0x04,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00,
    0x00,  0x00,  0x00,  0x00]);

export class KeyTable {
    keyLayout?: Array<KeyTableData>;
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setKeyMapping(index: number, mappingData: KeyMappingData) {
        let offset = index * 4;
        if (this.keyLayout != undefined) {
           this.keyLayout[index].keyMappingData.keyStr = mappingData.keyStr;
           this.keyLayout[index].keyMappingData.keyFunctionType = mappingData.keyFunctionType;
           this.keyLayout[index].keyMappingData.keyMappingType = mappingData.keyMappingType;
           this.keyLayout[index].keyMappingData.keyTypeCode = mappingData.keyTypeCode;
           this.keyLayout[index].keyMappingData.keyParam1 = mappingData.keyParam1;
           this.keyLayout[index].keyMappingData.keyRaw = mappingData.keyRaw;
        }
        
        this.buffer.setUint32(offset, mappingData.keyRaw);
    }

    setKeyMappingRaw(index: number, key: number) {
        let offset = index;
        this.buffer.setUint32(offset, key);
    }

    getKeyMapping(index: number) : KeyMappingData {
        if (this.keyLayout != undefined) {
           return this.keyLayout[index].keyMappingData;
        } else {
           let offset = index * 4;
           let key = this.buffer.getUint32(offset);
           return {
               keyRaw: key,
               keyStr: '',
               keyFunctionType: KeyFunctionType.MouseKey,
               keyMappingType: key >> 24,
               keyTypeCode: (key >> 16) & 0xFF,
               keyParam1: (key >> 8) & 0xFF,
               keyParam2: key & 0xFF
           };
        }
    }

    fillKeyMappingData(index: number, mappingData: KeyMappingData) {
        let offset = index;
        let key = this.buffer.getUint32(offset);
        mappingData.keyRaw = key;
        mappingData.keyMappingType = key >> 24;
        mappingData.keyTypeCode = (key >> 16) & 0xFF;
        mappingData.keyParam1 = (key >> 8) & 0xFF;
        mappingData.keyParam2 = key & 0xFF;
    }
    
    loadDefualtData() {
       let index: number;
       for (index = 0; index < KEY_TABLE_DATA.length; index++) {
           this.buffer.setInt8(index, KEY_TABLE_DATA[index]);
       }
    }

    static fromReportData(data: DataView) : KeyTable | undefined {
        let keyTable = undefined;
        
        if (data.byteLength == 112) {
            //let buffer = new DataView(data.buffer.slice(PACKET_HEAD_LENGTH, data.byteLength));
            keyTable = new KeyTable(data);
        }

        return keyTable;
    }
}