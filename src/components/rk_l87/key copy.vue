<template>
    <div class="d-flex flex-column">
        <div class="d-flex jc-center ai-center flex-column" @contextmenu.prevent>
            <div class="d-flex jc-start mr-3" v-for="line in state.keyMatrix">
                <div v-for="key in line"
                     @click="keyClick(key.index)">
                    <el-dropdown :id="`key${key.index}`"
                                 trigger="contextmenu"
                                 ref="keyMapping" 
                                 :class="[`key flex-column jc-center ai-center ${key.style}`, keyColor(key.keyData), isSelected(key.index)]"
                                 @visible-change="handleOpen($event, `key${key.index}`)" v-if="key.index < 999">
                        <div :class="[`d-flex jc-center ai-center`, keybgColor(key.keyData)]" style="width: 100%; height: 100%;">
                            <span>{{ keyText(key.keyData) }}</span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu style="padding: 0px;">
                                <el-dropdown-item @click="keySetToDefault(key.index)" style="height: min-content;">Default</el-dropdown-item>
                                <el-dropdown-item @click="keySetMacro(key.index)" style="height: min-content;">Macro</el-dropdown-item>
                                <el-dropdown-item @click="CombineKey(key.index)" style="height: min-content;">CombineKey</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div :class="[`key ${key.style}`]"
                         v-if="key.index >= 999"></div>
                </div>
            </div>
            <el-dialog v-model="state.macroDialogShow" top="20vh" width="300px" height="100%"
                       style="--el-dialog-padding-primary:5px;background-color: black;" :lock-scroll="true">
                <div class="d-flex ai-center" 
                     style="border: 1px solid #ffffff3f;height: 15vh;margin: 20px;">
                    <el-scrollbar>
                        <div style="cursor: pointer; padding: 2px; width: 80%;width: 230px;"
                             :class="[`d-flex ai-center m-2`, isMacroSelected(macro)]"
                             v-for=" macro in state.macros?.get()" @click="clickMacro(macro)">
                             <span style="color: white;">{{ macro.name }}</span>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-column ml-4 mb-1">
                        <span>Type</span>
                        <el-select v-model="state.cycleType" class="mt-1"
                                placeholder="Select"
                                size="small"
                                style="width: 220px">
                            <el-option v-for="item in state.cycleTypes" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </div>
                    <div class="d-flex flex-column ml-4 mt-1">
                        <span>Cycles</span>
                        <el-input-number class="mt-1" size="small" style="width: 120px;height: 25px;" v-model="state.cycleCount" type="number"/>
                    </div>
                </div>
                <div class="br-2 bg-white text-black px-4 jc-center ai-center mt-4" 
                     style="cursor: pointer;font-size: 12px;width: 48px;height: auto; text-align: center;padding: 4px;margin-left: 20px;" @click="confirmSetMacro">
                    Confirm
                </div>
            </el-dialog>
            <el-dialog v-model="state.combineKeyDialogShow" top="20vh" width="450px" height="100%"
                       style="--el-dialog-padding-primary:5px;background-color: black;" :lock-scroll="true"
                       :closed="dialogClosed">
                <div class="d-flex flex-column ml-4">
                    <div class="mr-4" id="input">
                        <span>Input</span>
                        <el-input class="input" style="width: 100px;height: 25px; margin: 5px;" v-model="state.keyStr" aria-placeholder="Please input" :readonly="false" maxlength="1"/>
                    </div>
                    <div class="d-flex mt-4">
                        <el-checkbox v-model="state.shiftKey" label="Shift" size="nomal" border />
                        <el-checkbox v-model="state.ctrlKey" label="Ctrl" size="nomal" border />
                        <el-checkbox v-model="state.winKey" label="Win" size="nomal" border />
                        <el-checkbox v-model="state.altKey" label="Alt" size="nomal" border />
                    </div>
                    <div class="br-2 bg-white text-black px-4 jc-center ai-center mt-4" 
                         style="cursor: pointer;font-size: 12px;width: 128px;height: auto; text-align: center;padding: 4px;margin-top: 30px;" @click="confirmSetCombineKey">
                        Confirm
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="d-flex jc-center" style="margin-top: 5vh;">
            <div class="d-flex flex-column m-2" style="width: 150px;">
                <div class="d-flex jc-center">
                    <span>Number</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyNumber" :class="[`mapping`]" @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column m-2" style="width: 180px;">
                <div class="d-flex jc-center">
                    <span>Charachters</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyCharacters" :class="[`mapping`]"  @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column m-2" style="width: 154px;">
                <div class="d-flex jc-center">
                    <span>Modify</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyModifyLeft" :class="[`mapping `]"  @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center ai-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyModifyRight" :class="[`mapping`]" @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center ai-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column m-2" style="width: 154px;">
                <div class="d-flex jc-center">
                    <span>Function</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyFunction" :class="[`mapping`]" @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center ai-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column m-2" style="width: 150px;">
                <div class="d-flex jc-center">
                    <span>Keyboard</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyNumboard" :class="[`mapping`]" @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center ai-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column m-2" style="width: 120px;">
                <div class="d-flex jc-center">
                    <span>Arror</span>
                </div>
                <div class="d-flex flex-wrap">
                    <div style="cursor: pointer;" v-for=" key in state.keyArrow" :class="[`mapping`]" @click="mapping(key.key)">
                        <div :class="[`d-flex jc-center ai-center`]">
                            <span>{{ key.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mapping {
    font-size: 10px;
    font-weight: 100;
    height: 18px;
    min-width: 18px;
    margin: 1px;
    padding: 5px
}

.macro_selected {
    border: 1px solid #ffffffaf;
    padding: 1px;
}

.mapping:hover,
.hover {
    border: 1px solid #ffffff;
    padding: 4px
}

.key {
    cursor: pointer;
    border-radius: 5px;
    color: #16191d;
    font-size: 10px !important;
    font-weight: 100;
    width: 32px;
    height: 32px;
    margin: 1px;
    padding: 2px;
}

.selected {
    border: 1px solid #ff0000;
    padding: 1px;
}

.line1 {
    margin-bottom: 8px !important;
}
.split1 {
    width: 1px !important;
    cursor: default;
}

.split2 {
    width: 4px !important;
    cursor: default;
}

.split3 {
    width: 32px !important;
    cursor: default;
}

.split4 {
    width: 118px !important;
    cursor: default;
}

.backspace {
    width: 60px !important;
}

.tab {
    width: 46px !important;
}

.code29 {
    width: 46px !important;
}

.caps {
    width: 58px !important;
}

.enter {
    width: 72px !important;
}

.lshift {
    width: 78px !important;
}

.rshift {
    width: 90px !important;
}

.ctr {
    width: 42px !important;
}

.space {
    width: 218px !important;
}

.key_remapped {
    font-weight: bold;
    font-size: 12px;
    color: #ff0000;
}
</style>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../../keyboard/rk_l87/rk_l87';
import { KeyDefineEnum } from '../../keyboard/keyCode'
import { type KeyTableData } from '../../keyboard/interface'
import { KeyMappingType, KeyMatrixLayer } from '../../keyboard/enum'
import { KeyMatrix, MatrixTable } from '@/keyboard/rk_l87/keyMatrix';
import { Action, Macro, Macros } from '@/keyboard/rk_l87/macros';
import type { DropdownInstance } from 'element-plus'
import { storage } from '@/keyboard/storage';
import { KeyCodeMap } from '@/keyboard/keyCode'

interface KeyState {
    index: number,
    selected: boolean,
    KeyData: KeyTableData
}

const rk_l87 = ref<RK_L87>();
const keyMatrix = ref<KeyMatrix>();
const keyMapping = ref<any>(null);
const macros = ref<Macros>();
const macro = ref<Macro>();
const keyState = ref<KeyState>();

const getKeyData = (index: number): KeyTableData | undefined => {
    let keyData = undefined;
    if (index < keyboard.state.keyTableData[0].length) {
        keyData = keyboard.state.keyTableData[0][index];
    }
    return keyData;
}

const getIndex = (l: number, c: number) => {
    return l + 6 * c;
}

const state = reactive({
    keyState: [],
    keyMatrix: [
        [
            { key: KeyDefineEnum.KEY_ESC,           style: 'line1',     index: getIndex(0, 0),       keyData: getKeyData(getIndex(0, 0)) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_F1,            style: '',          index: getIndex(0, 1),       keyData: getKeyData(getIndex(0, 1)) },
            { key: KeyDefineEnum.KEY_F2,            style: '',          index: getIndex(0, 2),       keyData: getKeyData(getIndex(0, 2)) },
            { key: KeyDefineEnum.KEY_F3,            style: '',          index: getIndex(0, 3),       keyData: getKeyData(getIndex(0, 3)) },
            { key: KeyDefineEnum.KEY_F4,            style: '',          index: getIndex(0, 4),       keyData: getKeyData(getIndex(0, 4)) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_F5,            style: '',          index: getIndex(0, 5),       keyData: getKeyData(getIndex(0, 5)) },
            { key: KeyDefineEnum.KEY_F6,            style: '',          index: getIndex(0, 6),       keyData: getKeyData(getIndex(0, 6)) },
            { key: KeyDefineEnum.KEY_F7,            style: '',          index: getIndex(0, 7),       keyData: getKeyData(getIndex(0, 7)) },
            { key: KeyDefineEnum.KEY_F8,            style: '',          index: getIndex(0, 8),       keyData: getKeyData(getIndex(0, 8)) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_F9,            style: '',          index: getIndex(0, 9),       keyData: getKeyData(getIndex(0, 9)) },
            { key: KeyDefineEnum.KEY_F10,           style: '',          index: getIndex(0, 10),      keyData: getKeyData(getIndex(0, 10)) },
            { key: KeyDefineEnum.KEY_F11,           style: '',          index: getIndex(0, 11),      keyData: getKeyData(getIndex(0, 11)) },
            { key: KeyDefineEnum.KEY_F12,           style: '',          index: getIndex(0, 12),      keyData: getKeyData(getIndex(0, 12)) },
            { key: KeyDefineEnum.NONE,              style: 'split1',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_Calculator,    style: '',          index: getIndex(0, 13),      keyData: getKeyData(getIndex(0, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_PRINT,         style: '',          index: getIndex(0, 14),      keyData: getKeyData(getIndex(0, 14)) },
            { key: KeyDefineEnum.KEY_SCRLOCK,       style: '',          index: getIndex(0, 15),      keyData: getKeyData(getIndex(0, 15)) },
            { key: KeyDefineEnum.KEY_PAUSE,         style: '',          index: getIndex(0, 16),      keyData: getKeyData(getIndex(0, 16)) }
        ],
        [
            { key: KeyDefineEnum.KEY_TILDE,         style: '',          index: getIndex(1, 0),       keyData: getKeyData(getIndex(1, 0)) },
            { key: KeyDefineEnum.KEY_1,             style: '',          index: getIndex(1, 1),       keyData: getKeyData(getIndex(1, 1)) },
            { key: KeyDefineEnum.KEY_2,             style: '',          index: getIndex(1, 2),       keyData: getKeyData(getIndex(1, 2)) },
            { key: KeyDefineEnum.KEY_3,             style: '',          index: getIndex(1, 3),       keyData: getKeyData(getIndex(1, 3)) },
            { key: KeyDefineEnum.KEY_4,             style: '',          index: getIndex(1, 4),       keyData: getKeyData(getIndex(1, 4)) },
            { key: KeyDefineEnum.KEY_5,             style: '',          index: getIndex(1, 5),       keyData: getKeyData(getIndex(1, 5)) },
            { key: KeyDefineEnum.KEY_6,             style: '',          index: getIndex(1, 6),       keyData: getKeyData(getIndex(1, 6)) },
            { key: KeyDefineEnum.KEY_7,             style: '',          index: getIndex(1, 7),       keyData: getKeyData(getIndex(1, 7)) },
            { key: KeyDefineEnum.KEY_8,             style: '',          index: getIndex(1, 8),       keyData: getKeyData(getIndex(1, 8)) },
            { key: KeyDefineEnum.KEY_9,             style: '',          index: getIndex(1, 9),       keyData: getKeyData(getIndex(1, 9)) },
            { key: KeyDefineEnum.KEY_0,             style: '',          index: getIndex(1, 10),      keyData: getKeyData(getIndex(1, 10)) },
            { key: KeyDefineEnum.KEY_Underscore,    style: '',          index: getIndex(1, 11),      keyData: getKeyData(getIndex(1, 11)) },
            { key: KeyDefineEnum.KEY_EqualSign,     style: '',          index: getIndex(1, 12),      keyData: getKeyData(getIndex(1, 12)) },
            { key: KeyDefineEnum.KEY_Backspace,     style: 'backspace', index: getIndex(1, 13),      keyData: getKeyData(getIndex(1, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_INS,           style: '',          index: getIndex(1, 14),      keyData: getKeyData(getIndex(1, 14)) },
            { key: KeyDefineEnum.KEY_HOME,          style: '',          index: getIndex(1, 15),      keyData: getKeyData(getIndex(1, 15)) },
            { key: KeyDefineEnum.KEY_PGUP,          style: '',          index: getIndex(1, 16),      keyData: getKeyData(getIndex(1, 16)) }
        ],
        [
            { key: KeyDefineEnum.KEY_TAB,           style: 'tab',       index: getIndex(2, 0),       keyData: getKeyData(getIndex(2, 0)) },
            { key: KeyDefineEnum.KEY_Q,             style: '',          index: getIndex(2, 1),       keyData: getKeyData(getIndex(2, 1)) },
            { key: KeyDefineEnum.KEY_W,             style: '',          index: getIndex(2, 2),       keyData: getKeyData(getIndex(2, 2)) },
            { key: KeyDefineEnum.KEY_E,             style: '',          index: getIndex(2, 3),       keyData: getKeyData(getIndex(2, 3)) },
            { key: KeyDefineEnum.KEY_R,             style: '',          index: getIndex(2, 4),       keyData: getKeyData(getIndex(2, 4)) },
            { key: KeyDefineEnum.KEY_T,             style: '',          index: getIndex(2, 5),       keyData: getKeyData(getIndex(2, 5)) },
            { key: KeyDefineEnum.KEY_Y,             style: '',          index: getIndex(2, 6),       keyData: getKeyData(getIndex(2, 6)) },
            { key: KeyDefineEnum.KEY_U,             style: '',          index: getIndex(2, 7),       keyData: getKeyData(getIndex(2, 7)) },
            { key: KeyDefineEnum.KEY_I,             style: '',          index: getIndex(2, 8),       keyData: getKeyData(getIndex(2, 8)) },
            { key: KeyDefineEnum.KEY_O,             style: '',          index: getIndex(2, 9),       keyData: getKeyData(getIndex(2, 9)) },
            { key: KeyDefineEnum.KEY_P,             style: '',          index: getIndex(2, 10),      keyData: getKeyData(getIndex(2, 10)) },
            { key: KeyDefineEnum.KEY_L_Brackets,    style: '',          index: getIndex(2, 11),      keyData: getKeyData(getIndex(2, 11)) },
            { key: KeyDefineEnum.KEY_R_Brackets,    style: '',          index: getIndex(2, 12),      keyData: getKeyData(getIndex(2, 12)) },
            { key: KeyDefineEnum.KEY_CODE29,        style: 'code29',    index: getIndex(2, 13),      keyData: getKeyData(getIndex(2, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_DEL,           style: '',          index: getIndex(2, 14),      keyData: getKeyData(getIndex(2, 14)) },
            { key: KeyDefineEnum.KEY_END,           style: '',          index: getIndex(2, 15),      keyData: getKeyData(getIndex(2, 15)) },
            { key: KeyDefineEnum.KEY_PGDN,          style: '',          index: getIndex(2, 16),      keyData: getKeyData(getIndex(2, 16)) }
        ],
        [
            { key: KeyDefineEnum.KEY_CAPSLOCK,      style: 'caps',      index: getIndex(3, 0),       keyData: getKeyData(getIndex(3, 0)) },
            { key: KeyDefineEnum.KEY_A,             style: '',          index: getIndex(3, 1),       keyData: getKeyData(getIndex(3, 1)) },
            { key: KeyDefineEnum.KEY_S,             style: '',          index: getIndex(3, 2),       keyData: getKeyData(getIndex(3, 2)) },
            { key: KeyDefineEnum.KEY_D,             style: '',          index: getIndex(3, 3),       keyData: getKeyData(getIndex(3, 3)) },
            { key: KeyDefineEnum.KEY_F,             style: '',          index: getIndex(3, 4),       keyData: getKeyData(getIndex(3, 4)) },
            { key: KeyDefineEnum.KEY_G,             style: '',          index: getIndex(3, 5),       keyData: getKeyData(getIndex(3, 5)) },
            { key: KeyDefineEnum.KEY_H,             style: '',          index: getIndex(3, 6),       keyData: getKeyData(getIndex(3, 6)) },
            { key: KeyDefineEnum.KEY_J,             style: '',          index: getIndex(3, 7),       keyData: getKeyData(getIndex(3, 7)) },
            { key: KeyDefineEnum.KEY_K,             style: '',          index: getIndex(3, 8),       keyData: getKeyData(getIndex(3, 8)) },
            { key: KeyDefineEnum.KEY_L,             style: '',          index: getIndex(3, 9),       keyData: getKeyData(getIndex(3, 9)) },
            { key: KeyDefineEnum.KEY_Semicolon,     style: '',          index: getIndex(3, 10),      keyData: getKeyData(getIndex(3, 10)) },
            { key: KeyDefineEnum.KEY_Quotation,     style: '',          index: getIndex(3, 11),      keyData: getKeyData(getIndex(3, 11)) },
            { key: KeyDefineEnum.KEY_ENTER,         style: 'enter',     index: getIndex(3, 13),      keyData: getKeyData(getIndex(3, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split4',    index: 999,                  keyData: undefined }
        ],
        [
            { key: KeyDefineEnum.SHIFT_L,           style: 'lshift',    index: getIndex(4, 0),       keyData: getKeyData(getIndex(4, 0)) },
            { key: KeyDefineEnum.KEY_Z,             style: '',          index: getIndex(4, 1),       keyData: getKeyData(getIndex(4, 1)) },
            { key: KeyDefineEnum.KEY_X,             style: '',          index: getIndex(4, 2),       keyData: getKeyData(getIndex(4, 2)) },
            { key: KeyDefineEnum.KEY_C,             style: '',          index: getIndex(4, 3),       keyData: getKeyData(getIndex(4, 3)) },
            { key: KeyDefineEnum.KEY_V,             style: '',          index: getIndex(4, 4),       keyData: getKeyData(getIndex(4, 4)) },
            { key: KeyDefineEnum.KEY_B,             style: '',          index: getIndex(4, 5),       keyData: getKeyData(getIndex(4, 5)) },
            { key: KeyDefineEnum.KEY_N,             style: '',          index: getIndex(4, 6),       keyData: getKeyData(getIndex(4, 6)) },
            { key: KeyDefineEnum.KEY_M,             style: '',          index: getIndex(4, 7),       keyData: getKeyData(getIndex(4, 7)) },
            { key: KeyDefineEnum.KEY_COMMA,         style: '',          index: getIndex(4, 8),       keyData: getKeyData(getIndex(4, 8)) },
            { key: KeyDefineEnum.KEY_PERIOD,        style: '',          index: getIndex(4, 9),       keyData: getKeyData(getIndex(4, 9)) },
            { key: KeyDefineEnum.KEY_Interrogation, style: '',          index: getIndex(4, 10),      keyData: getKeyData(getIndex(4, 10)) },
            { key: KeyDefineEnum.SHIFT_R,           style: 'rshift',    index: getIndex(4, 13),      keyData: getKeyData(getIndex(4, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.NONE,              style: 'split3',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_UpArrow,       style: '',          index: getIndex(4, 15),      keyData: getKeyData(getIndex(4, 15)) },
            { key: KeyDefineEnum.NONE,              style: 'split3',    index: 999,                  keyData: undefined }
        ],
        [
            { key: KeyDefineEnum.CTRL_L,            style: 'ctr',       index: getIndex(5, 0),       keyData: getKeyData(getIndex(5, 0)) },
            { key: KeyDefineEnum.WIN_L,             style: 'ctr',       index: getIndex(5, 1),       keyData: getKeyData(getIndex(5, 1)) },
            { key: KeyDefineEnum.ALT_L,             style: 'ctr',       index: getIndex(5, 2),       keyData: getKeyData(getIndex(5, 2)) },
            { key: KeyDefineEnum.KEY_SPACEBAR,      style: 'space',     index: getIndex(5, 5),       keyData: getKeyData(getIndex(5, 5)) },
            { key: KeyDefineEnum.ALT_R,             style: 'ctr',       index: getIndex(5, 8),       keyData: getKeyData(getIndex(5, 8)) },
            { key: KeyDefineEnum.KEY_Fn1,           style: 'ctr',       index: getIndex(5, 9),       keyData: getKeyData(getIndex(5, 9)) },
            { key: KeyDefineEnum.KEY_APP,           style: 'ctr',       index: getIndex(5, 10),      keyData: getKeyData(getIndex(5, 10)) },
            { key: KeyDefineEnum.CTRL_R,            style: 'ctr',       index: getIndex(5, 13),      keyData: getKeyData(getIndex(5, 13)) },
            { key: KeyDefineEnum.NONE,              style: 'split2',    index: 999,                  keyData: undefined },
            { key: KeyDefineEnum.KEY_LeftArrow,     style: '',          index: getIndex(5, 14),      keyData: getKeyData(getIndex(5, 14)) },
            { key: KeyDefineEnum.KEY_DownArrow,     style: '',          index: getIndex(5, 15),      keyData: getKeyData(getIndex(5, 15)) },
            { key: KeyDefineEnum.KEY_RightArrow,    style: '',          index: getIndex(5, 16),      keyData: getKeyData(getIndex(5, 16)) }
        ]
    ],
    keyNumber: [
        { key: KeyDefineEnum.KEY_1, text: '1' },
        { key: KeyDefineEnum.KEY_2, text: '2' },
        { key: KeyDefineEnum.KEY_3, text: '3' },
        { key: KeyDefineEnum.KEY_4, text: '4' },
        { key: KeyDefineEnum.KEY_5, text: '5' },
        { key: KeyDefineEnum.KEY_6, text: '6' },
        { key: KeyDefineEnum.KEY_7, text: '7' },
        { key: KeyDefineEnum.KEY_8, text: '8' },
        { key: KeyDefineEnum.KEY_9, text: '9' },
        { key: KeyDefineEnum.KEY_0, text: '0' }
    ],
    keyCharacters: [
        { key: KeyDefineEnum.KEY_A, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_A] },
        { key: KeyDefineEnum.KEY_B, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_B] },
        { key: KeyDefineEnum.KEY_C, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_C] },
        { key: KeyDefineEnum.KEY_D, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_D] },
        { key: KeyDefineEnum.KEY_E, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_E] },
        { key: KeyDefineEnum.KEY_F, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F] },
        { key: KeyDefineEnum.KEY_G, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_G] },
        { key: KeyDefineEnum.KEY_H, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_H] },
        { key: KeyDefineEnum.KEY_I, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_I] },
        { key: KeyDefineEnum.KEY_K, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_K] },
        { key: KeyDefineEnum.KEY_L, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L] },
        { key: KeyDefineEnum.KEY_M, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_M] },
        { key: KeyDefineEnum.KEY_N, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_N] },
        { key: KeyDefineEnum.KEY_O, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_O] },
        { key: KeyDefineEnum.KEY_P, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_P] },
        { key: KeyDefineEnum.KEY_Q, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Q] },
        { key: KeyDefineEnum.KEY_R, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R] },
        { key: KeyDefineEnum.KEY_S, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_S] },
        { key: KeyDefineEnum.KEY_T, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_T] },
        { key: KeyDefineEnum.KEY_U, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_U] },
        { key: KeyDefineEnum.KEY_V, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_V] },
        { key: KeyDefineEnum.KEY_W, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_W] },
        { key: KeyDefineEnum.KEY_X, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_X] },
        { key: KeyDefineEnum.KEY_Y, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Y] },
        { key: KeyDefineEnum.KEY_Z, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Z] },
        { key: KeyDefineEnum.KEY_Underscore, text: '-'},
        { key: KeyDefineEnum.KEY_EqualSign, text: '=' },
        { key: KeyDefineEnum.KEY_L_Brackets, text: '[' },
        { key: KeyDefineEnum.KEY_R_Brackets, text: ']' },
        { key: KeyDefineEnum.KEY_CODE29, text: '\\' },
        { key: KeyDefineEnum.KEY_Semicolon, text: ';' },
        { key: KeyDefineEnum.KEY_Quotation, text: '\'' },
        { key: KeyDefineEnum.KEY_TILDE, text: '`' },
        { key: KeyDefineEnum.KEY_COMMA, text: ',' },
        { key: KeyDefineEnum.KEY_PERIOD, text: '.' },
        { key: KeyDefineEnum.KEY_Interrogation, text: '/' }
    ],
    keyModifyLeft: [
        { key: KeyDefineEnum.KEY_L_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_CTRL] },
        { key: KeyDefineEnum.KEY_L_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_SHIFT] },
        { key: KeyDefineEnum.KEY_L_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_ALT] },
        { key: KeyDefineEnum.KEY_L_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_L_WIN] }
    ],
    keyModifyRight: [
        { key: KeyDefineEnum.KEY_R_CTRL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_CTRL] },
        { key: KeyDefineEnum.KEY_R_SHIFT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_SHIFT] },
        { key: KeyDefineEnum.KEY_R_ALT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_ALT] },
        { key: KeyDefineEnum.KEY_R_WIN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_R_WIN] }
    ],
    keyArrow: [
        { key: KeyDefineEnum.KEY_UpArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_UpArrow] },
        { key: KeyDefineEnum.KEY_DownArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DownArrow] },
        { key: KeyDefineEnum.KEY_LeftArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_LeftArrow] },
        { key: KeyDefineEnum.KEY_RightArrow, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_RightArrow] }
    ],
    keyFunction: [
        { key: KeyDefineEnum.KEY_F1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F1] },
        { key: KeyDefineEnum.KEY_F2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F2] },
        { key: KeyDefineEnum.KEY_F3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F3] },
        { key: KeyDefineEnum.KEY_F4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F4] },
        { key: KeyDefineEnum.KEY_F5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F5] },
        { key: KeyDefineEnum.KEY_F6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F6] },
        { key: KeyDefineEnum.KEY_F7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F7] },
        { key: KeyDefineEnum.KEY_F8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F8] },
        { key: KeyDefineEnum.KEY_F9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F9] },
        { key: KeyDefineEnum.KEY_F10, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F10] },
        { key: KeyDefineEnum.KEY_F11, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F11] },
        { key: KeyDefineEnum.KEY_F12, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_F12] },
        { key: KeyDefineEnum.KEY_ESC, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_ESC] },
        { key: KeyDefineEnum.KEY_TAB, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_TAB] },
        { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS] },
        { key: KeyDefineEnum.KEY_INS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_INS] },
        { key: KeyDefineEnum.KEY_PAUSE, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PAUSE] },
        { key: KeyDefineEnum.KEY_SPACEBAR, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SPACEBAR] },
        { key: KeyDefineEnum.KEY_HOME, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_HOME] },
        { key: KeyDefineEnum.KEY_END, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_END] },
        { key: KeyDefineEnum.KEY_DEL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_DEL] },
        { key: KeyDefineEnum.KEY_SCRLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_SCRLOCK] },
        { key: KeyDefineEnum.KEY_PGDN, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGDN] },
        { key: KeyDefineEnum.KEY_PGUP, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PGUP] },
        { key: KeyDefineEnum.KEY_CAPSLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_CAPSLOCK] },
        { key: KeyDefineEnum.KEY_Backspace, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_Backspace] },
        { key: KeyDefineEnum.KEY_PRINT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_PRINT] }
    ],
    keyNumboard: [
        { key: KeyDefineEnum.KEY_NUM_1, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_1] },
        { key: KeyDefineEnum.KEY_NUM_2, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_2] },
        { key: KeyDefineEnum.KEY_NUM_3, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_3] },
        { key: KeyDefineEnum.KEY_NUM_4, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_4] },
        { key: KeyDefineEnum.KEY_NUM_5, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_5] },
        { key: KeyDefineEnum.KEY_NUM_6, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_6] },
        { key: KeyDefineEnum.KEY_NUM_7, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_7] },
        { key: KeyDefineEnum.KEY_NUM_8, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_8] },
        { key: KeyDefineEnum.KEY_NUM_9, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_9] },
        { key: KeyDefineEnum.KEY_NUM_0, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_0] },
        { key: KeyDefineEnum.KEY_NUM_PLUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_PLUS] },
        { key: KeyDefineEnum.KEY_NUM_MINUS, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MINUS] },
        { key: KeyDefineEnum.KEY_NUM_MUL, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_MUL] },
        { key: KeyDefineEnum.KEY_NUM_DIV, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DIV] },
        { key: KeyDefineEnum.KEY_NUM_DOT, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_DOT] },
        { key: KeyDefineEnum.KEY_NUMLOCK, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUMLOCK] },
        { key: KeyDefineEnum.KEY_NUM_ENTER, text: keyboard.keyboardDefine?.keyText[KeyDefineEnum.KEY_NUM_ENTER] }
    ],
    macroDialogShow: false,
    combineKeyDialogShow: false,
    macros: macros,
    cycleTypes: [
        { value: 1, label: 'Cycles' },
        { value: 2, label: 'Cycle to any key pressed' },
        { value: 4, label: 'Cycle to any key released' },
    ],
    cycleType: 1,
    cycleCount: 1,
    keyStr: "",
    keyHid: 0x00,
    shiftKey: false,
    ctrlKey: false,
    winKey: false,
    altKey: false
});

onMounted(async () => {
    rk_l87.value = (keyboard.protocol as RK_L87);
    let index: any;
    for (index in keyboard.state.keyTableData) {
        (state.keyState as Array<KeyState>).push({
            selected: false,
            index: index,
            KeyData: keyboard.state.keyTableData[0][index]
        });
    }

    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnKeyMatrixGotten, keyMatrixGotten, false);
    await rk_l87.value?.getKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
});

onBeforeUnmount(() => {
    if (rk_l87.value != undefined) {
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnKeyMatrixGotten, keyMatrixGotten, false);
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }
});

const keyMatrixGotten = async (event: any) => {
    keyMatrix.value = event.detail as KeyMatrix;

    if (rk_l87.value != undefined) {
        let tmp = storage.get('macro') as Macros;
        if (tmp != undefined) {
            let ms = new Macros();
            for (let m of tmp.macroList) {
                let tm = new Macro(m.name);
                for (let a of m.actions) {
                    let ta = new Action(a.key,a.delay,a.action,a.type);
                    tm.add(ta);
                }
                ms.add(tm);
            }
            rk_l87.value.data.macros = ms;
            macros.value = rk_l87.value.data.macros;
            macro.value = macros.value.get()[0];
            refresh();
        } else {
            await rk_l87.value.getMacros(); 
        }
    }
}

const macroGotten = (event: any) => {
    macros.value = event.detail as Macros;
    macro.value = macros.value.get()[0];
    refresh();
};

const refresh = () => {
    let line, key: any;
    for (line in state.keyMatrix) {
        for (key in state.keyMatrix[line]) {
            let keyData = state.keyMatrix[line][key].keyData;
            if (keyData == undefined) continue;
            keyMatrix.value?.fillKeyMappingData(state.keyMatrix[line][key].index, keyData.keyMappingData);
            keySetStr(keyData);
        }
    }
};

const keySetStr = (keyData: KeyTableData) => {
    let mapping = keyData.keyMappingData;
    switch (mapping.keyMappingType) {
        case KeyMappingType.KeyBoard:
            if (keyboard.keyboardDefine != undefined) {
                mapping.keyStr = '';
                if (mapping.keyMappingPara > 0) {
                    let add = mapping.keyCode > 0 ? ' + ' : '';
                    mapping.keyStr = `${keyboard.keyboardDefine.keyText[mapping.keyRaw]}${add}`;
                }
                mapping.keyStr = `${mapping.keyStr}${keyboard.keyboardDefine.keyText[mapping.keyCode]}`;
            }
            break;
        case KeyMappingType.Macro:
            if (macros.value != undefined) {
                mapping.keyStr = macros.value.get()[mapping.keyCode & 0xFF].name;
            }
            break;
    }
};

const keyText = (keyData: KeyTableData | undefined): String => {
    return keyData == undefined ? '' : keyData.keyMappingData.keyStr;
};

const keyColor = (key: KeyTableData | undefined): string => {
    return key == undefined ? '' : 'bg-white';
};

const keybgColor = (key: KeyTableData | undefined ): string => {
    let c =  '';
    if (key != undefined) {
        let mapping = key.keyMappingData;
        switch (mapping.keyMappingType) {
            case KeyMappingType.Macro:
                c = 'key_remapped';
                break;
            case KeyMappingType.KeyBoard:
                if (mapping.keyMappingPara > 0) {
                    if ((mapping.keyCode & 0x0000FFFF) > 0) {
                        c = 'key_remapped';
                    } else {
                        c = key.keyCode == mapping.keyRaw ? '' : 'key_remapped';
                    }
                    
                } else {
                    c = key.keyCode == mapping.keyRaw ? '' : 'key_remapped';
                }
                break;
            default:
                c = key.keyCode == mapping.keyRaw ? '' : 'key_remapped';
                break;
        }
    }
    return c;
};

const isSelected = (index: number): string => {
    if (state.keyState.length <= 0 || index >= 999) return '';
    return !(state.keyState as Array<KeyState>)[index].selected ? '' : 'selected';
}

const keyClick = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) return '';
    let v = !(state.keyState as Array<KeyState>)[index].selected;
    let i: any;
    for (i in state.keyState) {
        (state.keyState as Array<KeyState>)[i].selected = false;
    }

    (state.keyState as Array<KeyState>)[index].selected = v;
}

const mapping = (keyCode: KeyDefineEnum) => {
    let keyState = undefined;
    let i: any;
    for (i in state.keyState) {
        if ((state.keyState as Array<KeyState>)[i].selected) {
            keyState = (state.keyState as Array<KeyState>)[i];
            break;
        }
    }
    
    if (keyState != undefined) {
        keyState.KeyData.keyMappingData.keyMappingType = KeyMappingType.KeyBoard;
        keyState.KeyData.keyMappingData.keyCode = keyCode;
        if (keyboard.keyboardDefine != undefined) {
            keyState.KeyData.keyMappingData.keyStr = keyboard.keyboardDefine.keyText[keyCode];
        }
        keyMatrix.value?.setKeyMapping(keyState.index, keyState.KeyData.keyMappingData);
        rk_l87.value?.setKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
    }
}

const handleOpen = (e: boolean, id: string) => {
    if (e) {
        let els = keyMapping.value as Array<DropdownInstance>;
        var index: any;
        for (index in els) {
            if ((els[index] as DropdownInstance).id != id) {
                (els[index] as DropdownInstance).handleClose();
            }
        }
    }
};

const keySetToDefault = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
        return '';
    }

    let keyState = (state.keyState as Array<KeyState>)[index];
    let mapping = keyState.KeyData.keyMappingData;

    mapping.keyCode = keyState.KeyData.keyCode;
    mapping.keyStr = keyState.KeyData.keyStr;
    mapping.keyMappingType = keyState.KeyData.keyCode >> 24;
    mapping.keyMappingPara = (keyState.KeyData.keyCode & 0x00FF0000) >> 16;
    mapping.keyRaw = keyState.KeyData.keyCode;
    keyMatrix.value?.setKeyMapping(keyState.index, mapping);
    rk_l87.value?.setKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
}

const keySetMacro = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
        return '';
    }
    keyState.value = (state.keyState as Array<KeyState>)[index];
    state.macroDialogShow = true;
}

const CombineKey = (index: number) => {
    if (state.keyState.length <= 0 || index >= 999) {
        return '';
    }
    keyState.value = (state.keyState as Array<KeyState>)[index];
    state.combineKeyDialogShow = true;
    state.keyStr = "";
    state.keyHid = 0x00;
    state.shiftKey = false,
    state.ctrlKey = false,
    state.winKey = false,
    state.altKey = false
    document.addEventListener('keydown', onKeyDown);
}

const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    state.keyStr = KeyCodeMap[event.code].key;
    state.keyHid =  KeyCodeMap[event.code].hid;
};

const dialogClosed = () => {
    document.removeEventListener('keydown', onKeyDown);
}

const isMacroSelected = (obj: Macro): string => {
    return obj.index == macro.value?.index ? 'macro_selected' : '';
}

const clickMacro = (obj: Macro) => {
    macro.value = obj;
}

const confirmSetMacro = () => {
    if (keyState.value != undefined && macro.value!= undefined) {
        let mapping = keyState.value.KeyData.keyMappingData;
        mapping.keyCode = state.cycleCount << 8 | macro.value?.index;
        mapping.keyStr = macro.value?.name;
        mapping.keyMappingType = KeyMappingType.Macro;
        mapping.keyMappingPara = state.cycleType;
        keyMatrix.value?.setKeyMapping(keyState.value.index, mapping);
        rk_l87.value?.setKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
    }

    state.macroDialogShow = false;
}

const confirmSetCombineKey = async () => {
    if (keyState.value != undefined && macro.value!= undefined) {
        let mapping = keyState.value.KeyData.keyMappingData;

        mapping.keyMappingType = KeyMappingType.KeyBoard;
        mapping.keyCode = state.keyHid;

        let combine = "";
        if (state.shiftKey) {
            combine = combine + "Shift + ";
            mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_SHIFT;
        }
        if (state.ctrlKey) {
            combine = combine + "Ctrl + ";
            mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_CTRL;
        }
        if (state.winKey) {
            combine = combine + "Win + ";
            mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_WIN;
        }
        if (state.altKey) {
            combine = combine + "Alt + ";
            mapping.keyCode = mapping.keyCode | KeyDefineEnum.KEY_L_ALT;
        }
        combine = combine + state.keyStr;
        mapping.keyStr = combine;
        mapping.keyMappingPara = (mapping.keyCode & 0x00FF0000) >> 16;
        mapping.keyRaw = 0xFFFFFFFF & (mapping.keyMappingType << 24) && (mapping.keyMappingPara << 16) && mapping.keyCode;
        keyMatrix.value?.setKeyMapping(keyState.value.index, mapping);
        await rk_l87.value?.setKeyMatrix(KeyMatrixLayer.Nomal, MatrixTable.WIN, 0);
    }

    state.combineKeyDialogShow = false;
}
</script>