import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac } from './layout'
import { KeyText } from "@/common/keyCode"
import { RK_L98_Dongle } from './rk_l98_dongle'
import { RK_L98_Usb } from './rk_l98_usb'
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'

export const RK_L98_USB_DEFINE: KeyboardDefine = {
    name: "RK-L98",
    image: "keyboard_rk-l98.png",
    vendorId: 0x258A,
    productId: 0x01FB,
    usagePage: 0xFF02,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        //KeyMatrixLayer.Tap
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
            //0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            //0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_L98_Usb.create
}

export const RK_L98_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-L98",
    image: "keyboard_rk-l98.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.Nomal,
        KeyMatrixLayer.FN1,
        KeyMatrixLayer.FN2,
        //KeyMatrixLayer.Tap
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
            //0x03: KeyMap_Tap_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_Mac,
            0x01: KeyMap_FN1_Mac,
            0x02: KeyMap_FN2_Mac,
            //0x03: KeyMap_Tap_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_L98_Dongle.create
}

/*export const RK_L98_UK_USB_DEFINE: KeyboardDefine = {
    name: "RK-L98 UK",
    image: "keyboard_rk-l98_uk.png",
    vendorId: 0x258A,
    productId: 0x0203,
    usagePage: 0xFF00,
    usage: 0x0001,  
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    keyText: KeyText,
    keyMatrixLayer: [
        KeyMatrixLayer.nomal,
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
    protocol: RK_L98_Usb.create
}

export const RK_L98_UK_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-L98 UK",
    image: "keyboard_rk-l98_uk.png",
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
    protocol: RK_L98_Dongle.create
}*/