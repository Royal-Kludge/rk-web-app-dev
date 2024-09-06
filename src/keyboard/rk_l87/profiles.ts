import { KeyMatrixLayer } from '@/keyboard/enum';
import { storage } from '@/keyboard/storage';
import { keyboard } from '@/keyboard/keyboard'
import { KeyMatrix } from '@/keyboard/rk_l87/keyMatrix';
import { PROFILE_DEFAULT_DATA } from './boardProfile';
import { LED_EFFECT_DEFAULT_DATA } from './ledEffect';
import { VERSION } from '../state';

export class Profile {
    name: string;
    layers: Record<number, Uint8Array>;
    index = 0;
    isDefault = false;
    profile?: Uint8Array;
    ledEffect?: Uint8Array;
    ledColors?: Uint8Array;

    constructor(name: string) {
        this.name = name;
        this.layers = {};

        if (keyboard.keyboardDefine != undefined) {
            let index: any;
            for (index in keyboard.keyboardDefine.keyMatrixLayer) {
                let layer = keyboard.keyboardDefine.keyMatrixLayer[index];
                this.add(layer, new Uint8Array(512))
                let keyDatas = new KeyMatrix(new DataView(this.layers[layer].buffer));
                let layout = keyboard.keyboardDefine?.keyLayout[layer];
                if (layout != undefined) {
                    for (let j = 0; j < layout.length; j++) {
                        keyDatas.setKeyMappingRaw(j, layout[j]);
                    }
                }
            }
        }
        
        this.ledColors = new Uint8Array(512);
        this.profile = new Uint8Array(PROFILE_DEFAULT_DATA.buffer, 0, PROFILE_DEFAULT_DATA.buffer.byteLength);
        this.ledEffect = new Uint8Array(LED_EFFECT_DEFAULT_DATA.buffer, 0, LED_EFFECT_DEFAULT_DATA.buffer.byteLength);
    }
    get(index: KeyMatrixLayer | number): Uint8Array {
        return this.layers[index];
    }
    add(layer: KeyMatrixLayer, data: Uint8Array) {
        this.layers[layer] = data;
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
        let tmp = storage.get('profile') as Profiles;

        if (tmp != null && tmp.list.length > 0 && tmp.version != undefined && tmp.version == VERSION) {
            for (let m of tmp.list) {
                let tm = new Profile(m.name)
                tm.isDefault = m.isDefault;
                tm.layers = m.layers;
                tm.profile = m.profile;
                tm.ledEffect = m.ledEffect;
                tm.ledColors = m.ledColors;
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
        storage.set('profile', this);
    }
}

export const createProfile = () => {
    return new Profiles()
}

export const ps = createProfile()
