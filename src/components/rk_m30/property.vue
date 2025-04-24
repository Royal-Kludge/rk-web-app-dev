<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 m-4">
        <div class="d-flex flex-column flex-1">
            <!--
            <div class="flex-1 bg-white-1 p-3 m-4" style="border-radius: 10px 10px 10px 10px;line-height: 30px;">
                <div class="fw-b fs-xxl pb-2" style="border-bottom: 1px solid #E7EAF2;">
                    {{ $t("property.title_1") }}
                </div>
                <div class="my-3">
                    {{ $t("property.tip_1") }}
                </div>
                <div class="my-3">
                    <el-radio-group v-model="state.lodVal" text-color="#00ffff" fill="#ffff00">
                        <el-radio v-for="item in state.lodList" :value="item.value" :label="item.value" class="mx-5"
                            @change="useProperty.setLodHeight(state.lodVal)">
                            {{ $t(item.label) }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="flex-1 bg-white-1 p-3 m-4" style="border-radius: 10px 10px 10px 10px;line-height: 30px;">
                <div class="fw-b fs-xxl pb-2" style="border-bottom: 1px solid #E7EAF2;">
                    {{ $t("property.title_4") }}
                </div>
                <div class="my-3"> </div>
                <div class="my-3 text-center">
                    <el-radio-group v-model="state.sleepTime" @change="useProperty.setSleepTime(state.sleepTime)">
                        <el-radio-button v-for="item in state.sleepList" :value="item.value" :label="item.value">
                            {{ $t(item.label) }}
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            -->
            <div class="flex-1 bg-white-1 p-3 m-4" style="border-radius: 10px 10px 10px 10px;line-height: 30px;">
                <div class="mb-4" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="fw-b fs-xxl">
                        {{ $t("property.label_1") }}
                    </div>
                    <div class="d-flex jc-between ai-center my-3">
                        <div> {{ $t("property.tip_2") }}</div>
                        <div class="ml-3"><el-switch v-model="state.rippleEnable" inline-prompt size="large"
                                @change="useProperty.setRippleEnable" /></div>
                    </div>
                </div>
                <div class="mb-4" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="fw-b fs-xxl">
                        {{ $t("property.label_2") }}
                    </div>
                    <div class="d-flex jc-between ai-center my-3">
                        <div> {{ $t("property.tip_3") }}</div>
                        <div class="ml-3"><el-switch v-model="state.angleSnaping" inline-prompt size="large"
                                @change="useProperty.setAngleSnaping" /></div>
                    </div>
                </div>
                <!--
                <div class="mb-4" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="fw-b fs-xxl">
                        {{ $t("property.label_3") }}
                    </div>
                    <div class="d-flex jc-between ai-center my-3">
                        <div> {{ $t("property.tip_4") }}</div>
                        <div class="ml-3"><el-switch v-model="state.motionSync" inline-prompt size="large"
                                @change="useProperty.setMotionSync" /></div>
                    </div>
                </div>
                -->
                <!--
                <div>
                    <div class="fw-b fs-xxl">
                        {{ $t("property.label_4") }}
                    </div>
                    <div class="d-flex jc-between ai-center my-3">
                        <div></div>
                        <div class="ml-3"><el-switch v-model="state.glassMode" inline-prompt size="large"
                                @change="useProperty.setGlassMode" /></div>
                    </div>
                </div>
                -->
            </div>
            <div class="flex-1 bg-white-1 p-3 m-4" style="border-radius: 10px 10px 10px 10px;line-height: 30px;">
                <div class="fw-b fs-xxl pb-2" style="border-bottom: 1px solid #E7EAF2;">
                    {{ $t("property.title_5") }}
                </div>
                <div class="my-3"> </div>
                <div class="my-3 text-center">
                    <el-input-number style="width: 150px" v-model="state.debounceTime" type="number" :min="1" max="99"
                        @change="useProperty.setDebounceTime(state.debounceTime)" /> ms
                </div>
            </div>
        </div>
        <!--
        <div class="d-flex flex-column flex-1">
            <div class="flex-1 bg-white-1 p-3 m-4" style="border-radius: 10px 10px 10px 10px;line-height: 30px;">
                <div class="fw-b fs-xxl pb-2" style="border-bottom: 1px solid #E7EAF2;">
                    {{ $t("property.title_3") }}
                </div>
                <div class="my-3">
                    <div>{{ $t("property.tip_5") }}</div>
                    <div>{{ $t("property.tip_6") }}</div>
                </div>
                <div class="my-3">
                    <el-radio-group v-model="state.sensorMode" text-color="#00ffff" fill="#ffff00"
                        @change="useProperty.setSensorMode(state.sensorMode)">
                        <el-radio v-for="item in state.modeList" :value="item.value" :label="item.value" class="mx-5">
                            {{ $t(item.label) }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        -->
        <!-- <div class="d-flex flex-column flex-1 mx-4 my-4">
            <div class="bg-white p-2 fw-b" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t("property.title") }}
            </div>
            <div class="flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px">
                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b fs-xxl">{{ $t("property.title_1") }}</span>
                        <el-popover placement="right" :width="300"
                            popper-style="background: #282828;--el-bg-color-overlay:#282828;color:#ffffff">
                            <template #reference>
                                <img :src="`../../src/assets/images/help.png`" class="img-title" />
                            </template>
<template #default>
                                {{ $t("property.tip_1") }}
                            </template>
</el-popover>
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
    <span class="fw-b fs-xxl">{{ $t("property.title_2") }}</span>
    <el-popover placement="right" :width="300"
        popper-style="background: #282828;--el-bg-color-overlay:#282828;color:#ffffff">
        <template #reference>
                                <img :src="`../../src/assets/images/help.png`" class="img-title" />
                            </template>
        <template #default>
                                <div>
                                    <div>{{ $t("property.title_2") }}</div>
                                    <div class="my-3">
                                        <div>【{{ $t("property.label_1") }}】</div>
                                        <div>{{ $t("property.tip_2") }}</div>
                                    </div>
                                    <div class="my-3">
                                        <div>【{{ $t("property.label_2") }}】</div>
                                        <div>{{ $t("property.tip_3") }}</div>
                                    </div>
                                    <div class="my-3">
                                        <div>【{{ $t("property.label_3") }}】</div>
                                        <div>{{ $t("property.tip_4") }}</div>
                                    </div>
                                </div>
                            </template>
    </el-popover>
</div>
<div class="my-4">
    <div class="mx-5">
        <el-checkbox v-model="state.rippleEnable" :label="$t('property.label_1')"
            @change="useProperty.setRippleEnable" />
        <el-checkbox v-model="state.angleSnaping" :label="$t('property.label_2')"
            @change="useProperty.setAngleSnaping" />
        <el-checkbox v-model="state.motionSync" :label="$t('property.label_3')" @change="useProperty.setMotionSync" />
        <el-checkbox v-model="state.glassMode" :label="$t('property.label_4')" @change="useProperty.setGlassMode" />
    </div>
</div>
<div class="d-flex ai-center">
    <span class="fw-b fs-xxl">{{ $t("property.title_3") }}</span>
    <el-popover placement="right" :width="300"
        popper-style="background: #282828;--el-bg-color-overlay:#282828;color:#ffffff">
        <template #reference>
                                <img :src="`../../src/assets/images/help.png`" class="img-title" />
                            </template>
        <template #default>
                                <div>
                                    {{ $t("property.tip_5") }}
                                </div>
                                <div class="my-3">
                                    {{ $t("property.tip_6") }}
                                </div>
                            </template>
    </el-popover>
</div>
<div class="my-4">
    <el-radio-group v-model="state.sensorMode" text-color="#00ffff" fill="#ffff00"
        @change="useProperty.setSensorMode(state.sensorMode)">
        <el-radio v-for="item in state.modeList" :value="item.value" :label="item.value" class="mx-5">
            {{ $t(item.label) }}
        </el-radio>
    </el-radio-group>
</div>
</div>

<div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
    <div class="d-flex ai-center">
        <span class="fw-b mr-5 fs-xxl">{{ $t("property.title_4") }}</span>
        <el-select v-model="state.sleepTime" placeholder="Select" @change="useProperty.setSleepTime(state.sleepTime)">
            <el-option v-for="item in state.sleepList" :key="item.value" :label="$t(item.label)" :value="item.value" />
        </el-select>
    </div>
</div>
<div class="p-5">
    <div class="d-flex ai-center">
        <span class="fw-b mr-5 fs-xxl">{{ $t("property.title_5") }}</span>
    </div>
    <div class="my-4">
        <el-input-number style="width: 150px" v-model="state.debounceTime" type="number" :min="1" max="99"
            @change="useProperty.setDebounceTime(state.debounceTime)" /> ms
    </div>
</div>
</div>
</div> -->
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
    font-size: 18px;
}

.popper {
    width: 100px !important;
}
</style>

<script setup lang="ts">
import MainMeun from "./mainMenu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePropertyStore } from "@/stores/rk_m30/propertyStore";
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