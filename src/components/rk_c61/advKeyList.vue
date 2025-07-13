<template>
    <div class="d-flex w-100">
        <div class="flex-1 ml-3">
            <div style="height: 100vh;" class="bg-white w-100">
                <div style="height: 30vh;">
                    <el-scrollbar>
                        <div style="width: 100%;">
                            <div class="d-flex jc-center" v-if="useAdvKey.$state.advanceKeys.length <= 0">
                                <span>还未设置高级键</span>
                            </div>
                            <div class="d-flex flex-wrap" v-else>
                                <div v-for="item in useAdvKey.$state.advanceKeys">
                                    <div class="d-flex m-2 b-grey br-1 item" :class="[item.isSelected()]"
                                        @mouseover="useAdvKey.selectAdvanced(item)"
                                        @mouseout="useAdvKey.unSelectAdvanced()">
                                        <div class="d-flex c-p" @click="useAdvKey.advKeyClick(item)">
                                            <div class="d-flex p-2 ai-center jc-center"
                                                :class="[useAdvKey.getAdvKeyStyle(item.advType)]"
                                                style="border-right: 3px solid #ea5413; width: 28px;height: 28px;">
                                                <img :src="advKeyIcon(item.advType)" />
                                            </div>
                                            <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                style="border: 2px solid #009200; width: 28px;height: 28px; overflow: hidden;">
                                                <span style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                    v-html="useKey.keyText(item.keyTable)"></span>
                                            </div>
                                            <div v-if="item.advType == AdvKeyTypeEnum.MACRO && (item as AdvKeyMacro).macro != null"
                                                class="d-flex ai-center jc-center m-2 bg-grey p-2">
                                                {{ item.data.name }}
                                            </div>
                                            <div v-else-if="item.advType == AdvKeyTypeEnum.SOCD">
                                                <div class="d-flex" v-if="(item as AdvKeySOCD).value == 0">
                                                    <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                        style="width: 32px;height: 32px; overflow: hidden;">
                                                        <span
                                                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                            v-html="useAdvKey.keyText((item as AdvKeySOCD).list[0].key)"></span>
                                                    </div>
                                                    <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                        style="width: 32px;height: 32px; overflow: hidden;">
                                                        <span
                                                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                            v-html="useAdvKey.keyText((item as AdvKeySOCD).list[1].key)"></span>
                                                    </div>
                                                </div>
                                                <div class="d-flex" v-else-if="(item as AdvKeySOCD).value == 1">
                                                    <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                        style="width: 32px;height: 32px; overflow: hidden;">
                                                        <span
                                                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                            v-html="useAdvKey.keyText((item as AdvKeySOCD).list[2].key)"></span>
                                                    </div>
                                                    <div class="d-flex ai-center jc-center m-2 bg-grey"
                                                        style="width: 32px;height: 32px; overflow: hidden;">
                                                        <span
                                                            style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                            v-html="useAdvKey.keyText((item as AdvKeySOCD).list[3].key)"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else v-for="key in item.data"
                                                class="d-flex ai-center jc-center m-2 bg-grey"
                                                style="width: 32px;height: 32px;overflow: hidden;">
                                                <span
                                                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
                                                    v-html="useAdvKey.keyText(key.key)"></span>
                                            </div>
                                        </div>
                                        <div class="d-flex ai-center jc-center"
                                            style="border-left: 1px solid #929292;">
                                            <div class="m-2 c-p ai-center jc-center" @click="advKeyDelete(item)">
                                                <img src="../../assets/images/title/del.png" style="width: 16px;" />
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
                    <div class="bg-white ml-2 mr-4 p-4">
                        按键测试
                        <div class="bg-grey mt-4 br-2 p-4">
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
import { MatrixTable, AdvKeyTypeEnum, KeyMappingType } from "@/keyboard/sparklink/enum";
import { storeToRefs } from "pinia";
import { KeyCodeEnum, KeyDefineEnum, KeyText, KeyText_Mac } from "@/common/keyCode_sparklink";
import { AdvKeyMacro, AdvKeySOCD, AdvKey } from "@/keyboard/sparklink/rk_c61/AdvKeys";
import { LOG_TYPE, Logging } from "@/common/logging";
const { t } = useI18n();

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

const { titleid, TitleList } = storeToRefs(useAdvKey);

const advKeyIcon = (type: AdvKeyTypeEnum) => {
    for (let i = 0; i < TitleList.value.length; i++) {
        if (TitleList.value[i].id == type) {
            return TitleList.value[i].src;
        }
    }
    return TitleList.value[0].src;
};

const advKeyDelete = (key: AdvKey) => {
    useAdvKey.deleteAdvKey(key);
}
onMounted(async () => {
    await useKey.init();
    await useAdvKey.init();
});

onBeforeUnmount(() => {
    useKey.destroy();
});

const clickMacro = (obj: Macro) => {
    // useKey.clickMacro(obj)
    // useKey.confirmSetMacro()
}
</script>filter: ;
<style scoped lang="scss">
.key_dks {
    filter: drop-shadow(rgb(28, 136, 27) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_mpt {
    filter: drop-shadow(rgb(0, 122, 204) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_mt {
    filter: drop-shadow(rgb(247, 184, 50) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_tgl {
    filter: drop-shadow(rgb(170, 115, 237) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_end {
    filter: drop-shadow(rgb(25, 25, 25) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_macro {
    filter: drop-shadow(rgb(226, 161, 2) 99999px 0);
    position: relative;
    left: -99999px;
}

.key_socd {
    filter: drop-shadow(rgb(122, 193, 255) 99999px 0);
    position: relative;
    left: -99999px;
}</style>