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
import { RK_M65, RK_M65_EVENT_DEFINE } from "@/keyboard/beiying/rk_m65/rk_m65";
import { ConnectionStatusEnum } from "@/device/enum";
import Light from "./light.vue";
import SetFun from "./setfun.vue";
import Macro from "./macro.vue";
import Set from "./set.vue";
import Main from "./main.vue"
import { useMenuStore } from "@/stores/rk_m65/menuStore";
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const rk_m65 = ref<RK_M65>();

const state = reactive({
  connectState: keyboard.state.ConnectionStatus,
  connectType: keyboard.state.connectType,
});

onMounted(async () => {
  state.connectState = keyboard.state.ConnectionStatus;
  state.connectType = keyboard.state.connectType;
  rk_m65.value = keyboard.protocol as RK_M65;
  rk_m65.value.addEventListener(RK_M65_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
});

onBeforeUnmount(() => {
  if (rk_m65.value != undefined) {
    rk_m65.value.removeEventListener(RK_M65_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
  }
});

// const isKeyboardConnect = (): boolean => {
//   let isConnect = false;
//   if (keyboard.state.connectType == ConnectionType.Dongle && rk_m65.value != undefined) {
//     isConnect = state.connectState == ConnectionStatusEnum.Connected && rk_m65.value.data.donglePwd == 0x03000000 + 0x0156;
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
