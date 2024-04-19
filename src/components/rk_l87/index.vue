<template>
    <el-container>
        <el-header style="height: 5vh; margin-top: 2vh;">
            <div class="d-flex jc-center ai-center">
                <div class="d-flex ai-center flex-column">
                    <div class="d-flex ai-center jc-center mb-4" style="width: 50vh;border-radius: 20px;">
                        <div v-for="item in state.menus" class="m-2 d-flex mr-4">
                            <div class="p-1 br-1 aside d-flex ai-center jc-center" style="cursor: pointer;border: 1px solid #ffffff;width: 15vh;">{{ item.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-header>
    </el-container>
    <el-container>
        <el-main style="--el-main-padding:10px; display: flex; justify-content: center; flex-wrap: wrap; align-items: center;">
            <Light />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import Light from './light.vue'

const state = reactive({
    menus: [
        { id: 0, label: 'KeyMapping' },
        { id: 1, label: 'Macro' },
        { id: 2, label: 'Light' }
    ]
});
</script>