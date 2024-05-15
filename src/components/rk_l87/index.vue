<template>
  <div class="d-flex jc-center ai-center p-5 fs-big m-5" v-if="!isKeyboardConnect()">
    No keyboard connected to dongle
  </div>
  <div class="d-flex h-100" v-else>
    <Macro v-if="meunid === 2" />
    <Light v-else-if="meunid === 3" />
    <LightCustom v-else-if="meunid === 4" />
    <Set v-else-if="meunid === 5" />
    <Main v-else />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { keyboard } from "../../keyboard/keyboard";
import { RK_L87, RK_L87_EVENT_DEFINE } from "../../keyboard/rk_l87/rk_l87";
import { ConnectionStatusEnum, ConnectionType } from "../../keyboard/enum";
import Light from "./light.vue";
import LightCustom from "./lightCustom.vue";
import Macro from "./macro.vue";
import Set from "./set.vue";
import Main from "./main.vue"
import { useMenuStore } from "../../stores/menuStore";
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const rk_l87 = ref<RK_L87>();

const state = reactive({
  connectState: keyboard.state.ConnectionStatus,
  connectType: keyboard.state.connectType,
  password: 0
});

onMounted(async () => {
  state.connectState = keyboard.state.ConnectionStatus;
  state.connectType = keyboard.state.connectType;
  rk_l87.value = keyboard.protocol as RK_L87;
  rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
  rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
});

onBeforeUnmount(() => {
  if (rk_l87.value != undefined) {
    rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
    rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
  }
});

const isKeyboardConnect = (): boolean => {
  let isConnect = false;
  if (keyboard.state.connectType == ConnectionType.Dongle) {
    isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password == 0x03000000 + 0x0156;
  } else {
    isConnect = state.connectState == ConnectionStatusEnum.Connected;
  }

  return isConnect;
};

const dongleStatusChanged = (event: any) => {
  keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
  state.connectState = event.detail as ConnectionStatusEnum;
};

const passwordGotten = (event: any) => {
  state.password = event.detail as number;
};

</script>
