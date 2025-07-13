import { Protocol } from '@/keyboard/sparklink/protocol'
import type { Macros } from '@/keyboard/sparklink/macros';
import { LOG_TYPE, Logging } from '@/common/logging';
import type { Axis, KeyboardState, KeyCmdValue, KeyInfo, LedColor, LightSetting, PerformanceData } from '../interface';
import type { KeyCodeEnum, KeyDefineEnum } from '@/common/keyCode_sparklink';
import { LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum, OrderTypeEnum, SuperResponseEnum, type LayoutTypeEnum, type MatrixTable } from '../enum';
import { KeyInfoData } from '../keyInfoData';
import type { KeyTableData } from '../keyTableData';

export const RK_C61_EVENT_DEFINE = {
    OnMacrosGotten: "OnMacrosGotten",
    OnKeyDefaultLayoutGotten: "OnKeyDefaultLayoutGotten",
    OnKeyValuesGotten: "OnKeyValuesGotten",
    OnKeyRgbGotten: "OnKeyRgbGotten",
    OnSynced: "OnSynced",
    OnAdjustingMMDataGotten: "OnAdjustingMMDataGotten",
    OnAdjustingPressDataGotten: "OnAdjustingPressDataGotten",
    OnAdjustingAdcDataGotten: "OnAdjustingAdcDataGotten",
    OnAdjustingAdcValueUpdate: "OnAdjustingAdcValueUpdate",
}

export const COMMAND_ID = {
    KB2_CMD: 0x00,
    KB2_CMD_SYNC: 0x01, // 同步
    KB2_CMD_KEY: 0x23, // 层数
    KB2_CMD_DB: 0x29, // 全局行程
    KB2_CMD_DEFKEY: 0x2b, // 默认键值
    KB2_CMD_RM6X21: 0x12, // 矩阵
    KB2_CMD_MT: 0x24, // MT
    KB2_CMD_TGL: 0x25, // TGL
    KB2_CMD_TDKS: 0x26, // TDKS
    KB2_CMD_DDKS: 0x27, // DDKS
    KB2_CMD_END: 0x28, // END
    KB2_CMD_MACRO: 0x20, // MACRO
    KB2_CMD_MACROMODE: 0x21, // macro mode
    KB2_CMD_SOCD: 0x2c, // SOCD
    KB2_CMD_RS: 0x2d, // RS
    KB2_CMD_PRGB: 0x18, // PRGB
    KB2_CMD_LOGORGB: 0x19, // rgb灯
    KB2_CMD_KRGB: 0x2a, // KRGB参数

    // 固件升级
    KB2_BL_SIGN: 0x08, // 签名
    KB2_BL_ERASE: 0x09, // 擦除
    KB2_BL_REBOOT: 0x0a, // 重启
    KB2_BL_TOAPP: 0x0b, // 跳转到app
    KB2_BL_WRITE: 0x0c, // 写指令
    KB2_BL_READ: 0x0d, // 读指令
    KB2_BL_RCRC: 0x0e, // 获取校验

    KB2_CMD_PIC: 0x30, // 屏幕图片大小
    KB2_CMD_PIC_WRITE: 0x31, // 写入屏幕图片

    KB2_BL_ERASE_SCREEN: 0x32, // 擦除屏幕固件
    KB2_BL_WRITE_SCREEN: 0x33, // 写屏幕固件
    KB2_BL_TOBOOT_SCREEN: 0x34, // 屏幕跳转到boot

    KB2_CMD_FAIL: 0xff, // 错误
}

export class BoardId {
    id?: number;
    kbLayout?: number;
    axisType?: number;
}

export class HwVersion {
    version?: String;
    major?: number;
    minor?: number;
    patch?: number;
    fwSize: number = 0;
}

export class FwVersion {
    appVersion?: string;
    buildDate?: string;
}

export class RK_C61_Data {
    isSynced: boolean = false;
    keyboardName?: string;
    protocolVersion?: string;
    boardId?: BoardId;
    runMode?: number;
    sn?: string;
    hwVersion?: HwVersion;
    fwVersion?: FwVersion;
    configId?: number;
    axisList?: Array<Axis>;
    kbWinMacMode?: MatrixTable;
    isWinMacSupport: number = 0;
    topDeadSwitch: boolean = false;
    performanceData: PerformanceData;
    lightSetting: LightSetting;
    keyInfoData: KeyInfoData;
    macros?: Macros;
    //kbTableDatas?: Record<KeyDefineEnum, KeyTableData>;

    constructor() {
        this.keyInfoData = new KeyInfoData();

        this.lightSetting = {
            lightColorList: new Array<LedColor>,
            lightSwitch: LightSwitchEnum.Off,
            lightMode: LightEffectEnum.Off,
            lightBigMode: LightModeEnum.Disable,
            lightBrightness: 0,
            lightSpeed: 0,
            lightSleepDelay: 0,
            lightDirection: LightDirectionEnum.Forward,
            superResponse: SuperResponseEnum.Off,
            staticLightMode: 0
        };

        this.performanceData = {
            PerformancePage: 0,
            precision: 0.1, // 键盘行程精度
            decimalPlace: 2, // 行程显示的小数位
            minTouchTravel: 0.1, // 最小触发行程(方法中有使用，待移植方法)
            maxTouchTravel: 4.0, // 最大触发行程(方法中有使用，待移植方法)
            globalTouchTravel: 1.5, // 全局触发行程
            singleTouchTravel: 1.5, // 单键触发行程
            singleTouchRelease: 1.5, // 单键释放行程(特殊)
            pressDead: 0.2, // 按压死区
            releaseDead: 0.2, // 抬起死区
            topDeadSwitch: false, // 顶部死区开关
            pressDeadOptimizeSwitch: false, // 按压死区优化
            releaseDesdOptimizeSwitch: false, // 抬起死区优化
            rateOfReturn: -1, // 回报率
            quickTouchPress: 0.3, // 快速触发按下行程
            quickTouchRelease: 0.3, // 快速触发抬起行程
            quickTouchSwitchDisable: true, // (方法中有使用，待移植方法)
            quickTouchSwitch: false, // (方法中有使用，待移植方法)
            isAdjusting: false, // 是否开启校准
            adjustingCount: 0, // 校准计数触发器
            travelTestOn: false, // 行程测试
            keyPressTestCount: 0, // 按键测试计数触发器
            hasAxisSetting: false,
        };
    }
}

export abstract class RK_C61 extends Protocol {

    data: RK_C61_Data = new RK_C61_Data();
    
    abstract onGetReport(reportId: number, data: DataView): Promise<void>;
    abstract cmd(order: OrderTypeEnum, arg: number): Promise<void>;
    abstract loadData(): Promise<void>;
    abstract getAdustingData(type: number, page: number): Promise<void>;
    abstract getMacros(): Promise<void>;
    abstract setKeyValues(keyCmdValues: Array<KeyCmdValue>): Promise<void>;
    abstract setPrgb(): Promise<void>;
    abstract setKrgb(): Promise<void>;
    abstract setKeyKrgb(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setDB(): Promise<void>;
    abstract setReportRate(): Promise<void>;
    abstract setAdjustingOn(): Promise<void>;
    abstract setAdjustingOff(): Promise<void>;
    abstract setDks(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setMt(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setTgl(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setMpt(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setEnd(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setSocd(keyInfos: Array<KeyInfo>): Promise<void>;
    abstract setMacros(): Promise<void>;
    
    callback = (e: HIDInputReportEvent) => this.processKeyboardReport(e);

    async init(): Promise<void> {
        this.device.addEventListener("inputreport", this.callback);
    }

    async destroy(): Promise<void> {
        this.device.removeEventListener("inputreport", this.callback);
    }

    async getFeature(reportId: number): Promise<DataView> {
        let data = await this.device.receiveFeatureReport(reportId);
        let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
        Logging.console(LOG_TYPE.INFO, `GetFeature [${data.byteLength}] bytes -> ${u8.toString()}`);

        return data;
    }

    async setFeature(reportId: number, data: Uint8Array): Promise<void> {
        await this.device.sendFeatureReport(reportId, data);
        Logging.console(LOG_TYPE.INFO, `SetFeature [${data.byteLength}] bytes -> ${data.toString()}`);
    }

    async setReport(reportId: number, data: Uint8Array): Promise<void> {
        await this.device.sendReport(reportId, data);
        Logging.console(LOG_TYPE.INFO, `SetReport [${data.byteLength}] bytes -> ${data.toString()}`);
    }

    private async processKeyboardReport(report: HIDInputReportEvent) {
        let reportId = report.reportId;
        const { data } = report;

        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            Logging.console(LOG_TYPE.INFO, `GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (this.onGetReport != null) {
                await this.onGetReport(reportId, data);
            }
        } catch (e) {
            this.device.close();
        }
    }
}