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
                                <div class="d-flex m-3"
                                    v-if="useLight.state.lightProps.light != LightEffectEnum.SelfDefine">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="20" :min="1"
                                                v-model="useLight.state.lightProps.brightness"
                                                @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_3') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ useLight.state.lightProps.brightness }}</div>
                                </div>
                                <div class="d-flex m-3"
                                    v-if="useLight.state.lightProps.light != LightEffectEnum.SelfDefine">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="4" :min="1"
                                                v-model="useLight.state.lightProps.speed"
                                                @change="ligtChanged" />
                                        </div>
                                        <div class="d-flex jc-center">{{ $t('light.title_4') }}</div>
                                    </div>
                                    <div class="ml-4 mt-1">{{ useLight.state.lightProps.speed }}</div>
                                </div>
                                <div class="d-flex m-3">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <el-slider style="width: 360px" :step="1" :max="30" :min="0"
                                                v-model="useLight.state.lightProps.sleep"
                                                @change="ligtChanged" />
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
                <div class="bg-box flex-1" style="border-radius: 0px 0px 10px 0px;" v-if="useLight.state.lightProps.light != 3 && useLight.state.lightProps.light != 17">
                    <div class="w-100" style="height: 28vh">
                        <el-scrollbar>
                            <div class="d-flex flex-column ml-5">
                                <div class="d-flex ai-center">
                                    <div class="mr-4 mt-1 p-1 b-grey" style="border-radius: 5px;">
                                        <el-tag :color="`rgb(${useLight.rgb.r}, ${useLight.rgb.g}, ${useLight.rgb.b})`"
                                            style="border-width: 0px; border-radius: 5px;width: 42px;height: 42px;" />
                                    </div>
                                    <div v-if="useLight.state.lightProps.light != LightEffectEnum.SelfDefine">
                                        <el-checkbox v-model="useLight.state.lightProps.mixing"
                                            :label="$t('light.title_7')" size="large" @change="ligtChanged" />
                                    </div>
                                    <div v-else>
                                        <div class="py-1 px-3 but-red text-white c-p"
                                            @click="useLight.SelfDefineDefaultAll">
                                            {{ $t('light.title_8') }}
                                        </div>
                                    </div>
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
import { uselightStore } from "@/stores/rk_r87_rf/lightStore";
import { LightEffectEnum } from '@/keyboard/enum'
import { useKeyStore } from "@/stores/rk_r87_rf/keyStore";
import { type KeyState } from '@/keyboard/interface'

const useLight = uselightStore();
const useKey = useKeyStore();

const onPicking = () => {
    if (useLight.state.lightProps.light == LightEffectEnum.SelfDefine) {
        let i: any;
        for (i in useKey.state.keyState) {
            if ((useKey.state.keyState as Array<KeyState>)[i].selected) {
                useLight.onPicking(useLight.rgb.r, useLight.rgb.g, useLight.rgb.b, Number((useKey.state.keyState as Array<KeyState>)[i].index));
            }
        }
    } else {
        useLight.onPicking(useLight.rgb.r, useLight.rgb.g, useLight.rgb.b, 0);
    }
}

const onPicked = async () => {
    await useLight.onPicked()
    useKey.saveProfile()
}

const ligtChanged = async () => {
    await useLight.ligtChanged();
    useKey.saveProfile()
}
</script>
<style scoped lang="scss"></style>