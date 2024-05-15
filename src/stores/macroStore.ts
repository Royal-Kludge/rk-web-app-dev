import { defineStore } from "pinia";

export const useMacroStore = defineStore("macrostore", {
  state: () => ({
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
    ] as any,
    actList: [
      { value: "macro.menu_1", label: "macro.menu_1" },
      { value: "macro.menu_2", label: "macro.menu_2" }
    ] as any
  }),
  actions: {},
});
