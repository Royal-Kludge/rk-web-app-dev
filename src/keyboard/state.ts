import type { LightInfo, KeyboardState, KeyboardDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "./enum"
import { RK_L87_USB_DEFINE, RK_L87_DONGLE_DEFINE } from "./rk_l87"

export const VERSION = '1.4.4'

/**
* Initial lightInfo
*/
export const lightInfo: LightInfo = {
    lightOn: false,
    lightEffect: 0x00,
    lightEffects: []
}

/**
* Default / Initial State
*/
export const defaultState: KeyboardState = {
    connectType: ConnectionType.None,
    connectionEvent: ConnectionEventEnum.Disconnect,
    ConnectionStatus: ConnectionStatusEnum.Disconnected,
    deviceName: undefined,
    fwVersion: undefined,
    commandId: 0x00,
    dataChangeFlag: 0,
    keyTableData: {},
    lightInfo: lightInfo
}

/**
* Keyboard list
*/
export const KeyboardDefineList: Record<string, KeyboardDefine> = {
    "rk l87 wire": RK_L87_USB_DEFINE,
    "rk l87 24G": RK_L87_DONGLE_DEFINE,
}