import { KeyDefineEnum, KeyText } from "@/common/keyCode";
import type { KeyTableData } from "../interface";
import { DpiCodeEnum, KeyFunctionType, KeyMappingType, MouseKeyCode } from "../enum";

export const KEY_LAYOUT : Array<KeyTableData> = [{
        keyStr: KeyText[KeyDefineEnum.KEY_L_BUTTON],
        keyCode: KeyDefineEnum.KEY_L_BUTTON,
        index: 0,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.KEY_L_BUTTON],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.Mouse,
            keyTypeCode: MouseKeyCode.LeftKey,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.KEY_L_BUTTON
        }
    },
    {
        keyStr: KeyText[KeyDefineEnum.KEY_R_BUTTON],
        keyCode: KeyDefineEnum.KEY_R_BUTTON,
        index: 1,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.KEY_R_BUTTON],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.Mouse,
            keyTypeCode: MouseKeyCode.RightKey,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.KEY_R_BUTTON
        }
    },
    {
        keyStr: KeyText[KeyDefineEnum.KEY_M_BUTTON],
        keyCode: KeyDefineEnum.KEY_M_BUTTON,
        index: 2,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.KEY_M_BUTTON],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.Mouse,
            keyTypeCode: MouseKeyCode.MidKey,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.KEY_M_BUTTON
        }
    },
    {
        keyStr: KeyText[KeyDefineEnum.KEY_RB1_BUTTON],
        keyCode: KeyDefineEnum.KEY_RB1_BUTTON,
        index: 3,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.KEY_RB1_BUTTON],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.Mouse,
            keyTypeCode: MouseKeyCode.ForwardKey,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.KEY_RB1_BUTTON
        }
    },
    {
        keyStr: KeyText[KeyDefineEnum.KEY_RB0_BUTTON],
        keyCode: KeyDefineEnum.KEY_RB0_BUTTON,
        index: 4,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.KEY_RB0_BUTTON],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.Mouse,
            keyTypeCode: MouseKeyCode.BackKey,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.KEY_RB0_BUTTON
        }
    },
    {
        keyStr: KeyText[KeyDefineEnum.DPI_SWITCH_L],
        keyCode: KeyDefineEnum.DPI_SWITCH_L,
        index: 5,
        keyMappingData: {
            keyStr: KeyText[KeyDefineEnum.DPI_SWITCH_L],
            keyFunctionType: KeyFunctionType.MouseKey,
            keyMappingType: KeyMappingType.DPIKey,
            keyTypeCode: DpiCodeEnum.DpiLoop,
            keyParam1: 0x01,
            keyParam2: 0x00,
            keyRaw: KeyDefineEnum.DPI_SWITCH_L
        }
    },
];