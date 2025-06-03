import { 
    RK_L75_WIRE_DEFINE, 
    RK_R87_WIRE_DEFINE, 
    RK_R87_RF_WIRE_DEFINE,
    RK_M87_WIRE_DEFINE,
    RK_M65_WIRE_DEFINE, 
    RK_M87_JP_WIRE_DEFINE,
    RK_M87_UK_WIRE_DEFINE,
    RK_L75_UK_WIRE_DEFINE,
    RK_M65_UK_WIRE_DEFINE, 
    RK_M70_WIRE_DEFINE,
    RK_M70_UK_WIRE_DEFINE,
    RK_L98_WIRE_DEFINE,
    RK_N99_WIRE_DEFINE,
    RK_L_24G_DEFINE,
    RK_M_24G_DEFINE,
    RK_R_24G_DEFINE,
    RK_R98PRO_WIRE_DEFINE,
    RK_R98PRO_GER_WIRE_DEFINE,
    RK_R98PRO_FR_WIRE_DEFINE,
    RK_S98_WIRE_DEFINE,
} from '@/keyboard/device'
import { 
    RK_M3_WIRE_DEFINE,
    RK_M3_24G_DEFINE,
    RK_M30_WIRE_DEFINE,
    RK_M30_24G_DEFINE,
    RK_K3_WIRE_DEFINE,
    RK_K3_24G_DEFINE,
 } from '@/mouse/device'
import type { ConnectionType, ConnectionEventEnum, ConnectionStatusEnum } from './enum'
import type { HidDeviceDefine } from './interface'

/**
* Device define list
*/
export const DeviceDefineList: Array<HidDeviceDefine> = [
    RK_L_24G_DEFINE,
    RK_M_24G_DEFINE,
    RK_R_24G_DEFINE,

    RK_L75_WIRE_DEFINE,
    RK_L75_UK_WIRE_DEFINE,
    RK_R87_WIRE_DEFINE,
    RK_R87_RF_WIRE_DEFINE,
    RK_M87_WIRE_DEFINE,
    RK_M87_JP_WIRE_DEFINE,
    RK_M87_UK_WIRE_DEFINE,
    RK_M3_WIRE_DEFINE,
    RK_M3_24G_DEFINE,
    RK_K3_WIRE_DEFINE,
    RK_K3_24G_DEFINE,
    RK_M65_WIRE_DEFINE,
    RK_M65_UK_WIRE_DEFINE,
    RK_M70_WIRE_DEFINE,
    RK_M70_UK_WIRE_DEFINE,
    RK_L98_WIRE_DEFINE,
    RK_M30_WIRE_DEFINE,
    RK_M30_24G_DEFINE,
    RK_N99_WIRE_DEFINE,
    RK_R98PRO_WIRE_DEFINE,
    RK_R98PRO_GER_WIRE_DEFINE,
    RK_R98PRO_FR_WIRE_DEFINE,
    RK_S98_WIRE_DEFINE,//wuxianyong24G-M
]

export interface State {
    /** Interface used for communication (USB/Bluetooth) */
    connectType: ConnectionType,
    connectionEvent: ConnectionEventEnum,
    ConnectionStatus: ConnectionStatusEnum,
    productId?: number,
    deviceName?: String,
}