<template>
    <div class="d-flex w-100">
        <div class="flex-1 ml-3">
            <div style="height: 100vh;" class="bg-white w-100">
                <div style="height: 30vh;">
                    <el-scrollbar>
                        <div style="width: 100%;">
                            <div class="d-flex flex-wrap">
                                <div v-for="item in useAdvKey.$state.advanceKeys">
                                    <div class="d-flex m-2 b-grey br-1 item" :class="[item.isSelected()]"
                                        @mouseover="useAdvKey.selectAdvanced(item)"
                                        @mouseout="useAdvKey.unSelectAdvanced()">
                                        <div class="d-flex c-p" @click="useAdvKey.advKeyClick(item)">
                                            <div class="d-flex p-2 ai-center jc-center"
                                                style="border-right: 3px solid #ea5413; width: 32px;height: 32px;">
                                                <img :src="advKeyIcon(item.advType)" />
                                            </div>
                                            <div v-if="item.advType == MagKeyAdvanceTypeEnum.MACRO && (item as AdvKeyMacro).macro != null"
                                                class="d-flex ai-center jc-center m-2 bg-grey p-2">
                                                {{ item.data.name }}
                                            </div>
                                            <div v-else-if="item.advType == MagKeyAdvanceTypeEnum.SOCD && (item as AdvKeySOCD).value == 1"
                                                v-for="key in item.data.slice(0, 2)"
                                                class="d-flex ai-center jc-center m-2 bg-grey"
                                                style="width: 32px;height: 32px;overflow: hidden;">
                                                <span
                                                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                                                    v-html="useKey.itemText(key.key)"></span>
                                            </div>
                                            <div v-else v-for="key in item.data"
                                                class="d-flex ai-center jc-center m-2 bg-grey"
                                                style="width: 32px;height: 32px;overflow: hidden;">
                                                <span
                                                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                                                    v-html="useKey.itemText(key.key)"></span>
                                            </div>
                                        </div>
                                        <div class="d-flex ai-center jc-center"
                                            style="border-left: 1px solid #929292; ">
                                            <div class="m-2 c-p" @click="advKeyDelete(item)">
                                                <img src="../../assets/images/title/del.png" style="width: 24px;" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div style="width: 320px; height: 100vh;" class="bg-grey">
            <div style="height: 30vh">
                <el-scrollbar>
                    <div class="bg-white m-4 br-2 p-4">
                        按键测试
                        <div class="bg-grey br-2 p-4">
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
    <advKeyDialog />
</template>
<script setup lang="ts">
import advKeyDialog from "./advKeyDialog.vue";
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { onMounted, onBeforeUnmount } from 'vue';
import { Macro } from '@/keyboard/sparklink/macros';
import { useI18n } from "vue-i18n";
import { MatrixTable, MagKeyAdvanceTypeEnum } from "@/keyboard/sparklink/enum";
import { storeToRefs } from "pinia";

import { MagKeyAdvanced, MagKeyDKS, MagKeyMT, MagKeyTGL } from "@/keyboard/sparklink/rk_c61/advanceKeys";
import { AdvKeyMacro, AdvKeySOCD, AdvKey } from "@/keyboard/sparklink/rk_c61/AdvKeys";
const { t } = useI18n();

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

const { titleid, TitleList } = storeToRefs(useAdvKey);

const isShowKey = (key: MagKeyAdvanced, id: number): boolean => {
    if (key.advType == MagKeyAdvanceTypeEnum.DKS) return true;
    if (key.advType == MagKeyAdvanceTypeEnum.MT) return id < 2;
    if (key.advType == MagKeyAdvanceTypeEnum.TGL) return id == 0;
    return false;
};

const key1 = (key: MagKeyAdvanced): string => {
    let dks = key as MagKeyDKS;
    let mt = key as MagKeyMT;
    let tgl = key as MagKeyTGL;
    // if (key.advType == MagKeyAdvanceTypeEnum.DKS && dks != undefined) return KeyText[dks.dksActions[0].keyCode].valueOf();
    // if (key.advType == MagKeyAdvanceTypeEnum.MT && mt != undefined) return KeyText[mt.longPressKeyCode].valueOf();
    // if (key.advType == MagKeyAdvanceTypeEnum.TGL && tgl != undefined) return KeyText[tgl.keyCode].valueOf();
    return '';
};

const key2 = (key: MagKeyAdvanced): string => {
    let dks = key as MagKeyDKS;
    let mt = key as MagKeyMT;
    // if (key.advType == MagKeyAdvanceTypeEnum.DKS && dks != undefined) return KeyText[dks.dksActions[1].keyCode].valueOf();
    // if (key.advType == MagKeyAdvanceTypeEnum.MT && mt != undefined) return KeyText[mt.shortPressKeyCode].valueOf();
    return '';
};

const key3 = (key: MagKeyAdvanced): string => {
    let dks = key as MagKeyDKS;
    //if (key.advType == MagKeyAdvanceTypeEnum.DKS && dks != undefined) return KeyText[dks.dksActions[2].keyCode].valueOf();
    return '';
};

const key4 = (key: MagKeyAdvanced): string => {
    let dks = key as MagKeyDKS;
    //if (key.advType == MagKeyAdvanceTypeEnum.DKS && dks != undefined) return KeyText[dks.dksActions[3].keyCode].valueOf();
    return '';
};
const advKeyIcon = (type: MagKeyAdvanceTypeEnum) => {
    return TitleList.value[type - 1].src;
};

const isSelectStyle = (key: MagKeyAdvanced) => {
    if (key.isSelected) {
        return 'select'
    } else {
        return ''
    }
}
const advKeyDelete = (key: AdvKey) => {
    useAdvKey.deleteAdvKey(key);
}
onMounted(async () => {
    await useKey.init();
});

onBeforeUnmount(() => {
    useKey.destroy();
});

const clickMacro = (obj: Macro) => {
    // useKey.clickMacro(obj)
    // useKey.confirmSetMacro()
}

</script>
<style scoped lang="scss"></style>