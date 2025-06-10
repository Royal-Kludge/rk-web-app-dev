<template>
    <div class="d-flex flex-column">
        <div class="d-flex ai-center m-3">
            <div class="boxBtn mr-3">A</div>
            <div><el-slider style="width: 280px" :step="1" :max="20" :min="1" v-model="value" /></div>
        </div>
        <div class="d-flex ai-center m-3">
            <div class="boxBtn mr-3">A</div>
            <div><el-slider style="width: 280px" :step="1" :max="20" :min="1" v-model="value" /></div>
        </div>
        <div class="d-flex ai-center m-3">
            <div class="boxBtn mr-3">A</div>
            <div><el-slider style="width: 280px" :step="1" :max="20" :min="1" v-model="value" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
<style scoped lang="scss">
</style>