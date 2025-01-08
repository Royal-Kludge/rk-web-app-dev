<template>
    <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div class="flex-1">
            <div class="d-flex flex-column jc-center ai-center">
                <div class="d-flex flex-column jc-center ai-center">
                    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
                        RK-M300
                    </div>
                    <div class="d-flex my-4">
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
import { mouse } from '@/mouse/mouse'
import { RK_L75, RK_L75_EVENT_DEFINE } from "@/keyboard/rk_l75/rk_l75";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";
import type { RK_K3 } from '@/mouse/rk_k3/rk_k3';

const loading = ref(false)
const rk_k3 = ref<RK_K3>();

onMounted(async () => {
    rk_k3.value = mouse.protocol as RK_K3;
    rk_k3.value.addEventListener(RK_L75_EVENT_DEFINE.OnReportStart, reportStart, false);
    rk_k3.value.addEventListener(RK_L75_EVENT_DEFINE.OnReportFinish, reportFinish, false);
});

onBeforeUnmount(() => {
    if (rk_k3.value != undefined) {
        rk_k3.value.removeEventListener(RK_L75_EVENT_DEFINE.OnReportFinish, reportFinish, false);
        rk_k3.value.removeEventListener(RK_L75_EVENT_DEFINE.OnReportStart, reportStart, false);
    }
});

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
    mouse.close();
};
</script>