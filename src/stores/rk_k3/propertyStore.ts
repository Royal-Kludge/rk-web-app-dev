import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from "@/mouse/beiying/mouse";
import { LedTable } from "@/mouse/beiying/rk_k3/ledTable";
import { RK_K3 } from "@/mouse/beiying/rk_k3/rk_k3";
import { ps } from "@/mouse/beiying/rk_k3/profiles";

export const usePropertyStore = defineStore('propertyinfo_rk_k3', () => {
    const rk_k3 = ref<RK_K3>();
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
            { value: 0, label: "property.label_5" },
            { value: 1, label: "property.label_6" },
            { value: 2, label: "property.label_7" },
        ],
        sleepList: [
            { value: 0, label: "property.label_8" },
            { value: 30, label: "property.label_9" },
            { value: 60, label: "property.label_10" },
            { value: 120, label: "property.label_11" },
            { value: 180, label: "property.label_12" },
            { value: 300, label: "property.label_13" },
            { value: 600, label: "property.label_14" },
            { value: 900, label: "property.label_15" },
            { value: 1800, label: "property.label_16" },
            { value: 3600, label: "property.label_17" },
        ],
        rollList: [
            { value: 1, label: "连续滚动" },
            { value: 2, label: "一次滚动一页" },
        ],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_k3.value == undefined || (rk_k3.value != undefined && rk_k3.value.data.isDestroy)) {
                rk_k3.value = (mouse.protocol as RK_K3);
                if (rk_k3.value.data != undefined) {
                    ledTable.value = rk_k3.value.data.led;
                }
                
            }

            refresh();
        }
    };

    const refresh = () => {
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
    };

    const setLodHeight = async (val: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setLodHeight(val);
        }

        await rk_k3.value?.setLodHeight();
        saveProfile();
    };

    const setSensorMode = async (mode: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setSensorMode(mode);
        }

        await rk_k3.value?.setPerformance();
        saveProfile();
    };

    const setRippleEnable = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setRippleEnable(flag);
        }

        await rk_k3.value?.setPerformance();
        saveProfile();
    };

    const setAngleSnaping = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setAngleSnaping(flag);
        }

        await rk_k3.value?.setPerformance();
        saveProfile();
    };

    const setGlassMode = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setGlassMode(flag);
        }

        await rk_k3.value?.setPerformance();
        saveProfile();
    };

    const setMotionSync = async (flag: boolean) => {
        if (ledTable.value != undefined) {
            ledTable.value.setMotionSync(flag);
        }

        await rk_k3.value?.setPerformance();
        saveProfile();
    };

    const setSleepTime = async (time: number) => {
        if (ledTable.value != undefined) {
            let last = time % 30;
            ledTable.value.setSleepTime(time - last);
        }

        await rk_k3.value?.setSleepTime();
        saveProfile();
    };

    const setDebounceTime = async (val: number) => {
        if (ledTable.value != undefined) {
            ledTable.value.setDebounce(val);
        }

        await rk_k3.value?.setDebounce();
        saveProfile();
    };

    const setMoveSpeed = async (val: number) => {

    };

    const setRollSpeed = async (val: number) => {

    };

    const setClickSpeed = async (val: number) => {

    };

    const saveProfile = () => {
        ps.save()
    };

    return { state, init, setLodHeight, setRippleEnable, setAngleSnaping, setGlassMode, setMotionSync, setSensorMode, setSleepTime, setMoveSpeed, setRollSpeed, setClickSpeed, setDebounceTime, refresh }
})