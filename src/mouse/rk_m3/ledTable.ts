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

import type { LedColor } from "../interface";


/**
 * Profile Field
 */
export enum LedTableEnum {
    SensorInfo = 0,             // Sensor信息
    ReportRate = 1,             // XY分调及回报率
    DpiLevel = 2,               // DPI 高4bit当前dpi在第几档（1-10）低4bit 有几档dpi（1-10）
    LodHeight = 3,              // LOD高度
    Debounce = 4,               // 按键去抖 按键去抖次数，单位 ms
    Performance = 5,            // 性能相关
    BroadcastSleepTime = 6,     // 广播休眠时间
    ReconnectSleepTime = 7,     // 回连休眠时间
    WorkSleepTime = 8,          // 工作休眠时间
    CurrProfile = 9,            // 当前Profile
    DpiValue = 11,              // Dpi数值数组
    DpiColor = 27,              // Dpi数值数组
}

export const LED_TABLE_DATA: Uint8Array = new Uint8Array([
    0x01,
    0x44,
    0x26,
    0x01,
    0x05,
    0x50,
    0x20,
    0x10,
    0x04,
    0x01,
    0x00,
    0x0f, 0x00, 0x1f, 0x00, 0x3f, 0x00, 0x7f, 0x00, 0xff, 0x00, 0x07, 0x02, 0x00, 0x00, 0x00, 0x00,
    0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00,
    0xa5, 0x5a]);

export class LedTable {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setFieldValue(field: LedTableEnum, value: number) {
        this.buffer.setUint8(field, value);
    }

    getFieldValue(field: LedTableEnum): number {
        return this.buffer.getUint8(field);
    }

    getDebounce(): number {
        return this.buffer.getUint8(LedTableEnum.Debounce);
    }
    setDebounce(value: number) {
        this.buffer.setUint8(LedTableEnum.Debounce, value);
    }

    // 0:    1ms(1000HZ)
    // 1:    2ms(500HZ)
    // 2:    4ms(250HZ)
    // 3:    8ms(125HZ)
    // 4:    125us(8000HZ)
    // 5:    250us(4000HZ)
    // 6:    500us(2000HZ)
    getReportRate(): number {
        let rate = this.buffer.getUint8(LedTableEnum.ReportRate);
        return rate;
    }

    // 0:    1ms(1000HZ)
    // 1:    2ms(500HZ)
    // 2:    4ms(250HZ)
    // 3:    8ms(125HZ)
    // 4:    125us(8000HZ)
    // 5:    250us(4000HZ)
    // 6:    500us(2000HZ)
    setReportRate(rate: number) {
        let value = (0x07 & rate) | (0x70 & rate << 4);
        this.buffer.setUint8(LedTableEnum.ReportRate, value);
    }

    getLodHeight(): number {
        let val = this.buffer.getUint8(LedTableEnum.LodHeight);
        return val & 0x0F;
    }

    setLodHeight(height: number) {
        let val = 0x0F & height;
        this.buffer.setUint8(LedTableEnum.LodHeight, val);
    }

    getAngleSnaping(): boolean {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        return (val & 0x01) > 0;
    }

    setAngleSnaping(flag: boolean) {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        val = flag ? val | 0x01 : val & 0xFE;
        this.buffer.setUint8(LedTableEnum.Performance, val);
    }

    getGlassMode(): boolean {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        return (val & 0x02) > 0;
    }

    setGlassMode(flag: boolean) {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        val = flag ? val | 0x02 : val & 0xFD;
        this.buffer.setUint8(LedTableEnum.Performance, val);
    }

    getRippleEnable(): boolean {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        return (val & 0x10) > 0;
    }

    setRippleEnable(flag: boolean) {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        val = flag ? val | 0x10 : val & 0xEF;
        this.buffer.setUint8(LedTableEnum.Performance, val);
    }

    getMotionSync(): boolean {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        return (val & 0x20) > 0;
    }

    setMotionSync(flag: boolean) {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        val = flag ? val | 0x20 : val & 0xDF;
        this.buffer.setUint8(LedTableEnum.Performance, val);
    }

    /// 0: office mode, 1: HP game, 2: CodedGaming
    getSensorMode(): number {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        return val >> 6;
    }

    /// 0: office mode, 1: HP game, 2: CodedGaming
    setSensorMode(mode: number) {
        let val = this.buffer.getUint8(LedTableEnum.Performance);
        val = val & (mode << 6);
        this.buffer.setUint8(LedTableEnum.Performance, val);
    }

    getSleepTime(): number {
        let val = this.buffer.getUint8(LedTableEnum.WorkSleepTime);
        return val * 30;
    }

    setSleepTime(time: number) {
        this.buffer.setUint8(LedTableEnum.WorkSleepTime, time / 30);
    }

    getDpiLevel(): number {
        let level = this.buffer.getUint8(LedTableEnum.DpiLevel);
        return level >> 4;
    }

    getDpiMaxLevel(): number {
        let max = this.buffer.getUint8(LedTableEnum.DpiLevel);
        return max & 0x0F;
    }

    setDpiLevel(level: number, maxLevel: number) {
        let dpi = 0x00;
        dpi = level << 4 & 0xF0;
        dpi = dpi | (maxLevel & 0x0F);
        this.buffer.setUint8(LedTableEnum.DpiLevel, dpi);
    }

    getDpiValue(level: number): number {
        let dpi = this.buffer.getUint16(LedTableEnum.DpiValue + ((level - 1) * 2), true);

        if (dpi > 42000) dpi = 42000;
        if (dpi < 600) dpi = (dpi + 1) * 50;

        return dpi;
    }

    setDpiValue(level: number, dpi: number) {
        if (dpi > 42000) dpi = 42000;
        if (dpi <= 30000) dpi = (dpi / 50) - 1;
        this.buffer.setUint16(LedTableEnum.DpiValue + ((level - 1) * 2), dpi, true);
    }

    getDpiColor(level: number): LedColor {
        let index = level - 1;
        let r = this.buffer.getUint8(LedTableEnum.DpiColor + (index * 3));
        let g = this.buffer.getUint8(LedTableEnum.DpiColor + (index * 3) + 1);
        let b = this.buffer.getUint8(LedTableEnum.DpiColor + (index * 3) + 2);

        let color = `#${r.toString(16).toUpperCase().padStart(2, '0')}${g.toString(16).toUpperCase().padStart(2, '0')}${b.toString(16).toUpperCase().padStart(2, '0')}`;

        return {
            red: r,
            green: g,
            blue: b,
            color: color
        };
    }

    setDpiColor(level: number, color: LedColor) {
        let index = level - 1;
        this.buffer.setUint8(LedTableEnum.DpiColor + (index * 3), color.red);
        this.buffer.setUint8(LedTableEnum.DpiColor + (index * 3) + 1, color.red);
        this.buffer.setUint8(LedTableEnum.DpiColor + (index * 3) + 2, color.red);
    }

    loadDefualtData() {
       let index: number;
       for (index = 0; index < LED_TABLE_DATA.length; index++) {
           this.buffer.setInt8(index, LED_TABLE_DATA[index]);
       }
    }

    static fromReportData(data: DataView): LedTable | undefined {
        let table = undefined;

        if (data.byteLength == 56) {
            table = new LedTable(data);
        }

        return table;
    }
}