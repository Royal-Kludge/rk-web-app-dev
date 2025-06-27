<template>
    <div v-if="isKeyboardConnect()" class="h-100">
        <RK_C61_Page v-if="productId == 1" />
    </div>
    <div class="d-flex flex-column ai-center h-100" v-else>
        <div class="p-5 fs-big m-5 mb-4">No keyboard connected</div>
        <div class="bg-dark text-white py-3 px-5 mx-4 c-p mt-4" style="border-radius: 10px;height: 24px;"
            @click="disconnect"> {{ $t("home.but_4") }}</div>
    </div>
</template>

<script setup lang="ts">
import { keyboard } from '@/keyboard/sparklink/keyboard'
import RK_C61_Page from '@/components/rk_c61/home.vue'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { KeyboardDefineList } from '@/keyboard/sparklink/state';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { storage } from '@/common/storage';
import { VERSION } from '@/common/state';
import { ElMessageBox } from 'element-plus'
import { useI18n } from "vue-i18n";
import type { Protocol } from '@/keyboard/sparklink/protocol';

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
            //keyboard.loadDefaultValue(keyboard.state.keyTableData);

            await keyboard.protocol?.init();

            if (keyboard.state.fwVersion != undefined) data.value.fwVersion = keyboard.state.fwVersion.valueOf();
            if (keyboard.state.deviceName != undefined) data.value.deviceName = keyboard.state.deviceName.valueOf();

            switch (keyboard.keyboardDefine.name.valueOf()) {
                case 'RK-C61':
                    productId.value = 1
                    break;
            }

            checkProfileVersion();
        }
    }
});

onBeforeUnmount(() => {
    if (keyboard != undefined) {

    }
});

const disconnect = () => {
    state.connectState = ConnectionStatusEnum.Disconnected;
    keyboard.close();
};

const isKeyboardConnect = (): boolean => {
    let isConnect = state.connectState == ConnectionStatusEnum.Connected;
    return isConnect;
};

const checkProfileVersion = () => {
    // let tmp = storage.get(`${keyboard.keyboardDefine?.name}_profile`) as Profiles;
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