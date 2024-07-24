<template>
  <div class="d-flex flex-column ai-center">
    <div class="text-black my-4" style="font-size: 120px; font-weight: bold">
      欢迎来到 RK HUB WEB
    </div>
    <div class="bg-white text-blue py-3 px-5 my-4 c-p" style="border-radius: 10px" @click="connect"
      v-if="isHidAvailable">
      初始化设备
    </div>
    <div class="text-blue" v-else>
      <h1>{{ $t("home.title") }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { keyboard } from '../keyboard/keyboard'
import { ElMessage } from 'element-plus'

const isHidAvailable = ref(false);

const emits = defineEmits<{
  (e: 'onConnect'): void;
}>();

onMounted(() => {
  nextTick(() => {
    isHidAvailable.value = keyboard.isHidAvailable;
    if (!keyboard.isHidAvailable) {
      ElMessage({
        showClose: true,
        message: 'WebHID not supported by browser or not available.',
        type: 'error',
      });
    }
  });
});

const connect = async () => {
  emits('onConnect');
};
</script>