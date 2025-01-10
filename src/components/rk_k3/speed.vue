<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 jc-center">
        <div class="d-flex flex-1 flex-column m-5">
            <div class="bg-white-1" style="border-radius: 10px">
                <div class="m-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">DPI调节</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="d-flex flex-column m-4">
                        <div class="d-flex ai-center">
                            <span class="fw-b text-white-2">DPI档位数</span>
                            <span class="br-2 bg-warn-1 px-3 m-3 b-white-2">4</span>
                            <img :src="`../../src/assets/images/refresh.png`" class="img-title" />
                        </div>
                        <div class="d-flex jc-between">
                            <div :class="[`d-flex flex-column ai-center m-4 c-p`, useSpeed.isSelected(item.id)]"
                                v-for="item in useSpeed.state.speedList" @click="useSpeed.clickSpeed(item.id)">
                                <div class="px-5 py-2 br-2 m-3" :style="`background-color:${item.color}`">&nbsp;
                                </div>
                                <div class="text-white-2">{{ item.text }}</div>
                            </div>
                        </div>
                        <div class="d-flex text-white-2 dpi mt-5">
                            <div class="mx-4">50</div>
                            <el-slider v-model="value" :min="500" :max="30000" show-stops :step="500"
                                tooltip-class="tooltip"></el-slider>
                            <div class="mx-4">30000</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex bg-white p-4 jc-center" style="border-radius: 0px 0px 10px 10px">
                    <div class="py-1 px-4 but-green text-white mx-3 c-p">
                        {{ $t('macro.but_7') }}
                    </div>
                </div>
            </div>

            <div class="bg-white-1 mt-5" style="border-radius: 10px">
                <div class="m-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">回报率</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="d-flex flex-column m-4">
                        <div class="d-flex text-white-2">
                            <el-slider v-model="report" :min="500" :max="8000" show-stops :step="500"
                                :marks="marks"></el-slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep {
    .dpi {
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
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useSpeedStore } from "@/stores/rk_k3/speedStore";
import MainMeun from "./mainMenu.vue";

const useSpeed = useSpeedStore();

const value = ref<number>(1000);
const report = ref<number>(1000);
const marks = reactive<Record<number, string>>({
    500: '500Hz',
    1000: '1000Hz',
    2000: '2000Hz',
    4000: '4000Hz',
    8000: '8000Hz',
})
</script>