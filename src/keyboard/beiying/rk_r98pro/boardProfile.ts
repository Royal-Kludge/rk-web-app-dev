import { PROFILE_LENGTH } from "./packets/packet";

/**
 * Profile Field
 */
export enum FieldEnum {
    Profile = 1,            // 0~2	当前板载
    ReportRate = 1,         // 0~3   报告率
    Debounce = 2,           // 0~3   去抖次数
    LedParameterType = 32,  // led亮度速度颜色分开还是统一控制，0为分开，1为统一
    LedBrightness = 35,      // 统一控制的亮度
    LedSpeed = 36,           // 统一控制的速度
    LedColor = 34,           // 统一控制的颜色
    LedModeSelection = 9,   // 选择当前LED模式是否是游戏模式，非0为游戏模式，0为其他模式
    LedMode = 33,           // LED模式
    LedGameMode = 10,       // Led游戏模式
    WirelessChannel = 13,   // 无线通道0为2.4，1-3蓝牙通道
    KbConnectMode = 14,     // 键盘处于有线还是无线模式，0为有线，1为2.4，2为蓝牙
    WinLock = 11,           // WIN锁
    KeyLock = 12,           // 按键锁
    WASDSwitch = 17,        // WASD交换
    LogoMode = 37,          // logo灯模式
    LogoColor = 38,         // logo灯颜色
    LogoBrightness = 39,    // logo灯亮度
    LogoSpeed = 40,	        // logo灯速度
	TapDelay = 8,           // tap层delay时间，0为关闭，后7位为有效DELAY时间
	SleepTime = 9,          // 休眠时间 例 1==30 秒，默认 10 为 5 分钟，0 是不休
	LedModeMemery = 26,     // 光灯模式记忆
	Logo2Mode = 41          // logo2灯模式
}

const LED_PARAMETER_INDEX: number = 83; // 2个byte表示颜色亮度速度，前面一个byte为亮度（亮度共20级0-19），后一个byte低4bit颜色，高4bit为速度
const LED_PARAMETER_LENGTH: number = 38;
const LED_GAME_MODE_BRIGHTNESS_INDEX: number = 116; // 游戏灯效下的亮度
const LED_GAME_MODE_BRIGHTNESS_LENGTH: number = 10;

export interface LedParameter {
    brightness: number,
    speed: number,
    color: number
}

export const PROFILE_DEFAULT_DATA: Uint8Array = new Uint8Array([
    0x00,0x00,0x04,0x04,0x00,0x00,0x00,0x00,0x00,0x0A,0x3C,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
    0x09,0x10,
    0x00,0x0A,0x07,0x14,0x03,0x01,0x00,0x04,0x01,0x01,
    0x07,0x04,0x01,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x11,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
    0xFF,0xFF,0x04,0x17,0x04,0x17,0x04,0x17,0xFF,0xFF,
    0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,0x14,0x17,
    0x14,0x14,0x14,0x14,0x14,
    0x5A,0xA5
])
export class BoardProfile {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setFieldValue(field: FieldEnum, value: number) {
        this.buffer.setUint8(field, value);
    }

    getFieldValue(field: FieldEnum) : number {
        return this.buffer.getUint8(field);
    }

    getLedParam(index: number) : LedParameter | undefined {
        let para = undefined;

        if (index <= LED_PARAMETER_LENGTH) {
            index = LED_PARAMETER_INDEX + index * 2;
            let tmp: LedParameter = {
                brightness: this.buffer.getUint8(index),
                speed: this.buffer.getUint8(index + 1) >> 4,
                color: this.buffer.getUint8(index + 1) & 0x0F,
            }
            para = tmp;
        }

        return para;
    }

    setLedParam(index: number, led: LedParameter) {
        if (index <= LED_PARAMETER_LENGTH) {
            index = LED_PARAMETER_INDEX + index * 2;
            this.buffer.setUint8(index, led.brightness);
            let tmp = 0xFF;
            tmp = tmp & (led.speed << 4);
            tmp = tmp | (led.color & 0x0F);
            this.buffer.setUint8(index + 1, tmp);
        }
    }

    static fromReportData(data: DataView) : BoardProfile | undefined {
        let profile = undefined;
        
        if (data.byteLength >= PROFILE_LENGTH) {
            //let buffer = new DataView(data.buffer.slice(PACKET_HEAD_LENGTH, PROFILE_LENGTH + PACKET_HEAD_LENGTH));
            profile = new BoardProfile(data);
        }

        return profile;
    }
}