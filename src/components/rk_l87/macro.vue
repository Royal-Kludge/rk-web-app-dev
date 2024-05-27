<template>
    <div style="min-width: 210px;width: 240px;">
        <div class="bg-grey d-flex flex-column jc-between h-100">
            <div class="d-flex flex-column flex-1">
                <div class="d-flex flex-column h-100">
                    <div class="p-3 bg-white-1 fw-b fs-xxl">{{ $t('macro.title') }}</div>
                    <div style="height: 75vh">
                        <el-scrollbar>
                            <div style="padding-left: 16%"
                                :class="[`module_box d-flex p-3 my-2 text-grey-1 jc-between`, isSelected(macro)]"
                                v-for=" macro in state.macros?.get()" @click="clickMacro(macro)">
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
                                                    编辑
                                                </el-dropdown-item>
                                                <el-dropdown-item @click="deleteMacro(macro)">
                                                    <img src="../../assets/images/title/del.png" class="img-title" />
                                                    删除
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
                    <div class="d-flex py-1 m-2 px-3 but-green c-p" @click="loadMacro">
                        <img src="../../../../src/assets/images/title/import.png" class="img-but" /> {{
                            $t('macro.but_2') }}
                    </div>
                </div>
            </div>
            <el-dialog v-model="state.nameEditorDisplay" top="30vh" width="680px" :lock-scroll="true"
                :before-close="handleEditClose">
                <div class="d-flex ai-center">
                    <el-input v-model="state.name" placeholder="Please input" maxlength="10" />
                </div>
            </el-dialog>
        </div>
    </div>
    <div class="d-flex flex-1">
        <div class="d-flex flex-column flex-1 ml-4 my-4">
            <div class="bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                {{ $t('macro.title_1') }}
            </div>
            <div class="flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px">
                <div class="m-5" style="border-bottom: 1px solid #E7EAF2;">
                    <div class="m-4">{{ $t('macro.title_3') }}</div>
                    <div class="m-4">
                        <el-select v-model="eventVal" placeholder="Select" style="width: 100%;">
                            <el-option v-for="item in eventList" :key="$t(item.value)" :label="$t(item.label)"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="m-4">
                        <el-radio-group v-model="actVal" text-color="#00ffff" fill="#ffff00" :disabled="playing">
                            <el-radio v-for="item in actList" :value="$t(item.value)" :label="$t(item.label)">
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
                        <el-radio-group v-model="delayVal" text-color="#00ffff" fill="#ffff00" :disabled="playing">
                            <el-radio v-for="item in delayList" :value="$t(item.value)" :label="$t(item.label)"
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
                        <div class="py-1 px-5 but-blue text-white c-p" @click="record">
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
                    <div class="py-1 px-5 but-grey text-white mx-3 c-p" @click="clearAction()">
                        {{ $t('macro.but_5') }}
                    </div>
                    <div class="py-1 px-5 but-red text-white mx-3 c-p" @click="deleteAction(actionVal as Action)">
                        {{ $t('macro.but_6') }}
                    </div>
                    <div class="py-1 px-5 but-green text-white mx-3 c-p" @click="saveMacro()">
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
import { reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { keyboard } from '../../keyboard/keyboard'
import { RK_L87, RK_L87_EVENT_DEFINE } from '../../keyboard/rk_l87/rk_l87';
import { Macro, Macros, Action, ActionType } from '@/keyboard/rk_l87/macros';
import { KeyCodeMap } from '@/keyboard/keyCode'
import type { DropdownInstance } from 'element-plus'
import { type KeyCodeTable } from '@/keyboard/interface';
import { storage } from '@/keyboard/storage';
import { useMacroStore } from "../../stores/macroStore";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n';
import { KeyDefineEnum } from '../../keyboard/keyCode'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action as ElAction } from 'element-plus';

// 解构出t方法
const { t } = useI18n();
const useMacro = useMacroStore();
const { eventVal, eventList, actList, delayList } = storeToRefs(useMacro);

const actVal = ref(t('macro.menu_1'));
const rk_l87 = ref<RK_L87>();
const macros = ref<Macros>();

const key = ref<string>('');
const delay = ref<number>(30);
const macro = ref<Macro>();
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

const state = reactive({
    macros: macros,
    macro: macro,
    name: '',
    nameEditorDisplay: false,
    key: key,
});

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
        if (macro.value != undefined) macro.value.actions = [];
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
    rk_l87.value = (keyboard.protocol as RK_L87);
    rk_l87.value.addEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);

    let tmp = storage.get('macro') as Macros;
    if (macros != undefined && tmp != null) {
        let ms = new Macros();
        for (let m of tmp.macroList) {
            let tm = new Macro(m.name);
            for (let a of m.actions) {
                let ta = new Action(a.key, a.delay, a.action, a.type);
                tm.add(ta);
            }
            tm.refresh();
            ms.add(tm);
        }
        rk_l87.value.data.macros = ms;
        macros.value = rk_l87.value.data.macros;
        refresh();
    } else {
        await getMacroData();
    }
    document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
    if (rk_l87.value != undefined) {
        rk_l87.value.removeEventListener(RK_L87_EVENT_DEFINE.OnMacrosGotten, macroGotten, false);
    }

    document.removeEventListener('keydown', onKeyDown);
});

const record = () => {
    playing.value = !playing.value
    playTitle.value = playing.value ? t('macro.but_8') : t('macro.but_4')
    if (playing.value)
        keyDate.value = new Date()

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
    keyCodeTable.value = KeyCodeMap[event.code];
    if (keyCodeTable.value != undefined) {
        key.value = keyCodeTable.value.key;
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
        if (macro.value != undefined && keyCodeTable.value != undefined) {

            let index = macro.value.actions.findIndex(obj => obj.index === actionVal.value?.index)
            index = index < 0 ? 0 : index
            if (eventVal.value == 2)//之后插入
                index += 1
            if (keyCodeTable.value != undefined) {
                macro.value.insert(index, new Action(keyCodeTable.value.hid, delay.value, ActionType.Down));
                macro.value.insert(index, new Action(keyCodeTable.value.hid, delay.value, ActionType.Up));
            }
            else if (delay.value > 0) {
                macro.value.insert(index, new Action(KeyDefineEnum.NONE, delay.value, ActionType.Delay));
            }
            macro.value.refresh();
            elActionScrollbar.value.setScrollTop(2000);
        }
    }
};


const getMacroData = async () => {
    if (rk_l87.value != undefined) {
        rk_l87.value.getMacros();
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
    isPlaying(() => {
        if (macro.value != undefined) macro.value.remove(obj);
    })
};

const upAction = (obj: Action) => {
    isPlaying(() => {
        if (macro.value != undefined) macro.value.removeUp(obj);
    })
};
const downAction = (obj: Action) => {
    isPlaying(() => {
        if (macro.value != undefined) macro.value.removeDown(obj);
    })
};
const deleteMacro = (obj: Macro) => {
    isPlaying(() => {
        if (macros.value != undefined) {
            macros.value.remove(obj);
            if (macros.value.get().length > 0) {
                macro.value = macros.value.get()[0];
            } else {
                macro.value = undefined;
            }
        }
    })
};

const clickMacro = (obj: Macro) => {
    isPlaying(() => {
        macro.value = obj;
    })
}

const renameMacro = (obj: Macro) => {
    isPlaying(() => {
        if (macros.value != undefined) {
            macro.value = obj;
            state.name = obj.name;
            state.nameEditorDisplay = true;
        }
    })
};

const newMacro = () => {
    isPlaying(() => {
        if (macros.value != undefined) {
            macro.value = new Macro(`Macro ${macros.value.get().length + 1}`);
            macros.value.add(macro.value);
            //state.name = macro.value.name;
            //state.nameEditorDisplay = true;
        }
    })
};

const insert = () => {
    isPlaying(() => {
        if (macro.value != undefined) {
            let index = macro.value.actions.findIndex(obj => obj.index === actionVal.value?.index)
            index = index < 0 ? 0 : index
            if (eventVal.value == 2)//之后插入
                index += 1
            if (actVal.value === t('macro.menu_1') && keyCodeTable.value != undefined) {
                macro.value.insert(index, new Action(keyCodeTable.value.hid, 30, ActionType.Down));
                macro.value.insert(index, new Action(keyCodeTable.value.hid, 30, ActionType.Up));
            }
            else if (delay.value > 0) {
                macro.value.insert(index, new Action(KeyDefineEnum.NONE, delay.value, ActionType.Delay));
            }
            macro.value.refresh();
            elActionScrollbar.value.setScrollTop(2000);
        }
    })
};

const isSelected = (obj: Macro): string => {
    return obj.index == macro.value?.index ? 'module_active' : '';
}

const handleEditClose = (done: () => void) => {
    if (macro.value != undefined) {
        macro.value.name = state.name;
    }
    done();
}

const saveMacro = async () => {
    isPlaying(() => {
        if (macros.value != undefined) {
            storage.set('macro', macros.value);
            rk_l87.value?.setMacros();
        }
    })
}

const loadMacro = async () => {
    await getMacroData();
}
</script>