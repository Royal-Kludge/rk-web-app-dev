import type { KeyboardState, KeyboardDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum, ProtocolType } from "@/device/enum"
import { RK_C61_USB_DEFINE } from "./rk_c61"


/**
* Default / Initial State
*/
export const defaultState: KeyboardState = {
    connectType: ConnectionType.None,
    connectionEvent: ConnectionEventEnum.Disconnect,
    ConnectionStatus: ConnectionStatusEnum.Disconnected,
    protocolType: ProtocolType.SparkLink,
    deviceName: undefined,
    fwVersion: undefined,
    keyTableData: {},
}

/**
* Keyboard list
*/
export const KeyboardDefineList: Record<string, KeyboardDefine> = {
    "rk c61 wire": RK_C61_USB_DEFINE,
}