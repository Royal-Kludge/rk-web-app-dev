<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1">
        <div class="d-flex flex-column flex-1 ml-4 my-4">
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
                        <el-radio-group v-model="lodVal" text-color="#00ffff" fill="#ffff00">
                            <el-radio v-for="item in state.lodList" :value="item.value" :label="$t(item.label)"
                                class="mx-5">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>

                    <div class="d-flex ai-center">
                        <span class="fw-b">Sensor 画线性能</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-radio-group v-model="sensorVal" text-color="#00ffff" fill="#ffff00">
                            <el-radio v-for="item in state.sensorList" :value="item.value" :label="$t(item.label)"
                                class="mx-5">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>

                    <div class="d-flex ai-center">
                        <span class="fw-b">传感器模式</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-radio-group v-model="sensorMode" text-color="#00ffff" fill="#ffff00">
                            <el-radio v-for="item in state.modeList" :value="item.value" :label="$t(item.label)"
                                class="mx-5">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>

                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b mr-5">休眠时间</span>
                        <el-input v-model="state.sleep" style="width: 50px;" />
                    </div>
                </div>
                <div class="p-5">
                    <div class="d-flex ai-center">
                        <span class="fw-b">按键去抖时间(毫秒)</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-input-number style="width: 150px" v-model="state.delay" type="number" />ms
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column flex-1 ml-4 my-4">
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
                        <el-slider v-model="move" :min="1" :max="50" show-stops :step="5"></el-slider>
                        <div class="mx-4">快</div>
                    </div>
                </div>

                <div class="p-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="d-flex ai-center">
                        <span class="fw-b">滚动速度</span>
                        <img :src="`../../src/assets/images/help.png`" class="img-title" />
                    </div>
                    <div class="my-4">
                        <el-radio-group v-model="rollVal" text-color="#00ffff" fill="#ffff00">
                            <el-radio v-for="item in state.rollList" :value="$t(item.value)" :label="$t(item.label)"
                                style="width: 100%;">
                                {{ $t(item.label) }}
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
                        <el-slider v-model="double" :min="1" :max="50" show-stops :step="5"></el-slider>
                        <div class="mx-4">快</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import MainMeun from "./mainMenu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePropertyStore } from "@/stores/rk_m3/propertyStore";
import { storeToRefs } from "pinia";
const useProperty = usePropertyStore();
const { state, lodVal, sensorVal, sensorMode, rollVal } = storeToRefs(useProperty);

const move = ref(0);
const double = ref(0);
</script>