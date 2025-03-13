<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1">
        <div class="d-flex flex-column flex-1 mx-4 my-4">
            <div class="bg-white p-2 fw-b" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                系统功能设置
            </div>
            <div class="flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px">
                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b">鼠标LOD高度</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-radio-group v-model="state.lodVal" text-color="#00ffff" fill="#ffff00">
                            <el-radio v-for="item in state.lodList" :value="item.value" :label="item.value" class="mx-5"
                                @change="useProperty.setLodHeight(state.lodVal)">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>

                    <div class="d-flex ai-center">
                        <span class="fw-b">Sensor 画线性能</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <div class="mx-5">
                            <el-checkbox v-model="state.rippleEnable" label="波纹控制"
                                @change="useProperty.setRippleEnable" />
                            <el-checkbox v-model="state.angleSnaping" label="直线修正"
                                @change="useProperty.setAngleSnaping" />
                            <el-checkbox v-model="state.motionSync" label="Motion sync"
                                @change="useProperty.setMotionSync" />
                            <el-checkbox v-model="state.glassMode" label="玻璃模式" @change="useProperty.setGlassMode" />
                        </div>
                    </div>
                    <div class="d-flex ai-center">
                        <span class="fw-b">传感器模式</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-radio-group v-model="state.sensorMode" text-color="#00ffff" fill="#ffff00"
                            @change="useProperty.setSensorMode(state.sensorMode)">
                            <el-radio v-for="item in state.modeList" :value="item.value" :label="item.value"
                                class="mx-5">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>

                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b mr-5">休眠时间</span>
                        <el-select v-model="state.sleepTime" placeholder="Select"
                            @change="useProperty.setSleepTime(state.sleepTime)">
                            <el-option v-for="item in state.sleepList" :key="item.value" :label="$t(item.label)"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
                <div class="p-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">按键去抖时间(毫秒)</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-input-number style="width: 150px" v-model="state.debounceTime" type="number" :min="1"
                            max="99" @change="useProperty.setDebounceTime(state.debounceTime)" />ms
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="d-flex flex-column flex-1 ml-4 my-4">
            <div class="bg-white p-2 fw-b" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                Windows系统设置
            </div>
            <div class="d-flex flex-column flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px">
                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b">鼠标移动速度</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="d-flex my-4">
                        <div class="mx-4">慢</div>
                        <el-slider v-model="state.moveSpeed" :min="1" :max="20"
                            @change="useProperty.setMoveSpeed(state.moveSpeed)"></el-slider>
                        <div class="mx-4">快</div>
                    </div>
                </div>

                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b">滚动速度</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4 d-flex">
                        <el-radio-group v-model="state.rollSpeed" text-color="#00ffff" fill="#ffff00"
                            @change="useProperty.setRollSpeed(state.rollSpeed)">
                            <el-radio v-for="item in state.rollList" :value="item.value" :label="item.value"
                                style="width: 100%;">
                                <div class="d-flex ai-center">
                                    <div>{{ $t(item.label) }}</div>
                                    <div class="ml-5" v-if="state.rollSpeed == 1 && item.value == 1">
                                        <el-input type="number" v-model="state.rollNumber" :min="1" max="99"
                                            style="width: 100px;" />
                                    </div>
                                </div>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>

                <div class="p-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">双击速度</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="d-flex my-4">
                        <div class="mx-4">慢</div>
                        <el-slider v-model="state.clickSpeed" :format-tooltip="formatSpeedValue" :min="200" :max="900"
                            show-stops :step="70" @change="useProperty.setClickSpeed(state.clickSpeed)"></el-slider>
                        <div class="mx-4">快</div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-radio__label) {
    font-size: 18px;
}

:deep(.el-checkbox__label) {
    font-size: 16px;
}
</style>

<script setup lang="ts">
import MainMeun from "./mainMenu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePropertyStore } from "@/stores/rk_m3/propertyStore";
import { storeToRefs } from "pinia";
const useProperty = usePropertyStore();
const { t } = useI18n();
const { state } = storeToRefs(useProperty);

onMounted(() => {
    useProperty.init();
});

const formatSpeedValue = (val: number) => {
    val = state.value.clickSpeedMax - val;
    return val;
};

</script>