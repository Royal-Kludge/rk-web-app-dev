import type { KeyboardDefine  } from '../interface'
import { KeyText } from "@/common/keyCode"
import { RK_C61_Usb } from './rk_c61_usb'
import { ConnectionType, DeviceType, ProtocolType } from '@/device/enum'
import { KeyMatrixLayer, MatrixTable } from '../enum'

export const RK_C61_USB_DEFINE: KeyboardDefine = {
    name: "RK-C61",
    image: "keyboard_rk-c61_us.png",
    vendorId: 0x1CA2,
    productId: 0x1609,
    usagePage: 0xFFA0,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.SparkLink,
    keyText: KeyText,
        keyMatrixLayer: [
            KeyMatrixLayer.FN0,
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
                0x00: Array.from({ length: 6 * 21 }),
                0x01: Array.from({ length: 6 * 21 }),
                0x02: Array.from({ length: 6 * 21 }),
                0x03: Array.from({ length: 6 * 21 }),
            },
            0x01: {
                0x00: Array.from({ length: 6 * 21 }),                                                                                                                                                       
                0x01: Array.from({ length: 6 * 21 }),
                0x02: Array.from({ length: 6 * 21 }),
                0x03: Array.from({ length: 6 * 21 }),
            }
        },
    protocol: RK_C61_Usb.create
}