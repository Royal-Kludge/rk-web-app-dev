<template>
    <div class="d-flex h-100" v-loading="state.loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.3)">
        <div class="d-flex flex-1 flex-column">
            <div>
                <Meun />
            </div>
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
import { mouse } from '@/mouse/beiying/mouse'
import { RK_MOUSE_EVENT_DEFINE } from '@/mouse/beiying/state'
import RK_K3_Page from '@/components/rk_k3/index.vue'
import Meun from "@/components/rk_k3/menu.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";
import type { RK_K3 } from '@/mouse/beiying/rk_k3/rk_k3';
import { useKeyStore } from "@/stores/rk_k3/keyStore";
import { useProfileStore } from "@/stores/rk_k3/profileStore";
import { useSpeedStore } from "@/stores/rk_k3/speedStore";

const useProfile = useProfileStore();
const useKey = useKeyStore();
const useMenu = useMenuStore();
const useSpeed = useSpeedStore();

const { state } = storeToRefs(useSpeed);
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
    await useProfile.init();
    await useKey.init();

    if (rk_k3.value == undefined || (rk_k3.value != undefined && rk_k3.value.data.isDestroy)) {
        rk_k3.value = mouse.protocol as RK_K3;
        rk_k3.value.addEventListener(RK_MOUSE_EVENT_DEFINE.OnReportStart, reportStart, false);
        rk_k3.value.addEventListener(RK_MOUSE_EVENT_DEFINE.OnReportFinish, reportFinish, false);

        await mouse.getBattery();
        await rk_k3.value.sleep(300);
        await rk_k3.value.getFwVer();
    }
});

onBeforeUnmount(() => {
    if (rk_k3.value != undefined) {
        rk_k3.value.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnReportFinish, reportFinish, false);
        rk_k3.value.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnReportStart, reportStart, false);
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