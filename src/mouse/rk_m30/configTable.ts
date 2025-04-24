import type { LedColor } from "../interface";

export const CONFIG_TABLE_DATA: Uint8Array = new Uint8Array([
    0x64, // 固定值0x64 
    0x18, // 表示Sensor信息
    0x03, // 表示XY分调及回报率
    0x26, // 表示DPI
    0x00, // LOD
    0x03, // 按键去抖 bit7 motion sync 低4位是Debounce值
    0x00, // 直线修正角度捕捉等选项 bit7 波纹控制 低4位是直线修正开关 bit0 直线修正。
    // Byte7—Byte26（20 Bytes）表示10档DPI X轴的值，每2字节对应一档
    0x03, 0x00, 0x07, 0x00, 0x0f, 0x00, 0x1f, 0x00, 0x3f, 0x00, 0x77, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // Byte27--Byte46（20 Bytes）表示10档DPI Y轴的值，每2字节对应一档
    0x03, 0x00, 0x07, 0x00, 0x0f, 0x00, 0x1f, 0x00, 0x3f, 0x00, 0x77, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // Byte47—Byte76（30 Bytes）表示10档DPI的颜色RGB值
    0x00, 0xff, 0x00,
    0xff, 0x00, 0x00,
    0x00, 0xff, 0xff,
    0xff, 0xff, 0x00,
    0x00, 0x00, 0xff,
    0xff, 0xff, 0xff,
    0x00, 0x00, 0x00,
    0x00, 0x00, 0x00,
    0x00, 0x00, 0x00,
    // 基本上项目的dpi段不会超过8段，所以取10段的3个字节 74- 76做特殊应用
    0x00, // Byte74 休眠时间，1个字节表示，单位1分钟.0=无休眠
    0x00, // Byte75 DPI灯效控制， 0-N, 0 关闭， 1常亮 ， 2呼吸
    0x00, // Byte76 DPI 亮度 1-4
    // Byte77 当前灯效模式值
    0x00, 
    // Byte78--Byte389 灯效配置区
    // 每26字节为一个单元对应一种灯效，预留12种灯效，总长度是12*26=312，每26字节的格式如下
    // byte0  高4bit是速度，低4bit是亮度
    // byte1  高4bit是方向，低4bit是是否混色
    // byte2~byte25  是8个RGB颜色值
    0x44, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x01, 0xff, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0x40, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x07, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0x40, 0x00, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x01, 0xff, 0x00, 0x00, 0xff, 0x40, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x01, 0xff, 0x00, 0x00, 0xff, 0x40, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff,
    0x44, 0x01, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0x40, 0x00, 0xff, 0xff, 0x64, 0x18, 0x03, 0x36,
    0x00, 0x02, 0x00, 0x03, 0x00, 0x07, 0x00, 0x0f, 0x00, 0x1f, 0x00, 0x3f, 0x00, 0x77, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x07,
    0x00, 0x0f, 0x00, 0x1f, 0x00, 0x3f, 0x00, 0x77, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff,
    0xff, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x44, 0x01, 0xff, 0x00,
    0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x44, 0x01, 0xff, 0x00,
    0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x44, 0x01, 0xff, 0x00,
    0xff, 0xff, 0x00, 0x00, 0xff, 0x40, 0x00, 0xff, 0xff, 0x00]);

export enum ConfigTableEnum {
    SensorInfo = 1,             // Sensor信息
    ReportRate = 2,             // XY分调及回报率
    DpiLevel = 3,               // DPI 高4bit当前dpi在第几档（1-10）低4bit 有几档dpi（1-10）
    LodHeight = 4,              // LOD高度 bit4 = 0: 关闭移动唤醒， bit4 = 1: 打开移动唤醒， 低4位是LOD值, LOD是否支持取决于下位机的sensor型号
    Debounce = 5,               // 按键去抖 bit7 motion sync 低4位是Debounce值
    Performance = 6,            // 性能相关 bit7 波纹控制 低4位是直线修正开关 bit0 直线修正。
    DpiValueX = 7,              // Dpi数值数组 X 表示10档DPI X轴的值，每2字节对应一档
    DpiValueY = 27,             // Dpi数值数组 Y 表示10档DPI Y轴的值，每2字节对应一档
    DpiColor = 47,              // 表示10档DPI的颜色RGB值
    SleepTime = 74,             // 休眠时间
    DpiLightEffect = 75,        // DPI灯效控制， 0-N, 0 关闭， 1常亮 ， 2呼吸
    DpiBrightness = 76,         // DPI亮度 1-4
}

export class ConfigTable {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setFieldValue(field: ConfigTableEnum, value: number) {
        this.buffer.setUint8(field, value);
    }

    getFieldValue(field: ConfigTableEnum): number {
        return this.buffer.getUint8(field);
    }

    getDebounce(): number {
        let debounce = this.buffer.getUint8(ConfigTableEnum.Debounce);
        return debounce & 0x0F;
    }
    setDebounce(value: number) {
        let debounce = this.buffer.getUint8(ConfigTableEnum.Debounce);
        debounce = (debounce & 0xF0) | (value & 0x0F);
        this.buffer.setUint8(ConfigTableEnum.Debounce, debounce);
    }

    // 0x01表示125HZ      0x02表示250HZ     
    // 0x03表示500HZ      0x04表示1000HZ
    getReportRate(): number {
        let rate = this.buffer.getUint8(ConfigTableEnum.ReportRate);
        return rate & 0x0F;
    }

    // 0x01表示125HZ      0x02表示250HZ     
    // 0x03表示500HZ      0x04表示1000HZ
    setReportRate(rate: number) {
        let val = this.buffer.getUint8(ConfigTableEnum.Debounce);
        val = (val & 0xF0) | (rate & 0x0F);
        this.buffer.setUint8(ConfigTableEnum.ReportRate, val);
    }

    getLodHeight(): number {
        let val = this.buffer.getUint8(ConfigTableEnum.LodHeight);
        return val & 0x0F;
    }

    setLodHeight(height: number) {
        let val = this.buffer.getUint8(ConfigTableEnum.Debounce);
        val = (val & 0xF0) | (height & 0x0F);
        this.buffer.setUint8(ConfigTableEnum.LodHeight, val);
    }

    // 线性修正
    getAngleSnaping(): boolean {
        let val = this.buffer.getUint8(ConfigTableEnum.Performance);
        return (val & 0x01) > 0;
    }
    // 线性修正
    setAngleSnaping(flag: boolean) {
        let val = this.buffer.getUint8(ConfigTableEnum.Performance);
        val = flag ? val | 0x01 : val & 0xFE;
        this.buffer.setUint8(ConfigTableEnum.Performance, val);
    }

    // 波纹控制
    getRippleEnable(): boolean {
        let val = this.buffer.getUint8(ConfigTableEnum.Performance);
        return (val & 0x80) > 0;
    }
    // 波纹控制
    setRippleEnable(flag: boolean) {
        let val = this.buffer.getUint8(ConfigTableEnum.Performance);
        val = flag ? val | 0x80 : val & 0x7F;
        this.buffer.setUint8(ConfigTableEnum.Performance, val);
    }

    // Motion sync
    getMotionSync(): boolean {
        let val = this.buffer.getUint8(ConfigTableEnum.Debounce);
        return (val & 0x80) > 0;
    }
    // Motion sync
    setMotionSync(flag: boolean) {
        let val = this.buffer.getUint8(ConfigTableEnum.Debounce);
        val = flag ? val | 0x80 : val & 0x7F;
        this.buffer.setUint8(ConfigTableEnum.Debounce, val);
    }

    getSleepTime(): number {
        let val = this.buffer.getUint8(ConfigTableEnum.SleepTime);
        return val * 60;
    }

    setSleepTime(time: number) {
        this.buffer.setUint8(ConfigTableEnum.SleepTime, time / 60);
    }

    getDpiLevel(): number {
        let level = this.buffer.getUint8(ConfigTableEnum.DpiLevel);
        return level >> 4;
    }
    
    getDpiMaxLevel(): number {
        let max = this.buffer.getUint8(ConfigTableEnum.DpiLevel);
        return max & 0x0F;
    }

    setDpiLevel(level: number, maxLevel: number) {
        let dpi = 0x00;
        dpi = level << 4 & 0xF0;
        dpi = dpi | (maxLevel & 0x0F);
        this.buffer.setUint8(ConfigTableEnum.DpiLevel, dpi);
    }

    getDpiValue(level: number): number {
        let dpi = this.buffer.getUint16(ConfigTableEnum.DpiValueX + ((level - 1) * 2), true);

        dpi = (dpi + 1) * 100;

        return dpi;
    }

    setDpiValue(level: number, dpi: number) {
        dpi = (dpi / 100) - 1;
        this.buffer.setUint16(ConfigTableEnum.DpiValueX + ((level - 1) * 2), dpi, true);
        this.buffer.setUint16(ConfigTableEnum.DpiValueY + ((level - 1) * 2), dpi, true);
    }

    getDpiColor(level: number): LedColor {
        let index = level - 1;
        let r = this.buffer.getUint8(ConfigTableEnum.DpiColor + (index * 3));
        let g = this.buffer.getUint8(ConfigTableEnum.DpiColor + (index * 3) + 1);
        let b = this.buffer.getUint8(ConfigTableEnum.DpiColor + (index * 3) + 2);

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
        this.buffer.setUint8(ConfigTableEnum.DpiColor + (index * 3), color.red);
        this.buffer.setUint8(ConfigTableEnum.DpiColor + (index * 3) + 1, color.red);
        this.buffer.setUint8(ConfigTableEnum.DpiColor + (index * 3) + 2, color.red);
    }

    loadDefualtData() {
       let index: number;
       for (index = 0; index < CONFIG_TABLE_DATA.length; index++) {
           this.buffer.setInt8(index, CONFIG_TABLE_DATA[index]);
       }
    }

    static fromReportData(data: DataView): ConfigTable | undefined {
        let table = undefined;

        if (data.byteLength == 400) {
            table = new ConfigTable(data);
        }

        return table;
    }
}