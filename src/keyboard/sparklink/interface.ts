import { KeyDefineEnum } from "@/common/keyCode"
import type { HidDeviceDefine } from "@/device/interface"
import type { State } from "@/device/state"
import type { KeyMatrixLayer, LayoutTypeEnum, LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum, MatrixTable, SuperResponseEnum } from "./enum"
import type { KeyTableData } from "./keyTableData"

export interface KeyState {
    index: number,
    selected: boolean,
    isHover: boolean,
    keyData: KeyTableData
}

/**
 * Keyboard State
 * 
 * Stores information about the current Keyboard state, and its components.
 */
export interface KeyboardState extends State {
    fwVersion?: String,
    serialNo?: String,
    keyTableData: Array<KeyTableData>
}

export interface KeyboardDefine extends HidDeviceDefine {
    image: string,
    keyText: Record<number, Array<String>>,
    //keyMatrixLayer: Array<KeyMatrixLayer>,
    //keyMatrixTable: Array<MatrixTable>,
    //keyLayout: Record<number, Record<number, Array<number>>>,
    keyLayout: Array<Array<KeyInfo | null>>,
    protocol: (state: KeyboardState, device: HIDDevice) => Promise<IProtocol>
}

export interface LedColor {
    red: number,
    green: number,
    blue: number,
    color: string
}

export interface IProtocol {
    state: KeyboardState;
    device?: HIDDevice

    init: () => Promise<void> | null;
    destroy: () => Promise<void> | null;
}

export interface IPacket {
    fromReportData(buffer: DataView) : Promise<void>;
}

export interface Key {
    key: number, 
    style: string, 
    index: number, 
    keyData: KeyTableData | undefined,
    img?: string
}

export interface KeyLine {
    line: number,
    style: string,
    keys: Array<Key>
}

export interface Axis {
    id: number;
    name: string;
    maxTravel: number;
    minTravel: number;
    color: string;
}

export interface LightSetting {
    lightColorList: Array<LedColor>,
    lightSwitch: LightSwitchEnum,
    lightMode: LightEffectEnum,
    lightBigMode: LightModeEnum,
    lightBrightness: number,
    lightSpeed: number,
    // (0x01=1min,0x02=2min(默认),0x03=3min,0x05=5min,0x0a=10min,0x0f=15min,0x14=20min,0x19=25min,0x1e=30min,0x2d=45min,0x3c=60min,0x78=120min,0x00=永久)。
    lightSleepDelay: number,
    lightDirection: LightDirectionEnum,
    superResponse: SuperResponseEnum,
    staticLightMode: number
}

export interface DKSInfo {
    DKS: Array<number>,
    TRPS: Array<number>,
    DB: number,
    DB2: number
}

export interface MPTInfo {
    DKS: Array<number>,
    DB: Array<number>
}

export interface MTInfo {
    DKS: Array<number>,
    delay: number
}

export interface TGLInfo {
    DKS: number,
    delay: number
}

export interface ENDInfo {
    DKS: number
}

export interface SOCDInfo {
    DKS: Array<number>,
    DKSV: Array<number>,
    type: number,
    mode: number
}

export interface RSInfo {
    DKS: Array<number>
}

export interface KeyCmdValue {
    keyCode: KeyDefineEnum,
    value: number,
    layout: LayoutTypeEnum
}

export interface KeyInfo {
    keyValue: number,
    row: number,
    col: number,
    color: LedColor,
    touchTravel: number,
    touchRelease: number,
    quickTouchPress: number,
    quickTouchRelease: number
    deadPress: number,
    deadRelease: number,
    isCheck: boolean,
    isSingleTouch: boolean,
    isQuickTouch: boolean,
    isAdvancedKey: boolean,
    advanceKeyType: number,
    macroBreak: boolean
    fn0_keyValue: number,
    fn1_keyValue: number,
    fn2_keyValue: number,
    fn3_keyValue: number,
    fn_keyValue: Array<number>,
    DKSInfo: DKSInfo,
    MPTInfo: MPTInfo,
    MTInfo: MTInfo,
    TGLInfo: TGLInfo,
    ENDInfo: ENDInfo,
    SOCDInfo: SOCDInfo,
    RSInfo: RSInfo,
    axisID: number,
    adjustingMM: number,
    adjustingADC: number,
    adjustingPress: number,
    adjustingSuccess: boolean,
}

export interface PerformanceData {
    PerformancePage: number,
    precision: number, // 键盘行程精度
    decimalPlace: number, // 行程显示的小数位
    minTouchTravel: number, // 最小触发行程(方法中有使用，待移植方法)
    maxTouchTravel: number, // 最大触发行程(方法中有使用，待移植方法)
    globalTouchTravel: number, // 全局触发行程
    singleTouchTravel: number, // 单键触发行程
    singleTouchRelease: number, // 单键释放行程(特殊)
    pressDead: number, // 按压死区
    releaseDead: number, // 抬起死区
    topDeadSwitch: boolean, // 顶部死区开关
    pressDeadOptimizeSwitch: boolean, // 按压死区优化
    releaseDesdOptimizeSwitch: boolean, // 抬起死区优化
    rateOfReturn: number, // 回报率
    quickTouchPress: number, // 快速触发按下行程
    quickTouchRelease: number, // 快速触发抬起行程
    quickTouchSwitchDisable: boolean, // (方法中有使用，待移植方法)
    quickTouchSwitch: boolean, // (方法中有使用，待移植方法)
    isAdjusting: boolean, // 是否开启校准
    adjustingCount: number, // 校准计数触发器
    travelTestOn: any, // 行程测试
    keyPressTestCount: number, // 按键测试计数触发器
    hasAxisSetting: boolean,
}