import type { MouseState, MouseDefine, IMouseReport  } from './interface'
import { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum"
import { RK_M3_USB_DEFINE, RK_M3_DONGLE_DEFINE } from "./rk_m3"
import { RK_M30_USB_DEFINE, RK_M30_DONGLE_DEFINE } from "./rk_m30"
import { RK_M3_Mouse_Report } from './rk_m3/rk_m3_mouse_report'
import { RK_M30_Mouse_Report } from './rk_m30/rk_m30_mouse_report'
import { RK_K3_USB_DEFINE, RK_K3_DONGLE_DEFINE } from "./rk_k3"
import { RK_K3_Mouse_Report } from './rk_k3/rk_k3_mouse_report'

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

export const RK_MOUSE_EVENT_DEFINE: {
    OnDongleStatusChanged: string;
    OnDpiLevelChanged: string;
    OnPasswordGotten: string;
    OnBatteryGotten: string;
    OnReportFinish: string;
    OnReportStart: string;
    OnMacrosGotten: string;
} = {
    OnDongleStatusChanged: 'OnDongleStatusChanged',
    OnDpiLevelChanged: 'OnDpiLevelChanged',
    OnPasswordGotten: 'OnPasswordGotten',
    OnBatteryGotten: 'OnBatteryGotten',
    OnReportFinish: 'OnReportFinish',
    OnReportStart: 'OnReportStart',
    OnMacrosGotten: 'OnMacrosGotten',
}

/**
* Mouse list
*/
export const MouseDefineList: Record<string, MouseDefine> = {
    "rk m3 wire": RK_M3_USB_DEFINE,
    "rk m3 24G": RK_M3_DONGLE_DEFINE,
    "rk m30 wire": RK_M30_USB_DEFINE,
    "rk m30 24G": RK_M30_DONGLE_DEFINE,
    "rk k3 wire": RK_K3_USB_DEFINE,
    "rk k3 24G": RK_K3_DONGLE_DEFINE,
}

/**
* Dongle password list
*/
export const DonglePwdDefineList: Record<number, string> = {
    0x09000000000F: "rk m3 24G",
    0x040000000026: "rk m30 24G",
    0x09000000001F: "rk k3 24G",
}

/**
* Mouse list
*/
export const MouseReportList: Record<string, ((state: MouseState, device: HIDDevice) => IMouseReport)> = {
    "rk m3 wire": RK_M3_Mouse_Report.create,
    "rk m3 24G": RK_M3_Mouse_Report.create,
    "rk m30 wire": RK_M30_Mouse_Report.create,
    "rk m30 24G": RK_M30_Mouse_Report.create,
    "rk k3 wire": RK_K3_Mouse_Report.create,
    "rk k3 24G": RK_K3_Mouse_Report.create,
}