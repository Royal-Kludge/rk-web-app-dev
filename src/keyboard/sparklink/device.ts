import { ConnectionType, DeviceType, ProtocolType } from "@/device/enum"
import type { HidDeviceDefine } from "@/device/interface"

export const RK_C61_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk c61 wire",
    vendorId: 0x1CA2,
    productId: 0x1609,
    usagePage: 0xFFA0,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.SparkLink,
}