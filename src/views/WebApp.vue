<template>
  <RK_L87_Page v-if="productId == 1" />
  <RK_M87_Page v-else-if="productId == 2" />
  <RK_L75_Page v-else-if="productId == 3" />
</template>

<script setup lang="ts">
import { keyboard } from '@/keyboard/keyboard'
import RK_L87_Page from '@/components/rk_l87/home.vue'
import RK_M87_Page from '@/components/rk_m87/home.vue'
import RK_L75_Page from '@/components/rk_l75/home.vue'
import { ref, onMounted } from 'vue';

const productId = ref(0);

onMounted(async () => {
  if (keyboard != undefined && keyboard.keyboardDefine != undefined) {
    switch (keyboard.keyboardDefine.name.valueOf()) {
      case 'RK-R87PRO':
        productId.value = 1
        break;
      case 'RK-M87':
        productId.value = 2
        break;
      case 'RK-L75':
        productId.value = 3
        break;
    }
  }
});

</script>