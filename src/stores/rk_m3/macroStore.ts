import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Macro, Macros, Action, ActionType } from '@/mouse/rk_m3/macros';
import { RK_M3 } from '@/mouse/rk_m3/rk_m3';
import { mouse, RK_MOUSE_EVENT_DEFINE } from '@/mouse/mouse'
import { storage } from '@/common/storage';
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'
import { KeyDefineEnum, KeyText } from "@/common/keyCode";

export const useMacroStore = defineStore("macrostore_rk_m3", () => {
    const rk_m3 = ref<RK_M3>();
    const macros = ref<Macros>();
    const macro = ref<Macro>();
    const key = ref<string>('');

    const state = reactive({
        eventVal: 1,
        eventList: [
            {
                value: 1,
                label: "macro.event_1",
            },
            {
                value: 2,
                label: "macro.event_2",
            },
        ],
        actList: [
            { value: "macro.menu_1", label: "macro.menu_1" },
            { value: "macro.menu_2", label: "macro.menu_2" },
            { value: "macro.menu_3", label: "macro.menu_3" },
        ],
        delayList: [
            { value: "macro.menu_4", label: "macro.menu_4" },
            { value: "macro.menu_5", label: "macro.menu_5" },
            { value: "macro.menu_6", label: "macro.menu_6" }
        ],
        mouseVal: KeyDefineEnum.KEY_L_BUTTON,
        mouseList: [
            { key: KeyDefineEnum.KEY_L_BUTTON, text: 'mouseKey.leftKey' },
            { key: KeyDefineEnum.KEY_R_BUTTON, text: 'mouseKey.rightKey' },
            { key: KeyDefineEnum.KEY_M_BUTTON, text: 'mouseKey.middleKey' },
            { key: KeyDefineEnum.KEY_RB0_BUTTON, text: 'mouseKey.forwardKey' },
            { key: KeyDefineEnum.KEY_RB1_BUTTON, text: 'mouseKey.backKey' },
        ],
        macro: macro,
        name: '',
        nameEditorDisplay: false,
        key: key,
        actionTextShow: false,
        actionText: '',
    });
    const actions = {};
    const isInited = ref(false);

    const init = async () => {
        if (rk_m3.value == undefined || (rk_m3.value != undefined && rk_m3.value.data.isDestroy)) {
            rk_m3.value = (mouse.protocol as RK_M3);
            mouse.addEventListener("connection", connectionEventCallback);
        }

        if (rk_m3.value != undefined && !isInited.value) {
            rk_m3.value.addEventListener(RK_MOUSE_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

            let tmp = storage.get(`${mouse.mouseDefine?.name}_macro`) as Macros;
            if (tmp != null) {
                let ms = new Macros();
                for (let m of tmp.macroList) {
                    let tm = new Macro(m.name);
                    for (let a of m.actions) {
                        let ta = new Action(a.key, a.delay, a.action, a.type);
                        tm.add(ta);
                    }
                    tm.refresh();
                    ms.add(tm);
                }
                rk_m3.value.data.macros = ms;
                macros.value = rk_m3.value.data.macros;
                macro.value = macros.value.get()[0];
                refresh();
            } else {
                let ms = new Macros();
                ms.add(new Macro("Default Macro"));
                rk_m3.value.data.macros = ms;
                macros.value = rk_m3.value.data.macros;
                macro.value = macros.value.get()[0];
            }

            isInited.value = true;
        }
    };

    const importProfile = (str: any) => {
        try {
            var p: Macro = JSON.parse(str);
            if (p.name == undefined) {
                ElMessage.error('Error parsing JSON data')
            }
            else {
                let tm = new Macro(p.name)
                for (let a of p.actions) {
                    let ta = new Action(a.key, a.delay, a.action, a.type);
                    tm.add(ta);
                }
                tm.refresh();
                macro.value = tm;
                macros.value?.add(macro.value);
            }
            // 成功解析后的代码
        } catch (e) {
            // 解析出错时的代码
            ElMessage.error('Error parsing JSON data')
        }
    };

    const saveAction = () => {
        try {
            var as: Array<Action> = JSON.parse(state.actionText);
            macro.value?.clear();
            for (let a of as) {
                let ta = new Action(a.key, a.delay, a.action, a.type);
                macro.value?.add(ta);
            }
            macro.value?.refresh();
            // 成功解析后的代码
        } catch (e) {
            // 解析出错时的代码
            ElMessage.error('Error parsing JSON data')
        }
    };

    const exportMacro = (obj: Macro) => {
        let blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
        fileSaver.saveAs(blob, `${obj.name}.rk`);
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
        if (rk_m3.value != undefined) {
            rk_m3.value.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
        }

        if (mouse.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
            mouse.removeEventListener("connection", connectionEventCallback);
            isInited.value = false;
            rk_m3.value = undefined;
        }
    };

    const macroGotten = (event: any) => {
        macros.value = event.detail as Macros;
        refresh();
    };

    const refresh = () => {
        if (macros.value != undefined) {
            macro.value = macros.value.get()[0];
        }
    };

    const getMacroData = async () => {
        if (rk_m3.value != undefined) {
            await rk_m3.value.getMacros();
        }
    }

    const setMacroData = async () => {
        if (rk_m3.value != undefined) {
            await rk_m3.value.setMacros();
        }
    }

    const clearMacro = async () => {
        if (rk_m3.value != undefined) {
            let ms = new Macros();
            rk_m3.value.data.macros = ms;
            macros.value = rk_m3.value.data.macros;
            macro.value = undefined;
        }
    }
    const clickMacro = (obj: Macro) => {
        state.macro = obj;
    }
    const selectedMacro = (obj: Macro): string => {
        return obj.index == state.macro?.index ? 'bg-warn-1' : '';
    }

    return { macros, state, actions, key, init, destroy, refresh, getMacroData, exportMacro, importProfile, setMacroData, clearMacro, saveAction, clickMacro, selectedMacro }
});