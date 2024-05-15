<template>
    <div class="d-flex h-100">
        <div class="d-flex flex-column flex-1 mx-4 my-4" style="box-shadow: 0px 0px 24px 0px #E9EBF3;">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t('light.title_2') }}
            </div>
            <div class="d-flex flex-1">
                <div class="bg-box" style="width: 50%; border-radius: 0px 0px 0px 10px;">
                    <div class="w-100" style="height: 23vh">
                        <el-scrollbar>
                            <div class="d-flex flex-column jc-between" style="padding-left: 15%;">
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="20" :min="1"
                                                v-model="state.lightProps.brightness" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_3') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ state.lightProps.brightness }}</div>
                                </div>
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="4" :min="1"
                                                v-model="state.lightProps.speed" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_4') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ state.lightProps.speed }}</div>
                                </div>
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="30" :min="0"
                                                v-model="state.lightProps.sleep" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_5') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1" v-if="state.lightProps.sleep > 0">
                                        {{ state.lightProps.sleep }}min
                                    </div>
                                    <div class="ml-4 mt-1" v-else>{{ $t('light.title_6') }}</div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="bg-box flex-1" style="border-radius: 0px 0px 10px 0px;">
                    <div class="w-100" style="height: 23vh">
                        <el-scrollbar>
                            <div class="d-flex flex-column ml-5">
                                <div>
                                    <el-checkbox v-model="state.lightProps.mixing" :label="$t('light.title_7')"
                                        size="large" @change="ligtChanged" />
                                </div>
                                <div>
                                    <Picker @onpick="onPicking" @picked="onPicked" :rgb="rgb" />
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
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

const rgb = ref({ r: 0, g: 0, b: 0, color: '#000000' });
const profile = ref<Profile>();
const ledColors = ref<LedColors>();
const rk_l87 = ref<RK_L87>();
const profileIndex = ref(0);

const state = reactive({
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
</script>
<style scoped lang="scss"></style>