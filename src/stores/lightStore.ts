import { defineStore } from "pinia";
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { keyboard } from '../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../keyboard/rk_l87/rk_l87';
import { Profile, FieldEnum } from '../keyboard/rk_l87/profile';
import { LedColors } from '../keyboard/rk_l87/ledColors';
import { LightEffectEnum } from '../keyboard/enum'
import { type LedColor } from '@/keyboard/interface';

export const uselightStore = defineStore('lightinfo', () => {
    const rgb = ref({ r: 0, g: 0, b: 0, color: '#000000' });
    const profile = ref<Profile>();
    const ledColors = ref<LedColors>();
    const rk_l87 = ref<RK_L87>();
    const profileIndex = ref(0);

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
        lightProps: {
            light: LightEffectEnum.Respire,
            brightness: 0,
            speed: 0,
            mixing: false,
            sleep: 0
        }
    });

    onMounted(async () => {
        rk_l87.value = (keyboard.protocol as RK_L87);

        rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnProfileGotten, profileGotten, false);
        rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnLedColorsGotten, ledColorsGotten, false);

        await getLightData();
    });

    onBeforeUnmount(() => {
        if (rk_l87.value != undefined) {
            rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnProfileGotten, profileGotten, false);
            rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnLedColorsGotten, ledColorsGotten, false);
        }
    });

    const getLightData = async () => {
        await rk_l87.value?.getProfile(profileIndex.value);
    }

    const profileGotten = async (event: any) => {
        profile.value = event.detail as Profile;
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

            let color = ledColors.value?.getLedColor(state.lightProps.light);
            if (color != undefined) {
                rgb.value.r = color.red;
                rgb.value.g = color.green;
                rgb.value.b = color.blue;
                rgb.value.color = color.color;
            }

            state.lightProps.sleep = profile.value.getFieldValue(FieldEnum.SleepTime) == 0 ? 0 : (profile.value.getFieldValue(FieldEnum.SleepTime) * 30) / 60;
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

    const onPicking = (r: any, g: any, b: any) => {
        let color: LedColor = {
            red: r,
            green: g,
            blue: b,
            color: LedColors.getColorString(r, g, b)
        }
        ledColors.value?.setLedColor(state.lightProps.light, color);
    };
    const onPicked = () => {
        if (ledColors.value != undefined && rk_l87.value != undefined) {
            rk_l87.value.setLedColors(profileIndex.value);
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
    return { state, rgb, ligtChanged, onPicking, onPicked, selectd, lightClick, selectdCustom }
})