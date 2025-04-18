import type { KeyDefineEnum } from "@/common/keyCode"
import type { HidDeviceDefine } from "../device/interface"
import type { State } from "@/device/state"
import type { DpiCodeEnum, KeyMappingType, MacroLoopEnum, ModifyKey, KeyFunctionType, MouseKeyCode, ReportRateCodeEnum } from "@/mouse/enum"

export interface KeyState {
    index: number,
    selected: boolean,
    KeyData: KeyTableData
  }
  
/**
 * Mouse State
 * 
 * Stores information about the current Mouse state, and its components.
 */
export interface MouseState extends State {
    fwVersion?: String,
    dongleFwVersion?: String,
    serialNo?: String,
    commandId: number,
    dataChangeFlag: number,
    batteryStatus: number,
    batteryValue: number,
}

export interface MouseDefine extends HidDeviceDefine {
    keyText: Record<number, Array<String>>,
    layout: Array<KeyTableData>,
    protocol: (state: MouseState, device: HIDDevice) => Promise<IProtocol>
}

export interface KeyMappingData {
    keyStr: String,
    keyFunctionType: KeyFunctionType,
    keyMappingType: KeyMappingType,
    keyTypeCode: number | MouseKeyCode | MacroLoopEnum | DpiCodeEnum | ReportRateCodeEnum | ModifyKey,
    keyParam1: number,
    keyParam2: number,
    keyRaw: number
}

export interface LedColor {
    red: number,
    green: number,
    blue: number,
    color: string
}

export interface KeyData {
    keyType: KeyMappingType,
    green: number,
    blue: number,
}

export interface KeyTableData {
    keyStr: String,
    keyCode: KeyDefineEnum,
    index: number,
    keyMappingData: KeyMappingData
}

export interface LeftSideKey {
    isEnable: boolean,
    key3: KeyMappingData,
    key4: KeyMappingData
}

export interface IProtocol {
    state: MouseState;
    device?: HIDDevice

    init: () => Promise<void> | null;
    destroy: () => Promise<void> | null;
}

export interface IPacket {
    fromReportData(buffer: DataView) : IPacket;
}

export interface KeyCodeTable {
    key: string,
    hid: number,
    vk: number
}