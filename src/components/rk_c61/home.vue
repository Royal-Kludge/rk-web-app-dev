<template>
    <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div style="min-width: 70px">
            <Meun />
        </div>
        <div class="flex-1">
            <RK_C61_Page v-if="meunid > 0" />
            <div v-else class="d-flex flex-column jc-center ai-center">
                <div class="d-flex flex-column jc-center ai-center">
                    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
                        RK-C61
                    </div>
                    <div class="my-4 c-p" @click="setMeunid();">
                        <el-tooltip effect="light" :content="$t('home.title_tip')" placement="top"
                            popper-class="tip_font2">
                            <img :src="`../../src/assets/images/${keyboard.keyboardDefine?.image}`" width="914hv"
                                height="420hv" />
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
import { keyboard } from '@/keyboard/sparklink/keyboard'
import { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import RK_C61_Page from '@/components/rk_c61/index.vue'
import Meun from "@/components/rk_c61/menu.vue";
import { useMenuStore } from "@/stores/rk_c61/menuStore";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const loading = ref(false)

const rk_c61 = ref<RK_C61>();

const setMeunid = () => {
    useMenu.setMeunid(1);
    if (keyboard != undefined && keyboard.keyboardDefine != undefined) {
        useMenu.setName(keyboard.keyboardDefine.name.valueOf())
    }
};

onMounted(async () => {
    rk_c61.value = keyboard.protocol as RK_C61;
});

onBeforeUnmount(() => {
    if (rk_c61.value != undefined) {

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
    useMenu.nameInit();
    keyboard.close();
};
</script>