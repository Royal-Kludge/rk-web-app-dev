import type { MouseDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'
import { RK_M30_Mouse } from './rk_m30_mouse'
import { KEY_LAYOUT } from './layout'

export const RK_M30_USB_DEFINE: MouseDefine = {
    name: "RK-M30",
    vendorId: 0x258A,
    productId: 0x0136,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_M30_Mouse.create
}

export const RK_M30_DONGLE_DEFINE: MouseDefine = {
    name: "RK-M30",
    vendorId: 0x258A,
    productId: 0x1018,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_M30_Mouse.create
}