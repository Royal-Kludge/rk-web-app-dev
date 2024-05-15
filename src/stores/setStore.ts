import { defineStore } from "pinia";

export const useSetStore = defineStore("setstore", {
    state: () => ({
        langList: [
            {
                value: "zh",
                label: "简体中文",
            },
            {
                value: "en",
                label: "English",
            },
            {
                value: "tw",
                label: "繁体中文",
            },
        ] as any
    }),
    actions: {},
});
