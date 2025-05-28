<template>
    <KeyboardView_Beiying v-if="isBeiyingKeyboardConnect()" />
    <MouseView_Beiying v-else-if="isBeiyingMouseConnect()" />
    <KeyboardView_SparkLink v-else-if="isSparkLinkKeyboardConnect()" />
    <Nodevice v-else @on-connect="onConnect" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KeyboardView_Beiying from './KeyboardView_Beiying.vue'
import MouseView_Beiying from './MouseView_Beiying.vue'
import KeyboardView_SparkLink from './KeyboardView_SparkLink.vue'
import Nodevice from './NoDevice.vue'
import { hidConnection } from '@/device/hidConnection'
import { ConnectionEventEnum, ConnectionStatusEnum, DeviceType, ProtocolType } from '@/device/enum'
import { ElMessage } from 'element-plus'
import type { Device } from '@/device/device';

const isConnected = ref(false);

const onConnect = async () => {
    if (hidConnection == undefined) {
        return;
    }

    if (hidConnection.device != undefined && hidConnection.device.opened) {
        isConnected.value = true;
        return;
    }

    const connectionEventCallback = async (event: Event) => {
        let device = event.currentTarget as Device;
        if (device != undefined && device.deviceState != undefined) {
            console.log(`Device [${device.deviceState.deviceName}] is ${device.deviceState.connectionEvent}`)
        try {
            switch (device.deviceState.connectionEvent) {
            case ConnectionEventEnum.Open:
                isConnected.value = true;
                break;
            case ConnectionEventEnum.Disconnect:
            case ConnectionEventEnum.Close:
                isConnected.value = false;
                device.deviceState.ConnectionStatus = ConnectionStatusEnum.Disconnected;
                device.removeEventListener("connection", connectionEventCallback);
                device.removeEventListener("NotSupport", notSupportCallback);
                break;
            }
        } catch (e) {
            await device.close();
        }
        }
    };

    const notSupportCallback = async (event: Event) => {
        ElMessage({
            showClose: true,
            message: 'Current FW not support, please update to lastest version.',
            type: 'error',
        });
    };

    await hidConnection.init();

    if (hidConnection.hidDevice != undefined && hidConnection.hidDevideDefine) {
        hidConnection.hidDevice.addEventListener("connection", connectionEventCallback);
        hidConnection.hidDevice.addEventListener("NotSupport", notSupportCallback);

        await hidConnection.hidDevice.init(hidConnection.hidDevideDefine)
        
        if (hidConnection.hidDevice.device == null || !hidConnection.hidDevice.device.opened) {
            hidConnection.hidDevice.removeEventListener("connection", connectionEventCallback);
            hidConnection.hidDevice.removeEventListener("NotSupport", notSupportCallback);
        }
    }
};

const isBeiyingKeyboardConnect = (): boolean => {
    return isConnected.value && 
           hidConnection.hidDevideDefine != undefined && 
           hidConnection.hidDevideDefine.deviceType == DeviceType.Keyboard && 
           hidConnection.hidDevideDefine.protocolType == ProtocolType.BeiYing;
}

const isBeiyingMouseConnect = (): boolean => {
    return isConnected.value && 
           hidConnection.hidDevideDefine != undefined && 
           hidConnection.hidDevideDefine.deviceType == DeviceType.Mouse &&
           hidConnection.hidDevideDefine.protocolType == ProtocolType.BeiYing;
}

const isSparkLinkKeyboardConnect = (): boolean => {
    return isConnected.value && 
           hidConnection.hidDevideDefine != undefined && 
           hidConnection.hidDevideDefine.deviceType == DeviceType.Keyboard && 
           hidConnection.hidDevideDefine.protocolType == ProtocolType.SparkLink;
}
</script>
