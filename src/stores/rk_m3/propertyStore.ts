import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from "@/mouse/mouse";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";

export const usePropertyStore = defineStore('propertyinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const ledTable = ref<LedTable>();

    const lodVal = ref(1);
    const sensorVal = ref("波纹控制");
    const rippleEnable = ref(false); //波纹控制
    const angleSnaping = ref(false); //直线修正
    const glassMode = ref(false);    //玻璃模式
    const motionSync = ref(false);   //Motion sync
    const sensorMode = ref(0);       //传感器模式
    const sleepTime = ref(0);        //休眠时间
    const rollVal = ref("连续滚动");
    const state = reactive({
        sleep: 0,
        delay: 1,
        lodList: [
            { value: 1, label: "0.7mm" },
            { value: 2, label: "1.0mm" },
            { value: 3, label: "2.0mm" }
        ],
        sensorList: [
            { value: "波纹控制", label: "波纹控制", flag: true },
            { value: "直线修正", label: "直线修正", flag: true  },
            { value: "Motion sync", label: "Motion sync", flag: true  },
            { value: "玻璃模式", label: "玻璃模式", flag: true  },
        ],
        modeList: [
            { value: 0, label: "办公" },
            { value: 1, label: "高性能" },
            { value: 2, label: "游戏发烧" },
        ],
        rollList: [
            { value: "连续滚动", label: "连续滚动" },
            { value: "一次滚动一页", label: "一次滚动一页" },
        ],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m3.value == undefined) {
                rk_m3.value = (mouse.protocol as RK_M3);
                ledTable.value = rk_m3.value.data.led;
            }

            if (ledTable.value != undefined) {
                lodVal.value = ledTable.value.getLodHeight();
                rippleEnable.value = ledTable.value.getRippleEnable();
                angleSnaping.value = ledTable.value.getAngleSnaping();
                glassMode.value = ledTable.value.getGlassMode();
                motionSync.value = ledTable.value.getMotionSync();
                sensorMode.value = ledTable.value.getSensorMode();
                sleepTime.value = ledTable.value.getSleepTime();
            }
        }
    };
    
    const setLodHeight = async (val: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setLodHeight(val);
        }

        await rk_m3.value?.setLodHeight();
    }

    const setSensorMode = async (mode: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setSensorMode(mode);
        }

        await rk_m3.value?.setPerformance();
    }

    const setRippleEnable = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setRippleEnable(flag);
        }

        await rk_m3.value?.setPerformance();
    }

    const setAngleSnaping = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setAngleSnaping(flag);
        }

        await rk_m3.value?.setPerformance();
    }

    const setGlassMode = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setGlassMode(flag);
        }

        await rk_m3.value?.setPerformance();
    }

    const setMotionSync = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setMotionSync(flag);
        }

        await rk_m3.value?.setPerformance();
    }

    const setSleepTime = async (time: number) => {
        if (ledTable.value != undefined) {
            let last = time % 30;
            ledTable.value.setLodHeight(time - last);
        }

        await rk_m3.value?.setSleepTime();
    }

    return { state, lodVal, sensorVal, sensorMode, rollVal }
})