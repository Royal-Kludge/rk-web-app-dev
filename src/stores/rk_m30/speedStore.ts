import { mouse } from "@/mouse/beiying/mouse";
import { ConfigTable } from "@/mouse/beiying/rk_m30/configTable";
import { RK_M30 } from "@/mouse/beiying/rk_m30/rk_m30";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { ps } from '@/mouse/beiying/rk_m30/profiles';

export const useSpeedStore = defineStore('speedinfo_rk_m30', () => {
    const rk_m30 = ref<RK_M30>();
    const configTable = ref<ConfigTable>();

    const state = reactive({
        isDefaultClause: false,
        loading: false,
        dpiLevel: 1,
        maxDpiLevel: 6,
        dpiLevelValue: 1600,
        reportRate: 1,
        dpiList: [
            { id: 1, color: "#00FF00", value: 400, intival: 400 },
            { id: 2, color: "#FF0000", value: 800, intival: 800 },
            { id: 3, color: "#00FFFF", value: 1600, intival: 1600 },
            { id: 4, color: "#FFFF00", value: 3200, intival: 3200 },
            { id: 5, color: "#0000FF", value: 6400, intival: 6400 },
            { id: 6, color: "#FFFFFF", value: 12000, intival: 12000 },
        ],
        reportRateList: [
            { id: 1, value: 125 },
            { id: 2, value: 250 },
            { id: 3, value: 500 },
            { id: 4, value: 1000 }
        ],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m30.value == undefined || (rk_m30.value != undefined && rk_m30.value.data.isDestroy)) {
                rk_m30.value = (mouse.protocol as RK_M30);
                configTable.value = rk_m30.value.data.config;
                if (configTable.value != undefined) {
                    let rate = configTable.value.getReportRate() ?? 1;
                    state.reportRate = rate;
                    state.dpiLevel = configTable.value.getDpiLevel();
                    state.maxDpiLevel = configTable.value.getDpiMaxLevel();
                    state.dpiLevelValue = configTable.value.getDpiValue(state.dpiLevel) ?? 1600;

                    let index = 0;
                    for (index = 0; index < state.dpiList.length; index++) {
                        state.dpiList[index].value = configTable.value.getDpiValue(state.dpiList[index].id) ?? 1600;
                    }
                }
            }
        }
    };

    const refresh = async () => {
        if (configTable.value != undefined) {
            let rate = configTable.value.getReportRate() ?? 1;
            state.reportRate = rate;
            state.dpiLevel = configTable.value.getDpiLevel();
            state.maxDpiLevel = configTable.value.getDpiMaxLevel();
            state.dpiLevelValue = configTable.value.getDpiValue(state.dpiLevel) ?? 1600;

            let index = 0;
            for (index = 0; index < state.dpiList.length; index++) {
                state.dpiList[index].value = configTable.value.getDpiValue(state.dpiList[index].id) ?? 1600;
            }
        }
    };

    const setMaxDpiLevel = async (id: number) => {
        state.maxDpiLevel = id;
        configTable.value?.setDpiLevel(state.dpiLevel, state.maxDpiLevel);

        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const getDpiList = (): any => {
        return state.dpiList.filter(item => item.id <= state.maxDpiLevel);
    };

    const isSelected = (id: number): string => {
        return state.dpiLevel == id ? 'bg-warn-1 b-grey-1 br-2' : '';
    };

    const clickSpeed = async (id: number) => {
        state.loading = true;
        state.dpiLevel = id;
        state.dpiLevelValue = state.dpiList[id - 1].value;

        configTable.value?.setDpiLevel(state.dpiLevel, state.maxDpiLevel);
        configTable.value?.setDpiValue(state.dpiLevel, state.dpiList[id - 1].value);

        await rk_m30.value?.setConfigData();
        saveProfile();
        setTimeout(() => {
            state.loading = false;
        }, 1500);
    };

    const setDpiValue = async (value: number) => {
        state.loading = true;
        state.dpiList[state.dpiLevel - 1].value = value;

        configTable.value?.setDpiValue(state.dpiLevel, state.dpiList[state.dpiLevel - 1].value);

        await rk_m30.value?.setConfigData();
        saveProfile();
        setTimeout(() => {
            state.loading = false;
        }, 1500);
    };

    const saveSpeed = async () => {
        await clickSpeed(state.dpiLevel);
    };

    const setReportRate = async (value: number) => {
        configTable.value?.setReportRate(value);
        await rk_m30.value?.setConfigData();
        saveProfile();
    };

    const setDpiDefault = async () => {
        state.loading = true;
        state.isDefaultClause = false;
        state.dpiList[state.dpiLevel - 1].value = state.dpiList[state.dpiLevel - 1].intival;
        state.dpiLevelValue = state.dpiList[state.dpiLevel - 1].value;

        configTable.value?.setDpiValue(state.dpiLevel, state.dpiList[state.dpiLevel - 1].value);

        await rk_m30.value?.setConfigData();
        saveProfile();
        setTimeout(() => {
            state.loading = false;
        }, 1500);
    };

    const saveProfile = () => {
        ps.save()
    };

    return { state, init, isSelected, clickSpeed, getDpiList, setMaxDpiLevel, setDpiValue, saveSpeed, setReportRate, setDpiDefault, refresh }
})