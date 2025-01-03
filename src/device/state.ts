import { 
    RK_L75_WIRE_DEFINE, 
    RK_R87_WIRE_DEFINE, 
    RK_R87_RF_WIRE_DEFINE,
    RK_M87_EN_WIRE_DEFINE, 
    RK_M87_JP_WIRE_DEFINE, 
    RK_L75_UK_WIRE_DEFINE,
    RK_L_24G_DEFINE,
    RK_M_24G_DEFINE,
    RK_R_24G_DEFINE,
} from '@/keyboard/device'
import { RK_M300_WIRE_DEFINE } from '@/mouse/device'
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
    RK_R87_WIRE_DEFINE,
    RK_R87_RF_WIRE_DEFINE,
    RK_M87_EN_WIRE_DEFINE,
    RK_M87_JP_WIRE_DEFINE,
    RK_M300_WIRE_DEFINE,
    RK_L75_UK_WIRE_DEFINE
]

export interface State {
    /** Interface used for communication (USB/Bluetooth) */
    connectType: ConnectionType,
    connectionEvent: ConnectionEventEnum,
    ConnectionStatus: ConnectionStatusEnum,
    productId?: number,
    deviceName?: String,
}