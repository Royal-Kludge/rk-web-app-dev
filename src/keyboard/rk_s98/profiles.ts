import { KeyMatrixLayer, MatrixTable } from '@/keyboard/enum';
import { storage } from '@/common/storage';
import { keyboard } from '@/keyboard/keyboard'
import { KeyMatrix } from '@/keyboard/rk_s98/keyMatrix';
import { PROFILE_DEFAULT_DATA } from './boardProfile';
import { LED_EFFECT_DEFAULT_DATA } from './ledEffect';
import { VERSION } from '@/common/state';

export class Profile {
    name: string;
    layers: Record<number, Record<number, Uint8Array>>;
    index = 0;
    isDefault = false;
    profile?: Uint8Array;
    ledEffect?: Uint8Array;
    ledColors?: Uint8Array;
    keyTypes: Record<number, Record<number, Array<number>>>;

    constructor(name: string) {
        this.name = name;
        this.layers = {};
        this.keyTypes = {};

        if (keyboard.keyboardDefine != undefined) {
            let index: any, type: any;
            for (type in keyboard.keyboardDefine.keyMatrixTable) {
                let table = keyboard.keyboardDefine.keyMatrixTable[type];
                for (index in keyboard.keyboardDefine.keyMatrixLayer) {
                    let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
                    this.add(table, layer, new Uint8Array(512))
                    let keyDatas = new KeyMatrix(new DataView(this.layers[table][layer].buffer));

                    if (!this.keyTypes.hasOwnProperty(table)) {
                        this.keyTypes[table] = {};
                    }
                    this.keyTypes[table][layer] = new Array<number>(128);
                    let keyType = this.keyTypes[table][layer];

                    let layout = keyboard.keyboardDefine?.keyLayout[table][layer];
                    if (layout != undefined) {
                        for (let j = 0; j < layout.length; j++) {
                            keyDatas.setKeyMappingRaw(j, layout[j]);
                            keyType[j] = MatrixTable.WIN;
                        }
                    }
                }
            }
        }
        
        this.ledColors = new Uint8Array(512);
        this.profile = new Uint8Array(PROFILE_DEFAULT_DATA.buffer, 0, PROFILE_DEFAULT_DATA.buffer.byteLength);
        this.ledEffect = new Uint8Array(LED_EFFECT_DEFAULT_DATA.buffer, 0, LED_EFFECT_DEFAULT_DATA.buffer.byteLength);
    }
    get(table: MatrixTable | number, layer: KeyMatrixLayer | number): Uint8Array {
        return this.layers[table][layer];
    }
    add(table: MatrixTable | number, layer: KeyMatrixLayer, data: Uint8Array) {
        if (!this.layers.hasOwnProperty(table)) {
            this.layers[table] = {};
        }
        this.layers[table][layer] = data;
    }
    setProfile(data: Uint8Array) {
        this.profile = data;
    }
    setledEffect(data: Uint8Array) {
        this.ledEffect = data;
    }
    setledColors(data: Uint8Array) {
        this.ledColors = data;
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
    initProfile(data: Uint8Array) {
        this.list.forEach((p) => {
            p.setProfile(data)
        });
        this.save()
    }
    initledEffect(data: Uint8Array) {
        this.list.forEach((p) => {
            p.setledEffect(data)
        });
        this.save()
    }
    initledColors(data: Uint8Array) {
        this.list.forEach((p) => {
            p.setledColors(data)
        });
        this.save()
    }
    get(): Array<Profile> {
        return this.list;
    }

    init(defaultName: string) {
        this.list.splice(0, this.list.length);
        let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;

        if (tmp != null && tmp.list.length > 0 && tmp.version != undefined && tmp.version == VERSION) {
            for (let m of tmp.list) {
                let tm = new Profile(m.name)
                tm.isDefault = m.isDefault;
                tm.layers = m.layers;
                tm.profile = m.profile;
                tm.ledEffect = m.ledEffect;
                tm.ledColors = m.ledColors;
                tm.keyTypes = m.keyTypes;
                this.add(tm);
            }
            this.curIndex = tmp.curIndex;
        }
        else {
            // for (let i = 0; i < 3; i++) {
            //     let tm = new Profile('profile' + (i + 1));
            //     if (keyboard.keyboardDefine != undefined) {
            //         let index: any;
            //         for (index in keyboard.keyboardDefine.keyMatrixLayer) {
            //             let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
            //             tm.add(layer, new Uint8Array(512))
            //             let keyDatas = new KeyMatrix(new DataView(tm.layers[layer].buffer));
            //             let layout = keyboard.keyboardDefine?.keyLayout[layer];
            //             if (layout != undefined) {
            //                 for (let j = 0; j < layout.length; j++) {
            //                     keyDatas.setKeyMappingRaw(j, layout[j]);
            //                 }
            //             }
            //         }
            //     }
            //     this.add(tm);
            // }
            //const { t } = useI18n();
            this.curIndex = 0;
            this.version = VERSION;
            //let name = t("Profile.default")
            let tm = new Profile(defaultName);
            tm.isDefault = true;
            tm.index = 0;
            this.add(tm);
            this.save()
        }
    }
    save() {
        storage.set(`${keyboard.keyboardDefine?.name}_profile`, this);
    }
}

export const createProfile = () => {
    return new Profiles()
}

export const ps = createProfile()
