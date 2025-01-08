import type { MouseDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { ConnectionType, DeviceType } from '@/device/enum'
import { RK_K3_Usb } from './rk_k3_usb'

export const RK_K3_USB_DEFINE: MouseDefine = {
    name: "RK-M300",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    keyText: KeyText,
    protocol: RK_K3_Usb.create
}