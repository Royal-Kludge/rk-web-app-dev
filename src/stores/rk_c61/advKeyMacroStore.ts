import { defineStore } from "pinia";
export const useAdvKeyMacroStore = defineStore("advKeyMacroStore_rk_c61", {
  state: () => ({
    times: 0,
    interval: 0,
    socdVal: "单击执行",
    socdList: [
      { value: "单击执行", label: "单击执行" },
      { value: "点击重复执行，再次点击停止", label: "点击重复执行，再次点击停止" },
      { value: "按下重复执行，弹起立刻停止", label: "按下重复执行，弹起立刻停止" },
      { value: "按下重复执行，弹起后完成此次宏后停止", label: "按下重复执行，弹起后完成此次宏后停止" },
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
