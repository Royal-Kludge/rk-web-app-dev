import { KeyDefineEnum, KeyText } from "@/common/keyCode_sparklink";

const MACRO_MAX_COUNT = 16;
const MACRO_MAX_ACTION_COUNT = 42;

export enum ActionType {
    Up = 1,
    Down = 0,
    Delay = -1,
}

export enum MacroExecModeEnum {
    ExecOnce = 0,
    RepeatPressAgain = 1,
    RepeatHoledAndStopReleassOnce = 2,
    RepeatHoledAndStopReleassExecFinish = 3,
}

export class Action {
    action = ActionType.Down;
    delay = 1;
    key = KeyDefineEnum.NONE;
    index = 0;

    constructor(key: KeyDefineEnum | number, delay: number = 50, action: ActionType = ActionType.Down) {
        this.action = action;
        this.delay = delay;
        this.key = key;
    }

    toString(): string {
        let text = '';

        text = `Key: [${KeyText[this.key].valueOf()}]`;

        return `${this.action == ActionType.Down ? '↓' : (this.action == ActionType.Delay ? '==' : '↑')} ${text} delay:${this.delay}`
    }

    static deserialize(data: Uint8Array): Action | undefined {
        if (data.byteLength != 4) return undefined;

        let action = data[0] >> 7;
        let type = data[0] >> 4 & 0x07;
        let delay = (data[0] << 16 & 0x000F0000) | (data[1] << 8) | (data[2]);
        let key = data[3];

        return new Action(key, delay, action);
    }
}

export class Macro {
    name: string;
    actions: Array<Action>;
    index = 0;
    repeat = 1;

    constructor(name: string) {
        this.name = name;
        this.actions = new Array<Action>();
    }

    add(action: Action) {
        this.actions.push(action);
    }

    clear() {
        this.actions.splice(0, this.actions.length);
    }

    insert(index: number, action: Action) {
        this.actions.splice(index, 0, action);
    }

    remove(action: Action): number {
        let index = this.actions.findIndex(obj => obj.index === action?.index);
        if (index == -1)
            return -1
        this.actions.splice(index, 1);
        this.refresh()
        return index;
    }
    removeUp(action: Action) {
        let index = this.remove(action)
        if (index == -1)
            return
        this.insert(index <= 0 ? 0 : index - 1, action)
        this.refresh()
    }
    removeDown(action: Action) {
        let index = this.remove(action)
        if (index == -1)
            return
        this.insert(index + 1, action)
        this.refresh()
    }
    refresh() {
        let index = 0;
        this.actions.forEach((p) => {
            p.index = index++;
        });
    }

    addKeyPress(key: KeyDefineEnum, delay: number = 50) {
        this.actions.push(new Action(key, delay));
        this.actions.push(new Action(key, delay));
    }

    addKeyDown(key: KeyDefineEnum, delay: number = 50) {
        this.actions.push(new Action(key, delay, ActionType.Down));
    }

    addKeyUp(key: KeyDefineEnum, delay: number = 50) {
        this.actions.push(new Action(key, delay, ActionType.Up));
    }

    static uint8ArrayToChineseString(uint8Array: Uint8Array): string {
        let result = '';
        for (let i = 0; i < uint8Array.length / 2; i++) {
            let code = uint8Array[(i * 2) + 1] << 8 | uint8Array[i * 2];
            result += String.fromCharCode(code);
        }
        return result;
    }

    static strToUnicode(str: string): Uint8Array {
        let tmp: number | undefined;
        let i = 0;
        let u8 = new Uint8Array(str.length * 2);

        for (let val of str) {
            tmp = val.codePointAt(0);
            if (tmp != undefined) {
                u8[i * 2] = tmp & 0x00FF;
                u8[i * 2 + 1] = tmp >> 8;
            }
            i++;
        }

        return u8;
    }
}

export class Macros {
    macroList: Array<Macro>;

    constructor() {
        this.macroList = new Array<Macro>();
    }

    find(index: any): Macro | undefined {
        return this.macroList.find(obj => obj.index === index);
    }

    add(macro: Macro) {
        macro.index = this.macroList.length;
        this.macroList.push(macro);
    }

    remove(macro: Macro) {
        let index = this.macroList.findIndex(obj => obj.index === macro.index);
        if (index !== -1) {
            this.macroList.splice(index, 1);
        }

        index = 0;
        this.macroList.forEach((p) => {
            p.index = index++;
        });
    }

    get(): Array<Macro> {
        return this.macroList;
    }
}