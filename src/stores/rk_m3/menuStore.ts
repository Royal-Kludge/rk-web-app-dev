import { defineStore } from "pinia";

export const useMenuStore = defineStore("menustore_rk_m3", {
    state: () => ({
        meunid: 0,
        moduleid: 0,
        name: '<img src="/src/assets/images/logo@1x.png" style="width: 130px" />',
        moduleList: [] as any,
        menuList: [
            { id: 1, title: "按键设置", src: "/src/assets/images/menu/mouse/main.png" },
            { id: 2, title: "宏管理器", src: "/src/assets/images/menu/mouse/macro.png" },
            { id: 3, title: "速率", src: "/src/assets/images/menu/mouse/speed.png" },
            { id: 4, title: "属性设置", src: "/src/assets/images/menu/mouse/property.png" },
        ] as any,
    }),
    actions: {
        setName(name: string) {
            this.name = name;
        },
        nameInit() {
            this.name = '<img src="/src/assets/images/logo@1x.png" style="width: 130px" />';
        },
        setMeunid(id: number) {
            this.meunid = id;
            this.moduleid = 0;
            this.moduleList = [];
            this.getModuleList(id);
        },
        setModuleid(id: number) {
            this.moduleid = id;
        },
        getModuleList(id: number) {
            this.moduleList = this.menuList?.find((item: any) => item.id === id)?.children;
        },
    },
});
