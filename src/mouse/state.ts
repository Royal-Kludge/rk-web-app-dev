import type { MouseState, MouseDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "../device/enum"
import { RK_M3_USB_DEFINE, RK_M3_DONGLE_DEFINE } from "./rk_m3"

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
    batteryStatus: 0,
    batteryValue: 0
}

/**
* Mouse list
*/
export const MouseDefineList: Record<string, MouseDefine> = {
    "rk m3 wire": RK_M3_USB_DEFINE,
    "rk m3 24G": RK_M3_DONGLE_DEFINE,
}

/**
* Dongle password list
*/
export const DonglePwdDefineList: Record<number, string> = {
    0x09000000000F: "rk m3 24G",
}