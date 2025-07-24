import { KeyDefineEnum } from "@/common/keyCode_sparklink";
import { AdvKeyTypeEnum } from "@/keyboard/sparklink/enum";
import type { KeyTableData } from "@/keyboard/sparklink/keyTableData";
import { Macro } from '@/keyboard/sparklink/macros';

export abstract class AdvKey {
    index: number;
    keyTable: KeyTableData | undefined;
    advType: AdvKeyTypeEnum;
    data: any;
    IsSelected: boolean;
    constructor(type: AdvKeyTypeEnum) {
        this.advType = type;
        this.keyTable = undefined;
        this.index = 0;
        this.IsSelected = false;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
}
export class AdvKeyMacro extends AdvKey {
    macro: Macro | undefined = undefined;
    mode: number = 0;
    repeatCount: number = 0;
    delay: number = 0;
    macroIndex: number = 0;
    constructor(data: Macro | undefined) {
        super(AdvKeyTypeEnum.MACRO);
        this.setMacro(data);
    }
    setMacro(data: Macro | undefined) {
        this.macro = data;
        this.data = data;
        if (this.macro != undefined) {
            this.macroIndex = this.macro.index;
        }
    }
}

export class SOCDType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    IsSelected: boolean = false;
    constructor(index: number) {
        this.index = index;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};
export class AdvKeySOCD extends AdvKey {
    list: Array<ENDType>;
    value: number = 0;
    mode: number = 0;
    selectedInedx: number = 0;
    constructor(data: Array<SOCDType>) {
        super(AdvKeyTypeEnum.SOCD);
        this.list = data;
        this.data = data;
        this.selectedSOCD(this.index);
    }

    selectedSOCD(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    setSOCD(item: any) {
        this.list[this.selectedInedx].key = item;
    }
}

export class ENDType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    IsSelected: boolean = false;
    constructor(index: number) {
        this.index = index;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};
export class AdvKeyEND extends AdvKey {
    list: Array<ENDType>;
    value: number = 0;
    selectedInedx: number = 0;
    constructor(data: Array<ENDType>) {
        super(AdvKeyTypeEnum.END);
        this.list = data;
        this.data = data;
        this.selectedEND(this.index);
    }

    selectedEND(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    setEND(item: any) {
        this.list[this.selectedInedx].key = item;
    }
}

export class MPTType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    value: number = 0;
    IsSelected: boolean = false;
    constructor(index: number, travel: number) {
        this.index = index;
        this.value = travel;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};
export class AdvKeyMPT extends AdvKey {
    list: Array<MPTType>;
    value: number = 0;
    selectedInedx: number = 0;
    constructor(data: Array<MPTType>) {
        super(AdvKeyTypeEnum.MPT);
        this.list = data;
        this.data = data;
        this.selectedMPT(this.index);
    }

    selectedMPT(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    setMPT(item: any) {
        this.list[this.selectedInedx].key = item;
    }
}


export class TGLType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    title: string;
    IsSelected: boolean = false;
    constructor(index: number, title: string) {
        this.index = index;
        this.title = title;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};

export class AdvKeyTGL extends AdvKey {
    list: Array<TGLType>;
    value: number = 0;
    selectedInedx: number = 0;
    constructor(data: Array<TGLType>) {
        super(AdvKeyTypeEnum.TGL);
        this.list = data;
        this.data = data;
        this.selectedTGL(this.index);
    }

    selectedTGL(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    setTGL(item: any) {
        this.list[this.selectedInedx].key = item;
    }
}
export class MTType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    title: string;
    IsSelected: boolean = false;
    constructor(index: number, title: string) {
        this.index = index;
        this.title = title;
    }
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};
export class AdvKeyMT extends AdvKey {
    list: Array<MTType>;
    value: number = 0;
    selectedInedx: number = 0;
    constructor(data: Array<MTType>) {
        super(AdvKeyTypeEnum.MT);
        this.list = data;
        this.data = data;
        this.selectedMT(this.index);
    }

    selectedMT(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    setMT(item: any) {
        this.list[this.selectedInedx].key = item;
    }
}

export class DKSType {
    index: number;
    key: KeyDefineEnum = KeyDefineEnum.NONE;
    value: Array<boolean>;
    num: number = 0;
    IsSelected: boolean = false;
    constructor(index: number) {
        this.index = index;
        this.value = [false, false, false, false, false, false, false];
    }

    roundClicked(index: number) {
        this.value[index] = !this.value[index];
        if (this.value[0]) this.num |= 1;
        if (this.value[1]) this.num |= 2;
        if (this.value[2]) this.num |= 4;
        if (this.value[3]) this.num |= 24;
        if (this.value[4]) this.num |= 32;
        if (this.value[5]) this.num |= 64;
        if (this.value[6]) this.num |= 128;
    }

    setValue(num: number) {
        this.num = num;
        for (let i = 0; i < 8; i++) {
            this.value[i] = !!(num & (1 << i));
        }
    }
    
    isSelected(): string {
        return this.IsSelected ? 'selected' : '';
    }
};

export class AdvKeyDKS extends AdvKey {
    list: Array<DKSType>;
    selectedInedx: number = 0;
    constructor(data: Array<DKSType>) {
        super(AdvKeyTypeEnum.DKS);
        this.list = data;
        this.data = data;
        this.selectedDKS(this.index);
    }

    selectedDKS(index: number) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].IsSelected = false;
        }
        this.list[index].IsSelected = true;
        this.selectedInedx = index;
    }
    
    setDKS(key: KeyDefineEnum) {
        this.list[this.selectedInedx].key = key;
    }
}