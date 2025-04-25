<template>
    <div v-if="isMouseConnect()" class="h-100">
        <RK_M3_Page v-if="productId == 1" />
        <RK_M30_Page v-if="productId == 2" />
    </div>
    <div class="d-flex flex-column ai-center h-100" v-else>
        <div class="p-5 fs-big m-5 mb-4">No mouse connected to dongle</div>
        <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
            @click="disconnect"> {{ $t("home.but_4") }}</div>
    </div>
</template>

<script setup lang="ts">
import { mouse } from '@/mouse/mouse'
import { RK_MOUSE_EVENT_DEFINE } from '@/mouse/state'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import RK_M3_Page from '@/components/rk_m3/home.vue'
import RK_M30_Page from '@/components/rk_m30/home.vue'
import { DonglePwdDefineList, MouseDefineList } from '@/mouse/state';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { storage } from '@/common/storage';
import { VERSION } from '@/common/state';
import { ElMessageBox } from 'element-plus'
import { useI18n } from "vue-i18n";
import type { Profiles } from '@/mouse/rk_m3/profiles';

const { t } = useI18n();

const productId = ref(0);

const data = ref(
    {
        fwVersion: '',
        deviceName: '',
    }
);

const state = reactive({
    connectState: mouse.state.ConnectionStatus,
    connectType: mouse.state.connectType,
    password: 0
});

onMounted(async () => {
    if (mouse != undefined && mouse.device != undefined && mouse.device != null) {
        var item: any;

        if (mouse.state.connectType == ConnectionType.USB) {
            state.connectState = ConnectionStatusEnum.Connected;

            for (item in MouseDefineList) {
                if (mouse.device.vendorId == MouseDefineList[item].vendorId && mouse.device.productId == MouseDefineList[item].productId) {
                    mouse.mouseDefine = MouseDefineList[item];
                    break;
                }
            }

            if (mouse.mouseDefine == null || mouse.mouseDefine == undefined) {
                await mouse.close();
                mouse.dispatchEvent(new MouseEvent("NotSupport", this));
                return;
            }

            mouse.protocol = await mouse.mouseDefine.protocol(mouse.state, mouse.device);

            if (mouse != undefined && mouse.report != undefined) {
                mouse.report.addEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
            }

            mouse.device.addEventListener("inputreport", mouse.callback);
            await mouse.protocol?.init();

            if (mouse.state.fwVersion != undefined) data.value.fwVersion = mouse.state.fwVersion.valueOf();
            if (mouse.state.deviceName != undefined) data.value.deviceName = mouse.state.deviceName.valueOf();

            switch (mouse.mouseDefine.name.valueOf()) {
                case 'RK-M3':
                    productId.value = 1
                    break;
                case 'RK-M30':
                    productId.value = 2
                    break;
            }

            checkProfileVersion();
        } else if (mouse.state.connectType == ConnectionType.Dongle) {
            if (mouse != undefined && mouse.report != undefined) {
                mouse.report.addEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
                mouse.report.addEventListener(RK_MOUSE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
                mouse.report.addEventListener(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
            }

            mouse.device.addEventListener("inputreport", mouse.callback);
            await mouse.getOnline();
        }
    }
});

onBeforeUnmount(() => {
    if (mouse != undefined && mouse.report != undefined) {
        mouse.device?.addEventListener("inputreport", mouse.callback);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
    }
});

const disconnect = () => {
    state.connectState = ConnectionStatusEnum.Disconnected;
    
    if (mouse != undefined && mouse.report != undefined) {
        mouse.device?.addEventListener("inputreport", mouse.callback);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
    }

    mouse.close();
};

const isMouseConnect = (): boolean => {
    let isConnect = false;
    console.log(`Password => ${state.password}`);
    if (mouse.state.connectType == ConnectionType.Dongle) {
        isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password != 0;
    } else {
        isConnect = state.connectState == ConnectionStatusEnum.Connected;
    }

    return isConnect;
};

const dongleStatusChanged = async (event: any) => {
    mouse.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
    state.connectState = event.detail as ConnectionStatusEnum;

    console.log(`Mouse ${state.connectState} to dongle!`);

    if (state.connectState == ConnectionStatusEnum.Connected) {
        if (mouse.protocol == null || mouse.protocol == undefined) {
            await mouse.getOnline();
        }
    } 
};

const passwordGotten = async (event: any) => {
    let pwd = event.detail.pwd as number;
    mouse.state.ConnectionStatus = event.detail.status as ConnectionStatusEnum;
    state.connectState = event.detail.status as ConnectionStatusEnum;
    var item: any;

    for (item in DonglePwdDefineList) {
        if (pwd == item) {
            mouse.mouseDefine = MouseDefineList[DonglePwdDefineList[item]];
            break;
        }
    }

    if (mouse.mouseDefine != null && mouse.mouseDefine != undefined && mouse.device != undefined) {
        mouse.protocol = await mouse.mouseDefine.protocol(mouse.state, mouse.device);

        await mouse.protocol?.init();

        if (mouse.state.fwVersion != undefined) data.value.fwVersion = mouse.state.fwVersion.valueOf();
        if (mouse.state.deviceName != undefined) data.value.deviceName = mouse.state.deviceName.valueOf();

        console.log(`Mouse [${mouse.mouseDefine.name.valueOf()}] was got and it [${state.connectState}]!`);

        switch (mouse.mouseDefine.name.valueOf()) {
            case 'RK-M3':
                productId.value = 1
                break;
            case 'RK-M30':
                productId.value = 2
                break;
        }

        checkProfileVersion();
    }

    state.password = mouse.mouseDefine != undefined ? pwd : 0;
};

const batteryGotten = async (event: any) => {
    // 电量
    mouse.state.batteryStatus = event.detail.state as number;
    mouse.state.batteryValue = event.detail.value as number;
};

const checkProfileVersion = () => {
    let tmp = storage.get(`${mouse.mouseDefine?.name}_profile`) as Profiles;
    if (tmp != null && (tmp.version == undefined || tmp.version != VERSION)) {
        ElMessageBox.confirm(
            t('home.profile'),
            t('home.profile_out'),
            {
                confirmButtonText: t('home.profile_reset'),
                cancelButtonText: t('home.profile_goon'),
                customClass: 'set-to-default',
            }
        ).then(async () => {
            storage.clear();
        });
    }
};

</script>