<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 jc-center">
        <div class="d-flex flex-1 flex-column m-5">
            <div class="bg-white-1" style="border-radius: 10px">
                <div class="m-5">
                    <el-dialog v-model="state.isDefaultClause" width="500" center>
                        <span>
                            {{ $t("key.title_3") }}
                        </span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="useSpeed.setDpiDefault()">
                                    {{ $t("set.but_5") }}
                                </el-button>
                                <el-button type="primary" @click="state.isDefaultClause = false">
                                    {{ $t("set.but_6") }}
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>

                    <div class="d-flex ai-center">
                        <span class="fw-b">{{ $t("dpiKey.title_1") }}</span>
                        <el-popover placement="right" :width="300"
                            popper-style="background: #282828;--el-bg-color-overlay:#282828;color:#ffffff">
                            <template #reference>
                                <img :src="`../../src/assets/images/help.png`" class="img-title" />
                            </template>
                            <template #default>
                                {{ $t("dpiKey.tip_1") }}
                            </template>
                        </el-popover>
                    </div>
                    <div class="d-flex flex-column m-4">
                        <div class="d-flex ai-center jc-between">
                            <span class="fw-b text-white-2">{{ $t("dpiKey.title_2") }}
                                <el-select v-model="state.maxDpiLevel" placeholder="Select" style="width: 68px;"
                                    @change="useSpeed.setMaxDpiLevel(state.maxDpiLevel)">
                                    <el-option v-for="i in 6" :key="i" :label="i" :value="i" />
                                </el-select>
                            </span>
                            <span class="c-p" @click="state.isDefaultClause = true" v-if="false">
                                <img :src="`../../src/assets/images/refresh.png`" class="img-title" />
                            </span>
                        </div>
                        <div class="d-flex jc-between">
                            <div :class="[`d-flex flex-column ai-center m-4 c-p`, useSpeed.isSelected(item.id)]"
                                v-for="item in useSpeed.getDpiList()" @click="useSpeed.clickSpeed(item.id)">
                                <div class="px-5 py-2 br-2 m-3" :style="`background-color:${item.color}`">&nbsp;
                                </div>
                                <div class="text-white-2">{{ item.value }}</div>
                            </div>
                        </div>
                        <div class="d-flex text-white-2 dpi mt-5">
                            <div class="mx-4">50</div>
                            <el-slider v-model="state.dpiLevelValue" :min="50" :max="42000" show-stops :step="50"
                                tooltip-class="tooltip" @change="useSpeed.setDpiValue(state.dpiLevelValue)"></el-slider>
                            <div class="mx-4">42000</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex bg-white p-4 jc-center" style="border-radius: 0px 0px 10px 10px">
                    <div class="py-1 px-4 but-green text-white mx-3 c-p" @click="state.isDefaultClause = true">
                        {{ $t('dpiKey.default') }}
                    </div>
                </div>
            </div>

            <div class="bg-white-1 mt-5" style="border-radius: 10px">
                <div class="m-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">{{ $t("reportRateKey.title") }}</span>
                        <el-popover placement="right" :width="300"
                            popper-style="background: #282828;--el-bg-color-overlay:#282828;color:#ffffff">
                            <template #reference>
                                <img :src="`../../src/assets/images/help.png`" class="img-title" />
                            </template>
                            <template #default>
                                {{ $t("reportRateKey.tip_1") }}
                            </template>
                        </el-popover>
                    </div>
                    <div class="d-flex flex-column m-4">
                        <div class="d-flex text-white-2">
                            <el-radio-group v-model="state.reportRate" text-color="#00ffff" fill="#ffff00"
                                @change="useSpeed.setReportRate(state.reportRate)">
                                <el-radio v-for="item in state.reportRateList" :value="item.id" :label="item.id"
                                    class="mx-5">
                                    {{ item.value }}Hz
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.dpi) {
    .el-slider {
        --el-slider-height: 48px !important;
    }

    .el-slider__bar {
        background: linear-gradient(to right, #CBCBFE, #36379B) !important;
    }

    .el-slider__button {
        width: 0;
        height: 0 !important;
        background-color: transparent !important;
        border-left: 10px solid transparent !important;
        border-right: 10px solid transparent !important;
        border-bottom: 10px solid #36379B !important;
        position: absolute;
        top: 65px;
        border: none;
        left: 8px;
    }

    .el-slider__stop {
        background-color: #ffffff !important;
        height: 20px;
        width: 3px;
        border-radius: 3px;
        top: 15px;
    }

    .el-slider__runway {
        background-color: #EEF0F7 !important;
    }
}

.el-slider__stop {
    background-color: #ffffff !important;
}
</style>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useSpeedStore } from "@/stores/rk_m3/speedStore";
import MainMeun from "./mainMenu.vue";
import { storeToRefs } from 'pinia';
import { mouse, RK_MOUSE_EVENT_DEFINE } from '@/mouse/mouse'
import { RK_M3 } from "@/mouse/rk_m3/rk_m3";

const useSpeed = useSpeedStore();

const { state } = storeToRefs(useSpeed);

onMounted(async () => {
    mouse.addEventListener(RK_MOUSE_EVENT_DEFINE.OnDpiLevelChanged, dpiLevelChanged, false);
    await useSpeed.init();
});

onBeforeUnmount(() => {
    if (mouse != undefined) {
        mouse.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnDpiLevelChanged, dpiLevelChanged, false);
    }
});

const dpiLevelChanged = async (event: any) => {
    (mouse.protocol as RK_M3).data?.led?.setDpiLevel(event.detail as number, state.value.maxDpiLevel);
    useSpeed.refresh();
};
</script>