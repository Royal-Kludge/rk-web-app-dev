<template>
  <div v-if="meunid > 0" class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <div style="min-width: 60px">
      <Meun />
    </div>
    <div class="flex-1">
      <RK_L87_Page />
    </div>
  </div>
  <div v-else class="d-flex flex-column ai-center">
    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
      RK-R87PRO
    </div>
    <div class="my-4"><img src="../assets/images/keyboard.png" /></div>
    <div class="bg-white text-blue py-3 px-5 my-4 c-p" style="border-radius: 10px" @click="useMenu.setMeunid(1);">
      点击进入
    </div>
    <div class="bg-white text-blue py-3 px-5 my-4 c-p" style="border-radius: 10px" @click="disconnect">关闭设备
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "../stores/menuStore";
import { Keyboard, keyboard } from '../keyboard/keyboard'
import RK_L87_Page from '../components/rk_l87/index.vue'
import { RK_L87, RK_L87_EVENT_DEFINE } from "../keyboard/rk_l87/rk_l87";
import Meun from "../components/menu.vue";
import { ElMessage } from 'element-plus'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const loading = ref(false)

onMounted(async () => {
  rk_l87.value = keyboard.protocol as RK_L87;
  rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnReportStart, reportStart, false);
  rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
});

onBeforeUnmount(() => {
  if (rk_l87.value != undefined) {
    rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
    rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnReportStart, reportStart, false);
  }
});

const rk_l87 = ref<RK_L87>();

const reportStart = async (event: any) => {
  if (event != undefined && event.detail != undefined) {
    loading.value = true
  }
};

const reportFinish = async (event: any) => {
  if (event != undefined && event.detail != undefined) {
    if (event.detail == 'finish') {
      loading.value = false
      //ElMessage.info('Report finish!');
    }
    if (event.detail == 'timeout') {
      loading.value = false;
      //ElMessage.error('Report timeout!');
    }
  }
};

const disconnect = () => {
  keyboard.close();
};
</script>
