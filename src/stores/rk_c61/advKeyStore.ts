import { defineStore } from "pinia";
import { AdvKeyMacro, DKSType, AdvKeyDKS, MTType, AdvKeyMT, TGLType, AdvKeyTGL, MPTType, AdvKeyMPT, ENDType, AdvKeyEND, SOCDType, AdvKeySOCD, AdvKey } from "@/keyboard/sparklink/rk_c61/AdvKeys";
import { KeyTableData } from "@/keyboard/sparklink/keyTableData";
import { ElMessage } from 'element-plus'
import { MagKeyAdvanceTypeEnum } from "@/keyboard/sparklink/enum";
import { Macro } from '@/keyboard/sparklink/macros';

export const useAdvKeyStore = defineStore("advKeyStore_rk_c61", {
  state: () => ({
    advanceKeysIndex: -1,
    advanceKeys: new Array<AdvKey>(),
    advanceKey: {} as AdvKey,
    key: {} as KeyTableData | undefined,
    isAdvKeyDialog: false,
    isNew: false,
    macro: undefined as Macro | undefined,
    titleid: MagKeyAdvanceTypeEnum.DKS,
    advKeyDKS: new AdvKeyDKS([new DKSType(0), new DKSType(1), new DKSType(2), new DKSType(3)]),
    advKeyMT: new AdvKeyMT([new MTType(0, "按住"), new MTType(1, "单击")]),
    advKeyTGL: new AdvKeyTGL([new TGLType(0, "按住"), new TGLType(1, "单击")]),
    advKeyMPT: new AdvKeyMPT([new MPTType(0), new MPTType(1), new MPTType(2)]),
    advKeyEND: new AdvKeyEND([new ENDType(0)]),
    advKeySOCD: new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3)]),
    advKeyMacro: new AdvKeyMacro(undefined),
    macroModeList: [
      { value: 1, label: "单击执行" },
      { value: 2, label: "点击重复执行，再次点击停止" },
      { value: 3, label: "按下重复执行，弹起立刻停止" },
      { value: 4, label: "按下重复执行，弹起后完成此次宏后停止" },
    ],
    socdList: [
      { value: 1, label: "绑定位置（键盘指定位置的两个按键互相绑定）" },
      { value: 2, label: "绑定键值（两个键值互相绑定）" },
    ],
    socdModeList: [
      { value: 1, label: "后覆盖（后按下的按键会覆盖前一个）" },
      { value: 2, label: "红框中的按键优先" },
      { value: 3, label: "蓝框中的按键优先" },
      { value: 4, label: "中性（两个按键都按下都不生效）" },
    ],
    TitleList: [
      {
        id: MagKeyAdvanceTypeEnum.DKS,
        title: "DKS",
        des: "单个按键实现四种功能：您可以根据4种不同的按压程度绑定1至4种功能。",
        src: "/src/assets/images/menu/high/dks.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.MT,
        title: "MT",
        des: "按住和单击按键实现不同功能。",
        src: "/src/assets/images/menu/high/mt.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.TGL,
        title: "TGL",
        des: "单击按键开启持续触发，按住按键为正常触发。",
        src: "/src/assets/images/menu/high/tgl.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.MPT,
        title: "MPT",
        des: "单个按键可在三个不同的深度触发三个不同的按键。",
        src: "/src/assets/images/menu/high/mpt.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.END,
        title: "END",
        des: "单个按键可在松开时发送另一个按键。",
        src: "/src/assets/images/menu/high/end.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.SOCD,
        title: "SOCD",
        des: "绑定两个按键，后按下的按键会强制释放前一个按键，同一时刻只会触发一个按键。",
        src: "/src/assets/images/menu/high/socd.png",
      },
      {
        id: MagKeyAdvanceTypeEnum.MACRO,
        title: "MACRO",
        des: "给按键设置一串指令，实现发送多个按键。",
        src: "/src/assets/images/menu/high/macro.png",
      },
    ] as any,
  }),
  actions: {

    setTitleid(id: number, isNew: boolean = true) {
      this.isNew = isNew;
      switch (id) {
        case MagKeyAdvanceTypeEnum.DKS:
          if (isNew == true)
            this.advKeyDKS = new AdvKeyDKS([new DKSType(0), new DKSType(1), new DKSType(2), new DKSType(3)])
          else
            this.advKeyDKS = this.advanceKey as AdvKeyDKS;
          break;
        case MagKeyAdvanceTypeEnum.MT:
          if (isNew == true)
            this.advKeyMT = new AdvKeyMT([new MTType(0, "按住"), new MTType(1, "单击")])
          else
            this.advKeyMT = this.advanceKey as AdvKeyMT;
          break;
        case MagKeyAdvanceTypeEnum.TGL:
          if (isNew == true)
            this.advKeyTGL = new AdvKeyTGL([new TGLType(0, "按住"), new TGLType(1, "单击")])
          else
            this.advKeyTGL = this.advanceKey as AdvKeyTGL;
          break;
        case MagKeyAdvanceTypeEnum.MPT:
          if (isNew == true)
            this.advKeyMPT = new AdvKeyMPT([new MPTType(0), new MPTType(1), new MPTType(2)])
          else
            this.advKeyMPT = this.advanceKey as AdvKeyMPT;
          break;
        case MagKeyAdvanceTypeEnum.END:
          if (isNew == true)
            this.advKeyEND = new AdvKeyEND([new ENDType(0)])
          else
            this.advKeyEND = this.advanceKey as AdvKeyEND;
          break;
        case MagKeyAdvanceTypeEnum.SOCD:
          if (isNew == true)
            this.advKeySOCD = new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3)])
          else
            this.advKeySOCD = this.advanceKey as AdvKeySOCD;
          break;
        case MagKeyAdvanceTypeEnum.MACRO:
          if (isNew == true)
            this.advKeyMacro = new AdvKeyMacro(this.macro)
          else
            this.advKeyMacro = this.advanceKey as AdvKeyMacro;
      }
      this.titleid = id;
      this.isAdvKeyDialog = true;
    },
    setDKS(item: any) {
      this.advKeyDKS?.setDKS(item);
    },
    setMT(item: any) {
      this.advKeyMT?.setMT(item);
    },
    setTGL(item: any) {
      this.advKeyTGL?.setTGL(item);
    },
    setMPT(item: any) {
      this.advKeyMPT?.setMPT(item);
    },
    setEND(item: any) {
      this.advKeyEND?.setEND(item);
    },
    setSOCD(item: any) {
      this.advKeySOCD?.setSOCD(item);
    },
    setMacro(item: any) {
      this.advKeyMacro?.setMacro(item);
    },
    advKeyClick(key: AdvKey) {
      let index = 0;
      if (this.advanceKeys != undefined) {
        for (index = 0; index < this.advanceKeys.length; index++) {
          this.advanceKeys[index].IsSelected = false;
        }
        key.IsSelected = true;
        key.index = index;
        this.advanceKey = key;
        this.setTitleid(key.advType, false);
      }
    },
    deleteAdvKey(key: AdvKey) {
      if (this.advanceKeys != undefined) {
        let index = this.advanceKeys.findIndex((item) => item === key);
        if (index !== -1) {
          this.advanceKeys.splice(index, 1);
        }
        this.refreshAdvKey();
      }
    },
    refreshAdvKey() {
      let i: number;
      for (i = 0; i < this.advanceKeys.length; i++) {
        this.advanceKeys[i].index = i;
      }
    },
    saveAdvKey() {
      this.isAdvKeyDialog = false;
      switch (this.titleid) {
        case MagKeyAdvanceTypeEnum.DKS:
          this.addDKS()
          break;
        case MagKeyAdvanceTypeEnum.MT:
          this.addMT()
          break;
        case MagKeyAdvanceTypeEnum.TGL:
          this.addTGL()
          break;
        case MagKeyAdvanceTypeEnum.MPT:
          this.addMPT()
          break;
        case MagKeyAdvanceTypeEnum.END:
          this.addEND()
          break;
        case MagKeyAdvanceTypeEnum.SOCD:
          this.addSOED()
          break;
        case MagKeyAdvanceTypeEnum.MACRO:
          this.addMacro()
          break;
      }
      this.refreshAdvKey();
    },
    addMacro() {
      if (this.advanceKeys != undefined && this.advKeyMacro != null && this.isNew == true) {
        this.advKeyMacro.key = this.key
        this.advanceKeys.push(this.advKeyMacro);
      }
    },
    addSOED() {
      if (this.advanceKeys != undefined && this.advKeySOCD != null && this.isNew == true) {
        this.advKeySOCD.key = this.key
        this.advanceKeys.push(this.advKeySOCD);
      }
    },
    addEND() {
      if (this.advanceKeys != undefined && this.advKeyEND != null && this.isNew == true) {
        this.advKeyEND.key = this.key
        this.advanceKeys.push(this.advKeyEND);
      }
    },
    addMPT() {
      if (this.advanceKeys != undefined && this.advKeyMPT != null && this.isNew == true) {
        this.advKeyMPT.key = this.key
        this.advanceKeys.push(this.advKeyMPT);
      }
    },
    addTGL() {
      if (this.advanceKeys != undefined && this.advKeyTGL != null && this.isNew == true) {
        this.advKeyTGL.key = this.key
        this.advanceKeys.push(this.advKeyTGL);
      }
    },

    addMT() {
      if (this.advanceKeys != undefined && this.advKeyMT != null && this.isNew == true) {
        this.advKeyMT.key = this.key
        this.advanceKeys.push(this.advKeyMT);
      }
    },

    addDKS() {
      if (this.advanceKeys != undefined && this.advKeyDKS != null && this.isNew == true) {
        this.advKeyDKS.key = this.key
        this.advanceKeys.push(this.advKeyDKS);
      }
    },
    unSelectAdvanced() {
      this.advanceKeysIndex = -1;
    },
    selectAdvanced(key: AdvKey) {
      this.advanceKeysIndex = key.index;
    },
    advTypeClick(id: number, key: KeyTableData | undefined) {
      if (this.advanceKeys != undefined && this.advanceKeys?.length >= 40) {
        ElMessage({
          showClose: true,
          message: '最多只能添加40个高级键。',
          type: 'warning'
        });
        return;
      }
      this.key = key;
      this.setTitleid(id);
    }
  },
});
