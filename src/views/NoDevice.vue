<template>
    <div class="d-flex jc-center ai-center" style="height: 100vh;">
        <div class="d-flex ai-center flex-column">
            <div class="d-flex ai-center mb-4 bg-white" style="width: 50vh;border-radius: 20px;margin-top: -25vh;">
                <img style="width: 100%;" src="../assets/images/logo.png"/>
            </div>
            <div class="d-flex ai-center mt-3">
                <div class="m-2 br-2 bg-white py-2 px-4 text-black" style="cursor: pointer;font-size: 14px;height: 64px;width: 186px;text-align: center;" @click="connect" v-if="isHidAvailable">
                    <h2>Connect</h2>
                </div>
                <div class="m-2 br-2" v-else>
                    <h1>WebHID not supported by browser or not available</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick  } from 'vue';
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