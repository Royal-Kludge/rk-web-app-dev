import { defineStore } from "pinia";

export const useMenuStore = defineStore("menustore", {
  state: () => ({
    meunid: 1,
    moduleid: 0,
    moduleList: [] as any,
    menuList: [{
      id: 1, title: "键盘设置", src: "/src/assets/images/menu/key.png",
      children: [
        { id: 1, title: "配置文件1", src: "/src/assets/images/dot.png", },
        { id: 2, title: "配置文件2", src: "/src/assets/images/dot.png", },
        { id: 3, title: "配置文件3", src: "/src/assets/images/dot.png", },
      ],
    },
    { id: 2, title: "宏管理器", src: "/src/assets/images/menu/macro.png" },
    { id: 3, title: "灯光模式", src: "/src/assets/images/menu/light.png" },
    { id: 4, title: "自定义灯光", src: "/src/assets/images/menu/ligh-custom.png" }
    ] as any,
  }),
  actions: {
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
