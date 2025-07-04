import { ConnectionType, DeviceType, ProtocolType } from "@/device/enum"
import type { HidDeviceDefine } from "@/device/interface"

export const RK_L75_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk l75 wire",
    vendorId: 0x258A,
    productId: 0x01E5,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_L75_UK_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk l75 wire",
    vendorId: 0x258A,
    productId: 0x0201,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R87_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r87 wire",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R87_RF_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r87 rf wire",
    vendorId: 0x258A,
    productId: 0x01CB,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M87_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m87 wire",
    vendorId: 0x258A,
    productId: 0x01A2,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M87_JP_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m87 jp wire",
    vendorId: 0x258A,
    productId: 0x01F5,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M87_UK_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m87 uk wire",
    vendorId: 0x258A,
    productId: 0x01D6,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M_24G_DEFINE: HidDeviceDefine = {
    name: "rk m 24G",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_L_24G_DEFINE: HidDeviceDefine = {
    name: "rk l 24G",
    vendorId: 0x3554,
    productId: 0xFA09,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R_24G_DEFINE: HidDeviceDefine = {
    name: "rk r 24G",
    vendorId: 0x258A,
    productId: 0x01BB,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M65_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m65 wire",
    vendorId: 0x258A,
    productId: 0x01FD,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M65_UK_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m65 wire",
    vendorId: 0x258A,
    productId: 0x0202,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M70_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m70 wire",
    vendorId: 0x258A,
    productId: 0x01FE,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_M70_UK_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk m70 uk wire",
    vendorId: 0x258A,
    productId: 0x0203,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}   

export const RK_L98_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk l98 wire",
    vendorId: 0x258A,
    productId: 0x01FB,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}


export const RK_N99_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk n99 wire",
    vendorId: 0x258A,
    productId: 0x01B8,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}


export const RK_N_24G_DEFINE: HidDeviceDefine = {
    name: "rk n 24G",
    vendorId: 0x258A,
    productId: 0x0150,
    usagePage: 0xFF02,
    usage: 0x0002,
    connectType: ConnectionType.Dongle,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}   

export const RK_R98PRO_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r98pro wire",
    vendorId: 0x258A,
    productId: 0x020C,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}   

export const RK_R98PRO_FR_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r98pro fr wire",
    vendorId: 0x258A,
    productId: 0x0222,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R98PRO_GER_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r98pro ger wire",
    vendorId: 0x258A,
    productId: 0x0215,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R98PRO_JP_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r98pro jp wire",
    vendorId: 0x258A,
    productId: 0x0225,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_S98_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk s98 wire",
    vendorId: 0x258A,
    productId: 0x01AF,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_S98_TH_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk s98 th wire",
    vendorId: 0x258A,
    productId: 0x0223,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_S98_RU_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk s98 ru wire",
    vendorId: 0x258A,
    productId: 0x0230,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_S98_JP_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk s98 jp wire",
    vendorId: 0x258A,
    productId: 0x022F,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_S98_ES_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk s98 es wire",
    vendorId: 0x258A,
    productId: 0x022B,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}

export const RK_R98PRO_3_WIRE_DEFINE: HidDeviceDefine = {
    name: "rk r98pro 3 wire",
    vendorId: 0x258A,
    productId: 0x0210,
    usagePage: 0xFF00,
    usage: 0x0001,
    connectType: ConnectionType.USB,
    deviceType: DeviceType.Keyboard,
    protocolType: ProtocolType.BeiYing
}