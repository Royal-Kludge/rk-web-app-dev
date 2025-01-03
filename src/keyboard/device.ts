import { ConnectionType, DeviceType } from "../device/enum"
import type { HidDeviceDefine } from "../device/interface"

export const RK_L75_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk l75 wire",
    vendorId: 0x258A,
    productId: 0x01E5,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_L75_UK_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk l75 wire",
    vendorId: 0x258A,
    productId: 0x0201,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_R87_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r87 wire",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_R87_RF_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r87 low delay wire",
    vendorId: 0x258A,
    productId: 0x01CB,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_M87_EN_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m87 en wire",
    vendorId: 0x258A,
    productId: 0x01A2,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_M87_JP_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m87 jp wire",
    vendorId: 0x258A,
    productId: 0x01F5,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
}

export const RK_M_24G_DEFINE: HidDeviceDefine = {
    name: "rk m 24G",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
}

export const RK_L_24G_DEFINE: HidDeviceDefine = {
    name: "rk l 24G",
    vendorId: 0x3554,
    productId: 0xFA09,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
}

export const RK_R_24G_DEFINE: HidDeviceDefine = {
    name: "rk r 24G",
    vendorId: 0x258A,
    productId: 0x01BB,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
}