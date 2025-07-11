<template>
    <div class="d-flex flex-column ai-center m-5">
        <div class="boxBtn"><span style="word-wrap: break-word;"
                v-html="useKey.keyText(useKey.keyState?.keyData)"></span></div>
        <div class="mt-4">
            <el-select v-model="useAdvKey.$state.advKeyMacro.macroIndex" placeholder="Select"
                @change="useAdvKey.setMacro(macros?.find(useAdvKey.$state.advKeyMacro.macroIndex))">
                <el-option v-for="item in macros?.get()" :label="$t(item.name)" :value="item.index" />
            </el-select>
        </div>
    </div>
    <div class="m-5">
        <el-radio-group v-model="useAdvKey.$state.advKeyMacro.mode" text-color="#00ffff" fill="#ffff00">
            <el-radio v-for="item in useAdvKey.$state.macroModeList" :value="item.value" :label="item.value"
                style="width: 100%;">
                {{ $t(item.label) }}
            </el-radio>
        </el-radio-group>
    </div>
    <div class="m-5">
        <div>
            重复次数：
        </div>
        <div>
            <el-input-number v-model="useAdvKey.$state.advKeyMacro.times" :min="1" :max="20" class="ml-3" />
        </div>
        <div>
            重复间隔：
        </div>
        <div>
            <el-input-number v-model="useAdvKey.$state.advKeyMacro.interval" :min="1" :max="20" class="ml-3" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { useMacroStore } from "@/stores/rk_c61/macroStore";
import { storeToRefs } from "pinia";
import { useKeyStore } from "@/stores/rk_c61/keyStore";

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();
const useMacro = useMacroStore();
const { macros } = storeToRefs(useMacro);

onMounted(async () => {
    await useKey.init();
    await useMacro.init();
    useAdvKey.$state.macro = macros.value?.find(useAdvKey.$state.advKeyMacro.macroIndex);
    useAdvKey.setMacro(useAdvKey.$state.macro);
});

onBeforeUnmount(() => {
    useKey.destroy();
    useMacro.destroy();
});
</script>
<style scoped lang="scss"></style>