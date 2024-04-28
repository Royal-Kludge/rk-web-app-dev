<template>
    <div class="d-flex flex-column">
        <div class="d-flex jc-center ai-center">
            <div class="mr-4" id="input">
                <span>Input</span>
                <el-input class="input" style="width: 100px;height: 25px; margin: 5px;" v-model="state.key" aria-placeholder="Please input" :readonly="false" maxlength="1"/>
            </div>
            <div class="ml-4">
                <span>Delay</span>
                <el-input-number style="width: 120px;height: 25px;margin: 5px;" v-model="delay" aria-placeholder="Please input delay" type="number"/>
                <span>ms</span>
            </div>
            <div class="ml-4">
                <div class="ml-4 br-2 bg-white  px-4 text-black jc-center ai-center" 
                     style="cursor: pointer;font-size: 12px;width: 48px;height: auto; text-align: center;padding: 4px;" @click="insert">
                    Insert
                </div>
            </div>
        </div>
        <div class="d-flex mt-4 flex-column">
            <div class="d-flex">
                <div class="ml-4 br-2 bg-white  px-4 text-black jc-center ai-center" 
                     style="cursor: pointer;font-size: 12px;width: 32px;height: auto; text-align: center;padding: 4px;" @click="newMacro">
                    New
                </div>
                <div class="ml-4 br-2 bg-white  px-4 text-black jc-center ai-center" 
                     style="cursor: pointer;font-size: 12px;width: 32px;height: auto; text-align: center;padding: 4px;" @click="saveMacro">
                    Save
                </div>
            </div>
            <div class="d-flex">
                <div style="border: 1px solid #ffffff3f;height: 40vh;width: 16vh;" class="m-4">
                    <el-scrollbar>
                        <div style="cursor: pointer; padding: 2px; width: 80%;"
                             :class="[`d-flex ai-center m-2`, isSelected(macro)]"
                             v-for=" macro in state.macros?.get()" @click="clickMacro(macro)">
                            <el-dropdown :id="`macro${macro.index}`"
                                        trigger="contextmenu"
                                        ref="elMacro" 
                                        :class="[`d-flex ai-center m-2`]"
                                        @visible-change="handleOpen($event, `macro${macro.index}`)">
                                <span style="color: white;">{{ macro.name }}</span>
                                <template #dropdown>
                                    <el-dropdown-menu style="padding: 0px;">
                                        <el-dropdown-item @click="renameMacro(macro)" style="height: min-content;">Rename</el-dropdown-item>
                                        <el-dropdown-item @click="deleteMacro(macro)" style="height: min-content;">Delete</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="m-4" style="border: 1px solid #ffffff3f;height: 40vh;width: 30vh;">
                    <el-scrollbar>
                        <div style="cursor: pointer;" v-for=" action in state.macro?.actions">
                            <el-dropdown :id="`action${action.index}`"
                                        trigger="contextmenu"
                                        ref="elAction" 
                                        :class="[`d-flex ai-center m-3`]"
                                        @visible-change="handleOpen($event, `action${action.index}`)">
                                <span style="color: white;">{{ action.toString() }}</span>
                                <template #dropdown>
                                    <el-dropdown-menu style="padding: 0px;">
                                        <el-dropdown-item @click="deleteAction(action)" style="height: min-content;">Delete</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <el-dialog v-model="state.nameEditorDisplay" top="30vh" width="200px" height="100%"
                       style="--el-dialog-padding-primary:5px;" :lock-scroll="true" :before-close="handleEditClose">
                <div class="d-flex ai-center mb-4" style="margin-top: -13px;">
                    <div class="ml-4 mr-4">
                        <el-input v-model="state.name" placeholder="Please input" maxlength="10" />
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style lang="scss">
.macro_selected {
    border: 1px solid #ffffffaf;
    padding: 1px;
}

.input {
    .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 3px var(--el-input-focus-border-color) inset !important;
    }
}
</style>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../../keyboard/rk_l87/rk_l87';
import { Macro, type Macros, Action, ActionType } from '@/keyboard/rk_l87/macros';
import { KeyCodeMap } from '@/keyboard/keyCode'
import type { DropdownInstance } from 'element-plus'
import { type KeyCodeTable } from '@/keyboard/interface';

const rk_l87 = ref<RK_L87>();
const macros = ref<Macros>();

const key = ref<string>('');
const delay = ref<number>(30);
const macro = ref<Macro>();
const elAction = ref<any>(null);
const elMacro = ref<any>(null);
const keyCodeTable = ref<KeyCodeTable>();

const state = reactive({
    macros: macros,
    macro: macro,
    name: '',
    nameEditorDisplay: false,
    key: key,
});

onMounted(async () => {
    rk_l87.value = (keyboard.protocol as RK_L87);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

    await getMacroData();

    document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
    if (rk_l87.value != undefined) {
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }

    document.removeEventListener('keydown', onKeyDown);
});

const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    keyCodeTable.value = KeyCodeMap[event.code];
    if (keyCodeTable.value != undefined) {
        key.value = keyCodeTable.value.key;
    }
};

const getMacroData = async () => {
    if (rk_l87.value != undefined) {
        rk_l87.value.getMacros(0x00);
        refresh();
    }
};

const macroGotten = (event: any) => {
    macros.value = event.detail as Macros;
    refresh();
};

const refresh = () => {
    if (macros.value != undefined) {
        macro.value = macros.value.get()[0];
    }
};

const handleOpen = (e: boolean, id: string) => {
    if (e) {
        let elaction = elAction.value as Array<DropdownInstance>;
        var index: any;
        for (index in elaction) {
            if ((elaction[index] as DropdownInstance).id != id) {
                (elaction[index] as DropdownInstance).handleClose();
            }
        }

        let els = elMacro.value as Array<DropdownInstance>;
        var index: any;
        for (index in els) {
            if ((els[index] as DropdownInstance).id != id) {
                (els[index] as DropdownInstance).handleClose();
            }
        }
    }
};

const deleteAction = (obj: Action) => {
    if (macro.value != undefined) macro.value.remove(obj);
};

const deleteMacro = (obj: Macro) => {
    if (macros.value != undefined) {
        macros.value.remove(obj);
        if (macros.value.get().length > 0) {
            macro.value = macros.value.get()[0];
        } else {
            macro.value = undefined;
        }
    }
};

const clickMacro = (obj: Macro) => {
    macro.value = obj;
}

const renameMacro = (obj: Macro) => {
    if (macros.value != undefined) {
        macro.value = obj;
        state.name = obj.name;
        state.nameEditorDisplay = true;
    }
};

const newMacro = () => {
    if (macros.value != undefined) {
        macro.value = new Macro('New Macro');
        macros.value.add(macro.value);
        state.name = macro.value.name;
        state.nameEditorDisplay = true;
    }
};

const insert = () => {
    if (macro.value != undefined && keyCodeTable.value != undefined) {
        macro.value.add(new Action(keyCodeTable.value.hid, delay.value, ActionType.Down));
        macro.value.add(new Action(keyCodeTable.value.hid, delay.value, ActionType.Up));
    }
};

const isSelected = (obj: Macro): string => {
    return obj.index == macro.value?.index ? 'macro_selected' : '';
}

const handleEditClose = (done: () => void) => {
    if (macro.value != undefined) {
        macro.value.name = state.name;
    }
    done();
}

const saveMacro = async () => {
    await rk_l87.value?.setMacros();
}
</script>