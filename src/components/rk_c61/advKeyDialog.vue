<template>
    <el-drawer v-model="useAdvKey.$state.isAdvKeyDialog" direction="btt" @opened="opened()" @closed="closed()"
        :with-header="false" size="40%" style="--el-drawer-padding-primary:10px;--el-drawer-bg-color: #F8F8FC">
        <div class="d-flex jc-end">
            <div class="bg-dark p-1 br-2 px-4 c-p text-white" @click="useAdvKey.saveAdvKey()">保存</div>
        </div>
        <div class="d-flex">
            <div class="d-flex" v-if="titleid == AdvKeyTypeEnum.MACRO">
                <advKeyMacro />
            </div>
            <div class="d-flex" v-else>
                <div style="width: 380px;">
                    <AdvKeyDKS v-if="titleid == AdvKeyTypeEnum.DKS" />
                    <AdvKeyMT v-if="titleid == AdvKeyTypeEnum.MT" />
                    <advKeyTGL v-if="titleid == AdvKeyTypeEnum.TGL" />
                    <AdvKeyMPT v-if="titleid == AdvKeyTypeEnum.MPT" />
                    <advKeyEND v-if="titleid == AdvKeyTypeEnum.END" />
                    <advKeySOCD v-if="titleid == AdvKeyTypeEnum.SOCD" />
                </div>
                <div class="d-flex flex-1">
                    <AdvKey />
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script setup lang="ts">
import AdvKey from "./advKey.vue";
import AdvKeyDKS from "./advKeyDKS.vue";
import AdvKeyMT from "./advKeyMT.vue";
import advKeyTGL from "./advKeyTGL.vue";
import AdvKeyMPT from "./advKeyMPT.vue";
import advKeyEND from "./advKeyEND.vue";
import advKeySOCD from "./advKeySOCD.vue";
import advKeyMacro from "./advKeyMacro.vue";
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { storeToRefs } from "pinia";
import { AdvKeyTypeEnum } from "@/keyboard/sparklink/enum";

const useAdvKey = useAdvKeyStore();
const { titleid } = storeToRefs(useAdvKey);

const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
};

const opened = () => {
    document.removeEventListener('keydown', onKeyDown);
    document.addEventListener('keydown', onKeyDown);
};

const closed = () => {
    document.removeEventListener('keydown', onKeyDown);
};

</script>
<style scoped lang="scss"></style>