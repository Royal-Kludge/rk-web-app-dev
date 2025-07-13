<template>
    <div class="d-flex flex-column">
        <div class="d-flex ai-center m-3" v-for="item in useAdvKey.$state.advKeyMPT.list">
            <div @click="useAdvKey.$state.advKeyMPT.selectedMPT(item.index)"
                :class="['boxBtn mr-3', item.isSelected()]"><span
                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                    v-html="useAdvKey.keyText(item.key)"></span></div>
            <div><el-slider style="width: 280px" :step="useAdvKey.minTravel" :max="useAdvKey.maxTravel" :min="useAdvKey.minTravel" v-model="item.value" /></div>
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