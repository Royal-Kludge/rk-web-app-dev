import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from '@/mouse/mouse'
import { RK_M3, RK_M3_EVENT_DEFINE } from '@/mouse/rk_m3/rk_m3';
import { ConnectionEventEnum, ConnectionStatusEnum, ConnectionType } from '@/device/enum'
import { Profile, ps } from '@/mouse/rk_m3/profiles';
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { KEY_TABLE_DATA, KeyTable, KeyTableEnum } from "@/mouse/rk_m3/keyTable";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { KeyDefineEnum, KeyText } from "@/common/keyCode";
import { KeyMappingType, KeyFunctionType, MacroLoopEnum } from "@/mouse/enum";
import type { KeyMappingData, KeyTableData } from "@/mouse/interface";
import { KEY_LAYOUT } from '@/mouse/rk_m3/layout';
import { Macro } from '@/mouse/rk_m3/macros';

export const useKeyStore = defineStore('keyinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const connectType = ref<ConnectionType>()
    const isInited = ref(false);
    const profile = ref<Profile>();
    const { t } = useI18n();

    const state = reactive({
        nameEditorDisplay: false,
        profileList: [],
        name: '',
        isNewProfile: false,
        defaultLayout: KEY_LAYOUT,
        gameList: [
            { value: KeyMappingType.Mouse, label: "鼠标功能" },
            { value: KeyMappingType.KeyCombo, label: "键盘功能" }
        ],
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
            type: KeyMappingType.Mouse,
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

            getProfiles();
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
            isInited.value = false;
        }
    };

    const refresh = () => {
        if (state.profileList.length > 0) {
            state.profileList.splice(0, state.profileList.length);
        }

        let i: number
        for (i = 0; i < ps.list.length; i++) {
            (state.profileList as Array<Profile>).push(ps.list[i]);
        }
    }

    const getProfiles = () => {
        ps.init(t("Profile.default"));
        if (ps.curIndex == undefined) ps.curIndex = 0;
        profile.value = ps.get()[ps.curIndex];
        setProfiles();

    }
    const setProfiles = () => {
        if (rk_m3.value != undefined && profile.value != undefined) {
            if (profile.value.keyLayout)
                if (profile.value.keyTable != undefined) {
                    if (rk_m3.value.data.keys != undefined) {
                        rk_m3.value.data.keys.buffer = new DataView(new Uint8Array(Object.values(profile.value.keyTable)).buffer);
                    } else {
                        rk_m3.value.data.keys = new KeyTable(new DataView(new Uint8Array(Object.values(profile.value.keyTable)).buffer));
                    }
                }

            if (profile.value.keyLayout != undefined && rk_m3.value.data.keys != undefined) {
                rk_m3.value.data.keys.keyLayout = profile.value.keyLayout;
            }

            if (profile.value.ledTable != undefined) {
                if (rk_m3.value.data.led != undefined) {
                    rk_m3.value.data.led.buffer = new DataView(new Uint8Array(Object.values(profile.value.ledTable)).buffer);
                } else {
                    rk_m3.value.data.led = new LedTable(new DataView(new Uint8Array(Object.values(profile.value.ledTable)).buffer));
                }
            }
            refresh();
        }
    }

    const clickProfile = async (obj: Profile) => {
        profile.value = ps.find(obj);
        setProfiles();
    }

    const importProfile = (str: any) => {
        try {
            var p: Profile = JSON.parse(str);
            if (p.name == undefined) {
                ElMessage.error('Error parsing JSON data')
            }
            else {
                let tm = new Profile(p.name);
                tm.ledTable = p.ledTable;
                tm.keyTable = p.keyTable;
                profile.value = tm;
                ps.add(profile.value);
                saveProfile()
            }
            // 成功解析后的代码
        } catch (e) {
            // 解析出错时的代码
            ElMessage.error('Error parsing JSON data')
        }
    }

    const saveProfile = () => {
        ps.save()
    }
    const renameProfile = (obj: Profile) => {
        profile.value = obj;
        state.name = obj.name;
        state.nameEditorDisplay = true;
    };
    const deleteProfile = (obj: Profile) => {
        ps.remove(obj);
        if (ps.get().length > 0) {
            profile.value = ps.get()[0];
        } else {
            profile.value = undefined;
        }
        saveProfile();
        refresh();
    };

    const exportProfile = (obj: Profile) => {
        let blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
        fileSaver.saveAs(blob, `${obj.name}.rk`);
    };
    const handleEditClose = (done: () => void) => {
        done();
        state.isNewProfile = false
    };
    const renameSaveProfile = () => {
        if (profile.value != undefined) {
            profile.value.name = state.name;
            if (state.isNewProfile = true) {
                ps.add(profile.value);
            }
        }
        saveProfile();
        setProfiles();
        state.nameEditorDisplay = false
        state.isNewProfile = false
    };
    const newProfile = () => {
        let tm = new Profile(`${t("Profile.namePrefix")} ${ps.get().length + 1}`);

        state.name = tm.name;
        state.isNewProfile = true;
        renameProfile(tm)
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
    }

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
    }
    const findFunction = () => {
        state.functionItem = state.functionList.find(obj => obj.function === state.functionValue);
        if (state.functionItem.function == KeyFunctionType.Disable) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.Disable, state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
    };
    const saveGameAdv = () => {
        if (state.KeyLayoutIndex != undefined) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.GameAdv, state.functionItem.type == KeyMappingType.KeyCombo ? state.functionItem.key.hid : state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.type);
            saveProfile();
        }
    }
    const clickKeyboard = (key: KeyDefineEnum) => {
        let keyboard = state.functionItem.keys.find((obj: any) => obj.key === key);
        if (keyboard != undefined) {
            if ((state.functionItem.modify & keyboard.key) > 0) {
                state.functionItem.modify &= ~keyboard.key;
            } else {
                state.functionItem.modify |= keyboard.key;
            }
        }
    }
    const saveKeyboard = () => {
        if (state.KeyLayoutIndex != undefined) {
            keyMapping(state.KeyLayoutIndex, KeyFunctionType.Keyboard, state.functionItem.key.hid, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
    }
    const selectedKeyboard = (key: KeyDefineEnum): string => {
        let keyboard = state.functionItem.keys.find((obj: any) => obj.key === key);
        if (keyboard != undefined && state.functionItem.modify & keyboard.key) {
            return 'but_selected';
        }
        return "";
    }
    const selectedFunction = (key: number): string => {
        return state.functionItem.key == key ? 'bg-warn-1' : '';
    }


    const clickFunction = (key: KeyDefineEnum) => {
        state.functionItem.key = key;
        if (state.functionValue != KeyFunctionType.Keyboard && state.functionValue != KeyFunctionType.GameAdv && state.functionValue != KeyFunctionType.Macro) {
            keyMapping(state.KeyLayoutIndex, state.functionItem.function, state.functionItem.key, state.functionItem.modify, state.functionItem.count, state.functionItem.delay);
            saveProfile();
        }
    }


    const clickKeyLayout = (index: number) => {
        state.KeyLayoutIndex = index;
    }
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
    }
    const setAllDefault = () => {
        for (let i = 0; i < state.defaultLayout.length; i++) {
            keyMapping(i, KeyFunctionType.MouseKey, state.defaultLayout[i].keyCode);
        }
        saveProfile();
    }
    const getOneDefault = (index: number): KeyTableData | undefined => {
        return state.defaultLayout.find(obj => obj.index === index);
    }

    const setOneDefault = () => {
        if (state.KeyLayoutIndex != undefined) {
            let keyData = getOneDefault(state.KeyLayoutIndex);
            if (keyData != undefined) {
                keyMapping(state.KeyLayoutIndex, KeyFunctionType.MouseKey, keyData.keyCode);
            }
        }
        saveProfile();
    }
    const getKeyLayoutByIndex = (index: number): string => {
        if (profile.value != undefined && profile.value.keyLayout != undefined && profile.value.keyLayout[index].keyMappingData.keyStr != undefined) {
            return profile.value.keyLayout[index].keyMappingData.keyStr.valueOf();
        }
        return "";
    }
    const clickMacro = (obj: Macro) => {

    }
    return { connectType, profile, state, init, destroy, clickProfile, importProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile, newProfile, keyMapping, findFunction, selectedFunction, clickFunction, getKeyLayoutByIndex, clickKeyLayout, selectedKeyLayout, setAllDefault, setOneDefault, saveGameAdv, clickKeyboard, selectedKeyboard, saveKeyboard, clickMacro }
})