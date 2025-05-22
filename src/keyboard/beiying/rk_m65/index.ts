import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_Tap_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Mac  } from './layout'
import { KeyMap_FN1_UK_Win, KeyMap_FN2_UK_Win, KeyMap_Normal_UK_Win, KeyMap_Tap_UK_Win, KeyMap_FN1_UK_Mac, KeyMap_FN2_UK_Mac, KeyMap_Normal_UK_Mac, KeyMap_Tap_UK_Mac  } from './layout'
import { KeyText } from "@/common/keyCode"
import { RK_M65_Dongle } from './rk_m65_dongle'
import { RK_M65_Usb } from './rk_m65_usb'
import { ConnectionType, DeviceType } from '@/device/enum'

export const RK_M65_USB_DEFINE: KeyboardDefine = {
    name: "RK-M65",
    image: "keyboard_rk-m65.png",
    vendorId: 0x258A,
    productId: 0x01FD,
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
    protocol: RK_M65_Usb.create
}

export const RK_M65_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M65",
    image: "keyboard_rk-m65.png",
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
    protocol: RK_M65_Dongle.create
}

export const RK_M65_UK_USB_DEFINE: KeyboardDefine = {
    name: "RK-M65 UK",
    image: "keyboard_rk-m65_uk.png",
    vendorId: 0x258A,
    productId: 0x0202,
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
            0x00: KeyMap_Normal_UK_Win,
            0x01: KeyMap_FN1_UK_Win,
            0x02: KeyMap_FN2_UK_Win,
            0x03: KeyMap_Tap_UK_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_UK_Mac,
            0x01: KeyMap_FN1_UK_Mac,
            0x02: KeyMap_FN2_UK_Mac,
            0x03: KeyMap_Tap_UK_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M65_Usb.create
}

export const RK_M65_UK_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M65 UK",
    image: "keyboard_rk-m65_uk.png",
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
            0x00: KeyMap_Normal_UK_Win,
            0x01: KeyMap_FN1_UK_Win,
            0x02: KeyMap_FN2_UK_Win,
            0x03: KeyMap_Tap_UK_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_UK_Mac,
            0x01: KeyMap_FN1_UK_Mac,
            0x02: KeyMap_FN2_UK_Mac,
            0x03: KeyMap_Tap_UK_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M65_Dongle.create
}