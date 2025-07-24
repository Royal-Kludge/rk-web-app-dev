<template>
    <div class="d-flex w-100">
        <div class="flex-1 ml-3">
            <div style="height: 100vh;" class="bg-white w-100">
                <div style="height: 30vh;">
                    <el-scrollbar>
                        <div style="width: 100%;">
                            <div class="d-flex jc-center ai-center flex-column p-4"
                                v-if="useAdvKey.$state.advanceKeys.length <= 0">
                                <span>
                                    <el-icon :size="64">
                                        <Search />
                                    </el-icon>
                                </span>
                                <span> {{ $t("sparklink.advKey.tip_1") }}</span>
                                <span style="width: 50%;"> {{ $t("sparklink.advKey.tip_2") }}</span>
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
                                                <span
                                                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77;font-size: 12px;"
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
                                        <div class="d-flex ai-center jc-center" style="border-left: 1px solid #929292;">
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
                        {{ $t("sparklink.advKey.title_18") }}
                        <div class="mt-1 br-2 p-4 pressKeyTestBox">
                            <span class="smallKey" :class="{ 'key-pressed': k.pressed }" v-for="k in keys">
                                {{ k.name }}</span>
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
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { AdvKeyTypeEnum } from "@/keyboard/sparklink/enum";
import { storeToRefs } from "pinia";
import { AdvKeyMacro, AdvKeySOCD, AdvKey } from "@/keyboard/sparklink/rk_c61/AdvKeys";
import type { RK_C61 } from "@/keyboard/sparklink/rk_c61/rk_c61";
import { keyboard } from "@/keyboard/sparklink/keyboard";

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

const { TitleList } = storeToRefs(useAdvKey);

const rk_c61 = ref<RK_C61>();

const keys = ref<Array<any>>([]);
const keyID = ref(0);
const inputText = ref('');

const advKeyIcon = (type: AdvKeyTypeEnum) => {
    for (let i = 0; i < TitleList.value.length; i++) {
        if (TitleList.value[i].id == type) {
            return TitleList.value[i].src;
        }
    }
    return TitleList.value[0].src;
};

const advKeyDelete = (key: AdvKey) => {
    if (key.advType == AdvKeyTypeEnum.SOCD) {
        let key1 = key as AdvKeySOCD;
        let key2: AdvKeySOCD | null = null;
        
        for (let i = 0; i < useAdvKey.advanceKeys.length; i++) {
            if (useAdvKey.advanceKeys[i].advType == AdvKeyTypeEnum.SOCD) {
                if ((useAdvKey.advanceKeys[i] as AdvKeySOCD).keyTable?.keyCode == key1.list[1].key) {
                    key2 = useAdvKey.advanceKeys[i] as AdvKeySOCD;
                }
            }
        }

        useAdvKey.deleteAdvKey(key);
        if (key2 != null) useAdvKey.deleteAdvKey(key2);
    } else {
        useAdvKey.deleteAdvKey(key);
    }
}
onMounted(async () => {
    if (rk_c61.value == undefined) {
        rk_c61.value = keyboard.protocol as RK_C61;
        rk_c61.value.addEventListener("OnKeyMacroModeGotten", onKeyMacroModeGotten);
    }
    await useKey.init();
    await useAdvKey.init();

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
});

onBeforeUnmount(() => {
    if (rk_c61.value != undefined) {
        rk_c61.value.removeEventListener("OnKeyMacroModeGotten", onKeyMacroModeGotten);
        rk_c61.value = undefined;
    }
    useKey.destroy();
    useAdvKey.destroy();

    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
});

const onKeyMacroModeGotten = (event: any) => {
    useAdvKey.setKeyMacroMode(event.detail.key, event.detail.index, event.detail.mode, event.detail.repeatCount, event.detail.delay);
}

const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    const { key } = event;
    const existingKey = keys.value.find((k) => k.name === key);

    if (existingKey) {
        existingKey.pressed = true;
    } else {
        keys.value.push({ id: keyID.value++, name: key, pressed: true });
    }

    inputText.value += key;
};

const onKeyUp = async (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);

    const key = keys.value.find((k) => k.name === event.key);
    if (key) {
        key.pressed = false;
        setTimeout(() => {
            if (!key.pressed) {
                removeKey(key.id);
            }
        }, 1000);
    }
};

const removeKey = (id: any) => {
    const index = keys.value.findIndex((k) => k.id === id);
    if (index > -1) {
        keys.value.splice(index, 1);
    }
};
</script>
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
}

.smallKey {
    min-width: 25px;
    width: fit-content;
    height: 25px;
    background-color: white;
    border-radius: 8px;

    padding-left: 5px;
    padding-right: 5px;

    justify-items: center;
    align-items: center;

    color: rgb(80, 80, 80);

    margin-right: 5px;
    margin-top: 5px;
    text-align: center;
    border: 1px solid #e9ebf3;
    box-shadow: 1px 1px 3px rgba(106, 106, 119, 0.3);
}

.pressKeyTestBox {
    height: 85%;
    background-color: rgb(247, 247, 247);
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: center;
    min-height: 60px;
}

.key-pressed {
    background-color: rgb(35, 217, 110);
}
</style>