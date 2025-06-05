import { ConnectionType, DeviceType, ProtocolType } from "@/device/enum"
import type { HidDeviceDefine } from "@/device/interface"

export const RK_M3_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m3 wire",
    vendorId: 0x372E,
    productId: 0x102A,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}

export const RK_M3_24G_DEFINE: HidDeviceDefine = {
    name: "rk m3 24G",
    vendorId: 0x372E,
    productId: 0x1019,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}

export const RK_M30_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m30 wire",
    vendorId: 0x258A,
    productId: 0x0136,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}

export const RK_M30_24G_DEFINE: HidDeviceDefine = {
    name: "rk m30 24G",
    vendorId: 0x258A,
    productId: 0x0138,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}

export const RK_K3_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk k3 wire",
    vendorId: 0x372E,
    productId: 0x1045,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}

export const RK_K3_24G_DEFINE: HidDeviceDefine = {
    name: "rk k3 24G",
    vendorId: 0x372E,
    productId: 0x103F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Mouse,
    protocolType: ProtocolType.BeiYing
}