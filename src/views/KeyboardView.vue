<template>
    <div v-if="isKeyboardConnect()" class="h-100">
        <RK_R87_Page v-if="productId == 1" />
        <RK_M87_Page v-else-if="productId == 2" />
        <RK_L75_Page v-else-if="productId == 3" />
        <RK_R87_RF_Page v-else-if="productId == 4" />
        <RK_M65_Page v-else-if="productId == 5" />
        <RK_M70_Page v-else-if="productId == 6" />
        <RK_L98_Page v-else-if="productId == 7" />
        <RK_N99_Page v-else-if="productId == 8" />
    </div>
    <div class="d-flex flex-column ai-center h-100" v-else>
        <div class="p-5 fs-big m-5 mb-4">No keyboard connected to dongle</div>
        <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
            @click="disconnect"> {{ $t("home.but_4") }}</div>
    </div>
</template>

<script setup lang="ts">
import { keyboard, RK_DONGLE_EVENT_DEFINE } from '@/keyboard/keyboard'
import RK_R87_Page from '@/components/rk_r87/home.vue'
import RK_R87_RF_Page from '@/components/rk_r87_rf/home.vue'
import RK_M87_Page from '@/components/rk_m87/home.vue'
import RK_L75_Page from '@/components/rk_l75/home.vue'
import RK_M65_Page from '@/components/rk_m65/home.vue'
import RK_M70_Page from '@/components/rk_m70/home.vue'
import RK_L98_Page from '@/components/rk_l98/home.vue'
import RK_N99_Page from '@/components/rk_n99/home.vue'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { DonglePwdDefineList, KeyboardDefineList } from '@/keyboard/state';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { storage } from '@/common/storage';
import type { Profiles } from '@/keyboard/rk_r87/profiles';
import { VERSION } from '@/common/state';
import { ElMessageBox } from 'element-plus'
import { useI18n } from "vue-i18n";
import type { Protocol } from '@/keyboard/protocol';

const { t } = useI18n();

const productId = ref(0);

const data = ref(
    {
        fwVersion: '',
        deviceName: '',
    }
);

const state = reactive({
    connectState: keyboard.state.ConnectionStatus,
    connectType: keyboard.state.connectType,
    password: 0
});

onMounted(async () => {
    if (keyboard != undefined && keyboard.device != undefined && keyboard.device != null) {
        var item: any;

        state.connectState = ConnectionStatusEnum.Connected;

        if (keyboard.state.connectType == ConnectionType.USB) {
            
            for (item in KeyboardDefineList) {
                if (keyboard.device.vendorId == KeyboardDefineList[item].vendorId && keyboard.device.productId == KeyboardDefineList[item].productId) {
                    keyboard.keyboardDefine = KeyboardDefineList[item];
                    break;
                }
            }

            if (keyboard.keyboardDefine == null || keyboard.keyboardDefine == undefined) {
                await keyboard.close();
                keyboard.dispatchEvent(new KeyboardEvent("NotSupport", this));
                return;
            }

            keyboard.protocol = await keyboard.keyboardDefine.protocol(keyboard.state, keyboard.device);
            keyboard.loadDefaultValue(keyboard.state.keyTableData, keyboard.state.lightInfo);

            await keyboard.protocol?.init();

            if (keyboard.state.fwVersion != undefined) data.value.fwVersion = keyboard.state.fwVersion.valueOf();
            if (keyboard.state.deviceName != undefined) data.value.deviceName = keyboard.state.deviceName.valueOf();

            switch (keyboard.keyboardDefine.name.valueOf()) {
                case 'RK-R87PRO':
                    productId.value = 1
                    break;
                case 'RK-M87':
                case 'RK-M87 JP':
                case 'RK-M87 UK':
                    productId.value = 2
                    break;
                case 'RK-L75':
                case 'RK-L75 UK':
                    productId.value = 3
                    break;
                case 'RK-R87PRO RF':
                    productId.value = 4
                    break;
                case 'RK-M65':
                case 'RK-M65 UK':
                    productId.value = 5
                    break;
                case 'RK-M70':
                case 'RK-M70 UK':
                    productId.value = 6
                    break;
                case 'RK-L98':
                    productId.value = 7
                    break;
                case 'RK-N99':
                    productId.value = 8
                    break;
            }

            checkProfileVersion();
        } else if (keyboard.state.connectType == ConnectionType.Dongle) {
            keyboard.addEventListener(RK_DONGLE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
            keyboard.addEventListener(RK_DONGLE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
            keyboard.device.addEventListener("inputreport", keyboard.callback);
            await keyboard.getDongleStatus();
        }
    }
});

onBeforeUnmount(() => {
    if (keyboard != undefined) {
        keyboard.removeEventListener(RK_DONGLE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        keyboard.removeEventListener(RK_DONGLE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);

        if (keyboard.protocol != undefined) {
            (keyboard.protocol as Protocol).removeEventListener(RK_DONGLE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
            //(keyboard.protocol as Protocol).removeEventListener(RK_DONGLE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
        }
    }
});

const disconnect = () => {
    state.connectState = ConnectionStatusEnum.Disconnected;
    keyboard.close();
};

const isKeyboardConnect = (): boolean => {
    let isConnect = false;
    if (keyboard.state.connectType == ConnectionType.Dongle) {
        isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password != 0;
    } else {
        isConnect = state.connectState == ConnectionStatusEnum.Connected;
    }

    return isConnect;
};

const dongleStatusChanged = async (event: any) => {
    keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
    state.connectState = event.detail as ConnectionStatusEnum;
    if (state.connectState == ConnectionStatusEnum.Disconnected) {
        state.password = 0;
        keyboard.keyboardDefine = undefined;

        if (keyboard.device != undefined) {
            keyboard.device.addEventListener("inputreport", keyboard.callback);
        }

        if (keyboard.protocol != undefined) {
            (keyboard.protocol as Protocol).removeEventListener(RK_DONGLE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
            //(keyboard.protocol as Protocol).removeEventListener(RK_DONGLE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
            await keyboard.protocol.destroy();
            keyboard.protocol = undefined;
        }
    }
};

const passwordGotten = async (event: any) => {
    let pwd = event.detail as number;
    var item: any;

    for (item in DonglePwdDefineList) {
        if (pwd == item) {
            keyboard.keyboardDefine = KeyboardDefineList[DonglePwdDefineList[item]];
            break;
        }
    }

    if (keyboard.keyboardDefine != null && keyboard.keyboardDefine != undefined && keyboard.device != undefined) {
        keyboard.protocol = await keyboard.keyboardDefine.protocol(keyboard.state, keyboard.device);
        keyboard.device.removeEventListener("inputreport", keyboard.callback);
        (keyboard.protocol as Protocol).addEventListener(RK_DONGLE_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        //(keyboard.protocol as Protocol).addEventListener(RK_DONGLE_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);

        keyboard.loadDefaultValue(keyboard.state.keyTableData, keyboard.state.lightInfo)

        await keyboard.protocol?.init()

        if (keyboard.state.fwVersion != undefined) data.value.fwVersion = keyboard.state.fwVersion.valueOf();
        if (keyboard.state.deviceName != undefined) data.value.deviceName = keyboard.state.deviceName.valueOf();

        switch (keyboard.keyboardDefine.name.valueOf()) {
            case 'RK-R87PRO':
                productId.value = 1
                break;
            case 'RK-M87':
            case 'RK-M87 JP':
            case 'RK-M87 UK':
                productId.value = 2
                break;
            case 'RK-L75':
            case 'RK-L75 UK':
                productId.value = 3
                break;
            case 'RK-R87PRO RF':
                productId.value = 4
                break;
            case 'RK-M65':
            case 'RK-M65 UK':
                productId.value = 5
                break;
            case 'RK-M70':
            case 'RK-M70 UK':
                productId.value = 6
                break;
            case 'RK-L98':
                productId.value = 7
                break;
            case 'RK-N99':
                productId.value = 8
                break;
        }

        checkProfileVersion();
    }

    state.password = keyboard.keyboardDefine != undefined ? pwd : 0;
};

const checkProfileVersion = () => {
    let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;
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