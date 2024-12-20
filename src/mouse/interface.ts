import type { KeyDefineEnum } from "@/common/keyCode"
import type { HidDeviceDefine } from "../device/interface"
import type { State } from "@/device/state"
import type { KeyMappingType } from "@/common/enum"

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
    serialNo?: String,
    commandId: number,
    dataChangeFlag: number,
}

export interface MouseDefine extends HidDeviceDefine {
    keyText: Record<number, String>,
    protocol: (state: MouseState, device: HIDDevice) => Promise<IProtocol>
}

export interface KeyMappingData {
    keyStr: String,
    keyCode: KeyDefineEnum | number,
    keyMappingType: KeyMappingType,
    keyMappingPara: number,
    keyRaw: number
}

export interface KeyTableData {
    keyStr: String,
    keyCode: KeyDefineEnum,
    index: number,
    keyMappingData: KeyMappingData
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