import type { MouseState, MouseDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "../device/enum"
import { RK_M3_USB_DEFINE, RK_M3_DONGLE_DEFINE } from "./rk_m3"

export const VERSION = '1.9.1'

//20250102 v1.7.0 Add L75 uk support
//20250110 v1.8.0 Add M87 jp & uk support
//20250115 v1.8.1 Fix some dongle issue
//20250117 v1.8.2 Fix issue when test by RK
//20250206 v1.9.0 Add M65
//20250219 v1.9.1 Fix some bug and add clear stroage data button

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