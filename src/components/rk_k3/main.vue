<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 jc-center ai-center">
        <el-tooltip ref="tooltipRef" placement="right" :v-model:visible="navShow" effect="light"
            :virtual-ref="buttonRef" virtual-triggering>
            <template #content>
                <div class="d-flex ai-center">
                    <el-tabs v-model="state.navName">
                        <el-tab-pane v-for="nav in state.navList" :label="nav.label" :name="nav.name">
                            <el-scrollbar height="480px">
                                <div class="p-2 m-2" v-for="list in nav.list">
                                    <div>{{ list.title }}</div>
                                    <div class="m-2">
                                        <div :class="[`p-2 c-p`, useMain.isSelected(item.id)]"
                                            v-for="item in list.items" @click="useMain.clickItem(item.id)">{{ item.title
                                            }}</div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </template>
        </el-tooltip>
        <div class="d-flex jc-center ai-start">
            <el-dialog v-model="dalogVisible" width="500" center>
                <span>
                    请保留至少一个键为“左键”功能?
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button type="primary" @click="dalogVisible = false">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <div class="d-flex flex-column ai-center mx-5">
                <div>
                    <div>左侧键</div>
                    <el-switch v-model="left" inline-prompt size="large" active-text="开" inactive-text="关"
                        @change="onChange()" />
                </div>
                <div class="but_left"><el-button @mouseover="(e: any) => (buttonRef = e.currentTarget)"
                        @click="toggleTooltip">左键</el-button>
                </div>
                <div class="but_report"><el-button @mouseover="(e: any) => (buttonRef = e.currentTarget)"
                        @click="toggleTooltip">回报率+</el-button></div>
                <div class="but_back"><el-button @mouseover="(e: any) => (buttonRef = e.currentTarget)"
                        @click="toggleTooltip">后退</el-button>
                </div>
            </div>

            <div class="d-flex flex-column ai-center">
                <div>
                    <img :src="`../../src/assets/images/mouse_rk-k3.png`" />
                </div>
                <div class="mt-4">
                    <el-button class="but-blue" style="color: white;padding: 0 50px;">重置所有按键</el-button>
                </div>
            </div>

            <div class="d-flex flex-column ai-center mx-5">
                <div>
                    <div>右侧键</div>
                    <el-switch v-model="right" inline-prompt size="large" active-text="开" inactive-text="关"
                        @change="onChange()" />
                </div>
                <div class="but_right"><el-button @mouseover="(e: any) => (buttonRef = e.currentTarget)"
                        @click="toggleTooltip">右键</el-button>
                </div>
                <div class="but_middle"><el-button @mouseover="(e: any) => (buttonRef = e.currentTarget)"
                        @click="toggleTooltip">中键</el-button></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-button) {
    min-width: 85px;
}
:deep(.el-tabs__nav) {
    padding: 0 20px;
}
:deep(.el-tabs__header) {
    margin: 0;
}
:deep(.el-button:focus) {
    background: #4743A7;
    border-color: #4743A7;
    color: #ffffff;
}

.but_left {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -70px;
        width: 70px;
        height: 1px;
        background: #BABABB;
    }
}

.but_right {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 85px;
        width: 70px;
        height: 1px;
        background: #BABABB;
    }
}

.but_middle {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 85px;
        width: 150px;
        height: 1px;
        background: #BABABB;
    }
}

.but_report {
    margin-top: 90px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -55px;
        width: 55px;
        height: 1px;
        background: #BABABB;
    }
}

.but_back {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -55px;
        width: 55px;
        height: 1px;
        background: #BABABB;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import MainMeun from "./mainMenu.vue";
import { useMainStore } from "@/stores/rk_k3/mainStore";
import { storeToRefs } from "pinia";

const left = ref(true)
const right = ref(false)
const buttonRef = ref(null)
const tooltipRef = ref(null)
const navShow = ref(false)
const dalogVisible = ref(false)

const useMain = useMainStore();
const { state } = storeToRefs(useMain);

const toggleTooltip = () => {
    navShow.value = !navShow.value
}
const onChange = () => {
    if (left.value == false && right.value == false) {
        dalogVisible.value = true;
        return;
    }
}
</script>