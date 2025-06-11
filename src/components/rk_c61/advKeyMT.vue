<template>
    <div class="d-flex flex-column ai-center">
        <div class="d-flex ai-center jc-center m-3">
            <div class="d-flex ai-center jc-center flex-column mr-5">
                <div>按住</div>
                <div class="boxBtn">A</div>
            </div>
            <div class="d-flex ai-center jc-center flex-column">
                <div>单击</div>
                <div class="boxBtn">A</div>
            </div>
        </div>
        <div class="mt-4">长按触发延时（单位：ms）</div>
        <div class="d-flex ai-center m-3">
            <div><el-slider style="width: 280px" :step="1" :max="20" :min="1" v-model="value" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
<style scoped lang="scss"></style>