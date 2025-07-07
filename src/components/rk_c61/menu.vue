<template>
    <div class="d-flex flex-column bg-white jc-between ai-center h-100">
        <div class="d-flex flex-column">
            <div class="box p-4" @click="home" :class="{ active: 0 === meunid }">
                <img src="@/assets/images/menu/home.png" />
            </div>
            <div v-for="item in menuList" class="box p-4" :class="{ active: item.id === meunid }"
                @click="onMenuClick(item.id)">
                <img :src="item.src" />
            </div>
        </div>
        <div>
            <div class="box p-4" :class="{ active: 7 === meunid }" @click="onMenuClick(7)">
                <img src="@/assets/images/menu/exit.png" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_c61/menuStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { usePerformanceStore } from "@/stores/rk_c61/performanceStore";
const usePerformance = usePerformanceStore();

const useMenu = useMenuStore();

const { meunid, menuList } = storeToRefs(useMenu);
const { travelTestOn, isAdjusting } = storeToRefs(usePerformance);
// 页面加载时
onMounted(() => {
    useMenu.setMeunid(meunid.value);
});

const onMenuClick = async (id: any) => {
    useMenu.setMeunid(id)
    if (id != 2) {
        travelTestOn.value = false;
        isAdjusting.value = false;
    }
}

const home = () => {
    useMenu.nameInit();
    useMenu.setMeunid(0);
};
</script>
<style scoped lang="scss">
.box {
    cursor: pointer;

    img {
        width: 32px;
    }

    .active {
        color: #FC5D41 !important;

        img {
            position: relative;
            left: -99999px;
            filter: drop-shadow(#FC5D41 99999px 0);
        }
    }
}
</style>