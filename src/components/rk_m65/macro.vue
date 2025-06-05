<template>
    <div style="min-width: 210px;width: 260px;">
        <div class="bg-grey d-flex flex-column jc-between h-100">
            <div class="d-flex flex-column flex-1">
                <div class="d-flex flex-column h-100">
                    <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t('macro.title') }}</div>
                    <div style="height: 75vh">
                        <el-scrollbar>
                            <div style="padding-left: 16%"
                                :class="[`module_box d-flex p-3 my-2 text-grey-1 jc-between`, isSelected(macro)]"
                                v-for=" macro in macros?.get()" @click="clickMacro(macro)">
                                <div class="d-flex">
                                    <span class="pr-4 d-flex ai-center">
                                        <img src="../../assets/images/dot.png" />
                                    </span>
                                    <span>
                                        {{ macro.name }}
                                    </span>
                                </div>
                                <div>
                                    <el-dropdown>
                                        <el-icon :size="18" color="#ffffff">
                                            <MoreFilled />
                                        </el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu style="padding: 0px;">
                                                <el-dropdown-item @click="renameMacro(macro)">
                                                    <img src="../../assets/images/title/edit.png" class="img-title" />
                                                    {{ $t("macro.but_9") }}
                                                </el-dropdown-item>
                                                <el-dropdown-item @click="deleteMacro(macro)">
                                                    <img src="../../assets/images/title/del.png" class="img-title" />
                                                    {{ $t("macro.but_10") }}
                                                </el-dropdown-item>
                                                <el-dropdown-item @click="useMacro.exportMacro(macro)">
                                                    <img src="../../assets/images/title/export.png" class="img-title" />
                                                    {{ $t("macro.but_11") }}
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="bg-white" style="height: 46px;">
                <div class="d-flex jc-center text-white">
                    <div class="d-flex py-1 m-2 px-3 but-blue c-p" @click="newMacro">
                        <img src="../../assets/images/title/new.png" class="img-but" />{{ $t('macro.but_1') }}
                    </div>
                    <div class="d-flex py-1 m-2 px-3 but-green c-p">
                        <el-upload :before-upload="beforeAvatarUpload" :show-file-list="false">
                            <img src="../../assets/images/title/import.png" class="img-but" />
                            {{ $t("macro.but_2") }}
                        </el-upload>
                    </div>
                </div>
            </div>
            <el-dialog v-model="state.nameEditorDisplay" top="30vh" width="680px" :lock-scroll="true">
                <div class="d-flex ai-center">
                    <el-input v-model="state.name" placeholder="Please input" maxlength="10" />
                </div>
                <div class="d-flex jc-end">
                    <div class="py-1 px-4 but-green text-white c-p mt-4" @click="saveName">{{ $t('macro.but_7') }}</div>
                </div>
            </el-dialog>
        </div>
    </div>
    <div class="d-flex flex-1">
        <el-dialog v-model="state.actionTextShow" top="30vh" width="680px" :lock-scroll="true">
            <div class="d-flex">
                <div class="py-1 px-4 but-green text-white c-p mb-4" @click="saveAction()">
                    {{ $t('macro.but_7') }}
                </div>
            </div>
            <div class="d-flex ai-center mb-4">
                <el-input v-model="state.actionText" placeholder="Please input" :rows="8" type="textarea" />
            </div>
            <div class="d-flex flex-column">
                <span>{{ $t('macro.desc_1') }}</span>
                <span>{{ $t('macro.desc_2') }}</span>
                <span>{{ $t('macro.desc_3') }}</span>
                <span>{{ $t('macro.desc_4') }}</span>
                <span>{{ $t('macro.desc_5') }}</span>
                <span>{{ $t('macro.desc_6') }}</span>
            </div>
        </el-dialog>
        <div class="d-flex flex-column flex-1 ml-4 my-4">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t('macro.title_1') }}
            </div>
            <div class="flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px">
                <div class="m-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="m-4">{{ $t('macro.title_3') }}</div>
                    <div class="m-4">
                        <el-select v-model="state.eventVal" placeholder="Select" style="width: 100%;">
                            <el-option v-for="item in state.eventList" :key="item.value" :label="$t(item.label)"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="m-4">
                        <el-radio-group v-model="actVal" text-color="#00ffff" fill="#ffff00" :disabled="playing">
                            <el-radio v-for="item in state.actList" :value="$t(item.value)" :label="$t(item.label)">
                                {{ $t(item.label) }}
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="m-4" v-if="!playing">
                        <span v-if="actVal === $t('macro.menu_1')"><el-input style="width: 100%" v-model="state.key"
                                aria-placeholder="Please input" :readonly="false" maxlength="1" /></span>
                        <span v-else><el-input-number style="width: 150px" v-model="delay"
                                aria-placeholder="Please input delay" type="number" />ms</span>
                    </div>
                    <div class="m-4 d-flex">
                        <div class="py-1 px-4 but-green text-white c-p" @click="insert">
                            {{ $t('macro.but_3') }}
                        </div>
                    </div>
                </div>
                <div class="m-5"></div>
                <div class="m-5">
                    <div class="m-4 d-flex ai-center">
                        <div>{{ $t('macro.title_4') }}</div>
                        <div class="ml-3" v-if="!playing">
                            <el-input-number v-model="repeat" :min="1" :max="10" />
                        </div>
                    </div>
                    <div class="m-4 d-flex ai-center">
                        <el-radio-group v-model="delayVal" text-color="#00ffff" fill="#ffff00" :disabled="playing"
                            @change="delayChanged">
                            <el-radio v-for="item in state.delayList" :value="$t(item.value)" :label="$t(item.label)"
                                style="width: 100%;">
                                {{ $t(item.label) }}
                                <span class="ml-3"
                                    v-if="delayVal === $t('macro.menu_6') && $t(item.value) === $t('macro.menu_6') && !playing"><el-input-number
                                        style="width: 150px" v-model="delayFix" aria-placeholder="Please input delay"
                                        type="number" />ms</span>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="m-4 d-flex">
                        <div class="py-1 px-5  text-white c-p" @click="record"
                            :class="[playing ? 'but-red' : 'but-blue']">
                            {{ playTitle }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column flex-1 mx-4 my-4" style="box-shadow: 0px 0px 24px 0px #E9EBF3;">
            <div class="d-flex jc-between bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                <div>
                    {{ $t('macro.title_2') }}
                </div>
                <div class="d-flex">
                    <div class="px-1 b-grey-1 mx-2 br-1 c-p" @click="upAction(actionVal as Action)">↑</div>
                    <div class="px-1 b-grey-1 mx-2 br-1 c-p" @click="downAction(actionVal as Action)">↓</div>
                </div>
            </div>
            <div class="d-flex flex-column flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px;height: 100%;">
                <div class="list flex-1 bg-warn-1">
                    <div style="height: 73vh">
                        <el-scrollbar ref="elActionScrollbar">
                            <div :class="['p-1 c-p', selectedAction(action)]" v-for=" action in state.macro?.actions"
                                @click="clickAction(action)">
                                {{ action?.toString() }}
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="d-flex bg-white p-4 jc-center" style="border-radius: 0px 0px 10px 10px">
                    <div class="py-1 px-4 but-blue text-white mx-3 c-p" @click="textAction()">
                        {{ $t('macro.but_12') }}
                    </div>
                    <div class="py-1 px-4 but-grey text-white mx-3 c-p" @click="clearAction()">
                        {{ $t('macro.but_5') }}
                    </div>
                    <div class="py-1 px-4 but-red text-white mx-3 c-p" @click="deleteAction(actionVal as Action)">
                        {{ $t('macro.but_6') }}
                    </div>
                    <div class="py-1 px-4 but-green text-white mx-3 c-p" @click="saveMacro()">
                        {{ $t('macro.but_7') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.action_selected {
    background-color: #FC5D41 !important;
}

.list :nth-child(2n+1) {
    background-color: #F0F0FC;
}

.list :nth-child(2n) {
    background-color: #E7E7F6;
    border-top: 1px solid #ffffff;
}

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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RK_M65 } from '@/keyboard/rk_m65/rk_m65';
import { Macro, Action, ActionType } from '@/keyboard/rk_m65/macros';
import { KeyCodeMap } from '@/common/keyCode'
import { type KeyCodeTable } from '@/common/interface';
import { storage } from '@/common/storage';
import { useMacroStore } from "@/stores/rk_m65/macroStore";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n';
import { KeyDefineEnum } from '@/common/keyCode'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action as ElAction } from 'element-plus';
import type { UploadProps } from 'element-plus'
import { keyboard } from '@/keyboard/keyboard';

// 解构出t方法
const { t } = useI18n();
const useMacro = useMacroStore();
const { state, macros, actions } = storeToRefs(useMacro);

const actVal = ref(t('macro.menu_1'));
const rk_m65 = ref<RK_M65>();
//const macros = ref<Macros>();

//const key = ref<string>('');
const delay = ref<number>(30);
//const macro = ref<Macro>();
const elAction = ref<any>(null);
const elMacro = ref<any>(null);
const elActionScrollbar = ref<any>(null);
const keyCodeTable = ref<KeyCodeTable>();
const actionVal = ref<Action>();
const delayVal = ref(t('macro.menu_4'));
const delayFix = ref<number>(30);
const keyDate = ref<any>();
const keyDelay = ref<number>(0);
const repeat = ref<number>(0)
const playing = ref<boolean>(false);
const playTitle = ref<string>(t('macro.but_4'))
const lastKey = ref<string>('');
const isNew = ref<boolean>(false);

// const state = reactive({
//     macros: macros,
//     macro: macro,
//     name: '',
//     nameEditorDisplay: false,
//     key: key,
// });

const isPlaying = (done: Function, cancel = () => { }) => {
    if (!playing.value) {
        done();
        return;
    }
    ElMessageBox.alert(t('macro.title_5'), 'Tip', {
        confirmButtonText: 'OK'
    }).then(() => {
        cancel();
    }).catch((action: ElAction) => {
        cancel();
    });
};

const clearAction = () => {
    isPlaying(() => {
        if (state.value.macro != undefined) state.value.macro.actions = [];
    })
};

const textAction = () => {
    isPlaying(() => {
        state.value.actionTextShow = true
        state.value.actionText = JSON.stringify(state.value.macro?.actions)
    })
};
const saveAction = () => {
    isPlaying(() => {
        state.value.actionTextShow = false
        useMacro.saveAction();
    })
};

const selectedAction = (obj: Action): string => {
    return obj?.index == actionVal.value?.index ? 'action_selected' : '';
}
const clickAction = (obj: Action) => {
    isPlaying(() => {
        actionVal.value = obj;
    })
}

onMounted(async () => {
    await useMacro.init();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    repeat.value = state.value.macro != undefined ? state.value.macro.repeat : 1;
});

onBeforeUnmount(() => {
    useMacro.destroy();
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
});

const onKeyUp = async (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);

    if (state.value.nameEditorDisplay && event.key == "Enter") {
        if (event.key == "Enter") {
            await saveName();
        } else if (event.key == "Esc") {
            state.value.nameEditorDisplay = false;
        }

        return;
    }
    keyCodeTable.value = KeyCodeMap[event.code];
    
    if (keyCodeTable.value != undefined) {
        keyDelay.value = ComputeTimeDiff(keyDate.value);
    }

    //录制中
    if (playing.value) {
        if (delayVal.value == t('macro.menu_4')) {
            delay.value = keyDelay.value;
        } else if (delayVal.value == t('macro.menu_5')) {
            delay.value = 30;
        } else if (delayVal.value == t('macro.menu_6')) {
            delay.value = delayFix.value;
        }

        if (state.value.macro != undefined && keyCodeTable.value != undefined) {

            let index = state.value.macro.actions.length;
            index = index < 0 ? 0 : index

            if (delay.value > 0 && index > 0) {
                state.value.macro.actions[index - 1].delay = delay.value;
            }

            if (keyCodeTable.value != undefined) {
                state.value.macro.insert(index, new Action(keyCodeTable.value.hid, 0, ActionType.Up));
            }

            state.value.macro.refresh();
            elActionScrollbar.value.setScrollTop(50000);
        }
    }

    keyDate.value = new Date();
    lastKey.value = '';
};

const record = () => {
    playing.value = !playing.value;
    playTitle.value = playing.value ? t('macro.but_8') : t('macro.but_4');
    keyDate.value = new Date();
    lastKey.value = '';
};

//计算剩余时间差
const ComputeTimeDiff = (date: any): number => {
    var strDate = new Date(date);
    var endDate = new Date(); // 结束时间
    var diffDate = endDate.getTime() - strDate.getTime() // 时间差的毫秒数
    return diffDate
}

const onKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', `${event.key} | ${event.code} | ${event.keyCode}`);
    if (state.value.nameEditorDisplay) return;

    //event.preventDefault();

    keyCodeTable.value = KeyCodeMap[event.code];

    if (keyCodeTable.value != undefined) {
        keyDelay.value = ComputeTimeDiff(keyDate.value);
    }

    if (keyCodeTable.value != undefined) {
        state.value.key = keyCodeTable.value.key;
    }

    if (playing.value && keyCodeTable.value.key != lastKey.value) {

        keyDate.value = new Date();

        if (delayVal.value == t('macro.menu_4')) {
            delay.value = keyDelay.value;
        } else if (delayVal.value == t('macro.menu_5')) {
            delay.value = 30;
        } else if (delayVal.value == t('macro.menu_6')) {
            delay.value = delayFix.value;
        }

        if (state.value.macro != undefined && keyCodeTable.value != undefined) {
            let index = state.value.macro.actions.length;
            index = index < 0 ? 0 : index

            if (delay.value > 0 && index > 0) {
                state.value.macro.actions[index - 1].delay = delay.value;
            }

            if (keyCodeTable.value != undefined) {
                state.value.macro.insert(index, new Action(keyCodeTable.value.hid, 0, ActionType.Down));
            }

            state.value.macro.refresh();
            elActionScrollbar.value.setScrollTop(50000);
            lastKey.value = keyCodeTable.value.key;
        }
    }
};

// const handleOpen = (e: boolean, id: string) => {
//     if (e) {
//         let elaction = elAction.value as Array<DropdownInstance>;
//         var index: any;
//         for (index in elaction) {
//             if ((elaction[index] as DropdownInstance).id != id) {
//                 (elaction[index] as DropdownInstance).handleClose();
//             }
//         }

//         let els = elMacro.value as Array<DropdownInstance>;
//         var index: any;
//         for (index in els) {
//             if ((els[index] as DropdownInstance).id != id) {
//                 (els[index] as DropdownInstance).handleClose();
//             }
//         }
//     }
// };

const deleteAction = (obj: Action) => {
    isPlaying(() => {
        if (state.value.macro != undefined) state.value.macro.remove(obj);
    })
};

const upAction = (obj: Action) => {
    isPlaying(() => {
        if (state.value.macro != undefined) state.value.macro.removeUp(obj);
    })
};
const downAction = (obj: Action) => {
    isPlaying(() => {
        if (state.value.macro != undefined) state.value.macro.removeDown(obj);
    })
};
const deleteMacro = (obj: Macro) => {
    isPlaying(async () => {
        if (macros.value != undefined) {
            macros.value.remove(obj);
            if (macros.value.get().length > 0) {
                state.value.macro = macros.value.get()[0];
            } else {
                state.value.macro = undefined;
            }

            await saveMacro();
        }
    })
};

const clickMacro = (obj: Macro) => {
    isPlaying(() => {
        state.value.macro = obj;
        repeat.value = state.value.macro.repeat;
    })
}

const renameMacro = (obj: Macro) => {
    isPlaying(() => {
        if (macros.value != undefined) {
            state.value.macro = obj;
            state.value.name = obj.name;
            state.value.nameEditorDisplay = true;
            isNew.value = false;
            //document.removeEventListener('keydown', onKeyDown, false);
            //document.removeEventListener('keyup', onKeyUp, false);
        }
    })
};

const newMacro = () => {
    isPlaying(() => {
        if (macros.value != undefined) {
            delayVal.value = t('macro.menu_4');
            state.value.macro = new Macro(`Macro ${macros.value.get().length + 1}`);
            state.value.name = state.value.macro.name;
            state.value.nameEditorDisplay = true;
            isNew.value = true;
            //document.removeEventListener('keydown', onKeyDown, false);
            //document.removeEventListener('keyup', onKeyUp, false);
        }
    })
};

const insert = () => {
    isPlaying(() => {
        if (state.value.macro != undefined) {
            if (keyCodeTable.value != undefined && keyCodeTable.value.hid != KeyDefineEnum.NONE) {
                let index = state.value.macro.actions.findIndex(obj => obj.index === actionVal.value?.index);

                if (state.value.eventVal == 2) {
                    index = index < 0 ? state.value.macro.actions.length : index + 1;
                } else {
                    index = index < 0 ? 0 : index;
                }

                if (actVal.value === t('macro.menu_1')) {
                    state.value.macro.insert(index, new Action(keyCodeTable.value.hid, 30, ActionType.Down));
                    state.value.macro.insert(index + 1, new Action(keyCodeTable.value.hid, 30, ActionType.Up));
                }
                else if (delay.value > 0) {
                    state.value.macro.insert(index, new Action(KeyDefineEnum.NONE, delay.value, ActionType.Delay));
                }
                state.value.macro.refresh();
                elActionScrollbar.value.setScrollTop(50000);
            }
        }
    })
};

const isSelected = (obj: Macro): string => {
    return obj.index == state.value.macro?.index ? 'module_active' : '';
}

const saveMacro = async () => {
    isPlaying(async () => {
        if (macros.value != undefined && state.value.macro != undefined) {
            state.value.macro.repeat = repeat.value;
            storage.set(`${keyboard.keyboardDefine?.name}_macro`, macros.value);
            await useMacro.setMacroData();
            ElMessage({
                type: 'info',
                message: t("macro.title_6"),
            })
        }
    })
}

const loadMacro = async () => {
    await useMacro.getMacroData();
}

const delayChanged = () => {
    if (delayVal.value === t('macro.menu_6')) {
        delayFix.value = 30
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    // if (rawFile.type !== 'application/json') {
    //     ElMessage.error('File format error')
    //     return false
    // }
    const reader = new FileReader();
    reader.onload = async (e) => {
        // 在这里可以处理文件内容，例如验证或转换
        useMacro.importProfile(e.target?.result)
        await saveMacro();
    };
    reader.readAsText(rawFile); // 读取文件内容为文本
    return false
}

const saveName = async () => {
    if (state.value.macro != undefined) {
        state.value.macro.name = state.value.name;
        if (macros.value != undefined && isNew.value) {
            macros.value.add(state.value.macro);
        }
        await saveMacro();
    }

    state.value.nameEditorDisplay = false;
}
</script>