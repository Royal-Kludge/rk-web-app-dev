<template>
    <div>
        <el-radio-group v-model="useAdvKey.$state.advKeySOCD.value" text-color="#00ffff" fill="#ffff00">
            <el-radio v-for="item in useAdvKey.$state.socdList" :value="item.value" :label="item.value">
                {{ $t(item.label) }}
            </el-radio>
        </el-radio-group>
    </div>
    <div class="d-flex ai-center jc-center mt-5">
        <div class="d-flex ai-center jc-center flex-column">
            <div class="d-flex">
                <div @click="useAdvKey.$state.advKeySOCD.selectedSOCD(useAdvKey.$state.advKeySOCD.list[0]?.index)"
                    :class="['boxBtn b-red', useAdvKey.$state.advKeySOCD.list[0]?.isSelected()]">
                    <span
                        style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                        v-html="useAdvKey.keyText(useAdvKey.$state.advKeySOCD.list[0]?.key)"></span>
                </div>
                <div class="m-3" style="width: 24px;"><img src="../../assets/images/menu/high/socd.png"
                        style="width: 24px;" /></div>
                <div @click="useAdvKey.$state.advKeySOCD.selectedSOCD(useAdvKey.$state.advKeySOCD.list[1]?.index)"
                    :class="['boxBtn b-blue', useAdvKey.$state.advKeySOCD.list[1]?.isSelected()]">
                    <span
                        style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                        v-html="useAdvKey.keyText(useAdvKey.$state.advKeySOCD.list[1]?.key)"></span>
                </div>
            </div>
            <div v-if="useAdvKey.$state.advKeySOCD.value == 1">
                <div class="d-flex m-3 jc-center">
                    <div class="d-flex flex-1 jc-center"><img src="../../assets/images/menu/high/up.png"
                            style="width: 24px;" /></div>
                    <div class="m-3" style="width: 36px;"></div>
                    <div class="d-flex flex-1 jc-center"><img src="../../assets/images/menu/high/up.png"
                            style="width: 24px;" /></div>
                </div>
                <div class="d-flex">
                    <div @click="useAdvKey.$state.advKeySOCD.selectedSOCD(useAdvKey.$state.advKeySOCD.list[2]?.index)"
                        :class="['boxBtn b-red', useAdvKey.$state.advKeySOCD.list[2]?.isSelected()]">
                        <span
                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                            v-html="useAdvKey.keyText(useAdvKey.$state.advKeySOCD.list[2]?.key)"></span>
                    </div>
                    <div class="m-3" style="width: 24px;"></div>
                    <div @click="useAdvKey.$state.advKeySOCD.selectedSOCD(useAdvKey.$state.advKeySOCD.list[3]?.index)"
                        :class="['boxBtn b-blue', useAdvKey.$state.advKeySOCD.list[3]?.isSelected()]">
                        <span
                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                            v-html="useAdvKey.keyText(useAdvKey.$state.advKeySOCD.list[3]?.key)"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="ml-3">
            <el-select v-model="useAdvKey.$state.advKeySOCD.mode" placeholder="Select">
                <el-option v-for="item in useAdvKey.$state.socdModeList" :value="item.value" :label="$t(item.label)">
                    {{ $t(item.label) }}
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

</script>
<style scoped lang="scss"></style>