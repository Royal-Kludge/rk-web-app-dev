import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Win, KeyMap_Tap_Mac } from './layout'
import { KeyMap_FN1_GER_Win, KeyMap_FN2_GER_Win, KeyMap_Normal_GER_Win, KeyMap_Tap_GER_Win, KeyMap_FN1_GER_Mac, KeyMap_FN2_GER_Mac, KeyMap_Normal_GER_Mac, KeyMap_Tap_GER_Mac  } from './layout_ger'
import { KeyMap_FN1_FR_Win, KeyMap_FN2_FR_Win, KeyMap_Normal_FR_Win, KeyMap_Tap_FR_Win, KeyMap_FN1_FR_Mac, KeyMap_FN2_FR_Mac, KeyMap_Normal_FR_Mac, KeyMap_Tap_FR_Mac  } from './layout_fr'
import { KeyMap_FN1_JP_Win, KeyMap_FN2_JP_Win, KeyMap_Normal_JP_Win, KeyMap_Tap_JP_Win, KeyMap_FN1_JP_Mac, KeyMap_FN2_JP_Mac, KeyMap_Normal_JP_Mac, KeyMap_Tap_JP_Mac  } from './layout_jp'
import { KeyText, KeyText_ger, KeyText_fr, KeyText_jp} from "@/common/keyCode_r98pro"
import { RK_R98_Usb } from './rk_r98pro_usb'
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'

export const RK_R98PRO_USB_DEFINE: KeyboardDefine = {
    name: "RK-R98PRO",
    image: "keyboard_rk-r98pro.png",
    vendorId: 0x258A,
    productId: 0x020C,
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
    protocol: RK_R98_Usb.create
}


export const RK_R98PRO_GER_USB_DEFINE: KeyboardDefine = {
    name: "RK-R98PRO GER",
    image: "keyboard_rk-r98pro_ger.png",
    vendorId: 0x258A,
    productId: 0x0215,
    usagePage: 0xFF00,
    usage: 0x0001,  
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_ger,
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
            0x00: KeyMap_Normal_GER_Win,
            0x01: KeyMap_FN1_GER_Win,
            0x02: KeyMap_FN2_GER_Win,
            0x03: KeyMap_Tap_GER_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_GER_Mac,
            0x01: KeyMap_FN1_GER_Mac,
            0x02: KeyMap_FN2_GER_Mac,
            0x03: KeyMap_Tap_GER_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R98_Usb.create
}


export const RK_R98PRO_FR_USB_DEFINE: KeyboardDefine = {
    name: "RK-R98PRO FR",
    image: "keyboard_rk-r98pro_fr.png",
    vendorId: 0x258A,
    productId: 0x0222,
    usagePage: 0xFF00,
    usage: 0x0001,  
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_fr,
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
            0x00: KeyMap_Normal_FR_Win,
            0x01: KeyMap_FN1_FR_Win,
            0x02: KeyMap_FN2_FR_Win,
            0x03: KeyMap_Tap_FR_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_FR_Mac,
            0x01: KeyMap_FN1_FR_Mac,
            0x02: KeyMap_FN2_FR_Mac,
            0x03: KeyMap_Tap_FR_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_R98_Usb.create
}


export const RK_R98PRO_JP_USB_DEFINE: KeyboardDefine = {
    name: "RK-R98PRO JP",
    image: "keyboard_rk-r98pro_jp.png",
    vendorId: 0x258A,
    productId: 0x0225,
    usagePage: 0xFF00,
    usage: 0x0001,  
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
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
    protocol: RK_R98_Usb.create
}
