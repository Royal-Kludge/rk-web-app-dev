import type { MouseDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { ConnectionType, DeviceType } from '@/device/enum'
import { RK_M3_Mouse } from './rk_m3_mouse'
import { KEY_LAYOUT } from './layout'

export const RK_M3_USB_DEFINE: MouseDefine = {
    name: "RK-M3",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_M3_Mouse.create
}

export const RK_M3_DONGLE_DEFINE: MouseDefine = {
    name: "RK-M3",
    vendorId: 0x372E,
    productId: 0x1019,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_M3_Mouse.create
}