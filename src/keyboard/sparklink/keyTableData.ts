import { KeyDefineEnum } from "@/common/keyCode";
import type { KeyInfo } from "./interface";
import { LayoutTypeEnum } from "./enum";

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
                return this.keyInfo.fn0_keyValue;
            case LayoutTypeEnum.FN2:
                return this.keyInfo.fn0_keyValue;
            case LayoutTypeEnum.FN3:
                return this.keyInfo.fn0_keyValue;
        }

        return KeyDefineEnum.NONE;
    }
}