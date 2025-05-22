<template>
  <div class="d-flex flex-column bg-white jc-between ai-center h-100">
    <div class="d-flex flex-column">
      <div class="box p-4 cur" @click="home" :class="{ active: 0 === meunid }">
        <img src="@/assets/images/menu/home.png" />
      </div>
      <div class="box p-4" v-for="item in menuList" :class="{ active: item.id === meunid }">
        <img class="cur" :src="item.src" v-if="(item.id != 6 || (item.id == 6 && isShowTFT))" @click="onMenuClick(item.id)"/>
      </div>
    </div>
    <div>
      <div class="box p-4" :class="{ active: 5 === meunid }" @click="onMenuClick(5)">
        <img src="@/assets/images/menu/exit.png" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_m87/menuStore";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useKeyStore } from "@/stores/rk_m87/keyStore";
import { keyboard } from "@/keyboard/beiying/keyboard";
import { uselightStore } from "@/stores/rk_m87/lightStore";
import { ConnectionType, ConnectionStatusEnum } from "@/device/enum";
import { RK_M87, RK_M87_EVENT_DEFINE } from "@/keyboard/beiying/rk_m87/rk_m87";

const useKey = useKeyStore();
const useMenu = useMenuStore();
const useLight = uselightStore();
const { meunid, menuList } = storeToRefs(useMenu);

const isShowTFT = ref(false);

const rk_m87 = ref<RK_M87>();

// 页面加载时
onMounted(() => {
  useMenu.setMeunid(meunid.value);
  rk_m87.value = keyboard.protocol as RK_M87;
  rk_m87.value.addEventListener(RK_M87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
  rk_m87.value.addEventListener(RK_M87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
  isShowTFT.value = keyboard.state.connectType == ConnectionType.USB;
});

onBeforeUnmount(() => {
    if (rk_m87.value != undefined) {
        rk_m87.value.removeEventListener(RK_M87_EVENT_DEFINE.OnDongleStatusChanged, dongleStatusChanged, false);
        rk_m87.value.removeEventListener(RK_M87_EVENT_DEFINE.OnPasswordGotten, passwordGotten, false);
    }
});

const onMenuClick = async (id: any) => {
  useKey.unSelected();
  useMenu.setMeunid(id)
  if (id == 3) {
    await useLight.saveBoardProfileToDevice();
  }
}

const home = () => {
  //keyboard.close();
  useMenu.nameInit();
  useMenu.setMeunid(0);
};

const state = reactive({
    connectState: keyboard.state.ConnectionStatus,
    connectType: keyboard.state.connectType,
    password: 0
});

const isKeyboardConnect = (): boolean => {
    let isConnect = false;
    if (keyboard.state.connectType == ConnectionType.Dongle) {
        isConnect = state.connectState == ConnectionStatusEnum.Connected && state.password == 0x06000000 + 0x2A;
    } else {
        isConnect = state.connectState == ConnectionStatusEnum.Connected;
    }

    return isConnect;
};

const dongleStatusChanged = (event: any) => {
    keyboard.state.ConnectionStatus = event.detail as ConnectionStatusEnum;
    state.connectState = event.detail as ConnectionStatusEnum;
    if (state.connectState == ConnectionStatusEnum.Disconnected) {
        state.password = 0;
    }
};

const passwordGotten = (event: any) => {
    state.password = event.detail as number;
};
</script>
<style scoped lang="scss">
.box {
  img {
    width: 32px;
  }

  .active {
    color: #FC5D41 !important;

    img {
      position: relative;
      left: -99999px;
      filter: drop-shadow(#FC5D41 99999px 0);
    }
  }
}
.cur {
  cursor: pointer;
}
</style>