<template>
    <div class="d-flex h-100" v-loading="isLoading()" :element-loading-text="loadingText()" :element-loading-spinner="svg"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        element-loading-svg-view-box="-10, -10, 50, 50"
        v-if="mode == 0x00">
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
                            <img :src="`../../src/assets/images/${keyboard.keyboardDefine?.image}`" />
                        </el-tooltip>
                    </div>
                    <div class="d-flex my-4">
                        <div class="bg-dark text-white py-3 px-5 mx-4 c-p" style="border-radius: 10px;text-align: center;"
                            @click="disconnect"> {{ $t("home.but_2") }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex jc-center ai-center" 
        v-if="mode == 0xff">
        <div class="d-flex my-4 flex-column jc-center ai-center">
            <Update_Page />
            <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="width: 120px;border-radius: 10px;text-align: center;"
                @click="disconnect" v-if="updateType == UpdateTypeEnum.None"> {{ $t("home.but_2") }}</div>
        </div>
    </div>
    <el-dialog v-model="rebootDialog" :title="$t('set.but_4')">
        <span>{{ $t('set.title_10') }}</span>
        <template #footer>
            <div class="d-flex jc-center">
                <el-button type="primary" @click="useUpdate.reboot()">{{ $t('set.but_9') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { keyboard } from '@/keyboard/sparklink/keyboard'
import { RK_C61, RK_C61_EVENT_DEFINE } from "@/keyboard/sparklink/rk_c61/rk_c61";
import RK_C61_Page from '@/components/rk_c61/index.vue'
import Update_Page from '@/components/rk_c61/update.vue'
import Meun from "@/components/rk_c61/menu.vue";
import { useMenuStore } from "@/stores/rk_c61/menuStore";
import { useUpdateStore } from "@/stores/rk_c61/updateStore";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";
import { LOG_TYPE, Logging } from '@/common/logging';
import { Profile, ps } from "@/keyboard/sparklink/profiles";
import { useI18n } from 'vue-i18n';
import { OrderTypeEnum, UpdateTypeEnum } from '@/keyboard/sparklink/enum';

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
        `

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);
const { t } = useI18n();

const useUpdate = useUpdateStore();
const { isUpdateLoading, updateType, updateText, rebootDialog, keyboardInfo } = storeToRefs(useUpdate);

const timerCount = ref(3);

const loading = ref(false);
const text = ref("")
const mode = ref(0xff);

const dataLoading = ref({
    defaultLayout: true,
    values: true,
    rgb: true,
})

const rk_c61 = ref<RK_C61>();

const setMeunid = () => {
    useMenu.setMeunid(1);
    if (keyboard != undefined && keyboard.keyboardDefine != undefined) {
        useMenu.setName(keyboard.keyboardDefine.name.valueOf())
    }
};

onMounted(async () => {
    if (rk_c61.value == undefined) {
        rk_c61.value = keyboard.protocol as RK_C61;
        rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnKeyDefaultLayoutGotten, onKeyDefaultLayoutGotten);
        rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnKeyValuesGotten, onKeyValuesGotten);
        rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnKeyRgbGotten, onKeyRgbGotten);
        rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnSynced, onSynced);
        rk_c61.value.addEventListener(RK_C61_EVENT_DEFINE.OnCmdFinish, onCmdFinish);
        text.value = t('home.title_1');
    }

    await useUpdate.init();
    useUpdate.t = t;
});

onBeforeUnmount(() => {
    if (rk_c61.value != undefined) {
        rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnKeyDefaultLayoutGotten, onKeyDefaultLayoutGotten);
        rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnKeyValuesGotten, onKeyValuesGotten);
        rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnKeyRgbGotten, onKeyRgbGotten);
        rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnSynced, onSynced);
        rk_c61.value.removeEventListener(RK_C61_EVENT_DEFINE.OnCmdFinish, onCmdFinish);
        rk_c61.value = undefined;
    }

    useMenu.setMeunid(0);
});

const onKeyDefaultLayoutGotten = (event: any) => {
    dataLoading.value.defaultLayout = false;
    Logging.console(LOG_TYPE.SUCCESS, `Key default layout data Gotten!`);
    if (rk_c61.value != undefined && !rk_c61.value.data.isSynced) {
        keyboard.loadValue(event.detail);
        rk_c61.value.data.isSynced = true;
    }
}

const onKeyValuesGotten = (event: any) => {
    dataLoading.value.values = false;
    Logging.console(LOG_TYPE.SUCCESS, `Key values data Gotten!`);
}

const onKeyRgbGotten = (event: any) => {
    dataLoading.value.rgb = false;
    Logging.console(LOG_TYPE.SUCCESS, `Key rgb data Gotten!`);

    if (rk_c61.value != undefined) {

        // Logging.console(LOG_TYPE.INFO, JSON.stringify(rk_c61.value.data.keyInfoData.keyInfoArray));
        // Logging.console(LOG_TYPE.INFO, JSON.stringify(rk_c61.value.data.performanceData));
        // Logging.console(LOG_TYPE.INFO, JSON.stringify(rk_c61.value.data.lightSetting));

        ps.init(
            `${t("Profile.namePrefix")} 1`,
            rk_c61.value.data.keyInfoData.keyInfoArray,
            rk_c61.value.data.performanceData,
            rk_c61.value.data.lightSetting,
        );

        for (let i = 2; i <= 4; i++) {
            let profile = Profile.default();
            if (profile != undefined) {
                profile.name = `${t("Profile.namePrefix")} ${i}`;
                ps.add(profile);
            }
        }

        ps.save();
    }
}

const onSynced = async (event: any) => {
    if (rk_c61.value != undefined && !rk_c61.value.data.isSynced) {
        mode.value = rk_c61.value.data.runMode;

        if (keyboard.state.deviceName != undefined &&
            rk_c61.value.data.sn != undefined &&
            rk_c61.value.data.fwVersion != undefined && rk_c61.value.data.fwVersion.appVersion != undefined) {
            keyboardInfo.value.name = keyboard.state.deviceName.valueOf();
            keyboardInfo.value.sn = rk_c61.value.data.sn;
            keyboardInfo.value.varsion = rk_c61.value.data.fwVersion.appVersion;
            keyboardInfo.value.mode = rk_c61.value.data.runMode;
        }

        if (rk_c61.value.data.runMode == 0x00) {
            //App Mode
            await rk_c61.value.cmd(OrderTypeEnum.GetProtoVer, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.GetKbName, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.Travel, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.SwitchProfile, 0x04);
            await rk_c61.value.cmd(OrderTypeEnum.QuerySupportAxis, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.SetReportRate, 0x07);
            await rk_c61.value.cmd(OrderTypeEnum.QueryWinMode, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.QueryMacMode, 0xff);
            await rk_c61.value.cmd(OrderTypeEnum.SwitchDeadZone, 0x02);
        } else {
            //Boot Mode
        }
    }
}

const onCmdFinish = async (event: any) => {
    if (rk_c61.value != undefined && !rk_c61.value.data.isSynced) {
        if (ps.load()) {
            let keyInfoArray = ps.list[ps.curIndex].keyInfoArray;
            for (let row = 0; row < keyInfoArray.length; row++) {
                for (let col = 0; col < keyInfoArray[row].length; col++) {
                    rk_c61.value.data.keyInfoData.updateKeyInfo(row, col, keyInfoArray[row][col]);
                }
            }

            //rk_c61.value.data.keyInfoData.keyInfoArray = ps.list[ps.curIndex].keyInfoArray;
            rk_c61.value.data.keyInfoData.globalTouchTravel = ps.list[ps.curIndex].performanceData.globalTouchTravel;
            rk_c61.value.data.keyInfoData.maxTouchTravel = ps.list[ps.curIndex].performanceData.maxTouchTravel;
            rk_c61.value.data.performanceData = ps.list[ps.curIndex].performanceData;
            rk_c61.value.data.lightSetting = ps.list[ps.curIndex].lightSetting;

            keyboard.loadValue(rk_c61.value.data.keyInfoData);

            dataLoading.value.defaultLayout = false;
            dataLoading.value.values = false;
            dataLoading.value.rgb = false;

            rk_c61.value.data.isSynced = true;
        } else {
            await rk_c61.value.loadData();
        }
    }
}

const isLoading = (): boolean => {
    return loading.value || isUpdateLoading.value || dataLoading.value.defaultLayout || dataLoading.value.values || dataLoading.value.rgb;
}

const loadingText = (): string => {
    return isUpdateLoading.value ? "" : text.value;
}

const disconnect = () => {
    useMenu.nameInit();
    keyboard.close();
};
</script>
<style scoped lang="scss">
:deep(.el-loading-text) {
    color: var(--el-color-primary-light-3) !important;
}
</style>
