import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from '@/mouse/beiying/mouse'
import { RK_K3 } from '@/mouse/beiying/rk_k3/rk_k3';
import { ConnectionEventEnum, ConnectionStatusEnum, ConnectionType } from '@/device/enum'
import { ps } from '@/mouse/beiying/rk_k3/profiles';
import { KeyTableEnum } from "@/mouse/beiying/rk_k3/keyTable";
import { KeyDefineEnum, KeyText } from "@/common/keyCode";
import { KeyMappingType, KeyFunctionType, MacroLoopEnum, MouseKeyCode } from "@/mouse/beiying/enum";
import type { KeyMappingData, KeyTableData, LeftSideKey } from "@/mouse/beiying/interface";
import { KEY_LAYOUT } from '@/mouse/beiying/rk_k3/layout';
import { Macro } from '@/mouse/beiying/rk_k3/macros';
import { ElMessageBox } from 'element-plus'
import { useI18n } from "vue-i18n";

export const useKeyStore = defineStore('keyinfo_rk_k3', () => {
    const rk_k3 = ref<RK_K3>();
    const connectType = ref<ConnectionType>();
    const keyLayout = ref<Array<KeyTableData>>();
    const { t } = useI18n();

    const state = reactive({
        defaultLayout: KEY_LAYOUT,
        gameList: [
            { value: KeyMappingType.Mouse, label: "mouseKey.title" },
            { value: KeyMappingType.KeyCombo, label: "keyBoardKey.title" }
        ],
        isDpiLock: false,
        KeyLayoutIndex: KeyTableEnum.LeftKey,
        functionValue: KeyFunctionType.MouseKey,
        functionItem: Object as any,
        functionList: [{
            function: KeyFunctionType.MouseKey,
            text: "mouseKey.title",
            keys: [
                { key: KeyDefineEnum.KEY_L_BUTTON, text: 'mouseKey.leftKey' },
                { key: KeyDefineEnum.KEY_R_BUTTON, text: 'mouseKey.rightKey' },
                { key: KeyDefineEnum.KEY_M_BUTTON, text: 'mouseKey.middleKey' },
                { key: KeyDefineEnum.KEY_RB0_BUTTON, text: 'mouseKey.forwardKey' },
                { key: KeyDefineEnum.KEY_RB1_BUTTON, text: 'mouseKey.backKey' },
                { key: KeyDefineEnum.KEY_TL_BUTTON, text: 'mouseKey.leftShaft' },
                { key: KeyDefineEnum.KEY_TR_BUTTON, text: 'mouseKey.rightShaft' },
                { key: KeyDefineEnum.KEY_SCROLLUP_BUTTON, text: 'mouseKey.wheelUp' },
                { key: KeyDefineEnum.KEY_SCROLLDN_BUTTON, text: 'mouseKey.wheelDown' },
                { key: KeyDefineEnum.KEY_MS_X_L, text: 'mouseKey.xAxleLeft' },
                { key: KeyDefineEnum.KEY_MS_X_R, text: 'mouseKey.xAxleRight' },
                { key: KeyDefineEnum.KEY_MS_Y_L, text: 'mouseKey.yAxleUp' },
                { key: KeyDefineEnum.KEY_MS_Y_R, text: 'mouseKey.yAxleDown' },
            ]
        },
        {
            function: KeyFunctionType.Dpi,
            text: "dpiKey.title",
            keys: [
                { key: KeyDefineEnum.DPI_SWITCH_I, text: 'dpiKey.increase' },
                { key: KeyDefineEnum.DPI_SWITCH_D, text: 'dpiKey.decrease' },
                { key: KeyDefineEnum.DPI_SWITCH_L, text: 'dpiKey.loop' },
                { key: KeyDefineEnum.DPI_SWITCH_LOCK, text: 'dpiKey.lock' },
            ]
        },
        {
            function: KeyFunctionType.ReportRate,
            text: "reportRateKey.title",
            keys: [
                { key: KeyDefineEnum.KEY_REPORT_RATEI, text: 'reportRateKey.increase' },
                { key: KeyDefineEnum.KEY_REPORT_RATED, text: 'reportRateKey.decrease' },
                { key: KeyDefineEnum.KEY_REPORT_RATEL, text: 'reportRateKey.loop' },
            ]
        },
        {
            function: KeyFunctionType.Media,
            text: "mediaKey.title",
            keys: [
                { key: KeyDefineEnum.KEY_VolumI, text: 'mediaKey.VolumI' },
                { key: KeyDefineEnum.KEY_VolumD, text: 'mediaKey.VolumD' },
                { key: KeyDefineEnum.KEY_Mute, text: 'mediaKey.Mute' },
                { key: KeyDefineEnum.KEY_Media, text: 'mediaKey.Media' },
                { key: KeyDefineEnum.KEY_PlayPause, text: 'mediaKey.PlayPause' },
                { key: KeyDefineEnum.KEY_PrevTr, text: 'mediaKey.PrevTr' },
                { key: KeyDefineEnum.KEY_NextTr, text: 'mediaKey.NextTr' },
                { key: KeyDefineEnum.KEY_Stop, text: 'mediaKey.Stop' },
            ],
        },
        {
            function: KeyFunctionType.Keyboard,
            text: "keyBoardKey.title",
            modify: KeyDefineEnum.NONE,
            key: KeyDefineEnum.NONE,
            keys: [{ key: KeyDefineEnum.KEY_L_CTRL, text: 'Ctrl' },
            { key: KeyDefineEnum.KEY_L_WIN, text: 'Win' },
            { key: KeyDefineEnum.KEY_L_ALT, text: 'Alt' },
            { key: KeyDefineEnum.KEY_L_SHIFT, text: 'Shift' }
            ],
        },
        {
            function: KeyFunctionType.GameAdv,
            text: "key.gameAdv",
            type: KeyMappingType.KeyCombo,
            key: KeyDefineEnum.KEY_L_BUTTON,
            count: 1,
            delay: 10,
            keys: [{ key: KeyDefineEnum.KEY_L_BUTTON, text: 'mouseKey.leftKey' },
            { key: KeyDefineEnum.KEY_R_BUTTON, text: 'mouseKey.rightKey' },
            { key: KeyDefineEnum.KEY_M_BUTTON, text: 'mouseKey.middleKey' },
            { key: KeyDefineEnum.KEY_RB0_BUTTON, text: 'mouseKey.forwardKey' },
            { key: KeyDefineEnum.KEY_RB1_BUTTON, text: 'mouseKey.backKey' }],
        },
        {
            function: KeyFunctionType.Shortcuts,
            text: "shortcuts.title",
            keys: [
                { key: KeyDefineEnum.KEY_SysBkBrigthInc, text: 'shortcuts.brightI' },
                { key: KeyDefineEnum.KEY_SysBkBrigthDec, text: 'shortcuts.brightD' },
                { key: KeyDefineEnum.KEY_Calculator, text: 'Calculator' },
                { key: KeyDefineEnum.KEY_MyComputer, text: 'MyComputer' },
                { key: KeyDefineEnum.KEY_WWW, text: 'shortcuts.homePage' },
                { key: KeyDefineEnum.KEY_Email, text: 'Email' },
                { key: KeyDefineEnum.KEY_Refresh, text: 'Refresh' },
                { key: KeyDefineEnum.KEY_ALT_TAB, text: 'shortcuts.switchApp' },
                { key: KeyDefineEnum.KEY_CTRL_C, text: 'shortcuts.copy' },
                { key: KeyDefineEnum.KEY_CTRL_X, text: 'shortcuts.paste' },
                { key: KeyDefineEnum.KEY_CTRL_V, text: 'shortcuts.cut' },
            ],
        },
        {
            function: KeyFunctionType.Disable,
            text: "key.disable",
            keys: [],
        },
        ]
    });

    const init = async () => {
        connectType.value = mouse.state.connectType;
        if (rk_k3.value == undefined || (rk_k3.value != undefined && rk_k3.value.data.isDestroy)) {
            rk_k3.value = (mouse.protocol as RK_K3);
            mouse.addEventListener("connection", connectionEventCallback);

            if (keyLayout.value == undefined) {
                keyLayout.value = rk_k3.value.data.keys?.keyLayout;
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
        if (rk_k3.value != undefined) {
            keyLayout.value = rk_k3.value.data.keys?.keyLayout;
        }
    }

    const saveProfile = () => {
        ps.save()
    };

    const KeyMappingText = (func: KeyFunctionType, keyCode: KeyDefineEnum, modify: KeyDefineEnum, key: number, macroIndex: number = 0): string => {
        switch (func) {
            case KeyFunctionType.Dpi:
                return KeyText[key & (0xFFFF << 16)][0].valueOf();
                break;
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
                keyStr += KeyText[keyCode][0].valueOf();
                return keyStr;
            case KeyFunctionType.GameAdv:
                return "key.gameAdv";
            case KeyFunctionType.Disable:
                return "key.disable";
            case KeyFunctionType.Macro:
                if (rk_k3.value != undefined && rk_k3.value.data.macros != undefined) {
                    let macro = rk_k3.value.data.macros.macroList[macroIndex];
                    if (macro != undefined) return macro.name;
                }
                return "Macro";
            default:
                return KeyText[key][0].valueOf();
        };
    };

    const keyMapping = async (index: KeyTableEnum, func: KeyFunctionType, keyCode: KeyDefineEnum, modify: KeyDefineEnum = 0, count: number = 0, delay: number = 0, type: KeyMappingType = KeyMappingType.Mouse) => {
        let key: number = 0;

        switch (func) {
            case KeyFunctionType.MouseKey:
            case KeyFunctionType.Dpi:
                key = keyCode | count;
                break;
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
            keyStr: KeyMappingText(func, keyCode, modify, key, delay),
            keyFunctionType: func,
            keyMappingType: key >> 24,
            keyTypeCode: (key >> 16) & 0xff,
            keyParam1: (key >> 8) & 0xff,
            keyParam2: key & 0xff,
            keyRaw: key
        };

        if (rk_k3.value != undefined && rk_k3.value.data.keys != undefined) {
            let desKey = rk_k3.value.data.keys.getKeyMapping(index);
            if (desKey.keyFunctionType == KeyFunctionType.MouseKey && desKey.keyTypeCode == MouseKeyCode.LeftKey &&
                (mapping.keyFunctionType != KeyFunctionType.MouseKey || mapping.keyTypeCode != MouseKeyCode.LeftKey)) {

                let hasLeft = false;
                let i = 0;
                for (i = 0; i < 6; i++) {
                    if (i != index) {
                        let tmpKey = rk_k3.value.data.keys.getKeyMapping(i);
                        hasLeft = tmpKey.keyFunctionType == KeyFunctionType.MouseKey && tmpKey.keyTypeCode == MouseKeyCode.LeftKey;
                        if (hasLeft) break;
                    }
                }

                if (!hasLeft) {
                    ElMessageBox.alert(t('message.need_left'), '', {
                        confirmButtonText: 'OK'
                    })
        
                    return;
                }
            }

            var leftSideKey = rk_k3.value.data.leftSideKey;
            if ((index == KeyTableEnum.ForwardKey || index == KeyTableEnum.BackKey) && leftSideKey != undefined && leftSideKey.isEnable) {
                if (index == KeyTableEnum.BackKey) {
                    leftSideKey.key3.keyStr = mapping.keyStr;
                    leftSideKey.key3.keyRaw = mapping.keyRaw;
                    leftSideKey.key3.keyTypeCode = mapping.keyTypeCode;
                    leftSideKey.key3.keyFunctionType = mapping.keyFunctionType;
                    leftSideKey.key3.keyMappingType = mapping.keyMappingType;
                    leftSideKey.key3.keyParam1 = mapping.keyParam1;
                    leftSideKey.key3.keyParam2 = mapping.keyParam2;
                }

                if (index == KeyTableEnum.ForwardKey) {
                    leftSideKey.key4.keyStr = mapping.keyStr;
                    leftSideKey.key4.keyRaw = mapping.keyRaw;
                    leftSideKey.key4.keyTypeCode = mapping.keyTypeCode;
                    leftSideKey.key4.keyFunctionType = mapping.keyFunctionType;
                    leftSideKey.key4.keyMappingType = mapping.keyMappingType;
                    leftSideKey.key4.keyParam1 = mapping.keyParam1;
                    leftSideKey.key4.keyParam2 = mapping.keyParam2;
                }
            }

            rk_k3.value.data.keys.setKeyMapping(index, mapping);
            await rk_k3.value.setKeyMapping(index);
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
        if (rk_k3.value != undefined) {
            if (rk_k3.value.data.keys != undefined && rk_k3.value.data.keys.keyLayout != undefined) {
                for (let i = 0; i < rk_k3.value.data.keys.keyLayout.length; i++) {
                    if (rk_k3.value.data.keys.keyLayout[index].index == state.KeyLayoutIndex)
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
        keyMapping(state.KeyLayoutIndex, state.functionItem.function, KeyDefineEnum.KEY_MACRO0, state.functionItem.modify, 1, obj.index);
        saveProfile();
    }

    const setLeftSideKeyEnable = async (val: boolean) => {
        if (rk_k3.value != undefined) {
            var leftSideKey = rk_k3.value.data.leftSideKey;
            if (leftSideKey != undefined) {
                leftSideKey.isEnable = val;
                if (leftSideKey.isEnable) {
                    if (rk_k3.value != undefined && rk_k3.value.data.keys != undefined) {
                        rk_k3.value.data.keys.setKeyMapping(KeyTableEnum.BackKey, leftSideKey.key3);
                        await rk_k3.value.setKeyMapping(KeyTableEnum.BackKey);
                        rk_k3.value.data.keys.setKeyMapping(KeyTableEnum.ForwardKey, leftSideKey.key4);
                        await rk_k3.value.setKeyMapping(KeyTableEnum.ForwardKey);
                    }
                } else {
                    await keyMapping(KeyTableEnum.ForwardKey, KeyFunctionType.Disable, KeyDefineEnum.NONE);
                    await keyMapping(KeyTableEnum.BackKey, KeyFunctionType.Disable, KeyDefineEnum.NONE);
                }
            }
        }
    }

    const setToFactory = async () => {
        if (rk_k3.value != undefined) {
            rk_k3.value.data.loadDefaultValue();
            await rk_k3.value.setDpi();
            await rk_k3.value.setKeyMapping(0);
            await rk_k3.value.setKeyMapping(1);
            await rk_k3.value.setKeyMapping(2);
            await rk_k3.value.setKeyMapping(3);
            await rk_k3.value.setKeyMapping(4);
            await rk_k3.value.setReportRate();
            await rk_k3.value.setDebounce();
            await rk_k3.value.setSleepTime();
        }
    }

    return { connectType, state, init, destroy, keyMapping, findFunction, selectedFunction, clickFunction, getKeyLayoutByIndex, clickKeyLayout, selectedKeyLayout, setAllDefault, setOneDefault, saveGameAdv, clickKeyboard, selectedKeyboard, saveKeyboard, clickMacro, refresh, setDpiLock, setToFactory, setLeftSideKeyEnable };
});