import type { KeyboardDefine  } from '../interface'
import { KeyMap_Normal, LightEffects  } from './layout'
import { KeyText } from "../keyCode"
import { RK_L87_Dongle } from './rk_l87_dongle'
import { RK_L87_Usb } from './rk_l87_usb'

export const RK_L87_USB_DEFINE: KeyboardDefine = {
    name: "rk l87",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 0x0001,
    keyText: KeyText,
    keyLayout: KeyMap_Normal,
    lightEffects: LightEffects,
    protocol: RK_L87_Usb.create
}

export const RK_L87_DONGLE_DEFINE: KeyboardDefine = {
    name: "rk l87",
    vendorId: 0x3554,
    productId: 0xFA09,
    usagePage: 0xFF02,
    usage: 0x0002,
    keyText: KeyText,
    keyLayout: KeyMap_Normal,
    lightEffects: LightEffects,
    protocol: RK_L87_Dongle.create
}

