import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

export const useMainStore = defineStore('maininfo_rk_m3', () => {
    const itemid = ref(0)
    const state = reactive({
        navName: 'sys',
        navList: [
            {
                name: "sys", label: "系统按键", list: [
                    {
                        title: "鼠标键盘", items: [
                            { id: 1, title: "禁用" },
                            { id: 2, title: "左键" },
                            { id: 3, title: "右键" },
                            { id: 4, title: "中键" },
                            { id: 5, title: "后退" },
                            { id: 6, title: "前进" },
                        ]
                    },
                    {
                        title: "DPI按键", items: [
                            { id: 7, title: "DPI循环" },
                            { id: 8, title: "DPI+" },
                            { id: 9, title: "DPI-" },
                        ]
                    },
                    {
                        title: "鼠标滚轮", items: [
                            { id: 10, title: "左滚" },
                            { id: 11, title: "右滚" },
                            { id: 12, title: "上滚" },
                        ]
                    },
                ],
            },
            { name: "key", label: "键盘按键" },
            { name: "special", label: "特殊按键" },
            { name: "macro", label: "录制宏" },
        ]
    });

    const isSelected = (id: number): string => {
        return itemid.value == id ? 'bg-warn-1' : '';
    }

    const clickItem = (id: number) => {
        itemid.value = id;
    }
    return { state, isSelected, clickItem }
})