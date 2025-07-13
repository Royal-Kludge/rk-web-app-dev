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
    
    static default(): Profile | undefined {
        if (keyboard.keyboardDefine == undefined) return undefined;

        let name = 'default';
        let keyInfos: Array<Array<KeyInfo | null>> = Array.from<Array<KeyInfo>>({ length: 6 });

        for (let row = 0; row < 6; row++) {
            keyInfos[row] = Array.from<KeyInfo>({ length: 21 });
            for (let col = 0; col < 21; col++) {
                let def = keyboard.keyboardDefine.keyLayout[row][col];
                if (def != null && def != undefined) {
                    let keyInfo: KeyInfo = {
                        keyValue: def.keyValue,
                        row: def.row,
                        col: def.col,
                        color: {
                            red: def.color.red,
                            green: def.color.green,
                            blue: def.color.blue,
                            color: def.color.color
                        },
                        touchTravel: def.touchTravel,
                        touchRelease: def.touchRelease,
                        quickTouchPress: def.quickTouchPress,
                        quickTouchRelease: def.quickTouchRelease,
                        deadPress: def.deadPress,
                        deadRelease: def.deadRelease,
                        isCheck: def.isCheck,
                        isSingleTouch: def.isSingleTouch,
                        isQuickTouch: def.isQuickTouch,
                        isAdvancedKey: def.isAdvancedKey,
                        advanceKeyType: def.advanceKeyType,
                        macroBreak: def.macroBreak,
                        fn0_keyValue: def.fn0_keyValue,
                        fn1_keyValue: def.fn1_keyValue,
                        fn2_keyValue: def.fn2_keyValue,
                        fn3_keyValue: def.fn3_keyValue,
                        fn_keyValue: [def.fn_keyValue[0], def.fn_keyValue[1], def.fn_keyValue[2], def.fn_keyValue[3],],
                        DKSInfo: {
                            DKS: [def.DKSInfo.DKS[0], def.DKSInfo.DKS[1], def.DKSInfo.DKS[2], def.DKSInfo.DKS[3],],
                            TRPS: [def.DKSInfo.TRPS[0], def.DKSInfo.TRPS[1], def.DKSInfo.TRPS[2], def.DKSInfo.TRPS[3],],
                            DB: def.DKSInfo.DB,
                            DB2: def.DKSInfo.DB2
                        },
                        MPTInfo: {
                            DKS: [def.MPTInfo.DKS[0], def.MPTInfo.DKS[1], def.MPTInfo.DKS[2]],
                            DB: [def.MPTInfo.DB[0], def.MPTInfo.DB[1], def.MPTInfo.DB[2]],
                        },
                        MTInfo: {
                            DKS: [def.MTInfo.DKS[0], def.MTInfo.DKS[1]],
                            delay: def.MTInfo.delay,
                        },
                        TGLInfo: {
                            DKS: def.TGLInfo.DKS,
                            delay: def.TGLInfo.delay,
                            },
                        ENDInfo: {
                            DKS: def.ENDInfo.DKS,
                        },
                        SOCDInfo:  {
                            DKS: [def.SOCDInfo.DKS[0], def.SOCDInfo.DKS[1]],
                            DKSV: [def.SOCDInfo.DKSV[0], def.SOCDInfo.DKSV[1]],
                            type: def.SOCDInfo.type,
                            mode: def.SOCDInfo.mode,
                        },
                        RSInfo: {
                            DKS: [def.RSInfo.DKS[0], def.RSInfo.DKS[1]],
                        },
                        axisID: def.axisID,
                        adjustingMM: def.adjustingMM,
                        adjustingADC: def.adjustingADC,
                        adjustingPress: def.adjustingPress,
                        adjustingSuccess: def.adjustingSuccess,
                    };
                    keyInfos[row][col] = keyInfo;
                } else {
                    keyInfos[row][col] = null;
                }
            }
        }

        let performance: PerformanceData = {
            PerformancePage: keyboard.keyboardDefine.performance.PerformancePage,
            precision: keyboard.keyboardDefine.performance.precision, // 键盘行程精度
            decimalPlace: keyboard.keyboardDefine.performance.decimalPlace, // 行程显示的小数位
            minTouchTravel: keyboard.keyboardDefine.performance.minTouchTravel, // 最小触发行程(方法中有使用，待移植方法)
            maxTouchTravel: keyboard.keyboardDefine.performance.maxTouchTravel, // 最大触发行程(方法中有使用，待移植方法)
            globalTouchTravel: keyboard.keyboardDefine.performance.globalTouchTravel, // 全局触发行程
            singleTouchTravel: keyboard.keyboardDefine.performance.singleTouchTravel, // 单键触发行程
            singleTouchRelease: keyboard.keyboardDefine.performance.singleTouchRelease, // 单键释放行程(特殊)
            pressDead: keyboard.keyboardDefine.performance.pressDead, // 按压死区
            releaseDead: keyboard.keyboardDefine.performance.releaseDead, // 抬起死区
            topDeadSwitch: keyboard.keyboardDefine.performance.topDeadSwitch, // 顶部死区开关
            pressDeadOptimizeSwitch: keyboard.keyboardDefine.performance.pressDeadOptimizeSwitch, // 按压死区优化
            releaseDesdOptimizeSwitch: keyboard.keyboardDefine.performance.releaseDesdOptimizeSwitch, // 抬起死区优化
            rateOfReturn: keyboard.keyboardDefine.performance.rateOfReturn, // 回报率
            quickTouchPress: keyboard.keyboardDefine.performance.quickTouchPress, // 快速触发按下行程
            quickTouchRelease: keyboard.keyboardDefine.performance.quickTouchRelease, // 快速触发抬起行程
            quickTouchSwitchDisable: keyboard.keyboardDefine.performance.quickTouchSwitchDisable, // (方法中有使用，待移植方法)
            quickTouchSwitch: keyboard.keyboardDefine.performance.quickTouchSwitch, // (方法中有使用，待移植方法)
            isAdjusting: keyboard.keyboardDefine.performance.isAdjusting, // 是否开启校准
            adjustingCount: keyboard.keyboardDefine.performance.adjustingCount, // 校准计数触发器
            travelTestOn: keyboard.keyboardDefine.performance.travelTestOn, // 行程测试
            keyPressTestCount: keyboard.keyboardDefine.performance.keyPressTestCount, // 按键测试计数触发器
            hasAxisSetting: keyboard.keyboardDefine.performance.hasAxisSetting,
        }

        let light: LightSetting = {
                lightColorList: [
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[0].red,
                        green: keyboard.keyboardDefine.light.lightColorList[0].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[0].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[0].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[1].red,
                        green: keyboard.keyboardDefine.light.lightColorList[1].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[1].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[1].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[2].red,
                        green: keyboard.keyboardDefine.light.lightColorList[2].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[2].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[2].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[3].red,
                        green: keyboard.keyboardDefine.light.lightColorList[3].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[3].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[3].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[4].red,
                        green: keyboard.keyboardDefine.light.lightColorList[4].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[4].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[4].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[5].red,
                        green: keyboard.keyboardDefine.light.lightColorList[5].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[5].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[5].color,
                    },
                    {
                        red: keyboard.keyboardDefine.light.lightColorList[6].red,
                        green: keyboard.keyboardDefine.light.lightColorList[6].green,
                        blue: keyboard.keyboardDefine.light.lightColorList[6].blue,
                        color: keyboard.keyboardDefine.light.lightColorList[6].color,
                    },
                ],
                lightSwitch: keyboard.keyboardDefine.light.lightSwitch,
                lightMode: keyboard.keyboardDefine.light.lightMode,
                lightBigMode: keyboard.keyboardDefine.light.lightBigMode,
                lightBrightness: keyboard.keyboardDefine.light.lightBrightness,
                lightSpeed: keyboard.keyboardDefine.light.lightSpeed,
                // (0x01=1min,0x02=2min(默认),0x03=3min,0x05=5min,0x0a=10min,0x0f=15min,0x14=20min,0x19=25min,0x1e=30min,0x2d=45min,0x3c=60min,0x78=120min,0x00=永久)。
                lightSleepDelay: keyboard.keyboardDefine.light.lightSleepDelay,
                lightDirection: keyboard.keyboardDefine.light.lightDirection,
                superResponse: keyboard.keyboardDefine.light.superResponse,
                staticLightMode: keyboard.keyboardDefine.light.staticLightMode
        }

        return new Profile(name, keyInfos, performance, light);
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

    get(): Array<Profile> {
        return this.list;
    }

    init(defaultName: string, keyInfoArray: Array<Array<KeyInfo | null>>, performanceData: PerformanceData, lightSetting: LightSetting) {
        this.list.splice(0, this.list.length);
        //let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;

        this.curIndex = 0;
        this.version = VERSION;
        let tm = new Profile(defaultName, keyInfoArray, performanceData, lightSetting);
        //tm.isDefault = true;
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
