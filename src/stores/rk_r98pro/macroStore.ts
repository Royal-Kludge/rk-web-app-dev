import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Macro, Macros, Action, ActionType } from '@/keyboard/beiying/rk_r98pro/macros';
import { RK_R98, RK_R98_EVENT_DEFINE } from '@/keyboard/beiying/rk_r98pro/rk_r98pro';
import { keyboard } from '@/keyboard/beiying/keyboard'
import { storage } from '@/common/storage';
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import fileSaver from "file-saver";
import { ElMessage } from 'element-plus'

export const useMacroStore = defineStore("macrostore_rk_r98pro", () => {
  const rk_r98pro = ref<RK_R98>();
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
    if (rk_r98pro.value == undefined) {
      rk_r98pro.value = (keyboard.protocol as RK_R98);
      keyboard.addEventListener("connection", connectionEventCallback);
    }

    if (rk_r98pro.value != undefined && !isInited.value) {
      rk_r98pro.value.addEventListener(RK_R98_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

      let tmp = storage.get(`${keyboard.keyboardDefine?.name}_macro`) as Macros;
      if (tmp != null) {
        let ms = new Macros();
        for (let m of tmp.macroList) {
          let tm = new Macro(m.name);
          tm.repeat = m.repeat;
          for (let a of m.actions) {
            let ta = new Action(a.key, a.delay, a.action, a.type);
            tm.add(ta);
          }
          tm.refresh();
          ms.add(tm);
        }
        rk_r98pro.value.data.macros = ms;
        macros.value = rk_r98pro.value.data.macros;
        macro.value = macros.value.get()[0];
        refresh();
      } else {
        let ms = new Macros();
        ms.add(new Macro("Default Macro"));
        rk_r98pro.value.data.macros = ms;
        macros.value = rk_r98pro.value.data.macros;
        macro.value = macros.value.get()[0];
        //await rk_m87.value.getMacros();
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
    switch (keyboard.state.connectionEvent) {
      case ConnectionEventEnum.Disconnect:
      case ConnectionEventEnum.Close:
        destroy();
        break;
    }
  };

  const destroy = () => {
    if (rk_r98pro.value != undefined) {
      rk_r98pro.value.removeEventListener(RK_R98_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }

    if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
      keyboard.removeEventListener("connection", connectionEventCallback);
      isInited.value = false;
      rk_r98pro.value = undefined;
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
    if (rk_r98pro.value != undefined) {
      await rk_r98pro.value.getMacros();
    }
  }

  const setMacroData = async () => {
    if (rk_r98pro.value != undefined) {
      await rk_r98pro.value.setMacros();
    }
  }

  const clearMacro = async () => {
    if (rk_r98pro.value != undefined) {
      let ms = new Macros();
      rk_r98pro.value.data.macros = ms;
      macros.value = rk_r98pro.value.data.macros;
      macro.value = undefined;
    }
  }

  return { macros, state, actions, key, init, destroy, refresh, getMacroData, exportMacro, importProfile, setMacroData, clearMacro, saveAction }
});
