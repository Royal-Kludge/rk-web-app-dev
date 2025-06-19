import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Win, KeyMap_Tap_Mac } from './layout'
import { KeyMap_Normal_TH_Win, KeyMap_FN1_TH_Win, KeyMap_FN2_TH_Win, KeyMap_Tap_TH_Win, KeyMap_Normal_TH_Mac, KeyMap_FN1_TH_Mac, KeyMap_FN2_TH_Mac, KeyMap_Tap_TH_Mac } from './layout_th'
import { KeyMap_Normal_RU_Win, KeyMap_FN1_RU_Win, KeyMap_FN2_RU_Win, KeyMap_Tap_RU_Win, KeyMap_Normal_RU_Mac, KeyMap_FN1_RU_Mac, KeyMap_FN2_RU_Mac, KeyMap_Tap_RU_Mac } from './layout_ru'
import { KeyMap_Normal_JP_Win, KeyMap_FN1_JP_Win, KeyMap_FN2_JP_Win, KeyMap_Tap_JP_Win, KeyMap_Normal_JP_Mac, KeyMap_FN1_JP_Mac, KeyMap_FN2_JP_Mac, KeyMap_Tap_JP_Mac } from './layout_jp'
import { KeyMap_Normal_ES_Win, KeyMap_FN1_ES_Win, KeyMap_FN2_ES_Win, KeyMap_Tap_ES_Win, KeyMap_Normal_ES_Mac, KeyMap_FN1_ES_Mac, KeyMap_FN2_ES_Mac, KeyMap_Tap_ES_Mac } from './layout_es'

import { KeyText, KeyText_TH, KeyText_RU, KeyText_JP, KeyText_ES } from "@/common/keyCode_s98"
import { RK_S98_Dongle } from './rk_s98_dongle'
import { RK_S98_Usb } from './rk_s98_usb'
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'


export const RK_S98_USB_DEFINE: KeyboardDefine = {
    name: "RK-S98",
    image: "keyboard_rk-s98.png",
    vendorId: 0x258A,
    productId: 0x01AF,
    usagePage: 0xFF00,
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
    protocol: RK_S98_Usb.create
}

export const RK_S98_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-S98",
    image: "keyboard_rk-s98.png",
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
    protocol: RK_S98_Dongle.create
}

export const RK_S98_TH_USB_DEFINE: KeyboardDefine = {

    name: "RK-S98 TH",
    image: "keyboard_rk-s98_th.png",
    vendorId: 0x258A,
    productId: 0x0223,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_TH,
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
            0x00: KeyMap_Normal_TH_Win,
            0x01: KeyMap_FN1_TH_Win,
            0x02: KeyMap_FN2_TH_Win,
            0x03: KeyMap_Tap_TH_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_TH_Mac,
            0x01: KeyMap_FN1_TH_Mac,
            0x02: KeyMap_FN2_TH_Mac,
            0x03: KeyMap_Tap_TH_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Usb.create
}

export const RK_S98_TH_DONGLE_DEFINE: KeyboardDefine = {

    name: "RK-S98 TH",
    image: "keyboard_rk-s98_th.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_TH,
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
            0x00: KeyMap_Normal_TH_Win,
            0x01: KeyMap_FN1_TH_Win,
            0x02: KeyMap_FN2_TH_Win,
            0x03: KeyMap_Tap_TH_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_TH_Mac,
            0x01: KeyMap_FN1_TH_Mac,
            0x02: KeyMap_FN2_TH_Mac,
            0x03: KeyMap_Tap_TH_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Dongle.create
}

export const RK_S98_RU_USB_DEFINE: KeyboardDefine = {
    name: "RK-S98 RU",
    image: "keyboard_rk-s98_ru.png",
    vendorId: 0x258A,
    productId: 0x0230,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_RU,
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
            0x00: KeyMap_Normal_RU_Win,
            0x01: KeyMap_FN1_RU_Win,
            0x02: KeyMap_FN2_RU_Win,
            0x03: KeyMap_Tap_RU_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_RU_Mac,
            0x01: KeyMap_FN1_RU_Mac,
            0x02: KeyMap_FN2_RU_Mac,
            0x03: KeyMap_Tap_RU_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Usb.create
}

export const RK_S98_RU_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-S98 RU",
    image: "keyboard_rk-s98_ru.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_RU,
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
            0x00: KeyMap_Normal_RU_Win,
            0x01: KeyMap_FN1_RU_Win,
            0x02: KeyMap_FN2_RU_Win,
            0x03: KeyMap_Tap_RU_Win
        },
        0x01: {
            0x00: KeyMap_Normal_RU_Mac,
            0x01: KeyMap_FN1_RU_Mac,
            0x02: KeyMap_FN2_RU_Mac,
            0x03: KeyMap_Tap_RU_Mac
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Dongle.create
}

export const RK_S98_JP_USB_DEFINE: KeyboardDefine = {

    name: "RK-S98 JP",
    image: "keyboard_rk-s98_jp.png",
    vendorId: 0x258A,
    productId: 0x022F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_JP,
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
            0x03: KeyMap_Tap_JP_Win
        },
        0x01: {
            0x00: KeyMap_Normal_JP_Mac,
            0x01: KeyMap_FN1_JP_Mac,
            0x02: KeyMap_FN2_JP_Mac,
            0x03: KeyMap_Tap_JP_Mac
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Usb.create
}

export const RK_S98_JP_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-S98 JP",
    image: "keyboard_rk-s98_jp.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_JP,
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
            0x03: KeyMap_Tap_JP_Win
        },
        0x01: {
            0x00: KeyMap_Normal_JP_Mac,
            0x01: KeyMap_FN1_JP_Mac,
            0x02: KeyMap_FN2_JP_Mac,
            0x03: KeyMap_Tap_JP_Mac
        }
    },  
    lightEffects: LightEffects,
    protocol: RK_S98_Dongle.create
}


export const RK_S98_ES_USB_DEFINE: KeyboardDefine = {
    name: "RK-S98 ES",
    image: "keyboard_rk-s98_es.png",
    vendorId: 0x258A,
    productId: 0x022B,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_ES,
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
            0x00: KeyMap_Normal_ES_Win,
            0x01: KeyMap_FN1_ES_Win,
            0x02: KeyMap_FN2_ES_Win,
            0x03: KeyMap_Tap_ES_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_ES_Mac,
            0x01: KeyMap_FN1_ES_Mac,
            0x02: KeyMap_FN2_ES_Mac,
            0x03: KeyMap_Tap_ES_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Usb.create
}

export const RK_S98_ES_DONGLE_DEFINE: KeyboardDefine = {
    name: "RK-S98 ES",
    image: "keyboard_rk-s98_es.png",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing,
    keyText: KeyText_ES,
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
            0x00: KeyMap_Normal_ES_Win,
            0x01: KeyMap_FN1_ES_Win,
            0x02: KeyMap_FN2_ES_Win,
            0x03: KeyMap_Tap_ES_Win,
        },
        0x01: {
            0x00: KeyMap_Normal_ES_Mac,
            0x01: KeyMap_FN1_ES_Mac,
            0x02: KeyMap_FN2_ES_Mac,
            0x03: KeyMap_Tap_ES_Mac,
        }
    },
    lightEffects: LightEffects,
    protocol: RK_S98_Dongle.create
}