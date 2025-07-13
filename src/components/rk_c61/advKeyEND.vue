<template>
    <div class="d-flex flex-column ai-center">
        <div class="d-flex ai-center jc-center m-3">
            <div class="d-flex ai-center jc-center flex-column mr-5" v-for="item in useAdvKey.$state.advKeyEND.list">
                <div @click="useAdvKey.$state.advKeyEND.selectedEND(item.index)" :class="['boxBtn', item.isSelected()]">
                    <span
                        style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                        v-html="useAdvKey.keyText(item.key)"></span>
                </div>
            </div>
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