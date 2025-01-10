import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useSpeedStore = defineStore('speedinfo_rk_k3', () => {
    const speedid = ref(0)
    const state = reactive({
        speedList: [
            { id: 1, color: "#55F4C1", text: "800" },
            { id: 2, color: "#FB752E", text: "2200" },
            { id: 3, color: "#FD4832", text: "3200" },
            { id: 4, color: "#F93A6C", text: "6400" },
            { id: 5, color: "#8E16B6", text: "12800" },
            { id: 6, color: "#3D054F", text: "30000" },
        ]
    });

    const isSelected = (id: number): string => {
        return speedid.value == id ? 'bg-warn-1 b-grey-1 br-2' : '';
    }

    const clickSpeed = (id: number) => {
        speedid.value = id;
    }
    return { state, isSelected, clickSpeed }
})