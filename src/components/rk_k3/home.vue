<template>
    <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div style="min-width: 70px">
            <Meun />
        </div>
        <div class="flex-1">
            <RK_K3_Page v-if="meunid > 0" />
            <div v-else class="d-flex flex-column jc-center ai-center">
                <div class="d-flex flex-column jc-center ai-center">
                    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
                        RK-K3
                    </div>
                    <div class="my-4 c-p" @click="setMeunid();">
                        <el-tooltip effect="light" :content="$t('home.title_tip')" placement="top"
                            popper-class="tip_font2">
                            <img :src="`../../src/assets/images/mouse_rk-k3.png`" />
                        </el-tooltip>
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
import { useMenuStore } from "@/stores/rk_k3/menuStore";
import { mouse } from '@/mouse/mouse'
import RK_K3_Page from '@/components/rk_k3/index.vue'
import { RK_K3_EVENT_DEFINE } from "@/mouse/rk_k3/rk_k3";
import Meun from "@/components/rk_k3/menu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";
import type { RK_K3 } from '@/mouse/rk_k3/rk_k3';

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const loading = ref(false)
const rk_k3 = ref<RK_K3>();

const setMeunid = () => {
    useMenu.setMeunid(1);
    if (mouse != undefined && mouse.mouseDefine != undefined) {
        useMenu.setName(mouse.mouseDefine.name.valueOf())
    }
};
onMounted(async () => {
    rk_k3.value = mouse.protocol as RK_K3;
    rk_k3.value.addEventListener(RK_K3_EVENT_DEFINE.OnReportStart, reportStart, false);
    rk_k3.value.addEventListener(RK_K3_EVENT_DEFINE.OnReportFinish, reportFinish, false);
});

onBeforeUnmount(() => {
    if (rk_k3.value != undefined) {
        rk_k3.value.removeEventListener(RK_K3_EVENT_DEFINE.OnReportFinish, reportFinish, false);
        rk_k3.value.removeEventListener(RK_K3_EVENT_DEFINE.OnReportStart, reportStart, false);
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