<template>
    <KeyboardView v-if="isKeyboardConnect()" />
    <MouseView v-else-if="isMouseConnect()" />
    <Nodevice v-else @on-connect="onConnect" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KeyboardView from './KeyboardView.vue'
import MouseView from './MouseView.vue'
import Nodevice from './NoDevice.vue'
import { hidConnection } from '@/device/hidConnection'
import { ConnectionEventEnum, ConnectionStatusEnum, DeviceType } from '@/device/enum'
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
            console.log(`Keyboard [${device.deviceState.deviceName}] is ${device.deviceState.connectionEvent}`)
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

const isKeyboardConnect = (): boolean => {
    return isConnected.value && hidConnection.hidDevideDefine != undefined && hidConnection.hidDevideDefine.deviceType == DeviceType.Keyboard;
}

const isMouseConnect = (): boolean => {
    return isConnected.value && hidConnection.hidDevideDefine != undefined && hidConnection.hidDevideDefine.deviceType == DeviceType.Mouse;
}
</script>
