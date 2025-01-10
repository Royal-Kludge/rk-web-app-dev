import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const usePropertyStore = defineStore('propertyinfo_rk_k3', () => {
    const lodVal = ref("低");
    const sensorVal = ref("波纹控制");
    const modeVal = ref("办公");
    const rollVal = ref("连续滚动");
    const state = reactive({
        sleep: 0,
        delay: 1,
        lodList: [
            { value: "低", label: "低" },
            { value: "高", label: "高" }
        ],
        sensorList: [
            { value: "波纹控制", label: "波纹控制" },
            { value: "直线修正", label: "直线修正" },
            { value: "Motion sync", label: "Motion sync" },
        ],
        modeList: [
            { value: "办公", label: "办公" },
            { value: "高性能", label: "高性能" },
            { value: "游戏发烧", label: "游戏发烧" },
        ],
        rollList: [
            { value: "连续滚动", label: "连续滚动" },
            { value: "一次滚动一页", label: "一次滚动一页" },
        ],
    });

    return { state, lodVal, sensorVal, modeVal, rollVal }
})