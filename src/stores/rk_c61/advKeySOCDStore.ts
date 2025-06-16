import { defineStore } from "pinia";
export const useAdvKeySOCDStore = defineStore("advKeySOCDStore_rk_c61", {
  state: () => ({
    socdVal: "绑定位置（键盘指定位置的两个按键互相绑定）",
    socdList: [
      { value: "绑定位置（键盘指定位置的两个按键互相绑定）", label: "绑定位置（键盘指定位置的两个按键互相绑定）" },
      { value: "绑定键值（两个键值互相绑定）", label: "绑定键值（两个键值互相绑定）" },
    ],
    modeVal: "1",
    modeList: [
      { value: "1", label: "后覆盖（后按下的按键会覆盖前一个）" },
      { value: "2", label: "红框中的按键优先" },
      { value: "3", label: "蓝框中的按键优先" },
      { value: "4", label: "中性（两个按键都按下都不生效）" },
    ],
  }),
  actions: {},
});