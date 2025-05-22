import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win,  KeyMap_Normal_Win, KeyMap_Tap_Win, KeyMap_FN1_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Mac  } from './layout'
import { KeyMap_FN1_UK_Win,  KeyMap_Normal_UK_Win, KeyMap_Tap_UK_Win, KeyMap_FN1_UK_Mac,  KeyMap_Normal_UK_Mac, KeyMap_Tap_UK_Mac  } from './layout'
import { KeyText } from "@/common/keyCode"
import { RK_M70_Dongle } from './rk_m70_dongle'
import { RK_M70_Usb } from './rk_m70_usb'
import { ConnectionType, DeviceType } from '@/device/enum'

export const RK_M70_USB_DEFINE: KeyboardDefine = {
    name: "RK-M70",
    image: "keyboard_rk-m70.png",
    vendorId: 0x258A,
    productId: 0x01FE,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        //KeyMatrixLayer.FN2,
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
            //0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            //0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M70_Usb.create
}

export const RK_M70_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M70",
    image: "keyboard_rk-m70.png",
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
        //KeyMatrixLayer.FN2,
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
            //0x02: KeyMap_FN2_Win,
            0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            //0x02: KeyMap_FN2_Mac,
            0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M70_Dongle.create
}

export const RK_M70_UK_USB_DEFINE: KeyboardDefine = {
    name: "RK-M70 UK",
    image: "keyboard_rk-m70_uk.png",
    vendorId: 0x258A,
    productId: 0x0203,
    usagePage: 0xFF00,
    usage: 0x0001,  
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        //KeyMatrixLayer.FN2,
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
            //0x02: KeyMap_FN2_UK_Win,
            0x03: KeyMap_Tap_UK_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_UK_Mac,
            0x01: KeyMap_FN1_UK_Mac,
            //0x02: KeyMap_FN2_UK_Mac,
            0x03: KeyMap_Tap_UK_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M70_Usb.create
}

export const RK_M70_UK_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-M70 UK",
    image: "keyboard_rk-m70_uk.png",
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
        //KeyMatrixLayer.FN2,
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
            //0x02: KeyMap_FN2_UK_Win,
            0x03: KeyMap_Tap_UK_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_UK_Mac,
            0x01: KeyMap_FN1_UK_Mac,
            //0x02: KeyMap_FN2_UK_Mac,
            0x03: KeyMap_Tap_UK_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_M70_Dongle.create
}