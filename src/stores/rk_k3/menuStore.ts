import { defineStore } from "pinia";

export const useMenuStore = defineStore("menustore_rk_k3", {
    state: () => ({
        meunid: 0,
        moduleid: 0,
        name: '<img src="/src/assets/images/logo@1x.png" style="width: 130px" />',
        moduleList: [] as any,
        menuList: [
            { id: 1, title: "home.menu_1", src: "/src/assets/images/menu/mouse/main.png" },
            // { id: 2, title: "home.menu_2", src: "/src/assets/images/menu/mouse/macro.png" },
            { id: 3, title: "home.menu_3", src: "/src/assets/images/menu/mouse/speed.png" },
            { id: 4, title: "home.menu_4", src: "/src/assets/images/menu/mouse/property.png" },
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
