<template>
  <div class="d-flex h-100" v-loading="loading" :element-loading-text="$t('home.title_1')"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <div style="min-width: 60px">
      <Meun />
    </div>
    <div class="flex-1">
      <RK_L87_Page />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Keyboard, keyboard } from '../keyboard/keyboard'
import RK_L87_Page from '../components/rk_l87/index.vue'
import { RK_L87, RK_L87_EVENT_DEFINE } from "../keyboard/rk_l87/rk_l87";
import Meun from "../components/menu.vue";
import { ElMessage } from 'element-plus'
import { ref, onMounted, onBeforeUnmount } from 'vue';

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
</script>
