<template>
    <div style="width: 160px; ">
        <div style="height: 30vh">
            <el-scrollbar>
                <div :class="[{ 'bg-dark text-white': item.id === useKey.state.funid }, `${item.style} bg-grey`]"
                    class="mx-4 br-2 my-2 text-center p-2 c-p" v-for="item in useKey.state.funMenuList"
                    @click="useKey.setFunid(item.id)">
                    {{ $t(item.title) }}
                </div>
            </el-scrollbar>
        </div>
    </div>
    <div class="flex-1 ml-3">
        <div style="height: 30vh;">
            <el-scrollbar>
                <div class="d-flex flex-wrap" v-if="useKey.state.funid == 3">
                    <div :class="['d-flex c-p ai-center jc-center p-3 m-1 bg-grey br-1', useMacro.isMacroSelected(macro)]"
                        v-for="macro in useMacro.macros?.get()" @click="clickMacro(macro)" style="min-width: 24px;">
                        {{ macro.name }}
                    </div>
                </div>
                <div :class="['d-flex flex-wrap', `${line.style}`]" v-for="line in useKey.state.keyFunList" v-else>
                    <el-tooltip v-if="line.id == useKey.state.funid" v-for="item in line.keys" effect="light"
                        :disabled="item.tip == ''" :content="itemTipText(item)" placement="bottom"
                        popper-class="tip_font">
                        <div :class="[`c-p d-flex ai-center jc-center p-2 m-1 bg-grey br-1`, useKey.isFunSelected(item.key)]"
                            @click="clickKey(item)" style="min-width: 36px;min-height: 32px;font-size: 14px;">
                            <span
                                style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                                v-html="useKey.itemText(item)"></span>
                        </div>
                    </el-tooltip>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { useMacroStore } from "@/stores/rk_c61/macroStore";
import { Macro } from '@/keyboard/sparklink/macros';
import { MatrixTable } from "@/keyboard/sparklink/enum";
import { useI18n } from "vue-i18n";
import { onMounted, onBeforeUnmount } from 'vue';
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { storeToRefs } from "pinia";
import { MagKeyAdvanceTypeEnum } from "@/keyboard/sparklink/enum";
const useAdvKey = useAdvKeyStore();
const { titleid } = storeToRefs(useAdvKey);

const { t } = useI18n();
const useKey = useKeyStore();
const useMacro = useMacroStore();

onMounted(async () => {
    await useKey.init();
    await useAdvKey.init();
});

onBeforeUnmount(() => {
    useKey.destroy();
});

const clickKey = (item: any) => {
    useKey.mapping(item.key, item.type)
    switch (titleid.value) {
        case MagKeyAdvanceTypeEnum.DKS:
            useAdvKey.setDKS(item)
            break;
        case MagKeyAdvanceTypeEnum.MT:
            useAdvKey.setMT(item)
            break;
        case MagKeyAdvanceTypeEnum.TGL:
            useAdvKey.setTGL(item)
            break;
        case MagKeyAdvanceTypeEnum.MPT:
            useAdvKey.setMPT(item)
            break;
        case MagKeyAdvanceTypeEnum.END:
            useAdvKey.setEND(item)
            break;
        case MagKeyAdvanceTypeEnum.SOCD:
            useAdvKey.setSOCD(item)
            break;
    }
}

const clickMacro = (obj: Macro) => {
    // useKey.clickMacro(obj)
    // useKey.confirmSetMacro()
}

const itemTipText = (item: any) => {
    if (item.tip != '') return t(item.tip);
    return '';
}
</script>
<style scoped lang="scss"></style>