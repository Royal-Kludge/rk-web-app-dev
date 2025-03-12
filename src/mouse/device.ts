import { ConnectionType, DeviceType } from "../device/enum"
import type { HidDeviceDefine } from "../device/interface"

export const RK_M3_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m3 wire",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
}

export const RK_M3_24G_DEFINE: HidDeviceDefine = {
    name: "rk m3 24G",
    vendorId: 0x372E,
    productId: 0x1019,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
}