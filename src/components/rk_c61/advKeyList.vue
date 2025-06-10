<template>
    <div class="d-flex w-100">
        <div class="flex-1 ml-3">
            <div style="height: 100vh;" class="bg-white w-100">
                <div style="height: 30vh;">
                    <el-scrollbar>
                        <div style="width: 100%;">
                            <div class="d-flex mt-4 ml-5 flex-wrap">
                                <div v-for="advKey in advanceKeys">
                                    <div class="d-flex m-2 b-grey br-1 item" :class="[isSelectStyle(advKey)]"
                                        @mouseover="useKey.selectAdvanced(advKey)"
                                        @mouseout="useKey.unSelectAdvanced()">
                                        <div class="d-flex" @click="advKeyClick(advKey)">
                                            <div class="mx-3 m-2"
                                                style="border-right: 3px solid #ea5413; width: 32px;height: 32px;">
                                                <img :src="advKeyIcon(advKey.advType)" class="mr-4" />
                                            </div>
                                            <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                v-if="isShowKey(advKey, 0)" style="width: 32px;height: 32px">
                                                {{ key1(advKey) }}
                                            </div>
                                            <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                v-if="isShowKey(advKey, 1)" style="width: 32px;height: 32px">
                                                {{ key2(advKey) }}
                                            </div>
                                            <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                v-if="isShowKey(advKey, 2)" style="width: 32px;height: 32px">
                                                {{ key3(advKey) }}
                                            </div>
                                            <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                v-if="isShowKey(advKey, 3)" style="width: 32px;height: 32px">
                                                {{ key4(advKey) }}
                                            </div>
                                        </div>
                                        <div class="d-flex ai-center jc-center"
                                            style="border-left: 1px solid #929292; ">
                                            <div class="m-3 c-p" @click="advKeyDelete(advKey)">
                                                <img src="../assets/images/title/del.png" />
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
const { t } = useI18n();

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

const { advanceKeys } = storeToRefs(useKey);
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
const advKeyDelete = (key: MagKeyAdvanced) => {
    useKey.deleteAdvKey(key);
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

const itemText = (item: any) => {
    if (item.type == MatrixTable.MAC) return item.text[0] as string;
    if (item.tip != '') return t(item.text[0] as string);
    if ((item.key >> 24) == 8) return t(item.text[0] as string);

    let str = '';
    let i = 0;
    let texts = [];
    for (i = 0; i < item.text.length; i++) {
        str = `${str}${item.text[i]}`
        if (item.text[i] != '' && item.text[i] != undefined) {
            texts.push(item.text[i])
        }
    }
    if (texts.length == 4) {
        str = `<div class='d-flex'>
        <div>
            <div>${texts[1]}</div>
            <div>${texts[0]}</div>
        </div>
        <div class='ml-3'>
            <div>${texts[3]}</div>
            <div>${texts[2]}</div>
        </div>
        </div>`
    } else if (texts.length == 3) {
        str = `<div class='d-flex'>
        <div>
            <div>${texts[1]}</div>
            <div>${texts[0]}</div>
        </div>
        <div class='ml-3'>
            <div>&nbsp;</div>
            <div>${texts[2]}</div>
        </div>
        </div>`
    } else if (texts.length == 2) {
        str = `<div class='d-flex'>
        <div>
            <div>${texts[0]}</div>
            <div>&nbsp;</div>
        </div>
          <div class='ml-3'>
            <div>&nbsp;</div>
            <div>${texts[1]}</div>
        </div>
        </div>`
    }
    return str;
}

const itemTipText = (item: any) => {
    if (item.tip != '') return t(item.tip);
    return '';
}

const advKeyClick = (key: MagKeyAdvanced) => {
    let index = 0;
    let isJumpEditor = true;

    if (advanceKeys.value != undefined) {
        for (index = 0; index < advanceKeys.value.length; index++) {
            advanceKeys.value[index].isSelected = false;
        }

        key.isSelected = true;

        // for (index = 0; index < state.value.keyState.length; index++) {
        //     if ((state.value.keyState[index] as any).selected) {
        //         let keyData = (state.value.keyState[index] as any).KeyData as KeyTableData;
        //         if (keyData != undefined) {

        //             if (keyData.keyMappingData.keyMappingType != KeyMappingType.MageAxisDKS || 
        //                 (keyData.keyMappingData.keyMappingType == KeyMappingType.MageAxisDKS && keyData.keyMappingData.param1 != key.index)) {
        //                 keyData.keyMappingData.keyMappingType = KeyMappingType.MageAxisDKS;
        //                 keyData.keyMappingData.param1 = key.index;
        //                 keyData.keyMappingData.param2 = 0x00;
        //                 keyData.keyMappingData.param3 = 0x00;
        //                 keyData.keyMappingData.keyRaw = KeyMappingType.MageAxisDKS << 24 | key.index << 16;
        //                 isJumpEditor = false;
        //             }
        //         }
        //     }
        // }
    }

    //if (isJumpEditor) advKey.editAdvKey(key);
}

</script>
<style scoped lang="scss"></style>