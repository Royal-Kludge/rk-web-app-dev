<template>
    <div class="d-flex jc-center ai-center flex-column">
        <div class="mt-4 br-2 bg-white py-2 px-4 text-black" style="cursor: pointer;font-size: 14px;width: 72px;text-align: center;" @click="disconnect">
            Disconnect
        </div>
        <div>
            <RK_L87 />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Keyboard, keyboard } from '../keyboard/keyboard'
import RK_L87 from '../components/rk_l87/index.vue'

const disconnect = () => {
    keyboard.close();
};
</script>
