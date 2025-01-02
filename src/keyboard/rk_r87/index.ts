import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_Tap_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Mac, LightEffects  } from './layout'
import { KeyText } from "@/common/keyCode"
import { RK_R87_Dongle } from './rk_r87_dongle'
import { RK_R87_Usb } from './rk_r87_usb'
import { ConnectionType, DeviceType } from '@/device/enum'

export const RK_R87_USB_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO",
    image: "keyboard.png",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyMatrixTable: [
        MatrixTable.WIN,
        MatrixTable.MAC,
    ],
    keyLayout: { 
        0x00: {
            0x00: KeyMap_Normal_Win,
            0x01: KeyMap_FN1_Win,
            0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R87_Usb.create
}

export const RK_R87_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO",
    image: "keyboard.png",
    vendorId: 0x3554,
    productId: 0xFA09,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyMatrixTable: [
        MatrixTable.WIN,
        MatrixTable.MAC,
    ],
    keyLayout: { 
        0x00: {
            0x00: KeyMap_Normal_Win,
            0x01: KeyMap_FN1_Win,
            0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R87_Dongle.create
}

export const RK_R87_LOW_DELAY_USB_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO Low delay",
    image: "keyboard.png",
    vendorId: 0x258A,
    productId: 0x01CB,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyMatrixTable: [
        MatrixTable.WIN,
        MatrixTable.MAC,
    ],
    keyLayout: { 
        0x00: {
            0x00: KeyMap_Normal_Win,
            0x01: KeyMap_FN1_Win,
            0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R87_Usb.create
}

export const RK_R87_LOW_DELAY_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-R87PRO Low delay",
    image: "keyboard.png",
    vendorId: 0x258A,
    productId: 0x01BB,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        KeyMatrixLayer.Tap
    ],
    keyMatrixTable: [
        MatrixTable.WIN,
        MatrixTable.MAC,
    ],
    keyLayout: { 
        0x00: {
            0x00: KeyMap_Normal_Win,
            0x01: KeyMap_FN1_Win,
            0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R87_Dongle.create
}

