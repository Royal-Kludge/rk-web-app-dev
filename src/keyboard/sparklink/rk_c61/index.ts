import type { KeyboardDefine  } from '../interface'
import { KeyMatrixLayer, MatrixTable } from '../enum'
import { LightEffects  } from './layout'
import { KeyMap_FN1_Win, KeyMap_FN2_Win, KeyMap_Normal_Win, KeyMap_Tap_Win, KeyMap_FN1_Mac, KeyMap_FN2_Mac, KeyMap_Normal_Mac, KeyMap_Tap_Mac  } from './layout'
import { KeyMap_FN1_UK_Win, KeyMap_FN2_UK_Win, KeyMap_Normal_UK_Win, KeyMap_Tap_UK_Win, KeyMap_FN1_UK_Mac, KeyMap_FN2_UK_Mac, KeyMap_Normal_UK_Mac, KeyMap_Tap_UK_Mac  } from './layout'
import { KeyText } from "@/common/keyCode"
import { RK_C61_Usb } from './rk_c61_usb'
import { ConnectionType, DeviceType } from '@/device/enum'

export const RK_C61_USB_DEFINE: KeyboardDefine = {
    name: "RK-C61",
    image: "keyboard_rk-c61_us.png",
    vendorId: 0x258A,
    productId: 0x01E5,
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
    protocol: RK_L75_Usb.create
}