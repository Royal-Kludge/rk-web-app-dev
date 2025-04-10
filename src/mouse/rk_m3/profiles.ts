import { storage } from '@/common/storage';
import { VERSION } from '@/common/state';
import { KEY_TABLE_DATA } from './keyTable';
import { LED_TABLE_DATA } from './ledTable';
import { mouse } from '../mouse';
import type { KeyTableData, LeftSideKey } from '../interface';
import { KEY_LAYOUT } from './layout';

export class Profile {
    name: string;
    index = 0;
    isDefault = false;
    leftSideKey?: LeftSideKey;
    keyLayout?: Array<KeyTableData>;
    keyTable?: Uint8Array;
    ledTable?: Uint8Array;

    constructor(name: string) {
        this.name = name;
        this.keyLayout = [];

        if (mouse.mouseDefine != undefined) {
            let index: number;
            for (index = 0; index < mouse.mouseDefine.layout.length; index++) {
                this.keyLayout.push({
                    keyStr: mouse.mouseDefine.layout[index].keyStr,
                    keyCode: mouse.mouseDefine.layout[index].keyCode,
                    index: mouse.mouseDefine.layout[index].index,
                    keyMappingData: {
                        keyStr: mouse.mouseDefine.layout[index].keyMappingData.keyStr,
                        keyFunctionType: mouse.mouseDefine.layout[index].keyMappingData.keyFunctionType,
                        keyMappingType: mouse.mouseDefine.layout[index].keyMappingData.keyMappingType,
                        keyTypeCode: mouse.mouseDefine.layout[index].keyMappingData.keyTypeCode,
                        keyParam1: mouse.mouseDefine.layout[index].keyMappingData.keyParam1,
                        keyParam2: mouse.mouseDefine.layout[index].keyMappingData.keyParam2,
                        keyRaw: mouse.mouseDefine.layout[index].keyMappingData.keyRaw,
                    }
                });
            }

            this.leftSideKey = {
                isEnable: true,
                key3: {
                    keyStr: mouse.mouseDefine.layout[3].keyMappingData.keyStr,
                    keyFunctionType: mouse.mouseDefine.layout[3].keyMappingData.keyFunctionType,
                    keyMappingType: mouse.mouseDefine.layout[3].keyMappingData.keyMappingType,
                    keyTypeCode: mouse.mouseDefine.layout[3].keyMappingData.keyTypeCode,
                    keyParam1: mouse.mouseDefine.layout[3].keyMappingData.keyParam1,
                    keyParam2: mouse.mouseDefine.layout[3].keyMappingData.keyParam2,
                    keyRaw: mouse.mouseDefine.layout[3].keyMappingData.keyRaw,
                },
                key4: {
                    keyStr: mouse.mouseDefine.layout[4].keyMappingData.keyStr,
                    keyFunctionType: mouse.mouseDefine.layout[4].keyMappingData.keyFunctionType,
                    keyMappingType: mouse.mouseDefine.layout[4].keyMappingData.keyMappingType,
                    keyTypeCode: mouse.mouseDefine.layout[4].keyMappingData.keyTypeCode,
                    keyParam1: mouse.mouseDefine.layout[4].keyMappingData.keyParam1,
                    keyParam2: mouse.mouseDefine.layout[4].keyMappingData.keyParam2,
                    keyRaw: mouse.mouseDefine.layout[4].keyMappingData.keyRaw,
                }
            }
        }

        let index = 0;
        //this.keyTable = new Uint8Array(KEY_TABLE_DATA.buffer, 0, KEY_TABLE_DATA.buffer.byteLength);
        this.keyTable = new Uint8Array(KEY_TABLE_DATA.buffer.byteLength);
        for (index = 0; index < KEY_TABLE_DATA.buffer.byteLength; index++) {
            this.keyTable[index] = KEY_TABLE_DATA[index];
        }

        //this.ledTable = new Uint8Array(LED_TABLE_DATA.buffer, 0, LED_TABLE_DATA.buffer.byteLength);
        this.ledTable = new Uint8Array(LED_TABLE_DATA.buffer.byteLength);
        for (index = 0; index < LED_TABLE_DATA.buffer.byteLength; index++) {
            this.ledTable[index] = LED_TABLE_DATA[index];
        }
    }
    setKeyTable(data: Uint8Array) {
        this.keyTable = data;
    }
    setledTable(data: Uint8Array) {
        this.ledTable = data;
    }
}

export class Profiles {
    list: Array<Profile>;
    curIndex: number;
    version?: string;

    constructor() {
        this.list = new Array<Profile>();
        this.version = VERSION;
        this.curIndex = 0;
    }

    add(profile: Profile) {
        profile.index = this.list.length;
        this.list.push(profile);
    }
    find(profile: Profile): Profile | undefined {
        let obj = this.list.find(obj => obj.index === profile.index);
        return obj;
    }

    remove(profile: Profile) {
        let index = this.list.findIndex(obj => obj.index === profile.index);
        if (this.list.length > 1) {
            this.list.splice(index, 1);
        }

        index = 0;
        this.list.forEach((p) => {
            p.index = index++;
        });
    }
    initKeyTable(data: Uint8Array) {
        this.list.forEach((p) => {
            p.setKeyTable(data)
        });
        this.save()
    }
    initledTable(data: Uint8Array) {
        this.list.forEach((p) => {
            p.setledTable(data)
        });
        this.save()
    }
    get(): Array<Profile> {
        return this.list;
    }

    init(defaultName: string) {
        this.list.splice(0, this.list.length);
        let tmp = storage.get(`${mouse.mouseDefine?.name}_profile`) as Profiles;

        if (tmp != null && tmp.list.length > 0 && tmp.version != undefined && tmp.version == VERSION) {
            for (let m of tmp.list) {
                if (m.keyTable != undefined && m.ledTable != undefined) {
                    let tm = new Profile(m.name)
                    tm.isDefault = m.isDefault;
                    tm.keyTable = new Uint8Array(Object.values(m.keyTable));
                    tm.ledTable = new Uint8Array(Object.values(m.ledTable));
                    tm.keyLayout = m.keyLayout;
                    tm.leftSideKey = m.leftSideKey;
                    this.add(tm);
                }
            }
            this.curIndex = tmp.curIndex;
        }
        else {
            this.curIndex = 0;
            this.version = VERSION;
            let tm = new Profile(defaultName);
            tm.isDefault = true;
            tm.index = 0;
            this.add(tm);
            this.save()
        }
    }
    
    save() {
        storage.set(`${mouse.mouseDefine?.name}_profile`, this);
    }
}

export const createProfile = () => {
    return new Profiles()
}

export const ps = createProfile()
