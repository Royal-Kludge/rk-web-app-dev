<template>
    <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div style="min-width: 70px">
            <Meun />
        </div>
        <div class="flex-1">
            <RK_L87_Page v-if="meunid > 0" />
            <div v-else class="d-flex flex-column jc-center ai-center">
                <div class="d-flex flex-column jc-center ai-center" v-if="!isKeyboardConnect()">
                    <div class="p-5 fs-big m-5 mb-4">No keyboard connected to dongle</div>
                    <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
                        @click="disconnect"> {{ $t("home.but_4") }}</div>
                </div>
                <div class="d-flex flex-column jc-center ai-center" v-else>
                    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
                        RK-R87PRO
                    </div>
                    <div class="my-4 c-p" @click="setMeunid();">
                        <el-tooltip effect="light" :content="$t('home.title_tip')" placement="top"
                            popper-class="tip_font2">
                            <img src="../../assets/images/keyboard.png" />
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
import { useMenuStore } from "@/stores/menuStore";
import { Keyboard, keyboard } from '@/keyboard/keyboard'
import RK_L87_Page from '@/components/rk_l87/index.vue'
import { RK_L87, RK_L87_EVENT_DEFINE } from "@/keyboard/rk_l87/rk_l87";
import Meun from "@/components/menu.vue";
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";
import { ConnectionEventEnum, ConnectionStatusEnum, ConnectionType } from "@/keyboard/enum";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const isKeyboardConnected = ref(false);

const state = reactive({
    connectState: keyboard.state.ConnectionStatus,
    connectType: keyboard.state.connectType,
    password: 0
});

const loading = ref(false)

const setMeunid = () => {
    useMenu.setMeunid(1);
    if (keyboard != undefined && keyboard.keyboardDefine != undefined) {
        useMenu.setName(keyboard.keyboardDefine.name.valueOf())
    }
};

onMounted(async () => {
    console.log("meunid:" + meunid.value)
    state.connectState = keyboard.state.ConnectionStatus;
    state.connectType = keyboard.state.connectType;
    rk_l87.value = keyboard.protocol as RK_L87;
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnReportStart, reportStart, false);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
});

onBeforeUnmount(() => {
    if (rk_l87.value != undefined) {
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnReportStart, reportStart, false);
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
    }
});

const rk_l87 = ref<RK_L87>();

const reportStart = async (event: any) => {
    if (event != undefined && event.detail != undefined) {
        loading.value = true
    }
};

const reportFinish = async (event: any) => {
    if (event != undefined && event.detail != undefined) {
        if (event.detail == 'finish') {
            loading.value = false
            //ElMessage.info('Report finish!');
        }
        if (event.detail == 'timeout') {
            loading.value = false;
            //ElMessage.error('Report timeout!');
        }
    }
};

const disconnect = () => {
    useMenu.nameInit();
    keyboard.close();
};

const isKeyboardConnect = (): boolean => {
    let isConnect = false;
    if (keyboard.state.connectType == ConnectionType.Dongle) {
        isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password == 0x03000000 + 0x0156;
    } else {
        isConnect = state.connectState == ConnectionStatusEnum.Connected;
    }

    return isConnect;
};

// const isPwdChecked = (): boolean => {
//   let isChecked = false;
//   if (keyboard.state.connectType == ConnectionType.Dongle) {
//     if (rk_l87.value != undefined) {
//       isChecked = state.password == 0x03000000 + 0x0156;
//     }
//   } else {
//     isChecked = true;
//   }

//   return isChecked;
// };

const dongleStatusChanged = (event: any) => {
    keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
    state.connectState = event.detail as ConnectionStatusEnum;
    if (state.connectState == ConnectionStatusEnum.Disconnected) {
        state.password = 0;
    }
};

const passwordGotten = (event: any) => {
    state.password = event.detail as number;
};
</script>