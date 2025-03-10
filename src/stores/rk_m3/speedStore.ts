import { mouse } from "@/mouse/mouse";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useSpeedStore = defineStore('speedinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const ledTable = ref<LedTable>();

    const state = reactive({
        isDefaultClause: false,
        dpiLevel: 2,
        maxDpiLevel: 6,
        dpiLevelValue: 1600,
        reportRate: 125,
        dpiList: [
            { id: 1, color: "#55F4C1", value: 800, intival: 800 },
            { id: 2, color: "#FB752E", value: 1600, intival: 1600 },
            { id: 3, color: "#FD4832", value: 3200, intival: 3200 },
            { id: 4, color: "#F93A6C", value: 6400, intival: 6400 },
            { id: 5, color: "#8E16B6", value: 12800, intival: 12800 },
            { id: 6, color: "#3D054F", value: 25600, intival: 25600 },
        ],
        reportRateList: [{ id: 1, value: 125 },
        { id: 2, value: 250 },
        { id: 3, value: 500 },
        { id: 4, value: 1000 },
        { id: 5, value: 2000 },
        { id: 6, value: 4000 },
        { id: 7, value: 8000 }],
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m3.value == undefined) {
                rk_m3.value = (mouse.protocol as RK_M3);
                ledTable.value = rk_m3.value.data.led;
                state.reportRate = ledTable.value?.getReportRate() ?? 125;
                state.dpiLevelValue = ledTable.value?.getDpiValue(state.dpiLevel) ?? 1600;
            }
        }
    };
    const setMaxDpiLevel = (id: number) => {
        state.maxDpiLevel = id;
    }
    const getDpiList = (): any => {
        return state.dpiList.filter(item => item.id <= state.maxDpiLevel);
    }

    const isSelected = (id: number): string => {
        return state.dpiLevel == id ? 'bg-warn-1 b-grey-1 br-2' : '';
    }

    const clickSpeed = async (id: number) => {
        state.dpiLevel = id;
        state.dpiLevelValue = state.dpiList[id - 1].value;

        ledTable.value?.setDpiLevel(state.dpiLevel, state.maxDpiLevel);
        ledTable.value?.setDpiValue(state.dpiLevel, state.dpiList[id - 1].value);

        await rk_m3.value?.setDpi(state.dpiLevel - 1);
    }

    const setDpiValue = (value: number) => {
        state.dpiList[state.dpiLevel - 1].value = value;
    }

    const saveSpeed = async () => {
        await clickSpeed(state.dpiLevel);
    }

    const setReportRate = async (value: number) => {
        ledTable.value?.setReportRate(value);
        await rk_m3.value?.setReportRate();
    }
    const setDpiDefault = () => {
        state.isDefaultClause = false;
        state.dpiList[state.dpiLevel - 1].value = state.dpiList[state.dpiLevel - 1].intival;
        state.dpiLevelValue = state.dpiList[state.dpiLevel - 1].value;
    }

    return { state, init, isSelected, clickSpeed, getDpiList, setMaxDpiLevel, setDpiValue, saveSpeed, setReportRate, setDpiDefault }
})