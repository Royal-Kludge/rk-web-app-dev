<template>
    <div style="min-width: 210px;width: 240px;">
        <div class="bg-grey d-flex flex-column jc-between h-100">
            <div class="d-flex flex-column flex-1">
                <div class="d-flex flex-column h-100">
                    <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t('light.title') }}</div>
                    <div style="height: 78vh">
                        <el-scrollbar>
                            <div style="padding-left: 16%" v-for="item in useLight.state.lightEffects"
                                class="module_box d-flex p-3 my-2 text-grey-1 jc-between"
                                :class="[useLight.selectd(item.light)]" @click="onLightClick(item.light)">
                                <div class="d-flex">
                                    <span class="pr-4 d-flex ai-center">
                                        <img src="../../assets/images/dot.png" />
                                    </span>
                                    <span>
                                        {{ $t(item.label) }}
                                    </span>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-1">
        <div class="d-flex flex-column h-100">
            <div class="d-flex jc-center ai-center flex-1">
                <Key />
            </div>
            <div style="height: 320px;overflow: hidden;">
                <LightColor />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Key from "./key.vue";
import LightColor from "./lightColor.vue";
import { uselightStore } from "@/stores/rk_r98pro/lightStore";
import { useKeyStore } from "@/stores/rk_r98pro/keyStore";
import { onMounted, onBeforeUnmount } from "vue";

const useKey = useKeyStore();
const useLight = uselightStore();

onMounted(async () => {
    await useKey.getKeyMatrixNomal()
});

const onLightClick = async (light: any) => {
    useLight.state.lightProps.light = light;
    await useLight.lightClick(light);
    useKey.saveProfile();
    useKey.unSelected();
}
</script>