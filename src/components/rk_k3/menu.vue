<template>
    <div class="d-flex flex-column bg-white jc-between ai-center h-100">
        <div class="d-flex flex-column">
            <div class="box p-4" @click="home" :class="{ active: 0 === meunid }">
                <img src="@/assets/images/menu/mouse/home.png" />
            </div>
            <div v-for="item in menuList" class="box p-4" :class="{ active: item.id === meunid }"
                @click="onMenuClick(item.id)">
                <img :src="item.src" />
            </div>
        </div>
        <div>
            <div class="box p-4" :class="{ active: 5 === meunid }" @click="onMenuClick(5)">
                <img src="@/assets/images/menu/mouse/set.png" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_k3/menuStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const useMenu = useMenuStore();
const { meunid, menuList } = storeToRefs(useMenu);
// 页面加载时
onMounted(() => {
    useMenu.setMeunid(meunid.value);
});

const onMenuClick = async (id: any) => {
    useMenu.setMeunid(id)
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