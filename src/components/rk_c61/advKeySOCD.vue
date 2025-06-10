<template>
    <div>
        <el-radio-group v-model="useAdvKeySOCD.$state.socdVal" text-color="#00ffff" fill="#ffff00">
            <el-radio v-for="item in useAdvKeySOCD.$state.socdList" :value="$t(item.value)" :label="$t(item.label)">
                {{ $t(item.label) }}
            </el-radio>
        </el-radio-group>
    </div>
    <div class="d-flex ai-center jc-center mt-5">
        <div class="d-flex ai-center jc-center flex-column">
            <div class="d-flex">
                <div class="boxBtn b-red">A</div>
                <div class="m-3"><img src="../../assets/images/menu/high/socd.png" style="width: 24px;" /></div>
                <div class="boxBtn mr-3">A</div>
            </div>
            <div v-if="useAdvKeySOCD.$state.socdVal == '绑定键值（两个键值互相绑定）'">
                <div class="d-flex m-3 jc-center">
                    <div class="d-flex flex-1 jc-center"><img src="../../assets/images/menu/high/up.png"
                            style="width: 24px;" /></div>
                    <div class="m-3" style="width: 24px;"></div>
                    <div class="d-flex flex-1 jc-center"><img src="../../assets/images/menu/high/up.png"
                            style="width: 24px;" /></div>
                </div>
                <div class="d-flex">
                    <div class="boxBtn b-red">A</div>
                    <div class="m-3" style="width: 24px;"></div>
                    <div class="boxBtn mr-3">A</div>
                </div>
            </div>
        </div>
        <div>
            <el-select v-model="useAdvKeySOCD.$state.modeVal" placeholder="Select">
                <el-option v-for="item in useAdvKeySOCD.$state.modeList" :key="item.value" :label="$t(item.label)"
                    :value="item.value" />
            </el-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdvKeySOCDStore } from "@/stores/rk_c61/advKeySOCDStore";

const useAdvKeySOCD = useAdvKeySOCDStore();

</script>
<style scoped lang="scss"></style>