import type { LightInfo, KeyboardState, KeyboardDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "../device/enum"
import { RK_R87_USB_DEFINE, RK_R87_DONGLE_DEFINE, RK_R87_RF_USB_DEFINE, RK_R87_RF_DONGLE_DEFINE } from "./rk_r87"
import { RK_M87_USB_DEFINE, RK_M87_DONGLE_DEFINE, RK_M87_JP_USB_DEFINE, RK_M87_JP_DONGLE_DEFINE, RK_M87_UK_USB_DEFINE, RK_M87_UK_DONGLE_DEFINE } from "./rk_m87"
import { RK_L75_USB_DEFINE, RK_L75_DONGLE_DEFINE, RK_L75_UK_USB_DEFINE, RK_L75_UK_DONGLE_DEFINE } from "./rk_l75"

export const VERSION = '1.8.0'

//20250102 v1.7.0 Add L75 uk support
//20250110 v1.8.0 Add M87 jp & uk support

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
    "rk r87 wire": RK_R87_USB_DEFINE,
    "rk r87 24G": RK_R87_DONGLE_DEFINE,
    "rk r87 rf wire": RK_R87_RF_USB_DEFINE,
    "rk r87 rf 24G": RK_R87_RF_DONGLE_DEFINE,
    "rk m87 wire": RK_M87_USB_DEFINE,
    "rk m87 24G": RK_M87_DONGLE_DEFINE,
    "rk m87 jp wire": RK_M87_JP_USB_DEFINE,
    "rk m87 jp 24G": RK_M87_JP_DONGLE_DEFINE,
    "rk m87 uk wire": RK_M87_UK_USB_DEFINE,
    "rk m87 uk 24G": RK_M87_UK_DONGLE_DEFINE,
    "rk l75 wire": RK_L75_USB_DEFINE,
    "rk l75 24G": RK_L75_DONGLE_DEFINE,
    "rk l75 uk wire": RK_L75_UK_USB_DEFINE,
    "rk l75 uk 24G": RK_L75_UK_DONGLE_DEFINE,
}

/**
* Dongle password list
*/
export const DonglePwdDefineList: Record<number, string> = {
    0x03000156: "rk r87 24G",
    0x0A000004: "rk r87 rf 24G",
    0x0600002A: "rk m87 24G",
    0x06000049: "rk m87 jp 24G",
    0x06000039: "rk m87 uk 24G",
    0x030001FC: "rk l75 24G",
    0x03000311: "rk l75 uk 24G",
}