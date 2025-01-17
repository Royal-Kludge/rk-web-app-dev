<template>
    <div v-if="isMouseConnect()" class="h-100">
        <RK_K3_Page v-if="productId == 1" />
    </div>
    <div class="d-flex flex-column ai-center h-100" v-else>
        <div class="p-5 fs-big m-5 mb-4">No keyboard connected to dongle</div>
        <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
            @click="disconnect"> {{ $t("home.but_4") }}</div>
    </div>
</template>

<script setup lang="ts">
import { mouse } from '@/mouse/mouse'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import RK_K3_Page from '@/components/rk_k3/home.vue'
import { DonglePwdDefineList, MouseDefineList } from '@/mouse/state';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { storage } from '@/common/storage';
import { VERSION } from '@/mouse/state';
import { ElMessageBox } from 'element-plus'
import { useI18n } from "vue-i18n";

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

        state.connectState = ConnectionStatusEnum.Connected;

        if (mouse.state.connectType == ConnectionType.USB) {
            
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
            mouse.loadDefaultValue();

            await mouse.protocol?.init();

            if (mouse.state.fwVersion != undefined) data.value.fwVersion = mouse.state.fwVersion.valueOf();
            if (mouse.state.deviceName != undefined
                
            ) data.value.deviceName = mouse.state.deviceName.valueOf();

            switch (mouse.mouseDefine.name.valueOf()) {
                case 'RK-K3':
                    productId.value = 1
                    break;
            }

            checkProfileVersion();
        }
    }
});

onBeforeUnmount(() => {
    if (mouse != undefined) {

        if (mouse.protocol != undefined) {

        }
    }
});

const disconnect = () => {
    state.connectState = ConnectionStatusEnum.Disconnected;
    mouse.close();
};

const isMouseConnect = (): boolean => {
    let isConnect = false;
    if (mouse.state.connectType == ConnectionType.Dongle) {
        isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password != 0;
    } else {
        isConnect = state.connectState == ConnectionStatusEnum.Connected;
    }

    return isConnect;
};

const checkProfileVersion = () => {
    // let tmp = storage.get(`${mouse.mouseDefine?.name}_profile`) as Profiles;
    // if (tmp != null && (tmp.version == undefined || tmp.version != VERSION)) {
    //     ElMessageBox.confirm(
    //         t('home.profile'),
    //         t('home.profile_out'),
    //         {
    //             confirmButtonText: t('home.profile_reset'),
    //             cancelButtonText: t('home.profile_goon'),
    //             customClass: 'set-to-default',
    //         }
    //     ).then(async () => {
    //         storage.clear();
    //     });
    // }
};

</script>