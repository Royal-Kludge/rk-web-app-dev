import { mouse } from "@/mouse/mouse";
import { LedTable } from "@/mouse/rk_m3/ledTable";
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useSpeedStore = defineStore('speedinfo_rk_m3', () => {
    const rk_m3 = ref<RK_M3>();
    const ledTable = ref<LedTable>();

    const dpiLevel = ref(0)
    const state = reactive({
        maxDpiLevel: 6,
        dpiList: [
            { id: 1, color: "#55F4C1", text: "800", value: 800 },
            { id: 2, color: "#FB752E", text: "1600", value: 1600 },
            { id: 3, color: "#FD4832", text: "3200", value: 3200 },
            { id: 4, color: "#F93A6C", text: "6400", value: 6400 },
            { id: 5, color: "#8E16B6", text: "12800", value: 12800 },
            { id: 6, color: "#3D054F", text: "25600", value: 25600 },
        ]
    });

    const init = async () => {
        if (mouse != undefined) {
            if (rk_m3.value == undefined) {
                rk_m3.value = (mouse.protocol as RK_M3);
                ledTable.value = rk_m3.value.data.led;
            }
        }
    };

    const isSelected = (id: number): string => {
        return dpiLevel.value == id ? 'bg-warn-1 b-grey-1 br-2' : '';
    }

    const clickSpeed = async (id: number) => {
        dpiLevel.value = id;
        
        ledTable.value?.setDpiLevel(dpiLevel.value, state.maxDpiLevel);
        ledTable.value?.setDpiValue(dpiLevel.value, state.dpiList[id - 1].value);
        
        await rk_m3.value?.setDpi(dpiLevel.value);
    }
    
    return { state, init, isSelected, clickSpeed }
})