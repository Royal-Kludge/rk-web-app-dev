<template>
    <div class="d-flex flex-column ai-center m-5">
        <div class="boxBtn">A</div>
        <div class="mt-4">
            <el-select v-model="useAdvKeyMacro.$state.modeVal" placeholder="Select">
                <el-option v-for="item in useAdvKeyMacro.$state.modeList" :key="item.value" :label="$t(item.label)"
                    :value="item.value" />
            </el-select>
        </div>
    </div>
    <div class="m-5">
        <el-radio-group v-model="useAdvKeyMacro.$state.socdVal" text-color="#00ffff" fill="#ffff00">
            <el-radio v-for="item in useAdvKeyMacro.$state.socdList" :value="$t(item.value)" :label="$t(item.label)"
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
            <el-input-number v-model="useAdvKeyMacro.$state.times" :min="1" :max="20" class="ml-3" />
        </div>
        <div>
            重复间隔：
        </div>
        <div>
            <el-input-number v-model="useAdvKeyMacro.$state.interval" :min="1" :max="20" class="ml-3" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdvKeyMacroStore } from "@/stores/rk_c61/advKeyMacroStore";

const useAdvKeyMacro = useAdvKeyMacroStore();

</script>
<style scoped lang="scss"></style>