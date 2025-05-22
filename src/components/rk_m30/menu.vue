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
                <img src="@/assets/images/menu/mouse/battery-0.png" v-if="batteryImg() == 0" style="height: 22px;" />
                <img src="@/assets/images/menu/mouse/battery-1.png" v-if="batteryImg() == 1" style="height: 22px;" />
                <img src="@/assets/images/menu/mouse/battery-2.png" v-if="batteryImg() == 2" style="height: 22px;" />
                <img src="@/assets/images/menu/mouse/battery-3.png" v-if="batteryImg() == 3" style="height: 22px;" />
                <img src="@/assets/images/menu/mouse/battery-4.png" v-if="batteryImg() == 4" style="height: 22px;" />
                <!-- <span class="ml-2">{{ state.batteryValue }}%</span>-->
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMenuStore } from "@/stores/rk_m30/menuStore";
import { storeToRefs } from "pinia";
import { reactive, onMounted, onBeforeUnmount } from "vue";
import { mouse } from '@/mouse/beiying/mouse'
import { RK_MOUSE_EVENT_DEFINE } from '@/mouse/beiying/state'

const useMenu = useMenuStore();
const { meunid, menuList } = storeToRefs(useMenu);

const state = reactive({
    batteryStatus: 0,
    batteryValue: 0,
});

// 页面加载时
onMounted(() => {
    if (mouse != undefined && mouse.report != undefined) {
        mouse.report.addEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
    }
    useMenu.setMeunid(meunid.value);

    state.batteryStatus = mouse.state.batteryStatus;
    state.batteryValue = mouse.state.batteryValue;
});

onBeforeUnmount(() => {
    if (mouse != undefined && mouse.report != undefined) {
        mouse.report.removeEventListener(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, batteryGotten, false);
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

const batteryImg = (): number => {
    if (state.batteryStatus == 1) return 0;
    if (state.batteryValue <= 30) return 1;
    if (state.batteryValue > 30 && state.batteryValue <= 55) return 2;
    if (state.batteryValue > 55 && state.batteryValue <= 80) return 3;
    if (state.batteryValue > 90) return 4;
    return 0;
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