import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { mouse } from "@/mouse/mouse";
import { ConfigTable } from "@/mouse/rk_m30/configTable";
import { RK_M30 } from "@/mouse/rk_m30/rk_m30";
import { ps } from "@/mouse/rk_m30/profiles";

export const usePropertyStore = defineStore('propertyinfo_rk_m30', () => {
    const rk_m30 = ref<RK_M30>();
    const configTable = ref<ConfigTable>();

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
            if (rk_m30.value == undefined || (rk_m30.value != undefined && rk_m30.value.data.isDestroy)) {
                rk_m30.value = (mouse.protocol as RK_M30);
                if (rk_m30.value.data != undefined) {
                    configTable.value = rk_m30.value.data.config;
                }
                
            }

            refresh();
        }
    };

    const refresh = () => {
        if (configTable.value != undefined) {
            state.lodVal = configTable.value.getLodHeight();
            state.rippleEnable = configTable.value.getRippleEnable();
            state.angleSnaping = configTable.value.getAngleSnaping();
            //state.glassMode = configTable.value.getGlassMode();
            state.motionSync = configTable.value.getMotionSync();
            //state.sensorMode = configTable.value.getSensorMode();
            state.sleepTime = configTable.value.getSleepTime();
            state.debounceTime = configTable.value.getDebounce();
        }
    };

    const setLodHeight = async (val: number) => {
        if (configTable.value != undefined) {
            configTable.value.setLodHeight(val);
        }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setSensorMode = async (mode: number) => {
        // if (configTable.value != undefined) {
        //     configTable.value.setSensorMode(mode);
        // }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setRippleEnable = async (flag: boolean) => {
        if (configTable.value != undefined) {
            configTable.value.setRippleEnable(flag);
        }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setAngleSnaping = async (flag: boolean) => {
        if (configTable.value != undefined) {
            configTable.value.setAngleSnaping(flag);
        }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setGlassMode = async (flag: boolean) => {
        // if (configTable.value != undefined) {
        //     configTable.value.setGlassMode(flag);
        // }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setMotionSync = async (flag: boolean) => {
        if (configTable.value != undefined) {
            configTable.value.setMotionSync(flag);
        }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setSleepTime = async (time: number) => {
        if (configTable.value != undefined) {
            let last = time % 30;
            configTable.value.setSleepTime(time - last);
        }

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setDebounceTime = async (val: number) => {
        if (configTable.value != undefined) {
            configTable.value.setDebounce(val);
        }

        await rk_m30.value?.setConfigData();
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