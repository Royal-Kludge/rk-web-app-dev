<template>
    <div class="d-flex jc-center w-100">
        <div class="d-flex flex-column ml-4 my-4" style="width: 50%;">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t("set.title_6") }}
            </div>
            <div class="bg-white-1" style="border-radius: 0px 0px 10px 10px;height: 95%;">
                <div class="m-5 d-flex ai-center flex-column">
                    <div class="m-4">{{ $t("set.mode_title") }}</div>
                    <div>
                        <el-slider style="width: 360px" v-model="mode" :min="0" :max="3" :step="3"
                            :format-tooltip="formatModeValue" @change="DebounceChanged" />
                    </div>
                    <div class="m-4">{{ $t(modeStr) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { uselightStore } from "@/stores/rk_m65/lightStore";
import { useKeyStore } from "@/stores/rk_m65/keyStore";

import { useI18n } from 'vue-i18n';

// 解构出t方法
const { t } = useI18n();
const useLight = uselightStore();
const useKey = useKeyStore();
const mode = ref(0);

const modeStr = computed(() => (mode.value >= 2 ? "set.mode_work" : "set.mode_game"))

const formatModeValue = (val: number) => {
    if (val >= 2)
        return t("set.mode_work");
    else
        return t("set.mode_game");
}
onMounted(async () => {
    await useLight.init();
    mode.value = useLight.state.debounce;
});

onBeforeUnmount(() => {
    useLight.destroy();
});

const DebounceChanged = () => {
    useLight.DebounceChanged(mode.value);
    useKey.saveProfile();
}

</script>
<style lang="scss" scoped>
</style>