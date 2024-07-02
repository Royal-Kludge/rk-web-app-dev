import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Macro, Macros, Action, ActionType } from '@/keyboard/rk_l87/macros';
import { RK_L87, RK_L87_EVENT_DEFINE } from '../keyboard/rk_l87/rk_l87';
import { keyboard } from '../keyboard/keyboard'
import { storage } from '@/keyboard/storage';
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/keyboard/enum";

export const useMacroStore = defineStore("macrostore", () => {
  const rk_l87 = ref<RK_L87>();
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
  });
  const actions = {};
  const isInited = ref(false);

  const init = async () => {
    if (rk_l87.value == undefined) {
      rk_l87.value = (keyboard.protocol as RK_L87);
      keyboard.addEventListener("connection", connectionEventCallback);
    }

    if (rk_l87.value != undefined && !isInited.value) {
      rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

      let tmp = storage.get('macro') as Macros;
      if (tmp != null) {
        let ms = new Macros();
        for (let m of tmp.macroList) {
          let tm = new Macro(m.name);
          for (let a of m.actions) {
            let ta = new Action(a.key, a.delay, a.action, a.type);
            tm.add(ta);
          }
          ms.add(tm);
        }
        rk_l87.value.data.macros = ms;
        macros.value = rk_l87.value.data.macros;
        macro.value = macros.value.get()[0];
        refresh();
      } else {
        await rk_l87.value.getMacros();
      }

      isInited.value = true;
    }
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
    if (rk_l87.value != undefined) {
      rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }

    if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
        keyboard.removeEventListener("connection", connectionEventCallback);
        isInited.value = false;
        rk_l87.value = undefined;
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
    if (rk_l87.value != undefined) {
      await rk_l87.value.getMacros();
    }
  }

  return { macros, state, actions, key, init, destroy, refresh, getMacroData }
});
