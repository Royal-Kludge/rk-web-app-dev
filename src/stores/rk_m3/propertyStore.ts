import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from "@/mouse/mouse";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";

export const usePropertyStore = defineStore('propertyinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const ledTable = ref<LedTable>();

    const state = reactive({
        lodVal: 1, //lod高度
        rippleEnable: false, //波纹控制
        angleSnaping: false, //直线修正
        glassMode: false,    //玻璃模式
        motionSync: false,   //Motion sync
        sensorMode: 0,       //传感器模式
        sleepTime: 0,        //休眠时间
        moveSpeed: 1,       //移动速度
        rollSpeed: 1,
        rollNumber: 0,      //滚轮次数
        clickSpeed: 1,     //双击速度
        clickSpeedMax: 1100, //双击速度最大值
        debounceTime: 1, //去抖时间
        lodList: [
            { value: 1, label: "0.7mm" },
            { value: 2, label: "1.0mm" },
            { value: 3, label: "2.0mm" }
        ],
        modeList: [
            { value: 0, label: "办公" },
            { value: 1, label: "高性能" },
            { value: 2, label: "游戏发烧" },
        ],
        sleepList: [
            { value: 0, label: "无休眠" },
            { value: 30, label: "30秒" },
            { value: 60, label: "1分钟" },
            { value: 120, label: "2分钟" },
            { value: 180, label: "3分钟" },
            { value: 300, label: "5分钟" },
            { value: 600, label: "10分钟" },
            { value: 900, label: "15分钟" },
            { value: 1800, label: "30分钟" },
            { value: 3600, label: "60分钟" },
        ],
        rollList: [
            { value: 1, label: "连续滚动" },
            { value: 2, label: "一次滚动一页" },
        ],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m3.value == undefined) {
                rk_m3.value = (mouse.protocol as RK_M3);
                ledTable.value = rk_m3.value.data.led;
            }

            if (ledTable.value != undefined) {
                state.lodVal = ledTable.value.getLodHeight();
                state.rippleEnable = ledTable.value.getRippleEnable();
                state.angleSnaping = ledTable.value.getAngleSnaping();
                state.glassMode = ledTable.value.getGlassMode();
                state.motionSync = ledTable.value.getMotionSync();
                state.sensorMode = ledTable.value.getSensorMode();
                state.sleepTime = ledTable.value.getSleepTime();
                state.debounceTime = ledTable.value.getDebounce();
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

    const setDebounceTime = async (val: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setDebounce(val);
        }

        await rk_m3.value?.setDebounce();
    }
    const setMoveSpeed = async (val: number) => {

    }
    const setRollSpeed = async (val: number) => {

    }

    const setClickSpeed = async (val: number) => {

    }

    return { state, init, setLodHeight, setRippleEnable, setAngleSnaping, setGlassMode, setMotionSync, setSensorMode, setSleepTime, setMoveSpeed, setRollSpeed, setClickSpeed, setDebounceTime }
})