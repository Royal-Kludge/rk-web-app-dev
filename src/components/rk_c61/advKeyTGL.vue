<template>
    <div class="d-flex flex-column ai-center">
        <div class="d-flex ai-center jc-center">
            <div class="d-flex ai-center jc-center flex-column m-4" v-for="item in useAdvKey.$state.advKeyTGL.list">
                <div>{{ item.title }}</div>
                <div @click="useAdvKey.$state.advKeyTGL.selectedTGL(item.index)" :class="['boxBtn', item.isSelected()]">
                    <span
                        style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                        v-html="useKey.itemText(item.key)"></span>
                </div>
            </div>
        </div>
        <div class="mt-4">长按触发延时（单位：ms）</div>
        <div class="d-flex ai-center m-3">
            <div><el-slider style="width: 280px" :step="1" :max="20" :min="1"
                    v-model="useAdvKey.$state.advKeyTGL.value" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();
</script>
<style scoped lang="scss"></style>