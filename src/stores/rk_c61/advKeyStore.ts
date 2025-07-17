import { defineStore } from "pinia";
import { AdvKeyMacro, DKSType, AdvKeyDKS, MTType, AdvKeyMT, TGLType, AdvKeyTGL, MPTType, AdvKeyMPT, ENDType, AdvKeyEND, SOCDType, AdvKeySOCD, AdvKey } from "@/keyboard/sparklink/rk_c61/AdvKeys";
import { KeyTableData } from "@/keyboard/sparklink/keyTableData";
import { ElMessage } from 'element-plus'
import { KeyMappingType, AdvKeyTypeEnum, LayoutTypeEnum, KeyTouchModeEnum } from "@/keyboard/sparklink/enum";
import { Macro, MacroExecModeEnum } from '@/keyboard/sparklink/macros';
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import { ConnectionEventEnum, ConnectionStatusEnum } from "@/device/enum";
import { KeyDefineEnum, KeyText } from "@/common/keyCode_sparklink";
import { LOG_TYPE, Logging } from "@/common/logging";
import { ps } from "@/keyboard/sparklink/profiles";
import type { KeyCmdValue, KeyInfo } from "@/keyboard/sparklink/interface";
import { useI18n } from "vue-i18n";

export const useAdvKeyStore = defineStore("advKeyStore_rk_c61", {
    state: () => ({
        rk_c61: undefined as (RK_C61 | undefined),
        isInited: false,
        advanceKeysIndex: -1,
        advanceKeys: new Array<AdvKey>(),
        advanceKey: {} as AdvKey,
        keyTable: {} as KeyTableData | undefined,
        maxTravel: 0.000,
        minTravel: 0.000,
        isAdvKeyDialog: false,
        isNew: false,
        macro: undefined as Macro | undefined,
        titleid: AdvKeyTypeEnum.DKS,
        advKeyDKS: new AdvKeyDKS([new DKSType(0), new DKSType(1), new DKSType(2), new DKSType(3)]),
        advKeyMT: new AdvKeyMT([new MTType(0, "sparklink.advKey.title_19"), new MTType(1, "sparklink.advKey.title_20")]),
        advKeyTGL: new AdvKeyTGL([new TGLType(0, "sparklink.advKey.title_19")]),
        advKeyMPT: new AdvKeyMPT([new MPTType(0, 0.500), new MPTType(1, 1.000), new MPTType(2, 1.500)]),
        advKeyEND: new AdvKeyEND([new ENDType(0)]),
        advKeySOCD: new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3)]),
        advKeyMacro: new AdvKeyMacro(undefined),
        macroModeList: [
            { value: 0, label: "sparklink.advKey.title_1" },
            { value: 1, label: "sparklink.advKey.title_2" },
            { value: 2, label: "sparklink.advKey.title_3" },
            { value: 3, label: "sparklink.advKey.title_4" },
        ],
        socdList: [
            { value: 0, label: "sparklink.advKey.title_5" },
            { value: 1, label: "sparklink.advKey.title_6" },
        ],
        socdModeList: [
            { value: 0, label: "sparklink.advKey.title_7" },
            { value: 1, label: "sparklink.advKey.title_8" },
            { value: 2, label: "sparklink.advKey.title_9" },
            { value: 3, label: "sparklink.advKey.title_10" },
        ],
        TitleList: [
            {
                id: AdvKeyTypeEnum.DKS,
                title: "DKS",
                des: "sparklink.advKey.title_11",
                src: "/src/assets/images/menu/high/dks.png",
                style: "key_dks",
            },
            {
                id: AdvKeyTypeEnum.MT,
                title: "MT",
                des: "sparklink.advKey.title_12",
                src: "/src/assets/images/menu/high/mt.png",
                style: "key_mt",
            },
            {
                id: AdvKeyTypeEnum.TGL,
                title: "TGL",
                des: "sparklink.advKey.title_13",
                src: "/src/assets/images/menu/high/tgl.png",
                style: "key_tgl",
            },
            {
                id: AdvKeyTypeEnum.MPT,
                title: "MPT",
                des: "sparklink.advKey.title_14",
                src: "/src/assets/images/menu/high/mpt.png",
                style: "key_mpt",
            },
            {
                id: AdvKeyTypeEnum.END,
                title: "END",
                des: "sparklink.advKey.title_15",
                src: "/src/assets/images/menu/high/end.png",
                style: "key_end",
            },
            {
                id: AdvKeyTypeEnum.SOCD,
                title: "SOCD",
                des: "sparklink.advKey.title_16",
                src: "/src/assets/images/menu/high/socd.png",
                style: "key_socd",
            },
            {
                id: AdvKeyTypeEnum.MACRO,
                title: "MACRO",
                des: "sparklink.advKey.title_17",
                src: "/src/assets/images/menu/high/macro.png",
                style: "key_macro",
            },
        ] as any,
    }),
    actions: {
        async init() {
            if (this.rk_c61 == undefined) {
                let protocol = keyboard.protocol as (RK_C61 | undefined);
                if (protocol != undefined) {
                    this.rk_c61 = protocol;
                }
            }

            if (this.rk_c61 != undefined && !this.isInited) {
                for (let i = 0; i < keyboard.state.keyTableData.length; i++) {
                    let keyTable = keyboard.state.keyTableData[i];
                    if (keyTable != undefined && keyTable != null && keyTable.keyInfo != undefined && keyTable.keyInfo != null && keyTable.keyInfo.isAdvancedKey) {
                        switch (keyTable.keyInfo.advanceKeyType) {
                            case AdvKeyTypeEnum.DKS:
                                let dks = new AdvKeyDKS([new DKSType(0), new DKSType(1), new DKSType(2), new DKSType(3)]);
                                dks.list[0].key = keyTable.keyInfo.DKSInfo.DKS[0];
                                dks.list[0].setValue(keyTable.keyInfo.DKSInfo.TRPS[0]);
                                dks.list[1].key = keyTable.keyInfo.DKSInfo.DKS[1];
                                dks.list[1].setValue(keyTable.keyInfo.DKSInfo.TRPS[1]);
                                dks.list[2].key = keyTable.keyInfo.DKSInfo.DKS[2];
                                dks.list[2].setValue(keyTable.keyInfo.DKSInfo.TRPS[2]);
                                dks.list[3].key = keyTable.keyInfo.DKSInfo.DKS[3];
                                dks.list[3].setValue(keyTable.keyInfo.DKSInfo.TRPS[3]);
                                dks.keyTable = keyTable;
                                this.advanceKeys.push(dks);
                                break;
                            case AdvKeyTypeEnum.MT:
                                let mt = new AdvKeyMT([new MTType(0, "sparklink.advKey.title_19"), new MTType(1, "sparklink.advKey.title_20")]);
                                mt.list[0].key = keyTable.keyInfo.MTInfo.DKS[0];
                                mt.list[1].key = keyTable.keyInfo.MTInfo.DKS[1];
                                mt.value = keyTable.keyInfo.MTInfo.delay;
                                mt.keyTable = keyTable;
                                this.advanceKeys.push(mt);
                                break;
                            case AdvKeyTypeEnum.TGL:
                                let tgl = new AdvKeyTGL([new TGLType(0, "sparklink.advKey.title_19")]);
                                tgl.list[0].key = keyTable.keyInfo.TGLInfo.DKS;
                                tgl.value = keyTable.keyInfo.TGLInfo.delay;
                                tgl.keyTable = keyTable;
                                this.advanceKeys.push(tgl);
                                break;
                            case AdvKeyTypeEnum.MPT:
                                let mpt = new AdvKeyMPT([new MPTType(0, 0.500), new MPTType(1, 1.000), new MPTType(1, 1.500)]);
                                mpt.list[0].key = keyTable.keyInfo.MPTInfo.DKS[0];
                                mpt.list[0].value = keyTable.keyInfo.MPTInfo.DB[0];
                                mpt.list[1].key = keyTable.keyInfo.MPTInfo.DKS[1];
                                mpt.list[1].value = keyTable.keyInfo.MPTInfo.DB[1];
                                mpt.list[2].key = keyTable.keyInfo.MPTInfo.DKS[2];
                                mpt.list[2].value = keyTable.keyInfo.MPTInfo.DB[2];
                                mpt.keyTable = keyTable;
                                this.advanceKeys.push(mpt);
                                break;
                            case AdvKeyTypeEnum.END:
                                let end = new AdvKeyEND([new ENDType(0)])
                                end.list[0].key = keyTable.keyInfo.ENDInfo.DKS;
                                end.keyTable = keyTable;
                                this.advanceKeys.push(end);
                                break;
                            case AdvKeyTypeEnum.SOCD:
                                let socd = new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3),]);
                                socd.list[0].key = keyTable.keyInfo.SOCDInfo.DKS[0];
                                socd.list[1].key = keyTable.keyInfo.SOCDInfo.DKS[1];
                                socd.list[2].key = keyTable.keyInfo.SOCDInfo.DKSV[0];
                                socd.list[3].key = keyTable.keyInfo.SOCDInfo.DKSV[1];
                                socd.mode = keyTable.keyInfo.SOCDInfo.mode;
                                socd.value = keyTable.keyInfo.SOCDInfo.type;
                                socd.keyTable = keyTable;
                                this.advanceKeys.push(socd);
                                break;
                            case AdvKeyTypeEnum.MACRO:
                                let advKeyMacro = new AdvKeyMacro(undefined);
                                advKeyMacro.keyTable = keyTable;
                                this.advanceKeys.push(advKeyMacro);
                                if (this.rk_c61 != undefined) {
                                    this.rk_c61.getMacroMode(keyTable.keyCode);
                                }
                                break;
                        }
                    }
                }

                this.maxTravel = this.rk_c61.data.performanceData.maxTouchTravel;
                this.minTravel = this.rk_c61.data.performanceData.minTouchTravel;
                this.isInited = true;
            }
        },
        async connectionEventCallback(event: Event) {
            switch (keyboard.state.connectionEvent) {
                case ConnectionEventEnum.Disconnect:
                case ConnectionEventEnum.Close:
                    this.destroy();
                    break;
            }
        },
        destroy() {
            if (keyboard.state.ConnectionStatus != ConnectionStatusEnum.Connected) {
                keyboard.removeEventListener("connection", this.connectionEventCallback);
                this.isInited = false;
                this.rk_c61 = undefined;
            }
        },
        setTitleid(id: number, isNew: boolean = true) {
            this.isNew = isNew;
            switch (id) {
                case AdvKeyTypeEnum.DKS:
                    if (isNew == true)
                        this.advKeyDKS = new AdvKeyDKS([new DKSType(0), new DKSType(1), new DKSType(2), new DKSType(3)]);
                    else
                        this.advKeyDKS = this.advanceKey as AdvKeyDKS;
                    break;
                case AdvKeyTypeEnum.MT:
                    if (isNew == true) {
                        this.advKeyMT = new AdvKeyMT([new MTType(0, "sparklink.advKey.title_19"), new MTType(1, "sparklink.advKey.title_20")]);
                        this.advKeyMT.value = 200;
                    } else {
                        this.advKeyMT = this.advanceKey as AdvKeyMT;
                    }
                    break;
                case AdvKeyTypeEnum.TGL:
                    if (isNew == true) {
                        this.advKeyTGL = new AdvKeyTGL([new TGLType(0, "sparklink.advKey.title_19")]);
                        this.advKeyTGL.value = 200;
                    } else {
                        this.advKeyTGL = this.advanceKey as AdvKeyTGL;
                    }
                    break;
                case AdvKeyTypeEnum.MPT:
                    if (isNew == true)
                        this.advKeyMPT = new AdvKeyMPT([new MPTType(0, 0.500), new MPTType(1, 1.000), new MPTType(2, 1.500)])
                    else
                        this.advKeyMPT = this.advanceKey as AdvKeyMPT;
                    break;
                case AdvKeyTypeEnum.END:
                    if (isNew == true)
                        this.advKeyEND = new AdvKeyEND([new ENDType(0)])
                    else
                        this.advKeyEND = this.advanceKey as AdvKeyEND;
                    break;
                case AdvKeyTypeEnum.SOCD:
                    if (isNew == true)
                        this.advKeySOCD = new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3)])
                    else
                        this.advKeySOCD = this.advanceKey as AdvKeySOCD;
                    break;
                case AdvKeyTypeEnum.MACRO:
                    if (isNew == true) {
                        this.advKeyMacro = new AdvKeyMacro(this.macro);
                        this.advKeyMacro.keyTable = this.keyTable;
                    } else {
                        this.advKeyMacro = this.advanceKey as AdvKeyMacro;
                    }
                    break;
            }
            this.titleid = id;
            this.isAdvKeyDialog = true;
        },
        getAdvKeyStyle(advKeyType: AdvKeyTypeEnum): string {
            for (let i = 0; i < this.TitleList.length; i++) {
                if (this.TitleList[i].id == advKeyType) {
                    return this.TitleList[i].style;
                }
            }

            return '';
        },
        getAdvKeyText(advKeyType: AdvKeyTypeEnum): string {
            for (let i = 0; i < this.TitleList.length; i++) {
                if (this.TitleList[i].id == advKeyType) {
                    return this.TitleList[i].title;
                }
            }

            return '';
        },
        getIndex(row: number, col: number): number {
            return row * 21 + col;
        },
        setDKS(key: KeyDefineEnum) {
            this.advKeyDKS?.setDKS(key);
        },
        setMT(key: KeyDefineEnum) {
            this.advKeyMT?.setMT(key);
        },
        setTGL(key: KeyDefineEnum) {
            this.advKeyTGL?.setTGL(key);
        },
        setMPT(key: KeyDefineEnum) {
            this.advKeyMPT?.setMPT(key);
        },
        setEND(key: KeyDefineEnum) {
            this.advKeyEND?.setEND(key);
        },
        setSOCD(key: KeyDefineEnum) {
            this.advKeySOCD?.setSOCD(key);
        },
        setMacro(macro: any) {
            this.advKeyMacro?.setMacro(macro);
        },
        KeyClick(index: number) {
            let keyTable = keyboard.state.keyTableData[index];
            if (keyTable != undefined && keyTable != null && keyTable.keyInfo != undefined && keyTable.keyInfo != null && keyTable.keyInfo.isAdvancedKey) {
                for (let i = 0; i < this.advanceKeys.length; i++) {
                    if (this.advanceKeys[i].keyTable?.index == keyTable.index) {
                        this.advKeyClick(this.advanceKeys[i]);
                    }
                }
            }
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
                this.keyTable = this.advanceKey.keyTable;
                this.setTitleid(key.advType, false);
            }
        },
        deleteAdvKey(key: AdvKey) {
            if (this.advanceKeys != undefined) {
                if (key.keyTable != undefined && key.keyTable != null) {
                    key.keyTable.keyInfo.isAdvancedKey = false;
                    key.keyTable.keyInfo.advanceKeyType = 0;

                    if (this.rk_c61 != undefined) {
                        this.rk_c61.setKeyValues([
                            {
                                keyCode: key.keyTable.keyInfo.keyValue,
                                value: 0x00,
                                layout: LayoutTypeEnum.MODE
                            }]);
                    }
                }

                let index = this.advanceKeys.findIndex((item) => item === key);
                if (index !== -1) {
                    this.advanceKeys.splice(index, 1);
                }
                this.refreshAdvKey();

                ps.save();
            }
        },
        refreshAdvKey() {
            let i: number;
            for (i = 0; i < this.advanceKeys.length; i++) {
                this.advanceKeys[i].index = i;
            }
        },
        async saveAdvKey(): Promise<Array<KeyInfo>> {
            this.isAdvKeyDialog = false;
            let ret: Array<KeyInfo> = [];
            switch (this.titleid) {
                case AdvKeyTypeEnum.DKS:
                    this.addDKS();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.DKS;
                        this.keyTable.keyInfo.DKSInfo.DKS[0] = this.advKeyDKS.list[0].key;
                        this.keyTable.keyInfo.DKSInfo.DKS[1] = this.advKeyDKS.list[1].key;
                        this.keyTable.keyInfo.DKSInfo.DKS[2] = this.advKeyDKS.list[2].key;
                        this.keyTable.keyInfo.DKSInfo.DKS[3] = this.advKeyDKS.list[3].key;
                        this.keyTable.keyInfo.DKSInfo.TRPS[0] = this.advKeyDKS.list[0].num;
                        this.keyTable.keyInfo.DKSInfo.TRPS[1] = this.advKeyDKS.list[1].num;
                        this.keyTable.keyInfo.DKSInfo.TRPS[2] = this.advKeyDKS.list[2].num;
                        this.keyTable.keyInfo.DKSInfo.TRPS[3] = this.advKeyDKS.list[3].num;
                        await this.rk_c61.setDks([this.keyTable.keyInfo]);
                    }
                    break;
                case AdvKeyTypeEnum.MT:
                    this.addMT();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.MT;
                        this.keyTable.keyInfo.MTInfo.DKS[0] = this.advKeyMT.list[0].key;
                        this.keyTable.keyInfo.MTInfo.DKS[1] = this.advKeyMT.list[1].key;
                        this.keyTable.keyInfo.MTInfo.delay = this.advKeyMT.value;
                        await this.rk_c61.setMt([this.keyTable.keyInfo]);
                    }
                    break;
                case AdvKeyTypeEnum.TGL:
                    this.addTGL();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.TGL;
                        this.keyTable.keyInfo.TGLInfo.DKS = this.advKeyTGL.list[0].key;
                        this.keyTable.keyInfo.TGLInfo.delay = this.advKeyTGL.value;
                        await this.rk_c61.setTgl([this.keyTable.keyInfo]);
                    }
                    break;
                case AdvKeyTypeEnum.MPT:
                    this.addMPT();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.MPT;
                        this.keyTable.keyInfo.MPTInfo.DKS[0] = this.advKeyMPT.list[0].key;
                        this.keyTable.keyInfo.MPTInfo.DB[0] = this.advKeyMPT.list[0].value;
                        this.keyTable.keyInfo.MPTInfo.DKS[1] = this.advKeyMPT.list[1].key;
                        this.keyTable.keyInfo.MPTInfo.DB[1] = this.advKeyMPT.list[1].value;
                        this.keyTable.keyInfo.MPTInfo.DKS[2] = this.advKeyMPT.list[2].key;
                        this.keyTable.keyInfo.MPTInfo.DB[2] = this.advKeyMPT.list[2].value;
                        await this.rk_c61.setMpt([this.keyTable.keyInfo]);
                    }
                    break;
                case AdvKeyTypeEnum.END:
                    this.addEND();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.END;
                        this.keyTable.keyInfo.ENDInfo.DKS = this.advKeyEND.list[0].key;
                        await this.rk_c61.setEnd([this.keyTable.keyInfo]);
                    }
                    break;
                case AdvKeyTypeEnum.SOCD:
                    this.addSOCD();
                    if (this.rk_c61 != undefined && this.advKeySOCD.list[0].key > 0x01 && this.advKeySOCD.list[1].key > 0x01) {
                        let keyInfo1 = this.getKeyInfo(this.advKeySOCD.list[0].key);
                        let keyInfo2 = this.getKeyInfo(this.advKeySOCD.list[1].key);
                        if (keyInfo1 != null && keyInfo2 != null) {
                            ret.push(keyInfo1);
                            ret.push(keyInfo2);
                            let keyTable1 = keyboard.state.keyTableData[this.getIndex(keyInfo1.row, keyInfo1.col)];
                            let keyTable2 = keyboard.state.keyTableData[this.getIndex(keyInfo2.row, keyInfo2.col)];

                            if (keyTable1 != null && keyTable1 != undefined) {
                                if (this.advKeySOCD.keyTable == undefined) {
                                    this.advKeySOCD.keyTable = keyTable1;
                                    this.keyTable = keyTable1;
                                }
                                //keyTable1.keyInfo.isAdvancedKey = true;
                                //keyTable1.keyInfo.advanceKeyType = AdvKeyTypeEnum.SOCD;
                                keyTable1.keyInfo.SOCDInfo.DKS[0] = this.advKeySOCD.list[0].key;
                                keyTable1.keyInfo.SOCDInfo.DKS[1] = this.advKeySOCD.list[1].key;
                                keyTable1.keyInfo.SOCDInfo.DKSV[0] = this.advKeySOCD.list[2].key;
                                keyTable1.keyInfo.SOCDInfo.DKSV[1] = this.advKeySOCD.list[3].key;
                                keyTable1.keyInfo.SOCDInfo.mode = this.advKeySOCD.mode;
                                keyTable1.keyInfo.SOCDInfo.type = this.advKeySOCD.value;
                            }

                            if (keyTable2 != null && keyTable2 != undefined) {
                                //keyTable2.keyInfo.isAdvancedKey = true;
                                //keyTable2.keyInfo.advanceKeyType = AdvKeyTypeEnum.SOCD;
                                keyTable2.keyInfo.SOCDInfo.DKS[0] = this.advKeySOCD.list[0].key;
                                keyTable2.keyInfo.SOCDInfo.DKS[1] = this.advKeySOCD.list[1].key;
                                keyTable2.keyInfo.SOCDInfo.DKSV[0] = this.advKeySOCD.list[2].key;
                                keyTable2.keyInfo.SOCDInfo.DKSV[1] = this.advKeySOCD.list[3].key;
                                keyTable2.keyInfo.SOCDInfo.mode = this.advKeySOCD.mode;
                                keyTable2.keyInfo.SOCDInfo.type = this.advKeySOCD.value;
                            }

                            let socd = null;

                            for (let i = 0; i < this.advanceKeys.length; i++) {
                                if (this.advanceKeys[i].advType == AdvKeyTypeEnum.SOCD) {
                                    if ((this.advanceKeys[i] as AdvKeySOCD).keyTable?.keyCode == this.advKeySOCD.list[1].key) {
                                        socd = this.advanceKeys[i] as AdvKeySOCD;
                                    }
                                }
                            }

                            if (socd == null) {
                                socd = new AdvKeySOCD([new SOCDType(0), new SOCDType(1), new SOCDType(2), new SOCDType(3),]);
                                socd.keyTable = keyTable2;
                                this.advanceKeys.push(socd);
                            }
                            socd.list[0].key = this.advKeySOCD.list[0].key;
                            socd.list[1].key = this.advKeySOCD.list[1].key;
                            socd.list[2].key = this.advKeySOCD.list[2].key;
                            socd.list[3].key = this.advKeySOCD.list[3].key;
                            socd.mode = this.advKeySOCD.mode;
                            socd.value = this.advKeySOCD.value;
                        }

                        if (this.keyTable != undefined) {
                            await this.rk_c61.setSocd([this.keyTable.keyInfo]);
                        }
                    }
                    break;
                case AdvKeyTypeEnum.MACRO:
                    this.addMacro();
                    if (this.keyTable != undefined && this.rk_c61 != undefined) {
                        this.keyTable.keyInfo.isAdvancedKey = true;
                        this.keyTable.keyInfo.advanceKeyType = AdvKeyTypeEnum.MACRO;

                        if (this.advKeyMacro.macro != undefined) {
                            await this.rk_c61.setMacroV2(this.advKeyMacro.macro);

                            let touchMode = 0;
                            if (this.keyTable.keyInfo.isQuickTouch) {
                                touchMode = KeyTouchModeEnum.QuickMode;
                            } else if (this.keyTable.keyInfo.isSingleTouch) {
                                touchMode = KeyTouchModeEnum.SingleMode;
                            }

                            await this.rk_c61.setKeyValues([
                                {
                                    keyCode: this.keyTable.keyCode,
                                    value: (touchMode << 4) | 0x06,
                                    layout: LayoutTypeEnum.MODE
                                }]);

                            await this.rk_c61.setMacroMode(
                                this.keyTable.keyCode,
                                this.advKeyMacro.mode,
                                this.advKeyMacro.repeatCount,
                                this.advKeyMacro.delay,
                                this.advKeyMacro.macro);
                        }
                    }
                    break;
            }
            this.refreshAdvKey();
            ps.save();

            return ret;
        },
        addMacro() {
            if (this.advanceKeys != undefined && this.advKeyMacro != null && this.isNew == true) {
                this.advKeyMacro.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyMacro);
            }
        },
        addSOCD() {
            if (this.advanceKeys != undefined && this.advKeySOCD != null && this.isNew == true) {
                //this.advKeySOCD.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeySOCD);
            }
        },
        addEND() {
            if (this.advanceKeys != undefined && this.advKeyEND != null && this.isNew == true) {
                this.advKeyEND.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyEND);
            }
        },
        addMPT() {
            if (this.advanceKeys != undefined && this.advKeyMPT != null && this.isNew == true) {
                this.advKeyMPT.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyMPT);
            }
        },
        addTGL() {
            if (this.advanceKeys != undefined && this.advKeyTGL != null && this.isNew == true) {
                this.advKeyTGL.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyTGL);
            }
        },

        addMT() {
            if (this.advanceKeys != undefined && this.advKeyMT != null && this.isNew == true) {
                this.advKeyMT.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyMT);
            }
        },

        addDKS() {
            if (this.advanceKeys != undefined && this.advKeyDKS != null && this.isNew == true) {
                this.advKeyDKS.keyTable = this.keyTable;
                this.advanceKeys.push(this.advKeyDKS);
            }
        },
        unSelectAdvanced() {
            this.advanceKeysIndex = -1;
        },
        selectAdvanced(key: AdvKey) {
            this.advanceKeysIndex = key.index;
        },
        advTypeClick(id: number, keyTable: KeyTableData | undefined) {
            if (this.advanceKeys != undefined && this.advanceKeys?.length >= 40) {
                ElMessage({
                    showClose: true,
                    message: '最多只能添加40个高级键。',
                    type: 'warning'
                });
                return;
            }
            this.keyTable = keyTable;
            this.setTitleid(id);
        },
        keyText(keyCode: KeyDefineEnum | undefined) {
            if (keyCode == undefined) return "";
            let keyStr = "";
            let texts = [];
            if (keyCode == KeyDefineEnum.SPARKLINK_FN) {
                keyStr = ``;
            } else {
                let keyMappingType: KeyMappingType = keyCode >> 12;
                switch (keyMappingType) {
                    case KeyMappingType.MultiAndMix:
                        keyStr = `MultiAndMix`;
                        break;
                    case KeyMappingType.Mouse:
                    case KeyMappingType.SparkLinkKbFun:
                    case KeyMappingType.KeyBoard:
                    case KeyMappingType.Consumer:
                    case KeyMappingType.GameControls:
                    case KeyMappingType.SportControls:
                    case KeyMappingType.VRControls:
                    case KeyMappingType.GenericDesktop:
                        if (keyCode > 0) {
                            let strs = KeyText[keyCode];
                            if (strs != undefined) {
                                for (let index = 0; index < strs.length; index++) {
                                    texts.push(strs[index]);
                                    keyStr = `${keyStr}${strs[index]}`;
                                }
                            } else {
                                Logging.console(LOG_TYPE.ERROR, `Cant find text for the KeyCode[${keyCode}]`);
                            }
                        }
                        break;
                }
            }

            const { t } = useI18n();
            if ((keyCode >> 24) == 8) return t(texts[0] as string);
            if ((keyCode >> 8) == 0x73) return t(texts[0] as string);
            if ((keyCode >> 8) == 0xF1) return t(texts[0] as string);
            if ((keyCode >> 8) == 0xF3) return t(texts[0] as string);

            if (texts.length == 4) {
                keyStr = `<div class='d-flex'>
            <div>
                <div>${texts[1]}</div>
                <div>${texts[0]}</div>
            </div>
            <div class='ml-3'>
                <div>${texts[3]}</div>
                <div>${texts[2]}</div>
            </div>
            </div>`;
            } else if (texts.length == 3) {
                keyStr = `<div class='d-flex'>
            <div>
                <div>${texts[1]}</div>
                <div>${texts[0]}</div>
            </div>
            <div class='ml-3'>
                <div>&nbsp;</div>
                <div>${texts[2]}</div>
            </div>
            </div>`;
            } else if (texts.length == 2) {
                keyStr = `<div class='d-flex'>
            <div>
                <div>${texts[0]}</div>
                <div>&nbsp;</div>
            </div>
            <div class='ml-3'>
                <div>&nbsp;</div>
                <div>${texts[1]}</div>
            </div>
            </div>`;
            } return keyStr;
        },
        getKeyInfo(keyCode: KeyDefineEnum): KeyInfo | null {
            if (this.rk_c61 != undefined) {
                return this.rk_c61.data.keyInfoData.getKeyInfoByKey(keyCode);
            }

            return null;
        },
        setKeyMacroMode(key: KeyDefineEnum, index: number, mode: MacroExecModeEnum, repeatCount: number, delay: number) {
            for (let i = 0; i < this.advanceKeys.length; i++) {
                if (this.advanceKeys[i].advType == AdvKeyTypeEnum.MACRO && this.advanceKeys[i].keyTable?.keyCode == key) {
                    let advMacro = this.advanceKeys[i] as AdvKeyMacro;
                    if (advMacro != undefined && this.rk_c61?.data.macros != undefined) {
                        advMacro.setMacro(this.rk_c61.data.macros.find(index));
                        advMacro.mode = mode;
                        advMacro.repeatCount = repeatCount;
                        advMacro.delay = delay;
                    }
                }
            }
        }
    },
});
