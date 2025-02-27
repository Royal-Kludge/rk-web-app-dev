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
import type { KeyMappingData } from "@/mouse/interface";

export const useKeyStore = defineStore('keyinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const connectType = ref<ConnectionType>()
    const isInited = ref(false);
    const profile = ref<Profile>();
    const { t } = useI18n();

    const state = reactive({
        nameEditorDisplay: false,
        profiles: ps,
        profileList: [],
        name: '',
        isNewProfile: false,
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
                keys: [],
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
                key: KeyDefineEnum.NONE,
                count: 1,
                delay: 10,
                keys: [],
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

    const getProfiles = () => {
      if (rk_m3.value != undefined) {
        ps.init(t("Profile.default"));
        if (ps.curIndex == undefined) ps.curIndex = 0;
        profile.value = ps.get()[ps.curIndex];

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
      }
    }

    const clickProfile = async (obj: Profile) => {

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
        state.nameEditorDisplay = false
        state.isNewProfile = false
    };
    const newProfile = () => {
        let tm = new Profile(`${t("Profile.namePrefix")} ${ps.get().length + 1}`);

        state.name = tm.name;
        state.isNewProfile = true;
        renameProfile(tm)
    };

    const keyMapping = (index: KeyTableEnum, func: KeyFunctionType, keyCode: KeyDefineEnum, modify: KeyDefineEnum = 0, count: number = 0, delay: number = 0) => {
        let key : number = 0;

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
                key = keyCode | (count << 8) | delay;
                break;
            case KeyFunctionType.Shortcuts:
                key = keyCode;
                break;
            case KeyFunctionType.Disable:
                key = 0;
                break;
        };
        
        let mapping : KeyMappingData = {
            keyStr: KeyText[key],
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

    return { connectType, profile, state, init, destroy, clickProfile, importProfile, renameProfile, deleteProfile, exportProfile, handleEditClose, renameSaveProfile, newProfile, keyMapping }
})