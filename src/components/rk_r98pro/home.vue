<template>
    <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div style="min-width: 70px">
            <Meun />
        </div>
        <div class="flex-1">
            <RK_R98PRO_Page v-if="meunid > 0" />
            <div v-else class="d-flex flex-column jc-center ai-center">
                <!-- <div class="d-flex flex-column jc-center ai-center" v-if="!isKeyboardConnect()">
                    <div class="p-5 fs-big m-5 mb-4">No keyboard connected to dongle</div>
                    <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
                        @click="disconnect"> {{ $t("home.but_4") }}</div>
                </div> -->
                <div class="d-flex flex-column jc-center ai-center">
                    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
                       RK-R98PRO
                    </div>
                    <div class="my-4 c-p" @click="setMeunid();">
                        <el-tooltip effect="light" :content="$t('home.title_tip')" placement="top"
                            popper-class="tip_font2">
                            <img :src="`../../src/assets/images/${keyboard.keyboardDefine?.image}`" />
                        </el-tooltip>
                    </div>
                    <div class="d-flex my-4">
                        <!-- <div class="but-red text-white py-3 px-5 mx-4 c-p" style="border-radius: 10px;" @click="setMeunid();">
            {{ $t("home.but_3") }}
          </div> -->
                        <div class="bg-dark text-white py-3 px-5 mx-4 c-p" style="border-radius: 10px;"
                            @click="disconnect"> {{
                                $t("home.but_2") }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_r98pro/menuStore";
import { keyboard } from '@/keyboard/keyboard'
import RK_R98PRO_Page from '@/components/rk_r98pro/index.vue'
import { RK_R98, RK_R98_EVENT_DEFINE } from "@/keyboard/rk_r98pro/rk_r98pro";
import Meun from "@/components/rk_r98pro/menu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const loading = ref(false)

const setMeunid = () => {
    useMenu.setMeunid(1);
    if (keyboard != undefined && keyboard.keyboardDefine != undefined) {
        useMenu.setName(keyboard.keyboardDefine.name.valueOf())
    }
};

onMounted(async () => {
    console.log("meunid:" + meunid.value)
    rk_r98.value = keyboard.protocol as RK_R98;
    rk_r98.value.addEventListener(RK_R98_EVENT_DEFINE.OnReportStart, reportStart, false);
    rk_r98.value.addEventListener(RK_R98_EVENT_DEFINE.OnReportFinish, reportFinish, false);
});

onBeforeUnmount(() => {
    if (rk_r98.value != undefined) {
        rk_r98.value.removeEventListener(RK_R98_EVENT_DEFINE.OnReportFinish, reportFinish, false);
        rk_r98.value.removeEventListener(RK_R98_EVENT_DEFINE.OnReportStart, reportStart, false);
    }
});

const rk_r98 = ref<RK_R98>();

const reportStart = async (event: any) => {
    if (event != undefined && event.detail != undefined) {
        loading.value = true
    }
};

const reportFinish = async (event: any) => {
    if (event != undefined && event.detail != undefined) {
        if (event.detail == 'finish') {
            loading.value = false
        }
        if (event.detail == 'timeout') {
            loading.value = false;
        }
    }
};

const disconnect = () => {
    useMenu.nameInit();
    keyboard.close();
};
</script>