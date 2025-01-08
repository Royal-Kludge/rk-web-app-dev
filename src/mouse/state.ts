import type { MouseState, MouseDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "../device/enum"
import { RK_K3_USB_DEFINE } from "./rk_k3"

export const VERSION = '1.6.1'

/**
* Default / Initial State
*/
export const defaultState: MouseState = {
    connectType: ConnectionType.None,
    connectionEvent: ConnectionEventEnum.Disconnect,
    ConnectionStatus: ConnectionStatusEnum.Disconnected,
    deviceName: undefined,
    fwVersion: undefined,
    commandId: 0x00,
    dataChangeFlag: 0,
}

/**
* Mouse list
*/
export const MouseDefineList: Record<string, MouseDefine> = {
    "rk k3 wire": RK_K3_USB_DEFINE,
}

/**
* Dongle password list
*/
export const DonglePwdDefineList: Record<number, string> = {
    0x03000156: "rk k3 24G",
}