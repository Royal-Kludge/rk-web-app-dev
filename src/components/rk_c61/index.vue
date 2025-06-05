<template>
  <div class="d-flex h-100" style="overflow: hidden;" >
    <Macro v-if="meunid === 4" />
    <Light v-else-if="meunid === 5" />
    <SetFun v-else-if="meunid === 6" />
    <Set v-else-if="meunid === 7" />
    <Main v-else />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { keyboard } from "@/keyboard/sparklink/keyboard";
import { RK_C61, RK_C61_EVENT_DEFINE } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { ConnectionStatusEnum } from "@/device/enum";
import Light from "./light.vue";
import SetFun from "./setfun.vue";
import Macro from "./macro.vue";
import Set from "./set.vue";
import Main from "./main.vue"
import { useMenuStore } from "@/stores/rk_c61/menuStore";
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const rk_c61 = ref<RK_C61>();

const state = reactive({
  connectState: keyboard.state.ConnectionStatus,
  connectType: keyboard.state.connectType,
});

onMounted(async () => {
  state.connectState = keyboard.state.ConnectionStatus;
  state.connectType = keyboard.state.connectType;
  rk_c61.value = keyboard.protocol as RK_C61;
});

onBeforeUnmount(() => {
  if (rk_c61.value != undefined) {
  }
});
</script>
