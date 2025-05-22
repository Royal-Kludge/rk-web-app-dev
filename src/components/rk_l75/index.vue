<template>
  <div class="d-flex h-100" style="overflow: hidden;" >
    <Macro v-if="meunid === 2" />
    <Light v-else-if="meunid === 3" />
    <SetFun v-else-if="meunid === 4" />
    <Set v-else-if="meunid === 5" />
    <Main v-else />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { keyboard } from "@/keyboard/beiying/keyboard";
import { RK_L75, RK_L75_EVENT_DEFINE } from "@/keyboard/beiying/rk_l75/rk_l75";
import { ConnectionStatusEnum } from "@/device/enum";
import Light from "./light.vue";
import SetFun from "./setfun.vue";
import Macro from "./macro.vue";
import Set from "./set.vue";
import Main from "./main.vue"
import { useMenuStore } from "@/stores/rk_l75/menuStore";
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const rk_l75 = ref<RK_L75>();

const state = reactive({
  connectState: keyboard.state.ConnectionStatus,
  connectType: keyboard.state.connectType,
});

onMounted(async () => {
  state.connectState = keyboard.state.ConnectionStatus;
  state.connectType = keyboard.state.connectType;
  rk_l75.value = keyboard.protocol as RK_L75;
  rk_l75.value.addEventListener(RK_L75_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
});

onBeforeUnmount(() => {
  if (rk_l75.value != undefined) {
    rk_l75.value.removeEventListener(RK_L75_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
  }
});

// const isKeyboardConnect = (): boolean => {
//   let isConnect = false;
//   if (keyboard.state.connectType == ConnectionType.Dongle && rk_l75.value != undefined) {
//     isConnect = state.connectState == ConnectionStatusEnum.Connected && rk_l75.value.data.donglePwd == 0x03000000 + 0x0156;
//   } else {
//     isConnect = state.connectState == ConnectionStatusEnum.Connected;
//   }

//   return isConnect;
// };

const dongleStatusChanged = (event: any) => {
  keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
  state.connectState = event.detail as ConnectionStatusEnum;
  if (state.connectState != ConnectionStatusEnum.Connected) {
    useMenu.setMeunid(0);
  }
};
</script>
