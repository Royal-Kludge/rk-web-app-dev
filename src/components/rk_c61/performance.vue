<template>
    <div class="d-flex w-100">
        <div style="width: 210px; height: 100vh;" class="bg-grey">
            <div style="height: 30vh">
                <el-scrollbar>
                    <div :class="[{ 'bg-white-1': item.id === usePerformance.state.menuid }, `${item.style}`]"
                        class="mx-4 br-2 my-2 text-center p-2 c-p" v-for="item in usePerformance.state.menuList"
                        @click="setMenuid(item.id)">
                        {{ $t(item.title) }}
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="d-flex flex-1 ml-3">
            <div style="height: 100vh;" class="bg-white w-100 d-flex">
                <div class="d-flex flex-column bg-box m-2"
                    style="width: 65%;height: 37vh;border-radius: 0px 0px 0px 10px;">
                    <el-scrollbar style="width: 100%; " class="d-flex ai-center jc-center">
                        <div v-if="usePerformance.state.menuid == 1">
                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_1") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 158, 0);">
                                    </div>
                                    <div>{{ $t("sparklink.performance.tips.tip_1") }}</div>
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="travelStep"
                                        :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.globalTouchTravel"
                                        @change="usePerformance.globalTouchTravelChange" />
                                    <el-input-number v-model="performanceData.globalTouchTravel"
                                        :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace"
                                        @change="usePerformance.globalTouchTravelChange" class="ml-3" />
                                </div>
                            </div>

                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_2") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    {{ $t("sparklink.performance.tips.tip_2") }}
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="travelStep"
                                        :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.singleTouchTravel" :disabled="isDisabel"
                                        @change="singleTouchTravelChange" />
                                    <el-input-number v-model="performanceData.singleTouchTravel"
                                        :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace" :disabled="isDisabel"
                                        @change="singleTouchTravelChange" class="ml-3" />
                                </div>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 2">
                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_3") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 158, 0);">
                                    </div>
                                    <div>{{ $t("sparklink.performance.tips.tip_3") }}</div>
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="travelStep"
                                        :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.singleTouchTravel" :disabled="isDisabel"
                                        @change="RTFirstTouchTravelChange" />
                                    <el-input-number v-model="performanceData.singleTouchTravel"
                                        :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace" :disabled="isDisabel"
                                        @change="RTFirstTouchTravelChange" class="ml-3" />
                                </div>
                            </div>

                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_4") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 125, 224);">
                                    </div>
                                    <div>{{ $t("sparklink.performance.tips.tip_4") }}</div>
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="travelStep"
                                        :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.quickTouchPress" :disabled="isDisabel"
                                        @change="quickTouchPressTravelChange" />
                                    <el-input-number v-model="performanceData.quickTouchPress"
                                        :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData.decimalPlace" :disabled="isDisabel"
                                        @change="quickTouchPressTravelChange" class="ml-3" />
                                </div>
                            </div>
                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_5") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(255, 115, 0);">
                                    </div>
                                    <div>
                                        {{ $t("sparklink.performance.tips.tip_5") }}
                                    </div>
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="travelStep"
                                        :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.quickTouchRelease" :disabled="isDisabel"
                                        @change="quickTouchReleaseTravelChange" />
                                    <el-input-number v-model="performanceData.quickTouchRelease"
                                        :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData.decimalPlace" :disabled="isDisabel"
                                        @change="quickTouchReleaseTravelChange" class="ml-3" />
                                </div>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 3">
                            <div style="border-bottom: 1px solid #6A6A77;">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_6") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div>{{ $t("sparklink.performance.tips.tip_6") }}</div>
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div>{{ $t("sparklink.performance.tips.title_7") }}</div>
                                </div>
                                <div class="m-2 d-flex ml-3">
                                    <el-slider style="width: 450px" :step="0.01" :max="1.00" :min="pressDeadMin"
                                        v-model="performanceData.pressDead" :disabled="isDisabel"
                                        @change="deadPressChange" />
                                    <el-input-number v-model="performanceData.pressDead" :min="pressDeadMin" :max="1.00"
                                        :precision="2" :disabled="isDisabel" @change="deadPressChange" class="ml-3" />
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <div>{{ $t("sparklink.performance.tips.title_8") }}</div>
                                </div>
                                <div class="m-2 d-flex ml-3 mb-4">
                                    <el-slider style="width: 450px" :step="0.01" :max="1.00" :min="pressDeadMin"
                                        v-model="performanceData.releaseDead" :disabled="isDisabel"
                                        @change="deadReleaseChange" />
                                    <el-input-number v-model="performanceData.releaseDead" :min="pressDeadMin"
                                        :max="1.00" :precision="2" :disabled="isDisabel" @change="deadPressChange"
                                        class="ml-3" />
                                </div>
                            </div>

                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_9") }}
                                </div>
                                <div class="d-flex fs-lg m-2">
                                    <el-select v-model="performanceData.rateOfReturn" placeholder="Select"
                                        @change="dialogReportRate = true">
                                        <el-option v-for="item in usePerformance.state.rewardList" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                </div>

                                <el-dialog v-model="dialogReportRate" title="$t('sparklink.performance.tips.title_21')"
                                    width="500">
                                    <span>{{ $t("sparklink.performance.tips.tip_9") }}</span>
                                    <template #footer>
                                        <div class="dialog-footer">
                                            <el-button @click="dialogReportRate = false">
                                                {{ $t("set.cancel") }}
                                            </el-button>
                                            <el-button type="primary" @click="usePerformance.reportRateChange">
                                                {{ $t("set.confirm") }}
                                            </el-button>
                                        </div>
                                    </template>
                                </el-dialog>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 4">
                            <div class="m-2">
                                <div class="fw-b m-2">
                                    {{ $t("sparklink.performance.tips.title_10") }}
                                </div>
                                <div class="d-flex fs-lg">
                                    <div>{{ $t("sparklink.performance.tips.tip_10") }}</div>
                                    <div v-if="!isAdjusting"
                                        class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                                        @click="isAdjusting = true">
                                        {{ isSaving ? t("sparklink.performance.tips.title_11") :
                                            t("sparklink.performance.tips.title_12")
                                        }}</div>
                                    <div v-if="isAdjusting"
                                        class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                                        @click="isAdjusting = false">
                                        {{ $t("sparklink.performance.tips.title_13") }}
                                    </div>
                                </div>
                                <div ref="chart" class="chart-container"></div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="d-flex flex-column bg-box jc-center m-2"
                    style="width: 20%;height: 37vh; border-radius: 0px 0px 0px 10px;" v-loading="loading"
                    element-loading-background="rgba(122, 122, 122, 0.8)">
                    <el-scrollbar>
                        <div class="d-flex ai-center jc-between m-2 mx-4">
                            <div class="fw-b">
                                {{ $t("sparklink.performance.tips.title_14") }}
                            </div>
                            <div>
                                <el-switch v-model="performanceData.travelTestOn" inline-prompt size="large"
                                    @change="changePressTestSwitch" />
                            </div>
                        </div>
                        <div class="d-flex jc-center">
                            <div class="vertical-progress" :style="maxTravelHeight">
                                <div class="travel-progress" :style="testStyle"></div>
                            </div>
                            <div class="d-flex ml-3 mb-3" style="height: 190px;"><img
                                    src="@/assets/images/kedu-C61.png">
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="d-flex flex-column ai-center flex-1">
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="useKey.selected()">
                        {{ $t("sparklink.performance.tips.title_15") }}
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="useKey.selectWASD()">
                        {{ $t("sparklink.performance.tips.title_16") }}
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="useKey.selectDIGIT()">
                        {{ $t("sparklink.performance.tips.title_17") }}
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="useKey.selectLETTER()">
                        {{ $t("sparklink.performance.tips.title_18") }}
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="useKey.unSelected()">
                        {{ $t("sparklink.performance.tips.title_19") }}
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but"
                        @click="resetToGlobalTravel()">
                        {{ $t("sparklink.performance.tips.title_20") }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { usePerformanceStore } from "@/stores/rk_c61/performanceStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { computed, ref, reactive, onMounted, nextTick, onBeforeUnmount, watch } from "vue";
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { keyboard } from "@/keyboard/sparklink/keyboard";
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import type { KeyState } from "@/keyboard/sparklink/interface";
import { LOG_TYPE, Logging } from "@/common/logging";
import tool from "@/keyboard/sparklink/tool";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const rk_c61 = ref<RK_C61>();

const chart = ref(null);
const usePerformance = usePerformanceStore();
const useKey = useKeyStore();
const count = ref(0);
const travelStep = ref(0.001);
const pressDeadMin = ref(0.0);
const isSaving = ref(false);
const dialogReportRate = ref(false);

const { adjustingCount, keyPressTestCount, state, travelTestOn, isAdjusting, performanceData } = storeToRefs(usePerformance);

let chartInstance: any = null;
let data: any = [];

const isDisabel = ref(false);

onMounted(async () => {
    if (rk_c61.value == undefined) {
        rk_c61.value = keyboard.protocol as RK_C61;
        rk_c61.value.addEventListener("OnAdjustingMMDataGotten", onAdjustingMMDataGotten);
        rk_c61.value.addEventListener("OnAdjustingAdcDataGotten", onAdjustingAdcDataGotten);
        rk_c61.value.addEventListener("OnAdjustingAdcValueUpdate", onAdjustingAdcValueUpdate);
    }

    usePerformance.init();
    if (performanceData.value != undefined) {
        travelStep.value = 1 / (10 ** performanceData.value.decimalPlace);
    }
});

onBeforeUnmount(() => {
    if (rk_c61.value != undefined) {
        rk_c61.value.removeEventListener("OnAdjustingMMDataGotten", onAdjustingMMDataGotten);
        rk_c61.value.removeEventListener("OnAdjustingAdcDataGotten", onAdjustingAdcDataGotten);
        rk_c61.value.removeEventListener("OnAdjustingAdcValueUpdate", onAdjustingAdcValueUpdate);
        rk_c61.value = undefined;
    }

    usePerformance.destroy();
});

const loading = computed(() => (usePerformance.state.menuid == 4 ? true : false))

watch(useKey.state.keyState, async () => {
    isDisabel.value = !useKey.isAnyKeyChecked();
})

watch(travelTestOn, async () => {
    performanceData.value.travelTestOn = travelTestOn.value;
    if (travelTestOn.value) {
        performanceData.value.keyPressTestCount = 0;
        keyPressTestCount.value = performanceData.value.keyPressTestCount;
    }
})

watch(keyPressTestCount, async () => {
    if (!travelTestOn.value) return;

    if (rk_c61.value != undefined) {
        await rk_c61.value.getAdustingData(0x03, 0);
        await rk_c61.value.getAdustingData(0x02, 1);

        const value = rk_c61.value.data.keyInfoData.getMaxPressTravel();
        state.value.maxMM = value.max;
        state.value.pressStatus = value.press;
    }
})

watch(isAdjusting, async () => {
    try {
        if (isAdjusting.value) {
            usePerformance.resetAdjustingData();
            count.value = 0;
            data = [];
            option.xAxis.min = 0;
            option.xAxis.max = 400;
            if (chartInstance) {
                chartInstance.setOption(option);
            }

            if (travelTestOn.value) {
                travelTestOn.value = false;
                performanceData.value.travelTestOn = travelTestOn.value;
            }

            if (rk_c61.value != undefined) {
                await rk_c61.value.setAdjustingOn();
            }

            performanceData.value.adjustingCount = 0;
            adjustingCount.value = performanceData.value.adjustingCount;
        } else {
            isSaving.value = true;
            if (rk_c61.value != undefined) {
                await rk_c61.value.setAdjustingOff();
            }

            setTimeout(() => {
                isSaving.value = false;
            }, 500);

            adjustingCount.value = -1;
        }
    } catch (error: any) {
        Logging.console(LOG_TYPE.ERROR, error);
        isAdjusting.value = false;
        isSaving.value = false;
    }

    performanceData.value.isAdjusting = isAdjusting.value;
})

watch(adjustingCount, async () => {
    if (!isAdjusting.value) return;

    if (rk_c61.value != undefined) {
        const value = rk_c61.value.data.keyInfoData.getMaxPressTravel();
        let mmBuff = 0;
        if (tool.isFeatureSupported('signalSwitch', rk_c61.value.data.protocolVersion)) {
            mmBuff = value.max;
        } else {
            mmBuff = performanceData.value.maxTouchTravel - value.max;
        }

        const maxCount = 400;
        if (count.value > maxCount) {
            option.xAxis.max = count.value;
            option.xAxis.min = count.value - maxCount;
        }
        count.value++;
        data.push([count.value, mmBuff]);
        option.series[0].data = data;
        if (option.series[0].data.length > maxCount) {
            option.series[0].data.shift();
        }
        if (chartInstance) {
            chartInstance.setOption(option);
        }

        await rk_c61.value.getAdustingData(0x02, 1);
        await rk_c61.value.getAdustingData(0x06, 1);
    }
})

const option = reactive({
    title: {
        text: "",//t("sparklink.performance.tips.title_22"),
        textStyle: {
            fontSize: 16,
            fontWeight: 500,
            color: '#2c3e50',
        },
        left: 'center',
    },
    grid: {
        top: 15,
        left: 0,
        right: 0,
        bottom: 15,
        containLabel: true,
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: {
            color: '#1e293b',
        },
        formatter: '{b}ms: {c}mm',
    },
    xAxis: {
        type: 'value',
        min: 0,
        max: 400,
        axisLabel: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: '#e2e8f0',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#f1f5f9',
            },
        },
    },
    yAxis: {
        type: 'value',
        min: -0.5,
        max: 4.5,
        interval: 1,
        axisLabel: {
            formatter: '{value}mm',
            color: '#64748b',
        },
        axisLine: {
            lineStyle: {
                color: '#e2e8f0',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#f1f5f9',
            },
        },
    },
    series: [
        {
            name: "",//t("sparklink.performance.tips.title_22"),
            type: 'line',
            showSymbol: false,
            data: data,
            lineStyle: {
                width: 2,
                color: '#3b82f6',
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(59, 130, 246, 0.2)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(59, 130, 246, 0)',
                        },
                    ],
                },
            },
        },
    ],
});

const setMenuid = async (id: number) => {
    usePerformance.setMenuid(id)

    if (id == 4 && travelTestOn.value) {
        travelTestOn.value = false;
    } else if (id != 4 && isAdjusting.value) {
        isAdjusting.value = false;
    }

    if (id === 4) {
        // 添加一个小延时确保 DOM 完全渲染
        await nextTick();
        // 如果还是有问题，可以使用 setTimeout    
        setTimeout(() => {
            if (chart.value) {
                chartInstance = echarts.init(chart.value);
                chartInstance.setOption(option);
            }
        }, 0);
    }
};

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }

    if (rk_c61.value != undefined) {
        rk_c61.value.removeEventListener("OnAdjustingMMDataGotten", onAdjustingMMDataGotten);
        rk_c61.value.removeEventListener("OnAdjustingAdcDataGotten", onAdjustingAdcDataGotten);
        rk_c61.value = undefined;
    }
});

const maxTravelHeight = computed(() => {
    const testHeight = (performanceData.value.maxTouchTravel / 4.0) * 190;
    return { height: `${testHeight}px`, };
});

const testStyle = computed(() => {
    let r = 165;
    let g = 213;
    let b = 250;

    if (usePerformance.state.pressStatus > 0 && usePerformance.state.pressStatus < 8) {
        r = 33;
        g = 150;
        b = 243;
    }
    const testHeight = (usePerformance.state.maxMM / 4.0) * 190;
    return {
        height: `${testHeight}px`,
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
    };
});

const changePressTestSwitch = (value: boolean) => {
    travelTestOn.value = value;
    if (!travelTestOn.value) keyPressTestCount.value = -1;
};

const onAdjustingMMDataGotten = (event: any) => {
    keyPressTestCount.value = event.detail;
}

const onAdjustingAdcDataGotten = (event: any) => {
    adjustingCount.value = event.detail;
}

const onAdjustingAdcValueUpdate = (event: any) => {
    let index = event.detail.row * 21 + event.detail.col;
    let key = useKey.state.keyState[index] as KeyState;
    if (key.keyData != undefined && key.keyData.keyInfo != null) {
        key.keyData.keyInfo.adjustingADC = event.detail.value;
    }
}

const singleTouchTravelChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.isSingleTouch = true;
            key.keyData.keyInfo.touchTravel = value;
        }
    }

    usePerformance.singleTouchTravelChange(value);
};

const RTFirstTouchTravelChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.isSingleTouch = true;
            key.keyData.keyInfo.touchTravel = value;
        }
    }

    usePerformance.RTFirstTouchTravelChange(value);
};

const quickTouchPressTravelChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.isQuickTouch = true;
            key.keyData.keyInfo.quickTouchPress = value;
        }
    }

    usePerformance.quickTouchPressTravelChange(value);
};

const quickTouchReleaseTravelChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.isQuickTouch = true;
            key.keyData.keyInfo.quickTouchRelease = value;
        }
    }

    usePerformance.quickTouchReleaseTravelChange(value);
};

const deadPressChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.deadPress = value;
        }
    }

    usePerformance.deadPressChange(value);
};

const deadReleaseChange = (value: number) => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.deadRelease = value;
        }
    }

    usePerformance.deadReleaseChange(value);
};

const resetToGlobalTravel = () => {
    for (let i = 0; i < useKey.state.keyState.length; i++) {
        let key = useKey.state.keyState[i] as KeyState;
        if (key.keyData != undefined && key.keyData.keyInfo != null && key.keyData.keyInfo.isCheck) {
            key.keyData.keyInfo.isSingleTouch = false;
            key.keyData.keyInfo.isQuickTouch = false;
        }
    }

    usePerformance.resetToGlobalTravel();
};

</script>
<style scoped lang="scss">
:deep(.el-loading-spinner) {
    display: none;
}

.chart-container {
    height: 180px;
    min-height: auto;
    flex: 1;
}

.but {
    min-width: 90px;
}

.but:hover {
    background-color: #4743A7;
    color: #ffffff
}

.vertical-progress {
    width: 32px;
    border-radius: 16px;
    background-color: #f1f5f9;
    box-shadow: inset 0 2px 4px #0000000d;
}

.travel-progress {
    width: 32px;
    border-radius: 16px;
    background: rgb(var(--v-theme-primary));
    box-shadow: 0 2px 4px rgba(var(--v-theme-primary), .2);
}
</style>