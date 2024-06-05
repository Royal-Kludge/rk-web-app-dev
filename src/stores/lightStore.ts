import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { keyboard } from '../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../keyboard/rk_l87/rk_l87';
import { Profile, FieldEnum } from '../keyboard/rk_l87/profile';
import { LedEffect } from '../keyboard/rk_l87/ledEffect';
import { LedColors } from '../keyboard/rk_l87/ledColors';
import { LightEffectEnum, KeyMatrixLayer } from '../keyboard/enum'
import { type LedColor } from '@/keyboard/interface';
import { KeyDefineEnum } from '@/keyboard/keyCode';
import { type KeyTableData } from '@/keyboard/interface'

export const uselightStore = defineStore('lightinfo', () => {
    const rgb = ref({ r: 0, g: 0, b: 0, color: '#000000' });
    const profile = ref<Profile>();
    const ledEffect = ref<LedEffect>();
    const ledColors = ref<LedColors>();
    const rk_l87 = ref<RK_L87>();
    const profileIndex = ref(0);

    const getKeyData = (index: number, layer: KeyMatrixLayer = KeyMatrixLayer.Nomal): KeyTableData | undefined => {
        let keyData = undefined;
        if (layer in keyboard.state.keyTableData &&
            index < keyboard.state.keyTableData[layer].length) {
            keyData = keyboard.state.keyTableData[layer][index];
        }
        return keyData;
    }

    const getIndex = (l: number, c: number) => {
        return l + 6 * c;
    }

    const state = reactive({
        lightEffects: [
            { light: LightEffectEnum.FixedOn, label: 'FixedOn' },
            { light: LightEffectEnum.Respire, label: 'Respire' },
            { light: LightEffectEnum.Rainbow, label: 'Rainbow' },
            { light: LightEffectEnum.FlashAway, label: 'FlashAway' },
            { light: LightEffectEnum.Raindrops, label: 'Raindrops' },
            { light: LightEffectEnum.RainbowWheel, label: 'RainbowWheel' },
            { light: LightEffectEnum.RippleShining, label: 'RippleShining' },
            { light: LightEffectEnum.StarsTwinkle, label: 'StarsTwinkle' },
            { light: LightEffectEnum.ShadowDisappear, label: 'ShadowDisappear' },
            { light: LightEffectEnum.RetroSnake, label: 'RetroSnake' },
            { light: LightEffectEnum.NeonStream, label: 'NeonStream' },
            { light: LightEffectEnum.Reaction, label: 'Reaction' },
            { light: LightEffectEnum.SineWave, label: 'SineWave' },
            { light: LightEffectEnum.Blossoming, label: 'Blossoming' },
            { light: LightEffectEnum.SelfDefine, label: 'SelfDefine' },
            { light: LightEffectEnum.OFF, label: 'OFF' },
            //{ light: LightEffectEnum.Music, label: 'Music' },
        ],
        keyMatrix: [
            { key: KeyDefineEnum.KEY_ESC, index: getIndex(0, 0), },
            { key: KeyDefineEnum.KEY_F1, index: getIndex(0, 1), },
            { key: KeyDefineEnum.KEY_F2, index: getIndex(0, 2), },
            { key: KeyDefineEnum.KEY_F3, index: getIndex(0, 3), },
            { key: KeyDefineEnum.KEY_F4, index: getIndex(0, 4), },
            { key: KeyDefineEnum.KEY_F5, index: getIndex(0, 5), },
            { key: KeyDefineEnum.KEY_F6, index: getIndex(0, 6), },
            { key: KeyDefineEnum.KEY_F7, index: getIndex(0, 7), },
            { key: KeyDefineEnum.KEY_F8, index: getIndex(0, 8), },
            { key: KeyDefineEnum.KEY_F9, index: getIndex(0, 9), },
            { key: KeyDefineEnum.KEY_F10, index: getIndex(0, 10), },
            { key: KeyDefineEnum.KEY_F11, index: getIndex(0, 11), },
            { key: KeyDefineEnum.KEY_F12, index: getIndex(0, 12), },
            { key: KeyDefineEnum.KEY_Calculator, index: getIndex(0, 13), },
            { key: KeyDefineEnum.KEY_PRINT, index: getIndex(0, 14), },
            { key: KeyDefineEnum.KEY_SCRLOCK, index: getIndex(0, 15), },
            { key: KeyDefineEnum.KEY_PAUSE, index: getIndex(0, 16), },
            { key: KeyDefineEnum.KEY_TILDE, index: getIndex(1, 0), },
            { key: KeyDefineEnum.KEY_1, index: getIndex(1, 1), },
            { key: KeyDefineEnum.KEY_2, index: getIndex(1, 2), },
            { key: KeyDefineEnum.KEY_3, index: getIndex(1, 3), },
            { key: KeyDefineEnum.KEY_4, index: getIndex(1, 4), },
            { key: KeyDefineEnum.KEY_5, index: getIndex(1, 5), },
            { key: KeyDefineEnum.KEY_6, index: getIndex(1, 6), },
            { key: KeyDefineEnum.KEY_7, index: getIndex(1, 7), },
            { key: KeyDefineEnum.KEY_8, index: getIndex(1, 8), },
            { key: KeyDefineEnum.KEY_9, index: getIndex(1, 9), },
            { key: KeyDefineEnum.KEY_0, index: getIndex(1, 10), },
            { key: KeyDefineEnum.KEY_Underscore, index: getIndex(1, 11), },
            { key: KeyDefineEnum.KEY_EqualSign, index: getIndex(1, 12), },
            { key: KeyDefineEnum.KEY_Backspace, index: getIndex(1, 13), },
            { key: KeyDefineEnum.KEY_INS, index: getIndex(1, 14), },
            { key: KeyDefineEnum.KEY_HOME, index: getIndex(1, 15), },
            { key: KeyDefineEnum.KEY_PGUP, index: getIndex(1, 16), },
            { key: KeyDefineEnum.KEY_TAB, index: getIndex(2, 0), },
            { key: KeyDefineEnum.KEY_Q, index: getIndex(2, 1), },
            { key: KeyDefineEnum.KEY_W, index: getIndex(2, 2), },
            { key: KeyDefineEnum.KEY_E, index: getIndex(2, 3), },
            { key: KeyDefineEnum.KEY_R, index: getIndex(2, 4), },
            { key: KeyDefineEnum.KEY_T, index: getIndex(2, 5), },
            { key: KeyDefineEnum.KEY_Y, index: getIndex(2, 6), },
            { key: KeyDefineEnum.KEY_U, index: getIndex(2, 7), },
            { key: KeyDefineEnum.KEY_I, index: getIndex(2, 8), },
            { key: KeyDefineEnum.KEY_O, index: getIndex(2, 9), },
            { key: KeyDefineEnum.KEY_P, index: getIndex(2, 10), },
            { key: KeyDefineEnum.KEY_L_Brackets, index: getIndex(2, 11), },
            { key: KeyDefineEnum.KEY_R_Brackets, index: getIndex(2, 12), },
            { key: KeyDefineEnum.KEY_CODE29, index: getIndex(2, 13), },
            { key: KeyDefineEnum.KEY_DEL, index: getIndex(2, 14), },
            { key: KeyDefineEnum.KEY_END, index: getIndex(2, 15), },
            { key: KeyDefineEnum.KEY_PGDN, index: getIndex(2, 16), },
            { key: KeyDefineEnum.KEY_CAPSLOCK, index: getIndex(3, 0), },
            { key: KeyDefineEnum.KEY_A, index: getIndex(3, 1), },
            { key: KeyDefineEnum.KEY_S, index: getIndex(3, 2), },
            { key: KeyDefineEnum.KEY_D, index: getIndex(3, 3), },
            { key: KeyDefineEnum.KEY_F, index: getIndex(3, 4), },
            { key: KeyDefineEnum.KEY_G, index: getIndex(3, 5), },
            { key: KeyDefineEnum.KEY_H, index: getIndex(3, 6), },
            { key: KeyDefineEnum.KEY_J, index: getIndex(3, 7), },
            { key: KeyDefineEnum.KEY_K, index: getIndex(3, 8), },
            { key: KeyDefineEnum.KEY_L, index: getIndex(3, 9), },
            { key: KeyDefineEnum.KEY_Semicolon, index: getIndex(3, 10), },
            { key: KeyDefineEnum.KEY_Quotation, index: getIndex(3, 11), },
            { key: KeyDefineEnum.KEY_ENTER, index: getIndex(3, 13), },
            { key: KeyDefineEnum.SHIFT_L, index: getIndex(4, 0), },
            { key: KeyDefineEnum.KEY_Z, index: getIndex(4, 1), },
            { key: KeyDefineEnum.KEY_X, index: getIndex(4, 2), },
            { key: KeyDefineEnum.KEY_C, index: getIndex(4, 3), },
            { key: KeyDefineEnum.KEY_V, index: getIndex(4, 4), },
            { key: KeyDefineEnum.KEY_B, index: getIndex(4, 5), },
            { key: KeyDefineEnum.KEY_N, index: getIndex(4, 6), },
            { key: KeyDefineEnum.KEY_M, index: getIndex(4, 7), },
            { key: KeyDefineEnum.KEY_COMMA, index: getIndex(4, 8), },
            { key: KeyDefineEnum.KEY_PERIOD, index: getIndex(4, 9), },
            { key: KeyDefineEnum.KEY_Interrogation, index: getIndex(4, 10), },
            { key: KeyDefineEnum.SHIFT_R, index: getIndex(4, 13), },
            { key: KeyDefineEnum.KEY_UpArrow, index: getIndex(4, 15), },
            { key: KeyDefineEnum.CTRL_L, index: getIndex(5, 0), },
            { key: KeyDefineEnum.WIN_L, index: getIndex(5, 1), },
            { key: KeyDefineEnum.ALT_L, index: getIndex(5, 2), },
            { key: KeyDefineEnum.KEY_SPACEBAR, index: getIndex(5, 5), },
            { key: KeyDefineEnum.ALT_R, index: getIndex(5, 8), },
            { key: KeyDefineEnum.KEY_Fn1, index: getIndex(5, 9), },
            { key: KeyDefineEnum.KEY_APP, index: getIndex(5, 10), },
            { key: KeyDefineEnum.CTRL_R, index: getIndex(5, 13), },
            { key: KeyDefineEnum.KEY_LeftArrow, index: getIndex(5, 14), },
            { key: KeyDefineEnum.KEY_DownArrow, index: getIndex(5, 15), },
            { key: KeyDefineEnum.KEY_RightArrow, index: getIndex(5, 16), }
        ],
        keyColors: [
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF',
            '#FFFFFF'
        ],
        lightProps: {
            light: LightEffectEnum.Respire,
            brightness: 0,
            speed: 0,
            mixing: false,
            sleep: 0
        },
        keyColor:
        {
            index: 0,
            keyStr: "",
            key: KeyDefineEnum.KEY_ESC,
            color: "",
        }
    });

    const init = async () => {
        if (rk_l87.value == undefined) {
            rk_l87.value = (keyboard.protocol as RK_L87);
        }

        if (rk_l87.value != undefined) {
            rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnProfileGotten, profileGotten, false);
            rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnLedEffectGotten, ledEffectGotten, false);
            rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnLedColorsGotten, ledColorsGotten, false);
        }

        if (profile.value == undefined) {
            await getLightData();
        }
    };

    const destroy = () => {
        if (rk_l87.value != undefined) {
            rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnProfileGotten, profileGotten, false);
            rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnLedEffectGotten, ledEffectGotten, false);
            rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnLedColorsGotten, ledColorsGotten, false);
        }
    };

    const getLightData = async () => {
        await rk_l87.value?.getProfile(profileIndex.value);
    }

    const profileGotten = async (event: any) => {
        profile.value = event.detail as Profile;
        await rk_l87.value?.getLedEffect(profileIndex.value);
    };

    const ledEffectGotten = async (event: any) => {
        ledEffect.value = event.detail as LedEffect;
        await rk_l87.value?.getLedColors(profileIndex.value);
    };

    const ledColorsGotten = (event: any) => {
        ledColors.value = event.detail as LedColors;
        refresh();
    };

    const refresh = () => {
        if (profile.value != undefined) {
            state.lightProps.light = profile.value.getFieldValue(FieldEnum.LedMode);
            let ledParam = profile.value.getLedParam(state.lightProps.light);
            if (ledParam != undefined && profile.value.getFieldValue(FieldEnum.LedParameterType) == 0) {
                state.lightProps.brightness = ledParam.brightness + 1;
                state.lightProps.mixing = ledParam.color > 0;
                state.lightProps.speed = ledParam.speed;
            } else {
                state.lightProps.brightness = profile.value.getFieldValue(FieldEnum.LedBrightness) + 1;
                state.lightProps.speed = profile.value.getFieldValue(FieldEnum.LedSpeed);
            }

            state.lightProps.sleep = profile.value.getFieldValue(FieldEnum.SleepTime) == 0 ? 0 : (profile.value.getFieldValue(FieldEnum.SleepTime) * 30) / 60;
        }

        if (ledColors.value != undefined) {
            let index: number;
            for (index = 0; index < state.keyColors.length; index++) {
                var color = ledColors.value.getLedColor(index);
                state.keyColors[index] = color.color;
            }

            keyChanged(state.keyColor.index);
        }

        if (state.lightProps.light == LightEffectEnum.SelfDefine) {
            let color = ledColors.value?.getLedColor(state.keyColor.index);
            if (color != undefined) {
                rgb.value.r = color.red;
                rgb.value.g = color.green;
                rgb.value.b = color.blue;
                rgb.value.color = color.color;
            }
        } else {
            let color = ledEffect.value?.getLedColor(state.lightProps.light);
            if (color != undefined) {
                rgb.value.r = color.red;
                rgb.value.g = color.green;
                rgb.value.b = color.blue;
                rgb.value.color = color.color;
            }
        }
    };

    const ligtChanged = () => {
        if (profile.value != undefined && rk_l87.value != undefined) {
            profile.value.setLedParam(state.lightProps.light, {
                brightness: state.lightProps.brightness - 1,
                speed: state.lightProps.speed,
                color: state.lightProps.mixing ? 0x07 : 0x00
            });
            profile.value.setFieldValue(FieldEnum.SleepTime, (state.lightProps.sleep * 60) / 30);
            rk_l87.value.setProfile(profileIndex.value);
            refresh();
        }
    };

    const SelfDefineDefault = () => {
        onPicking(0, 0, 0);
        onPicked();
    }

    const onPicking = (r: any, g: any, b: any) => {
        let color: LedColor = {
            red: r,
            green: g,
            blue: b,
            color: LedColors.getColorString(r, g, b)
        }
        if (state.lightProps.light == LightEffectEnum.SelfDefine) {
            state.keyColor.color = color.color;
            state.keyColors[state.keyColor.index] = color.color;
            ledColors.value?.setLedColor(state.keyColor.index, color);
        } else if (state.lightProps.light != LightEffectEnum.OFF && state.lightProps.light != LightEffectEnum.Music) {
            ledEffect.value?.setLedColor(state.lightProps.light, color);
        }
    };
    const onPicked = () => {
        if (rk_l87.value != undefined) {
            if (state.lightProps.light == LightEffectEnum.SelfDefine) {
                if (ledColors.value != undefined) {
                    rk_l87.value.setLedColors(profileIndex.value);
                }
            } else if (state.lightProps.light != LightEffectEnum.OFF && state.lightProps.light != LightEffectEnum.Music) {
                if (ledEffect.value != undefined) {
                    rk_l87.value.setLedEffect(profileIndex.value);
                }
            }
            refresh();
        }
    };
    const lightClick = (light: LightEffectEnum) => {
        if (profile.value != undefined && rk_l87.value != undefined) {
            state.lightProps.light = light;
            profile.value.setFieldValue(FieldEnum.LedMode, light);
            rk_l87.value.setProfile(profileIndex.value);
            refresh();
        }
    };

    const selectd = (light: LightEffectEnum) => {
        let style = '';
        if (profile.value != undefined && light == state.lightProps.light) {
            style = 'module_active';
        }

        return style;
    };
    const selectdCustom = (light: LightEffectEnum) => {
        let style = '';
        if (profile.value != undefined && light == state.lightProps.light) {
            style = 'active';
        }

        return style;
    };
    const keyChanged = (index: any) => {
        state.keyColor.index = index;
        state.keyColor.color = state.keyColors[index];
        let str = getKeyData(index)?.keyStr;
        if (str != undefined) {
            state.keyColor.keyStr = str.valueOf();
        }
    };
    const keyTextColor = (index: number): string => {
        return state.keyColors[index];
    };
    return { state, rgb, ligtChanged, onPicking, onPicked, selectd, lightClick, selectdCustom, keyChanged, keyTextColor, init, destroy, SelfDefineDefault }
})