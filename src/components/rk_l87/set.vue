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
                        <el-checkbox-group v-model="layerVal" @change="LayerChanged">
                            <el-checkbox :label="$t('set.layer_1')" style="width: 100%;">
                                {{ $t('set.layer_1') }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="m-4 px-3" v-if="isLayer">
                        <el-slider style="width: 360px" v-model="layer" :min="1" :max="127"
                            @change="useLight.setLayer(layer)" />
                    </div>
                    <div class="m-4 d-flex flex-column">
                        <!-- <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                            {{ $t("set.but_1") }}
                        </div>-->
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but" @click="reSet = true">
                            {{ $t("set.but_2") }}
                        </div>
                        <!-- <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                            {{ $t("set.but_3") }}
                        </div> -->
                        <div class="py-3 my-3 w-100 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                            @click="updateVer" v-if="isDown">
                            {{ $t("set.but_4") }}  cur:{{ ver }}
                        </div>
                    </div>
                    <div class="mb-5"></div>
                    <el-dialog v-model="reSet" title="重置键盘">
                        <span>恢复出厂设置将清除所有数据，是否继续？</span>
                        <template #footer>
                            <div class="d-flex jc-center">
                                <el-button @click="setToFactory()">是</el-button>
                                <el-button type="primary" @click="reSet = false">否</el-button>
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
// 解构出t方法
const { t } = useI18n();

const rk_l87 = ref<RK_L87>();

const useLight = uselightStore();
const useLocale = useLocaleStore();
const { locale } = storeToRefs(useLocale);
const setStore = useSetStore();
const { langList } = storeToRefs(setStore);
const useKey = useKeyStore();

const reSet = ref(false);
const mode = ref(100);
const layer = ref(0);
const layerVal = ref([]);
const ver = ref(keyboard.state.fwVersion);

const modeStr = computed(() => (mode.value >= 2 ? "set.mode_work" : "set.mode_game"))
const isLayer = computed(() => (layerVal.value.find(value => value == t('set.layer_1'))))
const isDown = computed(() => (useLight.connectType == ConnectionType.USB))

const updateVer = () => {
    axios.get('/down/work/RKWEB/firmware/R87PRO/firmware.json').then(response => {
        // 请求成功处理
        window.open(response.data.url, '_blank')// 新窗口打开外连接
    }).catch(error => {
        // 请求失败处理   
        console.error(error);
    });
}

const formatModeValue = (val: number) => {
    if (val >= 2)
        return t("set.mode_work");
    else
        return t("set.mode_game");
}
onMounted(async () => {
    await useLight.init();
    if (rk_l87.value == undefined) {
        rk_l87.value = (keyboard.protocol as RK_L87);
    }
});

onBeforeUnmount(() => {
    useLight.destroy();
});

const LayerChanged = () => {
    if (!isLayer) {
        useLight.setLayer(0)
    }
}

const setToFactory = () => {
    if (rk_l87.value != undefined) {
        keyboard.loadDefaultValue(keyboard.state.keyTableData, keyboard.state.lightInfo);
        useKey.refreshKeyMatrixData();
        rk_l87.value.setFactory();
    }

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