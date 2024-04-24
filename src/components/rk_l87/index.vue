<template>
    <div class="d-flex jc-center ai-center" v-if="state.connectType == ConnectionType.Dongle && state.connectState != ConnectionStatusEnum.Connected">
        <p style="font-size: 42px; margin-top: 30%;">The keyboard not connected to dongle.</p>
    </div>
    <div v-else>
        <el-container>
            <el-header style="height: 5vh; margin-top: 2vh;">
                <div class="d-flex jc-center ai-center">
                    <div class="d-flex ai-center flex-column">
                        <div class="d-flex ai-center jc-center mb-4" style="width: 50vh;border-radius: 20px;">
                            <div v-for="item in state.menus" class="m-2 d-flex mr-4">
                                <div class="p-1 br-1 aside d-flex ai-center jc-center" 
                                    style="cursor: pointer;border: 1px solid #ffffff;width: 15vh;"
                                    @click="tabClick(item.id)">
                                    {{ item.label }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-header>
        </el-container>
        <el-container>
            <el-main style="--el-main-padding:10px; display: flex; justify-content: center; flex-wrap: wrap; align-items: center;">
                <Light v-if="tabId == 2"/>
                <KeyMapping v-if="tabId == 0"/>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { keyboard } from '../../keyboard/keyboard';
import { RK_L87, RK_L87_EVENT_DEFINE } from '../../keyboard/rk_l87/rk_l87';
import { ConnectionStatusEnum, ConnectionType } from '../../keyboard/enum'
import Light from './light.vue'
import KeyMapping from './keyMapping.vue'

const tabId = ref(0)
const rk_l87 = ref<RK_L87>();

const state = reactive({
    menus: [
        { id: 0, label: 'KeyMapping' },
        { id: 1, label: 'Macro' },
        { id: 2, label: 'Light' }
    ],
    connectState: keyboard.state.ConnectionStatus,
    connectType: keyboard.state.connectType,
});

onMounted(async () => {
    state.connectState =  keyboard.state.ConnectionStatus;
    state.connectType = keyboard.state.connectType;
    rk_l87.value = (keyboard.protocol as RK_L87);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
});

onBeforeUnmount(() => {
    if (rk_l87.value != undefined) {
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
    }
});

const dongleStatusChanged = (event: any) => {
    keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
    state.connectState =  event.detail as ConnectionStatusEnum;
};

const tabClick = (id: number) => {
    tabId.value = id;
};
</script>