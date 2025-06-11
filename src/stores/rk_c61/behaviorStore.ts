import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useBehaviorStore = defineStore("behaviorinfo_rk_c61", () => {
  const adjustingCount = ref(0);
  const state = reactive({
    maxTouchTravel: 4.0,
    pressStatus: 0,
    maxMM: 0,
    menuid: 1,
    menuList: [
      { id: 1, title: "普通模式", style: "" },
      { id: 2, title: "RT模式", style: "" },
      { id: 3, title: "高级设置", style: "" },
      { id: 4, title: "键盘校准", style: "" },
    ],
    rewardList: [
      {
        value: "8000",
        label: "8KHz",
      },
      {
        value: "4000",
        label: "4KHz",
      },
      {
        value: "2000",
        label: "2KHz",
      },
      {
        value: "1000",
        label: "1KHz",
      },
      {
        value: "500",
        label: "500Hz",
      },
      {
        value: "250",
        label: "250Hz",
      },
      {
        value: "4000",
        label: "4KHz",
      },
    ],
    reward: "8KHz",
    globalKey: 0,
    oneKey: 0,
    tripTest: false,
  });

  setInterval(function () {
    adjustingCount.value = Math.random() * 3;
  }, 1000);

  const setMenuid = (id: number) => {
    state.menuid = id;
  };

  return { state, setMenuid, adjustingCount };
});
