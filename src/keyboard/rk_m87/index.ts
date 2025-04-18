import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_Tap_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Mac, LightEffects  } from './layout'
import { KeyMap_FN1_JP_Win, KeyMap_FN2_JP_Win, KeyMap_Normal_JP_Win, KeyMap_Tap_JP_Win, KeyMap_FN1_JP_Mac, KeyMap_FN2_JP_Mac, KeyMap_Normal_JP_Mac, KeyMap_Tap_JP_Mac  } from './layout_jp'
import { KeyMap_FN1_UK_Win, KeyMap_FN2_UK_Win, KeyMap_Normal_UK_Win, KeyMap_Tap_UK_Win, KeyMap_FN1_UK_Mac, KeyMap_FN2_UK_Mac, KeyMap_Normal_UK_Mac, KeyMap_Tap_UK_Mac  } from './layout_uk'
import { KeyText, KeyText_jp } from "@/common/keyCode_m87"
import { RK_M87_Dongle } from './rk_m87_dongle'
import { RK_M87_Usb } from './rk_m87_usb'
import { ConnectionType, DeviceType } from '@/device/enum'

export const RK_M87_USB_DEFINE: KeyboardDefine = {
    name: "RK-M87",
    image: "keyboard_rk-m87.png",
    vendorId: 0x258A,
    productId: 0x01A2,
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
    protocol: RK_M87_Usb.create
}

export const RK_M87_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M87",
    image: "keyboard_rk-m87.png",
    vendorId: 0x258A,
    productId: 0x0150,
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
    protocol: RK_M87_Dongle.create
}

export const RK_M87_JP_USB_DEFINE: KeyboardDefine = {
    name: "RK-M87 JP",
    image: "keyboard_rk-m87_jp.png",
    vendorId: 0x258A,
    productId: 0x01F5,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText_jp,
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
            0x00: KeyMap_Normal_JP_Win,
            0x01: KeyMap_FN1_JP_Win,
            0x02: KeyMap_FN2_JP_Win,
            0x03: KeyMap_Tap_JP_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_JP_Mac,
            0x01: KeyMap_FN1_JP_Mac,
            0x02: KeyMap_FN2_JP_Mac,
            0x03: KeyMap_Tap_JP_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M87_Usb.create
}

export const RK_M87_JP_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M87 JP",
    image: "keyboard_rk-m87_jp.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText_jp,
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
            0x00: KeyMap_Normal_JP_Win,
            0x01: KeyMap_FN1_JP_Win,
            0x02: KeyMap_FN2_JP_Win,
            0x03: KeyMap_Tap_JP_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_JP_Mac,
            0x01: KeyMap_FN1_JP_Mac,
            0x02: KeyMap_FN2_JP_Mac,
            0x03: KeyMap_Tap_JP_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M87_Dongle.create
}

export const RK_M87_UK_USB_DEFINE: KeyboardDefine = {
    name: "RK-M87 UK",
    image: "keyboard_rk-m87_uk.png",
    vendorId: 0x258A,
    productId: 0x01D6,
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
    protocol: RK_M87_Usb.create
}

export const RK_M87_UK_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M87 UK",
    image: "keyboard_rk-m87_uk.png",
    vendorId: 0x258A,
    productId: 0x0150,
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
    protocol: RK_M87_Dongle.create
}