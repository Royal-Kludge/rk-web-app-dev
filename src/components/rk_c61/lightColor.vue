<template>
    <div class="d-flex h-100">
        <div class="d-flex flex-column flex-1 mx-4 my-4" style="box-shadow: 0px 0px 24px 0px #E9EBF3;">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t('light.title_2') }}
            </div>
            <div class="d-flex flex-1">
                <div class="bg-box" style="width: 50%; border-radius: 0px 0px 0px 10px;">
                    <div class="w-100" style="height: 28vh">
                        <el-scrollbar>
                            <div class="d-flex flex-column jc-between" style="padding-left: 15%;">
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="4" :min="0"
                                                v-model="useLight.state.lightProps.brightness" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_3') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ useLight.state.lightProps.brightness }}</div>
                                </div>
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="4" :min="0"
                                                v-model="useLight.state.lightProps.speed" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_4') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ useLight.state.lightProps.speed }}</div>
                                </div>
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="120" :min="0"
                                                v-model="useLight.state.lightProps.sleep" @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_5') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1" v-if="useLight.state.lightProps.sleep > 0">
                                        {{ useLight.state.lightProps.sleep }}min
                                    </div>
                                    <div class="ml-4 mt-1" v-else>{{ $t('light.title_6') }}</div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="bg-box flex-1" style="border-radius: 0px 0px 10px 0px;"
                    v-if="useLight.state.lightProps.light == LightEffectEnum.Static || useLight.state.lightProps.light == LightEffectEnum.SelfDefine">
                    <div class="w-100" style="height: 28vh">
                        <el-scrollbar>
                            <div class="d-flex flex-column ml-5">
                                <div class="d-flex ai-center">
                                    <div class="mr-4 mt-1 p-1 b-grey" style="border-radius: 5px;">
                                        <el-tag :color="`rgb(${useLight.rgb.r}, ${useLight.rgb.g}, ${useLight.rgb.b})`"
                                            style="border-width: 0px; border-radius: 5px;width: 42px;height: 42px;" />
                                    </div>
                                    <div v-if="useLight.state.lightProps.mode == LightModeEnum.Custom">
                                        <div class="py-1 px-3 but-red text-white c-p"
                                            @click="setAllToDefault">
                                            {{ $t('light.title_8') }}
                                        </div>
                                    </div>
                                    <el-select v-else v-model="useLight.state.lightProps.staticIndex" placeholder="Select" style="width: 120px" @change="lightModeChange">
                                        <el-option
                                            v-for="item in useLight.state.lightProps.staticColors"
                                            :key="item.index"
                                            :label="item.text"
                                            :value="item.index"
                                        >
                                        <div class="flex items-center">
                                            <el-tag :color="item.color.color" style="margin-right: 2px" />
                                            <span>{{ item.text }}</span>
                                        </div>
                                        </el-option>
                                        <template #label="{ text, color }">
                                            <el-tag :color="color.color" />
                                            <span>{{ text }}</span>
                                        </template>
                                    </el-select>
                                </div>
                                <div>
                                    <Picker @onpick="onPicking" @picked="onPicked" :rgb="useLight.rgb" />
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
import { uselightStore } from "@/stores/rk_c61/lightStore";
import { LightEffectEnum, LightModeEnum } from '@/keyboard/sparklink/enum'
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { type KeyState, type KeyInfo, type LedColor } from '@/keyboard/sparklink/interface'

const useLight = uselightStore();
const useKey = useKeyStore();

const onPicking = () => {
    if (useLight.state.lightProps.light == LightEffectEnum.SelfDefine) {
        let keyStates = useKey.state.keyState as Array<KeyState>;
        for (let i in keyStates) {
            if (keyStates[i].selected) {
                useLight.onPicking(useLight.rgb.r, useLight.rgb.g, useLight.rgb.b, keyStates[i].keyData.keyInfo);
            }
        }
    } else if (useLight.state.lightProps.light == LightEffectEnum.Static) {
        useLight.onPicking(useLight.rgb.r, useLight.rgb.g, useLight.rgb.b, null);
    }
}

const onPicked = async () => {
    let keyInfos: Array<KeyInfo> = [];
    let keyStates = useKey.state.keyState as Array<KeyState>;
    for (let i in keyStates) {
        if (keyStates[i].selected) {
            keyInfos.push(keyStates[i].keyData.keyInfo);
        }
    }

    await useLight.onPicked(keyInfos)
    useKey.saveProfile()
}

const ligtChanged = async () => {
    await useLight.ligtChanged();
    useKey.saveProfile()
}

const setAllToDefault = async () => {
    let keyInfos: Array<KeyInfo> = [];
    let keyStates = useKey.state.keyState as Array<KeyState>;
    for (let i in keyStates) {
        if (keyStates[i].keyData != undefined) {
            keyInfos.push(keyStates[i].keyData.keyInfo);
        }
    }

    if (keyInfos.length > 0) {
        await useLight.setAllToDefault(keyInfos);
        useKey.saveProfile();
    }
}

const lightModeChange = async (value: any) => {
    await useLight.lightModeChange(value);
    useKey.saveProfile();
}
</script>
<style scoped lang="scss"></style>