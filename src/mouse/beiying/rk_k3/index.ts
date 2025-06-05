import type { MouseDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'
import { RK_K3_Mouse } from './rk_k3_mouse'
import { KEY_LAYOUT } from './layout'

export const RK_K3_USB_DEFINE: MouseDefine = {
    name: "RK-K3",
    vendorId: 0x372E,
    productId: 0x1045,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_K3_Mouse.create
}

export const RK_K3_DONGLE_DEFINE: MouseDefine = {
    name: "RK-K3",
    vendorId: 0x372E,
    productId: 0x103F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing,
    layout: KEY_LAYOUT,
    keyText: KeyText,
    protocol: RK_K3_Mouse.create
}