<template>
    <WebApp v-if="isConnected" />
    <Nodevice v-else @on-connect="onConnect" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WebApp from './WebApp.vue'
import Nodevice from './NoDevice.vue'
import { Keyboard, keyboard } from '../keyboard/keyboard'
import { ConnectionEventEnum, ConnectionStatusEnum } from '../keyboard/enum'
import { ElMessage } from 'element-plus'

const isConnected = ref(false);

const onConnect = async () => {
    if (keyboard == undefined) {
        return;
    }

    if (keyboard.device != undefined && keyboard.device.opened) {
        isConnected.value = true;
        return;
    }

    const connectionEventCallback = async (event: Event) => {
        let keyboard = event.currentTarget as Keyboard
        console.log(`Keyboard [${keyboard.state.deviceName}] is ${keyboard.state.connectionEvent}`)
        try {
            switch (keyboard.state.connectionEvent) {
            case ConnectionEventEnum.Open:
                //await keyboard.protocol?.init();
                isConnected.value = true;
                //if (keyboard.state.fwVersion != undefined) data.value.fwVersion = keyboard.state.fwVersion.valueOf();
                //if (keyboard.state.deviceName != undefined) data.value.deviceName = keyboard.state.deviceName.valueOf();
                break;
            case ConnectionEventEnum.Disconnect:
            case ConnectionEventEnum.Close:
                isConnected.value = false;
                keyboard.state.ConnectionStatus = ConnectionStatusEnum.Disconnected;
                keyboard.removeEventListener("connection", connectionEventCallback);
                keyboard.removeEventListener("reported", reportedEventCallback);
                break;
            }
        } catch (e) {
            await keyboard.close();
        }

    };

    const reportedEventCallback = async (event: Event) => {
        if (event.currentTarget == null) return;
        let keyboard = event.currentTarget as Keyboard;
    };

    const notSupportCallback = async (event: Event) => {
        ElMessage({
            showClose: true,
            message: 'Current FW not support, please update to lastest version.',
            type: 'error',
        });
    };

    keyboard.addEventListener("connection", connectionEventCallback);
    keyboard.addEventListener("reported", reportedEventCallback);
    keyboard.addEventListener("NotSupport", notSupportCallback);

    await keyboard.init()
    
    if (keyboard.device == null || !keyboard.device.opened) {
        keyboard.removeEventListener("connection", connectionEventCallback);
        keyboard.removeEventListener("reported", reportedEventCallback);
        keyboard.removeEventListener("NotSupport", notSupportCallback);
    }
};
</script>
