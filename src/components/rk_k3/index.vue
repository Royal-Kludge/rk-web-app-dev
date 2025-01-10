<template>
    <div class="d-flex h-100" style="overflow: hidden;">
        <Macro v-if="meunid === 2" />
        <Speed v-else-if="meunid === 3" />
        <Property v-else-if="meunid === 4" />
        <Set v-else-if="meunid === 5" />
        <Main v-else />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import Speed from "./speed.vue";
import Property from "./property.vue";
import Macro from "./macro.vue";
import Set from "./set.vue";
import Main from "./main.vue"
import { useMenuStore } from "@/stores/rk_k3/menuStore";
import { storeToRefs } from "pinia";

const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

</script>