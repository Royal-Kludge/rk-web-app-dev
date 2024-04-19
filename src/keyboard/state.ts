import type { LightInfo, KeyboardState, KeyboardDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum } from "./enum"
import { RK_L87_DEFINE } from "./rk_l87"

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
    connectType: ConnectionType.Disconnected,
    connectionEvent: ConnectionEventEnum.Disconnect,
    deviceName: undefined,
    fwVersion: undefined,
    commandId: 0x00,
    dataChangeFlag: 0,
    keyTableData: [],
    lightInfo: lightInfo
}

/**
* Keyboard list
*/
export const KeyboardDefineList: Record<string, KeyboardDefine> = {
    "rk l87": RK_L87_DEFINE
}