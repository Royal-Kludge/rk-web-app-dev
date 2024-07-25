<template>
  <div class="d-flex ai-center jc-center h-100">
    <div class="d-flex flex-column ai-center">
      <div class="d-flex text-black my-4" style="font-size: 96px; font-weight: bold;font-family:'Microsoft YaHei';">
        {{ $t("home.title_2") }}
      </div>
      <div class="d-flex flex-column ai-center text-black my-4 m-2" style="font-family:'Microsoft YaHei';">
        <div>{{ $t("home.title_3") }}</div>
        <div>{{ $t("home.title_4") }}</div>
        <div>{{ $t("home.title_5") }}</div>
      </div>
      <div class="d-flex jc-center text-white py-3 px-5 c-p mt-5 mb-5"
        style="border-radius: 10px;background-color: #B4B4C8;width: max-content;" @click="connect"
        v-if="isHidAvailable">
        {{ $t("home.but_2") }}
      </div>
      <div class="text-blue" v-else>
        <h1>{{ $t("home.title") }}</h1>
      </div>
      <div class="mt-5" style="font-weight: bold;font-family:'Microsoft YaHei';" @click="openSite">{{
        $t("home.title_6") }}<span class="site c-p"> www.rkgaming.com</span></div>
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

const openSite = () => {
  window.open('https://www.rkgaming.com/', '_blank') // 新窗口打开外连接
}

const connect = async () => {
  emits('onConnect');
};
</script>
<style lang="scss">
.site:hover {
  color: #1675F2;
}
</style>