import type { LightInfo, KeyboardState, KeyboardDefine  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "../device/enum"
import { RK_R87_USB_DEFINE, RK_R87_DONGLE_DEFINE } from "./rk_r87"
import { RK_R87_RF_USB_DEFINE, RK_R87_RF_DONGLE_DEFINE } from "./rk_r87_rf"
import { RK_M87_USB_DEFINE, RK_M87_DONGLE_DEFINE, RK_M87_JP_USB_DEFINE, RK_M87_JP_DONGLE_DEFINE, RK_M87_UK_USB_DEFINE, RK_M87_UK_DONGLE_DEFINE } from "./rk_m87"
import { RK_L75_USB_DEFINE, RK_L75_DONGLE_DEFINE, RK_L75_UK_USB_DEFINE, RK_L75_UK_DONGLE_DEFINE } from "./rk_l75"
import { RK_M65_USB_DEFINE, RK_M65_DONGLE_DEFINE, RK_M65_UK_USB_DEFINE, RK_M65_UK_DONGLE_DEFINE } from "./rk_m65"
import { RK_M70_USB_DEFINE, RK_M70_UK_USB_DEFINE, RK_M70_DONGLE_DEFINE, RK_M70_UK_DONGLE_DEFINE } from "./rk_m70"
import { RK_L98_USB_DEFINE, RK_L98_DONGLE_DEFINE } from "./rk_l98"
import { RK_N99_USB_DEFINE, RK_N99_DONGLE_DEFINE } from "./rk_n99"
import { RK_R98PRO_USB_DEFINE, RK_R98PRO_FR_USB_DEFINE, RK_R98PRO_GER_USB_DEFINE } from "./rk_r98pro"
import { RK_S98_USB_DEFINE, RK_S98_DONGLE_DEFINE } from "./rk_s98"
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
    "rk m65 wire": RK_M65_USB_DEFINE,
    "rk m65 24G": RK_M65_DONGLE_DEFINE,
    "rk m65 uk wire": RK_M65_UK_USB_DEFINE,
    "rk m65 uk 24G": RK_M65_UK_DONGLE_DEFINE,
    "rk m70 wire": RK_M70_USB_DEFINE,
    "rk m70 uk wire": RK_M70_UK_USB_DEFINE,
    "rk m70 24G": RK_M70_DONGLE_DEFINE,
    "rk m70 uk 24G": RK_M70_UK_DONGLE_DEFINE,
    "rk l98 wire": RK_L98_USB_DEFINE,
    "rk l98 24G": RK_L98_DONGLE_DEFINE,
    "rk n99 wire": RK_N99_USB_DEFINE,
    "rk n99 24G": RK_N99_DONGLE_DEFINE,
    "rk r98pro wire": RK_R98PRO_USB_DEFINE,
    "rk r98pro fr wire": RK_R98PRO_FR_USB_DEFINE,
    "rk r98pro ger wire": RK_R98PRO_GER_USB_DEFINE,
    "rk s98 usb": RK_S98_USB_DEFINE,
    "rk s98 24G": RK_S98_DONGLE_DEFINE,
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
    0x03000305: "rk m65 24G",
    0x03000316: "rk m65 uk 24G",
    0x03000306: "rk m70 24G",
    0x0300031C: "rk m70 uk 24G",
    0x0600004E: "rk l98 24G",
    0x06000029: "rk n99 24G",
    0x06000023: "rk s98 24G",
}