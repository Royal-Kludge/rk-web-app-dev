import { mouse } from "@/mouse/mouse";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { ps } from '@/mouse/rk_m3/profiles';

export const useSpeedStore = defineStore('speedinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const ledTable = ref<LedTable>();

    const state = reactive({
        isDefaultClause: false,
        dpiLevel: 1,
        maxDpiLevel: 6,
        dpiLevelValue: 1600,
        reportRate: 1,
        dpiList: [
            { id: 1, color: "#00FF00", value: 800, intival: 800 },
            { id: 2, color: "#FF0000", value: 1600, intival: 1600 },
            { id: 3, color: "#00FFFF", value: 3200, intival: 3200 },
            { id: 4, color: "#FF00FF", value: 6400, intival: 6400 },
            { id: 5, color: "#0000FF", value: 12800, intival: 12800 },
            { id: 6, color: "#FFFFFF", value: 25600, intival: 25600 },
        ],
        reportRateList: [
            { id: 3, value: 125 },
            { id: 2, value: 250 },
            { id: 1, value: 500 },
            { id: 0, value: 1000 },
            { id: 6, value: 2000 },
            { id: 5, value: 4000 },
            { id: 4, value: 8000 }],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m3.value == undefined) {
                rk_m3.value = (mouse.protocol as RK_M3);
                ledTable.value = rk_m3.value.data.led;
                if (ledTable.value != undefined) {
                    let rate = ledTable.value.getReportRate() ?? 1;
                    state.reportRate = rate & 0x07;
                    state.dpiLevel = ledTable.value.getDpiLevel();
                    state.maxDpiLevel = ledTable.value.getDpiMaxLevel();
                    state.dpiLevelValue = ledTable.value.getDpiValue(state.dpiLevel) ?? 1600;
                }
            }
        }
    };

    const refresh = async () => {
        if (ledTable.value != undefined) {
            let rate = ledTable.value.getReportRate() ?? 1;
            state.reportRate = rate & 0x07;
            state.dpiLevel = ledTable.value.getDpiLevel();
            state.maxDpiLevel = ledTable.value.getDpiMaxLevel();
            state.dpiLevelValue = ledTable.value.getDpiValue(state.dpiLevel) ?? 1600;

            // if (rk_m3.value) {
            //     await rk_m3.value.setDpi(state.dpiLevel);
            // }
        }
    };

    const setMaxDpiLevel = async (id: number) => {
        state.maxDpiLevel = id;
        ledTable.value?.setDpiLevel(state.dpiLevel, state.maxDpiLevel);

        await rk_m3.value?.setDpi();
        saveProfile();
    };

    const getDpiList = (): any => {
        return state.dpiList.filter(item => item.id <= state.maxDpiLevel);
    };

    const isSelected = (id: number): string => {
        return state.dpiLevel == id ? 'bg-warn-1 b-grey-1 br-2' : '';
    };

    const clickSpeed = async (id: number) => {
        state.dpiLevel = id;
        state.dpiLevelValue = state.dpiList[id - 1].value;

        ledTable.value?.setDpiLevel(state.dpiLevel, state.maxDpiLevel);
        ledTable.value?.setDpiValue(state.dpiLevel, state.dpiList[id - 1].value);

        await rk_m3.value?.setDpi();
        saveProfile();
    };

    const setDpiValue = (value: number) => {
        state.dpiList[state.dpiLevel - 1].value = value;
    };

    const saveSpeed = async () => {
        await clickSpeed(state.dpiLevel);
    };

    const setReportRate = async (value: number) => {
        ledTable.value?.setReportRate(value);
        await rk_m3.value?.setReportRate();
        saveProfile();
    };

    const setDpiDefault = () => {
        state.isDefaultClause = false;
        state.dpiList[state.dpiLevel - 1].value = state.dpiList[state.dpiLevel - 1].intival;
        state.dpiLevelValue = state.dpiList[state.dpiLevel - 1].value;
    };

    const saveProfile = () => {
        ps.save()
    };

    return { state, init, isSelected, clickSpeed, getDpiList, setMaxDpiLevel, setDpiValue, saveSpeed, setReportRate, setDpiDefault, refresh }
})