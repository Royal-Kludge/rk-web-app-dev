import { defineStore } from "pinia";

export const useMenuStore = defineStore("menustore_rk_c61", {
  state: () => ({
    meunid: 0,
    moduleid: 0,
    name: '<img src="/src/assets/images/logo@1x.png" style="width: 130px" />',
    moduleList: [] as any,
    menuList: [{
      id: 1, title: "键盘设置", src: "/src/assets/images/menu/key.png",
      children: [
        { id: 1, title: "配置文件1", src: "/src/assets/images/dot.png", },
        { id: 2, title: "配置文件2", src: "/src/assets/images/dot.png", },
        { id: 3, title: "配置文件3", src: "/src/assets/images/dot.png", },
      ],
    },
    { id: 2, title: "性能设置", src: "/src/assets/images/menu/behavior.png" },
    { id: 3, title: "高级键", src: "/src/assets/images/menu/adv.png" },
    { id: 4, title: "宏管理器", src: "/src/assets/images/menu/macro.png" },
    { id: 5, title: "灯光模式", src: "/src/assets/images/menu/light.png" },
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
