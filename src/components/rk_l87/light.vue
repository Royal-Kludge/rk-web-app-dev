<template>
    <div class="d-flex">
        <div class="flex-column">
            <div class="p-2 mr-3 br-2" v-for="item in state.lightEffects">
                <div class="ai-center" 
                     :class="[selectd(item.light)]"
                     style="cursor: pointer;height: 20px;padding: 2px;"
                     @click="lightClick(item.light)"
                     >{{ item.label }}</div>
            </div>
        </div>
        <div class="ml-3">
            <div class="mb-3">
                <span>Brightness</span>
                <div class="d-flex ai-center">
                    <el-slider style="width: 240px;" :step="1" :max="20" :min="1" v-model="state.lightProps.brightness"
                               @change="ligtChanged"/>
                    <span class="ml-4">{{ state.lightProps.brightness }}</span>
                </div>
            </div>
            <div class="mb-3">
                <span>Speed</span>
                <div class="d-flex ai-center">
                    <el-slider style="width: 240px;" :step="1" :max="4" :min="1" v-model="state.lightProps.speed"
                    @change="ligtChanged"/>
                    <span class="ml-4">{{ state.lightProps.speed }}</span>
                </div>
            </div>
            <div class="mb-3">
                <span>Sleep time</span>
                <div class="d-flex ai-center">
                    <el-slider style="width: 240px;" :step="1" :max="30" :min="0" v-model="state.lightProps.sleep"
                               @change="ligtChanged"/>
                    <span class="ml-4" v-if="state.lightProps.sleep > 0">{{ state.lightProps.sleep }} min</span>
                    <span class="ml-4" v-else>No sleep</span>
                </div>
            </div>
            <div class="mb-3">
                <el-checkbox v-model="state.lightProps.mixing" label="Color Mixing" size="large" border @change="ligtChanged"/>
            </div>
            <div class="mt-4">
                <Picker @onpick="onPicking" @picked="onPicked" :rgb="rgb"/>
            </div>
            <div class="mt-4 br-2 bg-white py-2 px-4 text-black" style="cursor: pointer;font-size: 14px;width: 72px;text-align: center;" @click="getLightData()">
                Reload
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Picker from '../picker.vue'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../../keyboard/rk_l87/rk_l87';
import { Profile, FieldEnum } from '../../keyboard/rk_l87/profile';
import { LedColors } from '../../keyboard/rk_l87/ledColors';
import { LightEffectEnum } from '../../keyboard/enum'
import { type LedColor } from '@/keyboard/interface';

const rgb = ref({r:0,g:0,b:0,color:'#000000'});
const profile = ref<Profile>();
const ledColors = ref<LedColors>();
const rk_l87 = ref<RK_L87>();

const state = reactive({
    lightEffects: [
        { light: LightEffectEnum.FixedOn,label: 'FixedOn'},
        { light: LightEffectEnum.Respire,label: 'Respire'},
        { light: LightEffectEnum.Rainbow, label: 'Rainbow'},
        { light: LightEffectEnum.FlashAway, label: 'FlashAway'},
        { light: LightEffectEnum.Raindrops, label: 'Raindrops'},
        { light: LightEffectEnum.RainbowWheel, label: 'RainbowWheel'},
        { light: LightEffectEnum.RippleShining, label: 'RippleShining'},
        { light: LightEffectEnum.StarsTwinkle, label: 'StarsTwinkle'},
        { light: LightEffectEnum.ShadowDisappear, label: 'ShadowDisappear'},
        { light: LightEffectEnum.RetroSnake, label: 'RetroSnake'},
        { light: LightEffectEnum.NeonStream, label: 'NeonStream'},
        { light: LightEffectEnum.Reaction, label: 'Reaction'},
        { light: LightEffectEnum.SineWave, label: 'SineWave'},
        { light: LightEffectEnum.Blossoming, label: 'Blossoming'},
        { light: LightEffectEnum.SelfDefine, label: 'SelfDefine'},
        { light: LightEffectEnum.OFF, label: 'OFF'},
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
    await rk_l87.value?.getProfile();
    await rk_l87.value?.getLedColors();
}

const profileGotten = (event: any) => {
    profile.value = event.detail as Profile;
    refresh();
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

const lightClick = (light: LightEffectEnum) => {
    if (profile.value != undefined && rk_l87.value != undefined) {
        state.lightProps.light = light;
        profile.value.setFieldValue(FieldEnum.LedMode, light);
        rk_l87.value.setProfile();
        refresh();
    }
};

const selectd = (light: LightEffectEnum) => {
    let style = '';
    if (profile.value != undefined && light == state.lightProps.light) {
        style = 'bg-white text-black';
    }

    return style;
};

const ligtChanged = () => {
    if (profile.value != undefined && rk_l87.value != undefined) {
        profile.value.setLedParam(state.lightProps.light, {
            brightness: state.lightProps.brightness - 1,
            speed: state.lightProps.speed,
            color: state.lightProps.mixing ? 0x07 : 0x00 
        });
        profile.value.setFieldValue(FieldEnum.SleepTime, (state.lightProps.sleep * 60) / 30);
        rk_l87.value.setProfile();
        refresh();
    }
};

const onPicking = (r:any, g:any, b:any) => {
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
        rk_l87.value.setLedColors();
        refresh();
    }
};
</script>