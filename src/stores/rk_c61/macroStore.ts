import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Macro, Macros, Action, ActionType } from '@/keyboard/sparklink/macros';
import { RK_C61, RK_C61_EVENT_DEFINE } from '@/keyboard/sparklink/rk_c61/rk_c61';
import { keyboard } from '@/keyboard/sparklink/keyboard'
import { storage } from '@/common/storage';
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'

export const useMacroStore = defineStore("macrostore_rk_c61", () => {
  const rk_c61 = ref<RK_C61>();
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
      { value: "macro.menu_2", label: "macro.menu_2" }
    ],
    delayList: [
      { value: "macro.menu_4", label: "macro.menu_4" },
      { value: "macro.menu_5", label: "macro.menu_5" },
      { value: "macro.menu_6", label: "macro.menu_6" }
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
    if (rk_c61.value == undefined) {
      rk_c61.value = (keyboard.protocol as RK_C61);
      keyboard.addEventListener("connection", connectionEventCallback);
    }

    if (rk_c61.value != undefined && !isInited.value) {
      rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

      let tmp = storage.get(`${keyboard.keyboardDefine?.name}_macro`) as Macros;
      if (tmp != null) {
        let ms = new Macros();
        for (let m of tmp.macroList) {
          let tm = new Macro(m.name);
          tm.repeat = m.repeat;
          for (let a of m.actions) {
            let ta = new Action(a.key, a.delay, a.action);
            tm.add(ta);
          }
          tm.refresh();
          ms.add(tm);
        }
        rk_c61.value.data.macros = ms;
        macros.value = rk_c61.value.data.macros;
        macro.value = macros.value.get()[0];
        refresh();
      } else {
        let ms = new Macros();
        ms.add(new Macro("Default Macro"));
        rk_c61.value.data.macros = ms;
        macros.value = rk_c61.value.data.macros;
        macro.value = macros.value.get()[0];
        //await c61.value.getMacros();
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
          let ta = new Action(a.key, a.delay, a.action);
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
        let ta = new Action(a.key, a.delay, a.action);
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
    switch (keyboard.state.connectionEvent) {
      case ConnectionEventEnum.Disconnect:
      case ConnectionEventEnum.Close:
        destroy();
        break;
    }
  };

  const destroy = () => {
    if (rk_c61.value != undefined) {
      rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }

    if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
      keyboard.removeEventListener("connection", connectionEventCallback);
      isInited.value = false;
      rk_c61.value = undefined;
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
    if (rk_c61.value != undefined) {
      await rk_c61.value.getMacros();
    }
  }

  const setMacroData = async () => {
    if (rk_c61.value != undefined) {
      //await rk_c61.value.setMacros();
    }
  }

  const clearMacro = async () => {
    if (rk_c61.value != undefined) {
      let ms = new Macros();
      rk_c61.value.data.macros = ms;
      macros.value = rk_c61.value.data.macros;
      macro.value = undefined;
    }
  }

  const isMacroSelected = (obj: Macro): string => {
    return obj.index == macro.value?.index ? 'module_active2' : '';
  }

  return { macros, state, actions, key, init, destroy, refresh, getMacroData, exportMacro, importProfile, setMacroData, clearMacro, saveAction, isMacroSelected }
});
