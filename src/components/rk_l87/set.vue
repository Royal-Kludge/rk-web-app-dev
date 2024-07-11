<template>
    <div class="d-flex jc-center w-100">
        <div class="d-flex flex-column ml-4 my-4" style="width: 50%;">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t("set.title") }}
            </div>
            <div class="bg-white-1" style="border-radius: 0px 0px 10px 10px;height: 95%;">
                <div class="m-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="m-4">{{ $t("set.lang") }}</div>
                    <div class="m-4">
                        <el-select v-model="locale" placeholder="Select" style="width: 100%;"
                            @change="useLocale.setLocale(locale)">
                            <el-option v-for="item in langList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="mb-5"></div>
                </div>
                <div class="m-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="m-4">
                        <el-checkbox v-model="isLayer" :label="$t('set.layer_1')" style="width: 100%;"
                            @change="LayerChanged">
                            {{ $t('set.layer_1') }}
                        </el-checkbox>
                    </div>
                    <div class="m-4 px-3" v-if="isLayer">
                        <el-slider style="width: 360px" v-model="useLight.state.layer" :min="1" :max="127"
                            @change="useLight.setLayer(useLight.state.layer)" />
                    </div>
                    <div class="m-4 d-flex flex-column">
                        <!-- <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                            {{ $t("set.but_1") }}
                        </div>-->
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="reSet = true">
                            {{ $t("set.but_2") }}
                        </div>
                        <!-- <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                            {{ $t("set.but_3") }}
                        </div> -->
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="checkVer(true)" v-if="isDown">
                            {{ $t("set.but_4") }}(<span>{{ VerTips }}</span>)
                        </div>
                        <div class="w-100 text-grey-1 text-center">
                            Version:{{ ver }}
                        </div>
                    </div>
                    <div class="mb-1"></div>
                    <el-dialog v-model="reSet" :title="$t('set.but_2')">
                        <span>{{ $t("set.title_1") }}</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button @click="setToFactory()">{{ $t("set.but_5") }}</el-button>
                                <el-button type="primary" @click="reSet = false">{{ $t("set.but_6") }}</el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
                <div class="m-5 d-flex ai-center flex-column">
                    <div class="m-4">{{ $t("set.mode_title") }}</div>
                    <div>
                        <el-slider style="width: 360px" v-model="mode" :min="0" :max="3"
                            :format-tooltip="formatModeValue" @change="useLight.DebounceChanged(mode)" />
                    </div>
                    <div class="m-4">{{ $t(modeStr) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { uselightStore } from "@/stores/lightStore";
import { useSetStore } from "../../stores/setStore";
import { useKeyStore } from "../../stores/keyStore";
import { useLocaleStore } from "../../stores/locale";
import { storeToRefs } from "pinia";

import { useI18n } from 'vue-i18n';
import axios from 'axios'
import { ConnectionType } from '@/keyboard/enum'
import { keyboard } from '@/keyboard/keyboard'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

// 解构出t方法
const { t } = useI18n();
const useLight = uselightStore();
const useLocale = useLocaleStore();
const { locale } = storeToRefs(useLocale);
const setStore = useSetStore();
const { langList } = storeToRefs(setStore);
const useKey = useKeyStore();

const reSet = ref(false);
const mode = ref(100);
const ver = ref(keyboard.state.fwVersion);
const version = ref(keyboard.state.fwVersion)
const url = ref()
const isLayer = ref(false);

const modeStr = computed(() => (mode.value >= 2 ? "set.mode_work" : "set.mode_game"))
const isDown = computed(() => (useLight.connectType == ConnectionType.USB))
const VerTips = computed(() => (ver.value !== version.value ? t('set.title_3') + ':' + version.value : t('set.title_2')))

const getVer = () => {
    if (useLight.connectType !== ConnectionType.USB)
        return
    axios.get('/down/work/RKWEB/firmware/R87PRO/firmware.json').then(response => {
        // 请求成功处理
        version.value = response.data.version
        url.value = response.data.url
        checkVer()
    }).catch(error => {
        // 请求失败处理   
        console.error(error);
    });
}
const checkVer = (flag: boolean = false) => {
    if (ver.value !== version.value) {
        ElMessageBox.alert(`${t('set.title_3')}:${version.value}`, t('set.but_4'), {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') {
                    updateVer();
                }
            },
        })
    }
    else if (flag == true) {
        ElMessage({
            type: 'info',
            message: t("set.title_2"),
        })
    }
}
const updateVer = () => {
    ElMessage({
        type: 'info',
        message: t("set.title_4"),
    })
    window.open(url.value, '_blank')// 新窗口打开外连接
}

const formatModeValue = (val: number) => {
    if (val >= 2)
        return t("set.mode_work");
    else
        return t("set.mode_game");
}
onMounted(async () => {
    await useLight.init();
    getVer()
    isLayer.value = useLight.state.layer > 0
});

onBeforeUnmount(() => {
    useLight.destroy();
});

const LayerChanged = () => {
    if (!isLayer.value) {
        useLight.setLayer(0)
    }
}

const setToFactory = () => {
    useKey.setToFactory();
    reSet.value = false;
}
</script>
<style lang="scss" scoped>
:deep {
    .el-checkbox {
        width: 100%;
        --el-checkbox-checked-text-color: #4743A7;
        --el-checkbox-text-color: #4743A7;
        --el-checkbox-checked-bg-color: #4743A7;
        --el-checkbox-checked-input-border-color: #ffffff;
        --el-checkbox-input-border-color-hover: #ffffff;
        --el-checkbox-checked-icon-color: transparent;
    }

    .el-checkbox__inner {
        background-color: transparent;
        width: 18px;
        height: 18px;
    }
}

.but:hover {
    background-color: #4743A7;
    color: #ffffff
}
</style>