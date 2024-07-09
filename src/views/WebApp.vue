<template>
  <div class="d-flex h-100">
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

onMounted(async () => {
  rk_l87.value = keyboard.protocol as RK_L87;
  rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
});

onBeforeUnmount(() => {
  if (rk_l87.value != undefined) {
    rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnReportFinish, reportFinish, false);
  }
});

const rk_l87 = ref<RK_L87>();

const reportFinish = async (event: any) => {
        if (event != undefined && event.detail != undefined) {
            if (event.detail == 'finish') ElMessage.info('Report finish!');
            if (event.detail == 'timeout') ElMessage.error('Report timeout!');
        }
    };
</script>
