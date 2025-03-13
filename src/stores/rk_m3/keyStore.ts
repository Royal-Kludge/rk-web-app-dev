import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from '@/mouse/mouse'
import { RK_M3 } from '@/mouse/rk_m3/rk_m3';
import { ConnectionEventEnum, ConnectionStatusEnum, ConnectionType } from '@/device/enum'
import { ps } from '@/mouse/rk_m3/profiles';
import { KeyTableEnum } from "@/mouse/rk_m3/keyTable";
import { KeyDefineEnum, KeyText } from "@/common/keyCode";
import { KeyMappingType, KeyFunctionType, MacroLoopEnum } from "@/mouse/enum";
import type { KeyMappingData, KeyTableData } from "@/mouse/interface";
import { KEY_LAYOUT } from '@/mouse/rk_m3/layout';
import { Macro } from '@/mouse/rk_m3/macros';

export const useKeyStore = defineStore('keyinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const connectType = ref<ConnectionType>();
    const keyLayout = ref<Array<KeyTableData>>();

    const state = reactive({
        defaultLayout: KEY_LAYOUT,
        gameList: [
            { value: KeyMappingType.Mouse, label: "鼠标功能" },
            { value: KeyMappingType.KeyCombo, label: "键盘功能" }
        ],
        isDpiLock: false,
        KeyLayoutIndex: KeyTableEnum.LeftKey,
        functionValue: KeyFunctionType.MouseKey,
        functionItem: Object as any,
        functionList: [{
            function: KeyFunctionType.MouseKey,
            text: "鼠标功能",
            keys: [
                { key: KeyDefineEnum.KEY_L_BUTTON, text: '左键' },
                { key: KeyDefineEnum.KEY_R_BUTTON, text: '右键' },
                { key: KeyDefineEnum.KEY_M_BUTTON, text: '中键' },
                { key: KeyDefineEnum.KEY_RB0_BUTTON, text: '前进键' },
                { key: KeyDefineEnum.KEY_RB1_BUTTON, text: '后退键' },
                { key: KeyDefineEnum.KEY_TL_BUTTON, text: '左摆' },
                { key: KeyDefineEnum.KEY_TR_BUTTON, text: '右摆' },
                { key: KeyDefineEnum.KEY_SCROLLUP_BUTTON, text: '上滚轮' },
                { key: KeyDefineEnum.KEY_SCROLLDN_BUTTON, text: '下滚轮' },
                { key: KeyDefineEnum.KEY_MS_X_L, text: 'X 轴左' },
                { key: KeyDefineEnum.KEY_MS_X_R, text: 'X 轴右' },
                { key: KeyDefineEnum.KEY_MS_Y_L, text: 'Y 轴上' },
                { key: KeyDefineEnum.KEY_MS_Y_R, text: 'Y 轴下' },
            ]
        },
        {
            function: KeyFunctionType.Dpi,
            text: "DPI",
            keys: [
                { key: KeyDefineEnum.DPI_SWITCH_I, text: 'DPI +' },
                { key: KeyDefineEnum.DPI_SWITCH_D, text: 'DPI -' },
                { key: KeyDefineEnum.DPI_SWITCH_L, text: 'DPI 循环' },
                { key: KeyDefineEnum.DPI_SWITCH_LOCK, text: 'DPI 锁定' },
            ]
        },
        {
            function: KeyFunctionType.ReportRate,
            text: "回报率",
            keys: [
                { key: KeyDefineEnum.KEY_REPORT_RATEI, text: '回报率 +' },
                { key: KeyDefineEnum.KEY_REPORT_RATED, text: '回报率 -' },
                { key: KeyDefineEnum.KEY_REPORT_RATEL, text: '回报率 循环' },
            ]
        },
        {
            function: KeyFunctionType.Media,
            text: "多媒体按键",
            keys: [
                { key: KeyDefineEnum.KEY_VolumI, text: 'tip.volumI' },
                { key: KeyDefineEnum.KEY_VolumD, text: 'tip.volumD' },
                { key: KeyDefineEnum.KEY_Mute, text: 'tip.mute' },
                { key: KeyDefineEnum.KEY_Media, text: 'tip.media' },
                { key: KeyDefineEnum.KEY_PlayPause, text: 'tip.paly' },
                { key: KeyDefineEnum.KEY_PrevTr, text: 'tip.prevTr' },
                { key: KeyDefineEnum.KEY_NextTr, text: 'tip.nextTr' },
                { key: KeyDefineEnum.KEY_Stop, text: 'tip.stop' },
            ],
        },
        {
            function: KeyFunctionType.Keyboard,
            text: "键盘功能",
            modify: KeyDefineEnum.NONE,
            key: KeyDefineEnum.NONE,
            keys: [{ key: KeyDefineEnum.KEY_L_CTRL, text: 'Ctrl' },
            { key: KeyDefineEnum.KEY_L_WIN, text: 'Win' },
            { key: KeyDefineEnum.KEY_L_ALT, text: 'Alt' },
            { key: KeyDefineEnum.KEY_L_SHIFT, text: 'Shift' }
            ],
        },
        {
            function: KeyFunctionType.Macro,
            text: "宏功能",
            keys: [],
        },
        {
            function: KeyFunctionType.GameAdv,
            text: "游戏增强",
            type: KeyMappingType.KeyCombo,
            key: KeyDefineEnum.KEY_L_BUTTON,
            count: 1,
            delay: 10,
            keys: [{ key: KeyDefineEnum.KEY_L_BUTTON, text: '左键' },
            { key: KeyDefineEnum.KEY_R_BUTTON, text: '右键' },
            { key: KeyDefineEnum.KEY_M_BUTTON, text: '中键' },
            { key: KeyDefineEnum.KEY_RB0_BUTTON, text: '前进键' },
            { key: KeyDefineEnum.KEY_RB1_BUTTON, text: '后退键' }],
        },
        {
            function: KeyFunctionType.Shortcuts,
            text: "快捷方式",
            keys: [
                { key: KeyDefineEnum.KEY_SysBkBrigthInc, text: '屏幕亮度增加' },
                { key: KeyDefineEnum.KEY_SysBkBrigthDec, text: '屏幕亮度减少' },
                { key: KeyDefineEnum.KEY_Calculator, text: '启动计算器' },
                { key: KeyDefineEnum.KEY_MyComputer, text: '我的电脑' },
                { key: KeyDefineEnum.KEY_WWW, text: '打开主页' },
                { key: KeyDefineEnum.KEY_Email, text: '邮件' },
                { key: KeyDefineEnum.KEY_Refresh, text: '刷新(F5)' },
                { key: KeyDefineEnum.KEY_ALT_TAB, text: '切换应用程序' },
                { key: KeyDefineEnum.KEY_CTRL_C, text: '复制' },
                { key: KeyDefineEnum.KEY_CTRL_X, text: '剪切' },
                { key: KeyDefineEnum.KEY_CTRL_V, text: '粘贴' },
            ],
        },
        {
            function: KeyFunctionType.Disable,
            text: "禁用按键",
            keys: [],
        },
        ]
    });

    const init = async () => {
        connectType.value = mouse.state.connectType;
        if (rk_m3.value == undefined) {
            rk_m3.value = (mouse.protocol as RK_M3);
            mouse.addEventListener("connection", connectionEventCallback);

            if (keyLayout.value == undefined) {
                keyLayout.value = rk_m3.value.data.keys?.keyLayout;
            }

            findFunction();
        }
    };

    const connectionEventCallback = async (event: Event) => {
        switch (mouse.state.connectionEvent) {
            case ConnectionEventEnum.Disconnect:
            case ConnectionEventEnum.Close:
                destroy();
                break;
        }
    };

    const destroy = () => {
        if (mouse.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            mouse.removeEventListener("connection", connectionEventCallback);
        }
    };

    const refresh = () => {
        if (rk_m3.value != undefined) {
            keyLayout.value = rk_m3.value.data.keys?.keyLayout;
        }
    }

    const saveProfile = () => {
        ps.save()
    };

    const KeyMappingText = (func: KeyFunctionType, keyCode: KeyDefineEnum, modify: KeyDefineEnum, key: number): string => {
        switch (func) {
            case KeyFunctionType.Keyboard:
                let keyStr = "";
                if ((modify & 0x00010000) > 0)
                    keyStr += "Ctrl+";
                if ((modify & 0x00020000) > 0)
                    keyStr += "Shift+";
                if ((modify & 0x00040000) > 0)
                    keyStr += "Alt+";
                if ((modify & 0x00080000) > 0)
                    keyStr += "Win+";
                keyStr += KeyText[keyCode].valueOf();
                return keyStr;
            case KeyFunctionType.GameAdv:
                return "key.gameAdv";
            case KeyFunctionType.Disable:
                return "key.disable";
            default:
                return KeyText[key].valueOf();
        };
    };

    const keyMapping = (index: KeyTableEnum, func: KeyFunctionType, keyCode: KeyDefineEnum, modify: KeyDefineEnum = 0, count: number = 0, delay: number = 0, type: KeyMappingType = KeyMappingType.Mouse) => {
        let key: number = 0;

        switch (func) {
            case KeyFunctionType.MouseKey:
            case KeyFunctionType.Dpi:
            case KeyFunctionType.ReportRate:
            case KeyFunctionType.Media:
                key = keyCode;
                break;
            case KeyFunctionType.Keyboard:
                key = keyCode | modify;
                break;
            case KeyFunctionType.Macro:
                key = keyCode | MacroLoopEnum.LoopCount << 16 | (count << 8) | delay;
                break;
            case KeyFunctionType.GameAdv:
                key = (type << 24) | (keyCode << 16) | (count << 8) | delay;
                break;
            case KeyFunctionType.Shortcuts:
                key = keyCode;
                break;
            case KeyFunctionType.Disable:
                key = 0;
                break;
        };

        let mapping: KeyMappingData = {
            keyStr: KeyMappingText(func, keyCode, modify, key),
            keyFunctionType: func,
            keyMappingType: key >> 24,
            keyTypeCode: (key >> 16) & 0xff,
            keyParam1: (key >> 8) & 0xff,
            keyParam2: key & 0xff,
            keyRaw: key
        };

        if (rk_m3.value != undefined && rk_m3.value.data.keys != undefined) {
            rk_m3.value.data.keys.setKeyMapping(index, mapping);
            rk_m3.value.setKeyMapping(index);
        }
    };

    const findFunction = () => {
        state.functionItem = state.functionList.find(obj => obj.function === state.functionValue);
        if (state.functionItem.function == KeyFunctionType.Disable) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.Disable, state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
    };

    const saveGameAdv = () => {
        if (state.KeyLayoutIndex != undefined) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.GameAdv, state.functionItem.type == KeyMappingType.KeyCombo ? state.functionItem.key.hid : state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay, state.functionItem.type);
            saveProfile();
        }
    };

    const clickKeyboard = (key: KeyDefineEnum) => {
        let keyboard = state.functionItem.keys.find((obj: any) => obj.key === key);
        if (keyboard != undefined) {
            if ((state.functionItem.modify & keyboard.key) > 0) {
                state.functionItem.modify &= ~keyboard.key;
            } else {
                state.functionItem.modify |= keyboard.key;
            }
        }
    };

    const saveKeyboard = () => {
        if (state.KeyLayoutIndex != undefined) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.Keyboard, state.functionItem.key.hid, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
    };

    const selectedKeyboard = (key: KeyDefineEnum): string => {
        let keyboard = state.functionItem.keys.find((obj: any) => obj.key === key);
        if (keyboard != undefined && state.functionItem.modify & keyboard.key) {
            return 'but_selected';
        }
        return "";
    };

    const selectedFunction = (key: number): string => {
        return state.functionItem.key == key ? 'bg-warn-1' : '';
    };

    const clickFunction = (key: KeyDefineEnum) => {
        state.functionItem.key = key;
        if (state.functionValue != KeyFunctionType.Keyboard && state.functionValue != KeyFunctionType.GameAdv && state.functionValue != KeyFunctionType.Macro && key != KeyDefineEnum.DPI_SWITCH_LOCK) {
            keyMapping(state.KeyLayoutIndex, state.functionItem.function, state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
        if (key == KeyDefineEnum.DPI_SWITCH_LOCK) {
            state.isDpiLock = true;
        }
    };
    const setDpiLock = (value: number) => {
        state.functionItem.count = value;
        keyMapping(state.KeyLayoutIndex, state.functionItem.function, state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
        saveProfile();
        state.isDpiLock = false;
    };


    const clickKeyLayout = (index: number) => {
        state.KeyLayoutIndex = index;
    };

    const selectedKeyLayout = (index: number): string => {
        if (rk_m3.value != undefined) {
            if (rk_m3.value.data.keys != undefined && rk_m3.value.data.keys.keyLayout != undefined) {
                for (let i = 0; i < rk_m3.value.data.keys.keyLayout.length; i++) {
                    if (rk_m3.value.data.keys.keyLayout[index].index == state.KeyLayoutIndex)
                        return 'but_selected';
                    else
                        return "";
                }
            }
        }
        return "";
    };

    const setAllDefault = () => {
        for (let i = 0; i < state.defaultLayout.length; i++) {
            keyMapping(i, KeyFunctionType.MouseKey, state.defaultLayout[i].keyCode);
        }
        saveProfile();
    };

    const getOneDefault = (index: number): KeyTableData | undefined => {
        return state.defaultLayout.find(obj => obj.index === index);
    };

    const setOneDefault = () => {
        if (state.KeyLayoutIndex != undefined) {
            let keyData = getOneDefault(state.KeyLayoutIndex);
            if (keyData != undefined) {
                keyMapping(state.KeyLayoutIndex, KeyFunctionType.MouseKey, keyData.keyCode);
            }
        }
        saveProfile();
    };

    const getKeyLayoutByIndex = (index: number): string => {
        if (keyLayout.value != undefined &&
            keyLayout.value[index].keyMappingData.keyStr != undefined) {
            return keyLayout.value[index].keyMappingData.keyStr.valueOf();
        }
        return "";
    };

    const clickMacro = (obj: Macro) => {

    }

    return { connectType, state, init, destroy, keyMapping, findFunction, selectedFunction, clickFunction, getKeyLayoutByIndex, clickKeyLayout, selectedKeyLayout, setAllDefault, setOneDefault, saveGameAdv, clickKeyboard, selectedKeyboard, saveKeyboard, clickMacro, refresh, setDpiLock };
});