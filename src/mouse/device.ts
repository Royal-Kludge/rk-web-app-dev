import { ConnectionType, DeviceType } from "../device/enum"
import type { HidDeviceDefine } from "../device/interface"

export const RK_M300_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk k3 wire",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
}