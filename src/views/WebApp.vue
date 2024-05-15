<template>
  <div class="d-flex h-100">
    <div style="min-width: 60px">
      <Meun />
    </div>
    <div class="flex-1">
      <RK_L87 />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Keyboard, keyboard } from '../keyboard/keyboard'
import RK_L87 from '../components/rk_l87/index.vue'
import Meun from "../components/menu.vue";

const disconnect = () => {
  keyboard.close();
};
</script>
