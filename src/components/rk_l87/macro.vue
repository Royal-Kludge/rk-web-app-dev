<template>
    <div class="d-flex">
        
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { Protocol_RK_L87_Usb } from '../../keyboard/rk_l87';

const protocol = ref<Protocol_RK_L87_Usb>();

const state = reactive({
    
});

onMounted(async () => {
    protocol.value = (keyboard.protocol as Protocol_RK_L87_Usb);
    await getMacroData();
});

const getMacroData = async () => {
    if (protocol.value != undefined) {
        refresh();
    }
};

const refresh = () => {
};
</script>