<template>
    <div style="min-width: 210px;width: 260px;height: 100%;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 jc-center ai-center">
        <div class="d-flex jc-center ai-start flex-1">
            <el-dialog v-model="isAllDefault" width="500" center>
                <span>
                    {{ $t("key.title_3") }}
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="setAllDefault()">
                            {{ $t("set.but_5") }}
                        </el-button>
                        <el-button type="primary" @click="isAllDefault = false">
                            {{ $t("set.but_6") }}
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="isOneDefault" width="500" center>
                <span>
                    {{ $t("key.title_3") }}
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="setOneDefault()">
                            {{ $t("set.but_5") }}
                        </el-button>
                        <el-button type="primary" @click="isOneDefault = false">
                            {{ $t("set.but_6") }}
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="state.isDpiLock" width="500" center>
                <span>{{ $t("dpiKey.lock") }}</span>
                <div class="d-flex my-4">
                    <div class="mx-4">0</div>
                    <el-slider v-model="state.functionItem.count" :min="0" :max="1000" show-stops
                        :step="50"></el-slider>
                    <div class="mx-4">1000</div>
                </div>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="useKey.setDpiLock(state.functionItem.count)">
                            {{ $t("set.confirm") }}
                        </el-button>
                        <el-button type="primary" @click="state.isDpiLock = false">
                            {{ $t("set.cancel") }}
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <div class="d-flex flex-column ai-center mx-5">
                <div>
                    <div>{{ $t("key.but_7") }}</div>
                    <el-switch v-model="useProfile.state.isSideKeyEnable" inline-prompt size="large" :active-text="$t('key.but_8')"
                        :inactive-text="$t('key.but_9')" @change="sideKeySwitch"/>
                </div>
                <div class="d-flex but_left">
                    <div><el-button @click="useKey.clickKeyLayout(0)" :class="[useKey.selectedKeyLayout(0)]">
                            {{ $t(useKey.getKeyLayoutByIndex(0)) }}
                        </el-button>
                    </div>
                    <div>--------------------------</div>
                </div>
                <div class="d-flex but_report" v-if="useProfile.state.isSideKeyEnable">
                    <div><el-button @click="useKey.clickKeyLayout(4)" :class="[useKey.selectedKeyLayout(4)]">{{
                        $t(useKey.getKeyLayoutByIndex(4)) }}</el-button>
                    </div>
                    <div>---------------------</div>
                </div>
                <div class="d-flex but_back" v-if="useProfile.state.isSideKeyEnable">
                    <div><el-button @click="useKey.clickKeyLayout(3)" :class="[useKey.selectedKeyLayout(3)]">{{
                        $t(useKey.getKeyLayoutByIndex(3)) }}</el-button>
                    </div>
                    <div>---------------------</div>
                </div>
            </div>

            <div class="d-flex flex-column ai-center">
                <div>
                    <img :src="`../../src/assets/images/mouse_rk-m3.png`" />
                </div>
                <div class="mt-4">
                    <el-button class="but-blue" style="color: white;padding: 0 50px;" @click="isAllDefault = true"> {{
                        $t("key.but_10") }}</el-button>
                </div>
            </div>

            <div class="d-flex flex-column ai-center mx-5">

                <div class="d-flex but_right">
                    <div>----------------------------</div>
                    <div>
                        <el-button @click="useKey.clickKeyLayout(1)" :class="[useKey.selectedKeyLayout(1)]">{{
                            $t(useKey.getKeyLayoutByIndex(1)) }}</el-button>
                    </div>
                </div>
                <div class="d-flex but_middle">
                    <div>-------------------------------------------</div>
                    <div><el-button @click="useKey.clickKeyLayout(2)" :class="[useKey.selectedKeyLayout(2)]">{{
                        $t(useKey.getKeyLayoutByIndex(2)) }}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex" style="height: 100%;">
            <div class="d-flex flex-column my-4 mr-4 bg-white br-2" style="width: 320px;margin-right: 180px;">
                <div class="d-flex jc-between p-2" style="line-height: 30px;">
                    <div>
                        {{ $t("key.title_4") }}
                    </div>
                    <div class="d-flex ai-center c-p">
                        <img :src="`../../src/assets/images/refresh.png`" class="img-title"
                            @click="isOneDefault = true" />
                    </div>
                </div>
                <div class="flex-1 bg-white-1 p-2">
                    <div class="p-2">
                        <el-select v-model="state.functionValue" placeholder="Select" @change="useKey.findFunction()"
                            style="width: 100%;">
                            <el-option v-for="item in state.functionList" :key="item.function" :label="$t(item.text)"
                                :value="item.function" />
                        </el-select>
                    </div>
                    <div style="height: 68vh;">
                        <el-scrollbar ref="elActionScrollbar">
                            <div class="m-2">
                                <div v-if="state.functionValue == KeyFunctionType.Keyboard">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex jc-between">
                                            <div style="width: 50px;"
                                                :class="[`p-2 c-p bg-grey text-center br-2`, useKey.selectedKeyboard(item.key)]"
                                                v-for="item in state.functionItem.keys"
                                                @click="useKey.clickKeyboard(item.key)">
                                                {{ $t(item.text) }}
                                            </div>
                                        </div>
                                        <div class="my-2"><el-input v-model="state.functionItem.key.key"
                                                :placeholder="$t('key.title_5')" @focus="handleFocus"
                                                @blur="handleBlur" />
                                        </div>
                                        <div class="my-2 text-right"><el-button @click="useKey.saveKeyboard()">{{
                                            $t("macro.but_7") }}</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="state.functionValue == KeyFunctionType.GameAdv">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex jc-between my-2">
                                            <div>
                                                <el-select v-model="state.functionItem.type" style="width: 145px;">
                                                    <el-option v-for="item in state.gameList" :key="item.value"
                                                        :label="$t(item.label)" :value="item.value" />
                                                </el-select>
                                            </div>
                                            <div>{{ $t("key.title_6") }}</div>
                                            <div>
                                                <el-select v-model="state.functionItem.key" style="width: 100px;"
                                                    v-if="state.functionItem.type == KeyMappingType.Mouse">
                                                    <el-option v-for="item in state.functionItem?.keys" :key="item.key"
                                                        :label="$t(item.text)" :value="item.key" />
                                                </el-select>
                                                <el-input v-else v-model="state.functionItem.key.key" maxlength="10"
                                                    @focus="handleFocus" @blur="handleBlur" style="width: 100px;" />
                                            </div>
                                        </div>
                                        <div class="d-flex jc-between my-2">
                                            <div>{{ $t("key.title_7") }}</div>
                                            <div>
                                                <el-input type="number" v-model="state.functionItem.count"
                                                    maxlength="10" style="width: 100px;" />
                                            </div>
                                            <div>{{ $t("key.title_8") }}</div>
                                            <div>
                                                <el-input type="number" v-model="state.functionItem.delay"
                                                    maxlength="10" style="width: 100px;" />
                                            </div>
                                        </div>
                                        <div class="my-2 text-right"><el-button @click="useKey.saveGameAdv()">{{
                                            $t("macro.but_7") }}</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="state.functionValue == KeyFunctionType.Macro">
                                    <div :class="[`p-2 c-p`, useMacro.selectedMacro(macro)]"
                                        v-for="macro in macros?.get()" @click="clickMacro(macro)">
                                        {{ $t(macro.name) }}
                                    </div>
                                </div>
                                <div v-else>
                                    <div :class="[`p-2 c-p`, useKey.selectedFunction(item.key)]"
                                        v-for="item in state.functionItem?.keys"
                                        @click="useKey.clickFunction(item.key)">
                                        {{ $t(item.text) }}
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.but_selected {
    background: #4743A7 !important;
    color: #ffffff !important;

}

.but_left {
    margin-top: 10px;
    position: relative;
    right: -80px;
}

.but_right {
    margin-top: 70px;
    position: relative;
    left: -130px;
}

.but_middle {
    margin-top: 10px;
    position: relative;
    left: -170px;
}

.but_report {
    margin-top: 50px;
    position: relative;
    right: -60px;
}

.but_back {
    margin-top: 10px;
    position: relative;
    right: -60px;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MainMeun from "./mainMenu.vue";
import { useKeyStore } from "@/stores/rk_m3/keyStore";
import { useProfileStore } from "@/stores/rk_m3/profileStore";
import { storeToRefs } from "pinia";
import { KeyCodeMap } from '@/common/keyCode'
import { useMacroStore } from "@/stores/rk_m3/macroStore";
import { Macro } from '@/mouse/beiying/rk_m3/macros';
import { KeyMappingType, KeyFunctionType, MacroLoopEnum } from "@/mouse/beiying/enum";
import { RK_M3 } from '@/mouse/beiying/rk_m3/rk_m3';

const useMacro = useMacroStore();
const useProfile = useProfileStore();

const { macros } = storeToRefs(useMacro);

const isAllDefault = ref(false)
const isOneDefault = ref(false)
const useKey = useKeyStore();
const isFocused = ref(false)
const { state } = storeToRefs(useKey);

const setAllDefault = () => {
    isAllDefault.value = false;
    useKey.setAllDefault()
}

const setOneDefault = () => {
    isOneDefault.value = false;
    useKey.setOneDefault()
}

onMounted(async () => {
    await useMacro.init();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
});

const onKeyUp = async (event: KeyboardEvent) => {
    if (!isFocused.value)
        return;
    state.value.functionItem.key = KeyCodeMap[event.code];
}
const clickMacro = (obj: Macro) => {
    useMacro.clickMacro(obj);
    useKey.clickMacro(obj);
}
const onKeyDown = (event: KeyboardEvent) => {
    if (!isFocused.value)
        return;
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    event.preventDefault();
}
const handleFocus = () => {
    isFocused.value = true;
}
const handleBlur = () => {
    isFocused.value = false;
}

const sideKeySwitch = async (val: boolean) => {
    await useKey.setLeftSideKeyEnable(val);
    useProfile.saveProfile();
}
</script>