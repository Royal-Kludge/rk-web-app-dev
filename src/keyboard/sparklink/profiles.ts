import { KeyMatrixLayer, MatrixTable } from '@/keyboard/sparklink/enum';
import { storage } from '@/common/storage';
import { keyboard } from '@/keyboard/sparklink/keyboard'
import { VERSION } from '@/common/state';
import type { KeyInfo, LightSetting, PerformanceData } from './interface';

export class Profile {
    name: string;
    keyInfoArray: Array<Array<KeyInfo | null>>;
    performanceData: PerformanceData;
    lightSetting: LightSetting;
    index = 0;
    isDefault = false;

    constructor(name: string, keyInfoArray: Array<Array<KeyInfo | null>>, performanceData: PerformanceData, lightSetting: LightSetting) {
        this.name = name;
        this.keyInfoArray = keyInfoArray;
        this.performanceData = performanceData;
        this.lightSetting = lightSetting;
    }

    get(): Array<Array<KeyInfo | null>> {
        return this.keyInfoArray;
    }

    // setProfile(data: Uint8Array) {
    //     //this.profile = data;
    // }
    // setledEffect(data: Uint8Array) {
    //     //this.ledEffect = data;
    // }
    // setledColors(data: Uint8Array) {
    //     //this.ledColors = data;
    // }
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

    get(): Array<Profile> {
        return this.list;
    }

    init(defaultName: string, keyInfoArray: Array<Array<KeyInfo | null>>, performanceData: PerformanceData, lightSetting: LightSetting) {
        this.list.splice(0, this.list.length);
        //let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;

        this.curIndex = 0;
        this.version = VERSION;
        let tm = new Profile(defaultName, keyInfoArray, performanceData, lightSetting);
        tm.isDefault = true;
        tm.index = 0;
        this.add(tm);
        this.save();
    }

    load(): boolean {
        this.list.splice(0, this.list.length);
        let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;

        if (tmp != null && tmp.list.length > 0 && tmp.version != undefined && tmp.version == VERSION) {
            for (let m of tmp.list) {
                let tm = new Profile(m.name, m.keyInfoArray, m.performanceData, m.lightSetting);
                tm.isDefault = m.isDefault;
                //tm.layers = m.layers;
                // tm.profile = m.profile;
                // tm.ledEffect = m.ledEffect;
                // tm.ledColors = m.ledColors;
                // tm.keyTypes = m.keyTypes;
                this.add(tm);
            }
            this.curIndex = tmp.curIndex;
            this.version = VERSION;

            return true;
        }
        
        return false;
    }
    
    save() {
        storage.set(`${keyboard.keyboardDefine?.name}_profile`, this);
    }

}

export const createProfile = () => {
    return new Profiles()
}

export const ps = createProfile()
