import { defineStore } from "pinia";

export const useAdvKeyStore = defineStore("advKeyStore_rk_c61", {
  state: () => ({
    isAdvKeyDialog: false,
    titleid: 0,
    TGLList: [
      {
        id: 1,
        title: "",
        key: "",
        src: "",
      },
    ],
    MTList: [
      {
        id: 1,
        title: "按住",
        key: "",
        src: "",
      },
      {
        id: 2,
        title: "单击",
        key: "",
        src: "",
      },
    ],
    TitleList: [
      {
        id: 1,
        title: "DKS",
        des: "单个按键实现四种功能：您可以根据4种不同的按压程度绑定1至4种功能。",
        src: "/src/assets/images/menu/high/dks.png",
      },
      {
        id: 2,
        title: "MT",
        des: "按住和单击按键实现不同功能。",
        src: "/src/assets/images/menu/high/mt.png",
      },
      {
        id: 3,
        title: "TGL",
        des: "单击按键开启持续触发，按住按键为正常触发。",
        src: "/src/assets/images/menu/high/tgl.png",
      },
      {
        id: 4,
        title: "MPT",
        des: "单个按键可在三个不同的深度触发三个不同的按键。",
        src: "/src/assets/images/menu/high/mpt.png",
      },
      {
        id: 5,
        title: "END",
        des: "单个按键可在松开时发送另一个按键。",
        src: "/src/assets/images/menu/high/end.png",
      },
      {
        id: 6,
        title: "SOCD",
        des: "绑定两个按键，后按下的按键会强制释放前一个按键，同一时刻只会触发一个按键。",
        src: "/src/assets/images/menu/high/socd.png",
      },
      {
        id: 7,
        title: "MACRO",
        des: "给按键设置一串指令，实现发送多个按键。",
        src: "/src/assets/images/menu/high/macro.png",
      },
    ] as any,
  }),
  actions: {
    setTitleid(id: number) {
      this.titleid = id;
      this.isAdvKeyDialog = true;
    },
  },
});
