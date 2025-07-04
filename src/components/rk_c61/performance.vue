<template>
    <div class="d-flex w-100">
        <div style="width: 160px; height: 100vh;" class="bg-grey">
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
                    style="width: 55%;height: 30vh;border-radius: 0px 0px 0px 10px;">
                    <el-scrollbar style="width: 100%;" class="d-flex ai-center jc-center mr-3">
                        <div v-if="usePerformance.state.menuid == 1">
                            <div class="m-3">
                                <div class="fw-b m-3">
                                    全局触发
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 158, 0);">
                                    </div>
                                    <div>设置全局触发行程，非单键触发和RT触发的按键生效，行程不会在按键上显示。</div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="travelStep" :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.globalTouchTravel"
                                        @change="usePerformance.globalTouchTravelChange" />
                                    <el-input-number v-model="performanceData.globalTouchTravel" :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace"
                                        @change="usePerformance.globalTouchTravelChange"
                                        class="ml-3" />
                                </div>
                            </div>

                            <div class="m-3">
                                <div class="fw-b m-3">
                                    单键触发（选中按键）
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    设置单键触发行程，按键左上角显示绿色行程值为已设置。
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="travelStep" :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.singleTouchTravel" 
                                        :disabled="isDisabel"
                                        @change="usePerformance.singleTouchTravelChange" />
                                    <el-input-number v-model="performanceData.singleTouchTravel" :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace"
                                        :disabled="isDisabel"
                                        @change="usePerformance.singleTouchTravelChange"
                                        class="ml-3" />
                                </div>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 2">
                            <div class="m-3">
                                <div class="fw-b m-3">
                                    首次触发行程（选中的按键生效）
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 158, 0);">
                                    </div>
                                    <div>设置首次触发行程，按键左上角显示绿色行程值为已设置。</div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="travelStep" :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.singleTouchTravel"
                                        :disabled="isDisabel"
                                        @change="usePerformance.RTFirstTouchTravelChange"/>
                                    <el-input-number v-model="performanceData.singleTouchTravel" :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData?.decimalPlace"
                                        :disabled="isDisabel"
                                        @change="usePerformance.RTFirstTouchTravelChange"
                                        class="ml-3" />
                                </div>
                            </div>

                            <div class="m-3">
                                <div class="fw-b m-3">
                                    动态触发行程(按下)
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(0, 125, 224);">
                                    </div>
                                    <div>设置RT触发行程，按键左下角显示蓝色行程值为已设置。</div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="travelStep" :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.quickTouchPress"
                                        :disabled="isDisabel" 
                                        @change="usePerformance.quickTouchPressTravelChange" />
                                    <el-input-number v-model="performanceData.quickTouchPress" :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData.decimalPlace"
                                        :disabled="isDisabel"
                                        @change="usePerformance.quickTouchPressTravelChange"
                                        class="ml-3" />
                                </div>
                            </div>
                            <div class="m-3">
                                <div class="fw-b m-3">
                                    动态重置行程(抬起)
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div
                                        style="width: 5px; height: 16px; border-radius: 2px; background-color: rgb(255, 115, 0);">
                                    </div>
                                    <div>
                                        设置RT重置行程，按键右下角显示橙红色行程值为已设置。
                                    </div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="travelStep" :max="performanceData.maxTouchTravel" :min="performanceData.minTouchTravel"
                                        v-model="performanceData.quickTouchRelease"
                                        :disabled="isDisabel"
                                        @change="usePerformance.quickTouchReleaseTravelChange"/>
                                    <el-input-number v-model="performanceData.quickTouchRelease" :min="performanceData.minTouchTravel" :max="performanceData.maxTouchTravel"
                                        :precision="performanceData.decimalPlace"
                                        :disabled="isDisabel"
                                        @change="usePerformance.quickTouchReleaseTravelChange"
                                        class="ml-3" />
                                </div>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 3">
                            <div class="m-3" style="border-bottom: 1px solid #6A6A77;">
                                <div class="fw-b m-3">
                                    死区设置
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div>死区设置为全局设置，为防止误触或断触，推荐将死区设置为 0.2mm</div>
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div>顶部按下</div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="0.01" :max="1.00" :min="pressDeadMin"
                                        v-model="performanceData.pressDead"
                                        :disabled="isDisabel"/>
                                    <el-input-number v-model="performanceData.pressDead" :min="pressDeadMin" :max="1.00"
                                        :precision="2"
                                        :disabled="isDisabel"
                                        class="ml-3" />
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <div>底部抬起</div>
                                </div>
                                <div class="m-3 d-flex">
                                    <el-slider style="width: 280px" :step="0.01" :max="1.00" :min="pressDeadMin"
                                        v-model="performanceData.releaseDead"
                                        :disabled="isDisabel"/>
                                    <el-input-number v-model="performanceData.releaseDead" :min="pressDeadMin" :max="1.00"
                                        :precision="2"
                                        :disabled="isDisabel"
                                        class="ml-3" />
                                </div>
                            </div>

                            <div class="m-3">
                                <div class="fw-b m-3">
                                    回报率
                                </div>
                                <div class="d-flex fs-lg m-3">
                                    <el-select v-model="performanceData.rateOfReturn" placeholder="Select">
                                        <el-option v-for="item in usePerformance.state.rewardList" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="usePerformance.state.menuid == 4">
                            <div class="m-3">
                                <div class="fw-b m-3">
                                    校准说明
                                </div>
                                <div class="d-flex fs-lg">
                                    <div>校准时请用正常力度按下按键。注意：快速的按下并抬起按键会导致校准的结果不准确。</div>
                                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                                        开始校准
                                    </div>
                                </div>
                                <div ref="chart" class="chart-container"></div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="d-flex flex-column bg-box jc-center m-2"
                    style="width: 30%;height: 30vh; border-radius: 0px 0px 0px 10px;">
                    <el-scrollbar>
                        <div class="d-flex ai-center jc-between m-3">
                            <div class="fw-b m-3">
                                行程测试
                            </div>
                            <div>
                                <el-switch v-model="usePerformance.state.tripTest" inline-prompt size="large" />
                            </div>
                        </div>
                        <div class="d-flex jc-center">
                            <div class="vertical-progress" :style="maxTravelHeight">
                                <div class="travel-progress" :style="testStyle"></div>
                            </div>
                            <div class="d-flex ml-3" style="height: 190px;"><img src="@/assets/images/kedu-C61.png">
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="d-flex flex-column ai-center flex-1">
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but" @click="useKey.selected()">
                        全选
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                        WASD
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                        数字键
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but">
                        字母键
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but" @click="useKey.unSelected()">
                        取消选中
                    </div>
                    <div class="p-2 m-2 bg-warn-1 text-grey-1 text-center br-2 b-grey c-p but" @click="usePerformance.resetToGlobalTravel()">
                        重置行程
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

const chart = ref(null);
const usePerformance = usePerformanceStore();
const useKey = useKeyStore();
const count = ref(0);
const travelStep = ref(0.001);
const pressDeadMin = ref(0.0);

const {adjustingCount, state, performanceData } = storeToRefs(usePerformance);

let chartInstance: any = null;
let data: any = [];
const maxCount = 400;

const isDisabel = ref(false);

onMounted(async () => {
    usePerformance.init();
    if (performanceData.value != undefined) {
        travelStep.value = 1 / (10 ** performanceData.value.decimalPlace);
    }
});

watch(useKey.state.keyState, async () => {
    isDisabel.value = !useKey.isAnyKeyChecked();
})

watch(adjustingCount, async () => {
    if (count.value > maxCount) {
        option.xAxis.max = count.value;
        option.xAxis.min = count.value - maxCount;
    }
    count.value++;
    data.push([count.value, adjustingCount.value.toFixed(2)]);
    option.series[0].data = data;
    if (option.series[0].data.length > maxCount) {
        option.series[0].data.shift();
    }
    if (chartInstance) {
        chartInstance.setOption(option);
    }
})

const option = reactive({
    title: {
        text: '实时行程',
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
            name: '实时行程',
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
});

const maxTravelHeight = computed(() => {
    const testHeight = (usePerformance.state.maxTouchTravel / 4.0) * 190;
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

</script>
<style scoped lang="scss">
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