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
                            @click="useKey.mapping(item.key, item.type)"
                            style="min-width: 36px;min-height: 32px;font-size: 14px;">
                            <span
                                style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                                v-html="itemText(item)"></span>
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

const { t } = useI18n();
const useKey = useKeyStore();
const useMacro = useMacroStore();

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
</script>
<style scoped lang="scss"></style>