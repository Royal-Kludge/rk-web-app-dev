<template>
    <div class="d-flex bg-white jc-between h-100">
        <div class="d-flex">
            <div class="box p-3 d-flex ai-center jc-center fs-xxl" @click="home" :class="{ active: 0 === meunid }">
                <img src="@/assets/images/menu/mouse/home.png" />
                <span class="ml-2">{{ $t("home.menu") }}</span>
            </div>
            <div v-for="item in menuList" class="box p-3 d-flex ai-center jc-center fs-xxl"
                :class="{ active: item.id === meunid }" @click="onMenuClick(item.id)">
                <img :src="item.src" />
                <span class="ml-2">{{ $t(item.title) }}</span>
            </div>
            <div class="box p-3 d-flex ai-center jc-center fs-xxl" @click="useMenu.setMeunid(5)" :class="{ active: 5 === meunid }">
                <img src="@/assets/images/menu/mouse/set.png" />
                <span class="ml-2">{{ $t("home.menu_5") }}</span>
            </div>
        </div>
        <div style="margin-right: 40px;">
            <div class="p-3 d-flex ai-center jc-center">
                <img src="@/assets/images/menu/mouse/battery-charge.png" v-if="state.batteryStatus == 1"
                    style="height: 28px;" />
                <img src="@/assets/images/menu/mouse/battery.png" v-else style="height: 28px;" />
                {{ state.batteryValue }}%
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_m3/menuStore";
import { storeToRefs } from "pinia";
import { reactive, onMounted, onBeforeUnmount } from "vue";
import { mouse, RK_MOUSE_EVENT_DEFINE } from '@/mouse/mouse'

const useMenu = useMenuStore();
const { meunid, menuList } = storeToRefs(useMenu);

const state = reactive({
    batteryStatus: 0,
    batteryValue: 0
});

// 页面加载时
onMounted(() => {
    mouse.addEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
    useMenu.setMeunid(meunid.value);

    state.batteryStatus = mouse.state.batteryStatus;
    state.batteryValue = mouse.state.batteryValue;
});

onBeforeUnmount(() => {
    if (mouse != undefined) {
        mouse.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
    }
});

const onMenuClick = async (id: any) => {
    useMenu.setMeunid(id)
}

const home = () => {
    useMenu.nameInit();
    useMenu.setMeunid(0);
};

const batteryGotten = async (event: any) => {
    // 电量
    state.batteryStatus = event.detail.state as number;
    state.batteryValue = event.detail.value as number;
};
</script>
<style scoped lang="scss">
.box {
    cursor: pointer;
    width: 239px;
    border-radius: 10px 10px 0% 0% !important;

    img {
        width: 16px;
    }
}

.active {
    color: #FC5D41 !important;
    background-color: #eff1f7 !important;

    img {
        position: relative;
        left: -99999px;
        filter: drop-shadow(#FC5D41 99999px 0);
    }
}
</style>