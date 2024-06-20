import { defineStore } from "pinia";

export const useSetStore = defineStore("setstore", {
    state: () => ({
        langList: [
            {
                value: "en",
                label: "English",
            },
            {
                value: "cn",
                label: "简体中文",
            },
            {
                value: "tw",
                label: "繁体中文",
            },
        ] as any
    }),
    actions: {},
});
