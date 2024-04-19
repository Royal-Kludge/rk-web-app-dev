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
import { reactive, ref, onMounted } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { Protocol_RK_L87 } from '../../keyboard/rk_l87';
import { Profile, FieldEnum } from '../../keyboard/rk_l87/profile';
import { LedColors } from '../../keyboard/rk_l87/ledColors';
import { LightEffectEnum } from '../../keyboard/enum'
import { type LedColor } from '@/keyboard/interface';

const rgb = ref({r:0,g:0,b:0,color:'#000000'});
const profile = ref<Profile>();
const ledColors = ref<LedColors>();
const protocol = ref<Protocol_RK_L87>();

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
    protocol.value = (keyboard.protocol as Protocol_RK_L87);
    await getLightData();
});

const getLightData = async () => {
    if (protocol.value != undefined) {
        profile.value = await protocol.value.getProfile();
        ledColors.value = await protocol.value.getLedColors();
        refresh();
    }
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
    if (profile.value != undefined && protocol.value != undefined) {
        state.lightProps.light = light;
        profile.value.setFieldValue(FieldEnum.LedMode, light);
        protocol.value.setProfile();
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
    if (profile.value != undefined && protocol.value != undefined) {
        profile.value.setLedParam(state.lightProps.light, {
            brightness: state.lightProps.brightness - 1,
            speed: state.lightProps.speed,
            color: state.lightProps.mixing ? 0x07 : 0x00 
        });
        profile.value.setFieldValue(FieldEnum.SleepTime, (state.lightProps.sleep * 60) / 30);
        protocol.value.setProfile();
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
    if (ledColors.value != undefined && protocol.value != undefined) {
        protocol.value.setLedColors();
        refresh();
    }
};
</script>