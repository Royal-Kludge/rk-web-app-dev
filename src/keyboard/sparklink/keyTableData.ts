import type { KeyDefineEnum } from "@/common/keyCode";
import type { KeyInfo } from "./interface";

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
}