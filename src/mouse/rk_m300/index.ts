import type { MouseDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { ConnectionType, DeviceType } from '@/device/enum'
import { RK_M300_Usb } from './m300_usb'

export const RK_M300_USB_DEFINE: MouseDefine = {
    name: "RK-M300",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    keyText: KeyText,
    protocol: RK_M300_Usb.create
}