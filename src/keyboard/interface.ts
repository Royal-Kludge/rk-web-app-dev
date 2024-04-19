import { KeyDefineEnum } from "./keyCode"
import { ConnectionType, ConnectionEventEnum, KeyRemappingType } from "./enum"

/**
 * Keyboard State
 * 
 * Stores information about the current Keyboard state, and its components.
 */
export interface KeyboardState {
    /** Interface used for communication (USB/Bluetooth) */
    connectType: ConnectionType,
    connectionEvent: ConnectionEventEnum,
    productId?: number,
    deviceName?: String,
    fwVersion?: String,
    serialNo?: String,
    commandId: number,
    dataChangeFlag: number,
    keyTableData: Array<KeyTableData>,
    lightInfo: LightInfo
}

export interface KeyboardDefine {
    name: String,
    vendorId: number,
    productId: number,
    usagePage: number,
    usage: number,
    keyText: Record<number, String>,
    keyLayout: Array<KeyDefineEnum>,
    lightEffects: Array<LightEffect>,
    protocol: (state: KeyboardState, device: HIDDevice) => IProtocol,
}

export interface KeyMappingData {
    key: String,
    keyCode: KeyDefineEnum
}

export interface LedColor {
    red: number,
    green: number,
    blue: number,
    color: string
}

export interface LightEffect {
    effect: number,
    speed: boolean,
    brightness: boolean,
    color?: LedColor,
    mixColor: boolean,
    sleep: number
}

export interface LightInfo {
    lightOn: boolean,
    lightEffect: number,
    lightEffects: Array<LightEffect>
}

export interface KeyTableData {
    key: String,
    keyCode: KeyDefineEnum,
    index: number,
    selected: boolean,
    keyMappingData: KeyMappingData
}

export interface IProtocol {
    state: KeyboardState;
    device?: HIDDevice

    setReport: ((reportId: number, data: BufferSource) => Promise<void>) | null;
    getReport: ((reportId: number) => Promise<DataView>) | null;
    init: () => Promise<void> | null;
}

export interface IPacket {
    fromReportData(buffer: DataView) : IPacket;
}