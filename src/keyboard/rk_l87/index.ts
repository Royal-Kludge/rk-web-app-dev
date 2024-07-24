import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer } from '../enum'
import { KeyMap_FN1, KeyMap_FN2, KeyMap_Normal, KeyMap_Tap, LightEffects  } from './layout'
import { KeyText } from "../keyCode"
import { RK_L87_Dongle } from './rk_l87_dongle'
import { RK_L87_Usb } from './rk_l87_usb'

export const RK_L87_USB_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 0x0001,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyLayout: {
        0x00: KeyMap_Normal,
        0x01: KeyMap_FN1,
        0x02: KeyMap_FN2,
        0x03: KeyMap_Tap,
    },
    lightEffects: LightEffects,
    protocol: RK_L87_Usb.create
}

export const RK_L87_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO",
    vendorId: 0x3554,
    productId: 0xFA09,
    usagePage: 0xFF02,
    usage: 0x0002,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyLayout: {
        0x00: KeyMap_Normal,
        0x01: KeyMap_FN1,
        0x02: KeyMap_FN2,
        0x03: KeyMap_Tap,
    },
    lightEffects: LightEffects,
    protocol: RK_L87_Dongle.create
}

