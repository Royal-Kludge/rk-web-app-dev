<template>
    <div style="min-width: 210px;width: 260px;">
        <MainMeun />
    </div>
    <div class="d-flex flex-1 jc-center ai-center">
        <div class="d-flex jc-center ai-start flex-1">
            <el-dialog v-model="isAllDefault" width="500" center>
                <span>
                    是否恢复成默认设置?
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="setAllDefault()">
                            是
                        </el-button>
                        <el-button type="primary" @click="isAllDefault = false">
                            否
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="isOneDefault" width="500" center>
                <span>
                    是否恢复成默认设置?
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="setOneDefault()">
                            是
                        </el-button>
                        <el-button type="primary" @click="isOneDefault = false">
                            否
                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <div class="d-flex flex-column ai-center mx-5">
                <div>
                    <div>左侧键</div>
                    <el-switch v-model="left" inline-prompt size="large" active-text="开" inactive-text="关" />
                </div>
                <div class="but_left"><el-button @click="useKey.clickKeyLayout(0)"
                        :class="[useKey.selectedKeyLayout(0)]">
                        {{ $t(useKey.getKeyLayoutByIndex(0)) }}
                    </el-button> </div>
                <div class="but_report" v-if="left"><el-button @click="useKey.clickKeyLayout(3)"
                        :class="[useKey.selectedKeyLayout(3)]">{{
                            $t(useKey.getKeyLayoutByIndex(3)) }}</el-button></div>
                <div class="but_back" v-if="left"><el-button @click="useKey.clickKeyLayout(4)"
                        :class="[useKey.selectedKeyLayout(4)]">{{
                            $t(useKey.getKeyLayoutByIndex(4)) }}</el-button>
                </div>
            </div>

            <div class="d-flex flex-column ai-center">
                <div>
                    <img :src="`../../src/assets/images/mouse_rk-k3.png`" />
                </div>
                <div class="mt-4">
                    <el-button class="but-blue" style="color: white;padding: 0 50px;"
                        @click="isAllDefault = true">重置所有按键</el-button>
                </div>
            </div>

            <div class="d-flex flex-column ai-center mx-5">

                <div class="but_right"><el-button @click="useKey.clickKeyLayout(1)"
                        :class="[useKey.selectedKeyLayout(1)]">{{
                            $t(useKey.getKeyLayoutByIndex(1)) }}</el-button>
                </div>
                <div class="but_middle"><el-button @click="useKey.clickKeyLayout(2)"
                        :class="[useKey.selectedKeyLayout(2)]">{{
                            $t(useKey.getKeyLayoutByIndex(2)) }}</el-button></div>
            </div>
        </div>
        <div class="d-flex" style="height: 100%;">
            <div class="d-flex flex-column my-4 mr-4 bg-white br-2" style="width: 320px;">
                <div class="d-flex jc-between p-2" style="line-height: 30px;">
                    <div>
                        鼠标功能类型
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
                    <div style="height: 70vh;">
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
                                                placeholder="请输入单键" @focus="handleFocus" @blur="handleBlur" />
                                        </div>
                                        <div class="my-2 text-right"><el-button
                                                @click="useKey.saveKeyboard()">保存</el-button>
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
                                            <div>键值</div>
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
                                            <div>次数</div>
                                            <div>
                                                <el-input type="number" v-model="state.functionItem.count"
                                                    maxlength="10" style="width: 100px;" />
                                            </div>
                                            <div>速率</div>
                                            <div>
                                                <el-input type="number" v-model="state.functionItem.delay"
                                                    maxlength="10" style="width: 100px;" />
                                            </div>
                                        </div>
                                        <div class="my-2 text-right"><el-button
                                                @click="useKey.saveGameAdv()">保存</el-button>
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

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -70px;
        width: 70px;
        height: 1px;
        background: #BABABB;
    }
}

.but_right {
    margin-top: 70px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 60px;
        width: 70px;
        height: 1px;
        background: #BABABB;
    }
}

.but_middle {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 60px;
        width: 150px;
        height: 1px;
        background: #BABABB;
    }
}

.but_report {
    margin-top: 90px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -55px;
        width: 55px;
        height: 1px;
        background: #BABABB;
    }
}

.but_back {
    margin-top: 10px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: -55px;
        width: 55px;
        height: 1px;
        background: #BABABB;
    }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MainMeun from "./mainMenu.vue";
import { useKeyStore } from "@/stores/rk_m3/keyStore";
import { storeToRefs } from "pinia";
import { KeyCodeMap } from '@/common/keyCode'
import { useMacroStore } from "@/stores/rk_m3/macroStore";
import { Macro } from '@/mouse/rk_m3/macros';
import { KeyMappingType, KeyFunctionType, MacroLoopEnum } from "@/mouse/enum";

const useMacro = useMacroStore();
const { macros } = storeToRefs(useMacro);

const left = ref(true)

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

</script>