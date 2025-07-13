<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="flex-1">
        <div class="d-flex flex-column h-100">
            <div>
                <Nav v-if="meunid == 1" />
            </div>
            <div class="d-flex jc-center ai-center flex-1">
                <Key />
            </div>
            <div class="d-flex mx-1">
                <div style="height: 275px;overflow: hidden;" class="w-100">
                    <Performance v-if="meunid == 2" />
                    <advKeyList v-if="meunid == 3" />
                    <Fun v-else />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MainMeun from "./mainMenu.vue";
import Key from "./key.vue";
import Nav from "./nav.vue";
import Fun from "./fun.vue";
import Performance from "./performance.vue"
import advKeyList from "./advKeyList.vue"
import { storeToRefs } from "pinia";

import { useMenuStore } from "@/stores/rk_c61/menuStore";
const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);
</script>
<style scoped lang="scss"></style>