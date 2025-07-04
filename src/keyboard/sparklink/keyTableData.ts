import { KeyDefineEnum } from "@/common/keyCode_sparklink";
import type { KeyInfo } from "./interface";
import { LayoutTypeEnum } from "./enum";
import type { Macro } from "./macros";

export class KeyTableData {
    keyStr: Array<String>;
    keyCode: KeyDefineEnum;
    index: number;
    keyInfo: KeyInfo;

    constructor(keyStr: Array<String>, keyCode: KeyDefineEnum, index: number, keyInfo: KeyInfo) {
        this.keyStr = keyStr;
        this.keyCode = keyCode;
        this.index = index;
        this.keyInfo = keyInfo;
    }

    setLayoutMapping(keyCode: KeyDefineEnum, layout: LayoutTypeEnum) {
        switch (layout) {
            case LayoutTypeEnum.FN0:
                this.keyInfo.fn0_keyValue = keyCode;
                break;
            case LayoutTypeEnum.FN1:
                this.keyInfo.fn0_keyValue = keyCode;
                break;
            case LayoutTypeEnum.FN2:
                this.keyInfo.fn0_keyValue = keyCode;
                break;
            case LayoutTypeEnum.FN3:
                this.keyInfo.fn0_keyValue = keyCode;
                break;
        }

        if (layout <= LayoutTypeEnum.FN3) {
            this.keyInfo.fn_keyValue[layout] = keyCode;
        }
    }

    getLayoutMapping(layout: LayoutTypeEnum): KeyDefineEnum {
        switch (layout) {
            case LayoutTypeEnum.FN0:
                return this.keyInfo.fn0_keyValue;
            case LayoutTypeEnum.FN1:
                return this.keyInfo.fn1_keyValue;
            case LayoutTypeEnum.FN2:
                return this.keyInfo.fn2_keyValue;
            case LayoutTypeEnum.FN3:
                return this.keyInfo.fn3_keyValue;
        }

        return KeyDefineEnum.NONE;
    }

    setKeyInfo(keyInfo: KeyInfo) {
        if (this.keyInfo.keyValue == keyInfo.keyValue && this.keyInfo.row == keyInfo.row && this.keyInfo.col == keyInfo.col) {
            this.keyInfo.color.red = keyInfo.color.red;
            this.keyInfo.color.green = keyInfo.color.green;
            this.keyInfo.color.blue = keyInfo.color.blue;
            this.keyInfo.color.color = keyInfo.color.color;
            this.keyInfo.touchTravel = keyInfo.touchTravel;
            this.keyInfo.touchRelease = keyInfo.touchRelease;
            this.keyInfo.quickTouchPress = keyInfo.quickTouchPress;
            this.keyInfo.quickTouchRelease = keyInfo.quickTouchRelease;
            this.keyInfo.deadPress = keyInfo.deadPress;
            this.keyInfo.deadRelease = keyInfo.deadRelease;
            this.keyInfo.isCheck = keyInfo.isCheck;
            this.keyInfo.isSingleTouch = keyInfo.isSingleTouch;
            this.keyInfo.isQuickTouch = keyInfo.isQuickTouch;
            this.keyInfo.isAdvancedKey = keyInfo.isAdvancedKey;
            this.keyInfo.advanceKeyType = keyInfo.advanceKeyType;
            this.keyInfo.macroBreak = keyInfo.macroBreak;
            this.keyInfo.fn0_keyValue = keyInfo.fn0_keyValue;
            this.keyInfo.fn1_keyValue = keyInfo.fn1_keyValue;
            this.keyInfo.fn2_keyValue = keyInfo.fn2_keyValue;
            this.keyInfo.fn3_keyValue = keyInfo.fn3_keyValue;
            this.keyInfo.fn_keyValue[0] = keyInfo.fn_keyValue[0];
            this.keyInfo.fn_keyValue[1] = keyInfo.fn_keyValue[1];
            this.keyInfo.fn_keyValue[2] = keyInfo.fn_keyValue[2];
            this.keyInfo.fn_keyValue[3] = keyInfo.fn_keyValue[3];
            this.keyInfo.DKSInfo.DB = keyInfo.DKSInfo.DB;
            this.keyInfo.DKSInfo.DB2 = keyInfo.DKSInfo.DB2;
            this.keyInfo.DKSInfo.DKS[0] = keyInfo.DKSInfo.DKS[0];
            this.keyInfo.DKSInfo.DKS[1] = keyInfo.DKSInfo.DKS[1];
            this.keyInfo.DKSInfo.DKS[2] = keyInfo.DKSInfo.DKS[2];
            this.keyInfo.DKSInfo.DKS[3] = keyInfo.DKSInfo.DKS[3];
            this.keyInfo.DKSInfo.TRPS[0] = keyInfo.DKSInfo.TRPS[0];
            this.keyInfo.DKSInfo.TRPS[1] = keyInfo.DKSInfo.TRPS[1];
            this.keyInfo.DKSInfo.TRPS[2] = keyInfo.DKSInfo.TRPS[2];
            this.keyInfo.DKSInfo.TRPS[3] = keyInfo.DKSInfo.TRPS[3];
            this.keyInfo.MPTInfo.DKS[0] = keyInfo.MPTInfo.DKS[0];
            this.keyInfo.MPTInfo.DKS[1] = keyInfo.MPTInfo.DKS[1];
            this.keyInfo.MPTInfo.DKS[2] = keyInfo.MPTInfo.DKS[2];
            this.keyInfo.MPTInfo.DB[0] = keyInfo.MPTInfo.DB[0];
            this.keyInfo.MPTInfo.DB[1] = keyInfo.MPTInfo.DB[1];
            this.keyInfo.MPTInfo.DB[2] = keyInfo.MPTInfo.DB[2];
            this.keyInfo.MTInfo.DKS[0] = keyInfo.MTInfo.DKS[0];
            this.keyInfo.MTInfo.DKS[1] = keyInfo.MTInfo.DKS[1];
            this.keyInfo.MTInfo.delay = keyInfo.MTInfo.delay;
            this.keyInfo.TGLInfo.DKS = keyInfo.TGLInfo.DKS;
            this.keyInfo.TGLInfo.delay = keyInfo.TGLInfo.delay;
            this.keyInfo.ENDInfo.DKS = keyInfo.ENDInfo.DKS;
            this.keyInfo.SOCDInfo.DKS[0] = keyInfo.SOCDInfo.DKS[0];
            this.keyInfo.SOCDInfo.DKS[1] = keyInfo.SOCDInfo.DKS[1];
            this.keyInfo.SOCDInfo.DKSV[0] = keyInfo.SOCDInfo.DKSV[0];
            this.keyInfo.SOCDInfo.DKSV[1] = keyInfo.SOCDInfo.DKSV[1];
            this.keyInfo.SOCDInfo.type = keyInfo.SOCDInfo.type;
            this.keyInfo.SOCDInfo.mode = keyInfo.SOCDInfo.mode;
            this.keyInfo.RSInfo.DKS[0] = keyInfo.RSInfo.DKS[0];
            this.keyInfo.RSInfo.DKS[1] = keyInfo.RSInfo.DKS[1];
            this.keyInfo.axisID = keyInfo.axisID;
            this.keyInfo.adjustingMM = keyInfo.adjustingMM;
            this.keyInfo.adjustingADC = keyInfo.adjustingADC;
            this.keyInfo.adjustingPress = keyInfo.adjustingPress;
            this.keyInfo.adjustingSuccess = keyInfo.adjustingSuccess;
        }
    }

    isRemaped(keyInfo: KeyInfo | null, layout: LayoutTypeEnum): boolean {
        let ret = false;
        if (keyInfo == null) return ret;
        switch (layout) {
            case LayoutTypeEnum.FN0:
                return this.keyInfo.fn0_keyValue != keyInfo.fn0_keyValue;
            case LayoutTypeEnum.FN1:
                return this.keyInfo.fn1_keyValue != keyInfo.fn1_keyValue;
            case LayoutTypeEnum.FN2:
                return this.keyInfo.fn2_keyValue != keyInfo.fn2_keyValue;
            case LayoutTypeEnum.FN3:
                return this.keyInfo.fn3_keyValue != keyInfo.fn3_keyValue;
        }
        return ret;
    }

    isCombinKey(layout: LayoutTypeEnum): boolean {
        let ret = false;
        let key = 0x00;
        switch (layout) {
            case LayoutTypeEnum.FN0:
                key = this.keyInfo.fn0_keyValue;
                break;
            case LayoutTypeEnum.FN1:
                key = this.keyInfo.fn1_keyValue;
                break;
            case LayoutTypeEnum.FN2:
                key = this.keyInfo.fn2_keyValue;
                break;
            case LayoutTypeEnum.FN3:
                key = this.keyInfo.fn3_keyValue;
                break;
        }
        // if (key > 0) {
        //     let modify = key >> 8;
        //     if (modify > 0) ret = true;
        // }
        return ret;
    }

    setMacro(macro: Macro) {

    }
}