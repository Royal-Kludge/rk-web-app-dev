<template>
    <div class="d-flex jc-center ai-center">
        <div v-if="useKey.isMin" class="fs-big">Not enough space to display keyboard</div>
        <div v-else class="d-flex flex-column bg-white p-4" style="border-radius: 15px" @contextmenu.prevent>
            <div class="d-flex" v-for="line in useKey.state.keyMaxtrix" :class="[`${line.style}`]">
                <div v-for="key in line.keys" @click="useKey.keyClick(key.index)">
                    <el-dropdown :id="`key${key.index}`" trigger="contextmenu" ref="keyMapping"
                        class="d-flex ai-center jc-center c-p"
                        :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]"
                        @visible-change="handleOpen($event, `key${key.index}`)">
                        <div :class="[`text-white-1`, useKey.keybgColor(key.keyData)]">
                            {{ useKey.keyText(key.keyData) }}
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu style="padding: 0px;">
                                <el-dropdown-item @click="useKey.keySetToDefault(key.index)"
                                    style="height: min-content;">
                                    {{ $t('key.menu_1') }}
                                </el-dropdown-item>
                                <el-dropdown-item @click="useKey.keySetMacro(key.index)" style="height: min-content;">
                                    {{ $t('key.menu_2') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <el-dialog v-model="useKey.state.macroDialogShow" top="10vh" width="680px"
                style="--el-dialog-padding-primary:3px;">
                <div class="d-flex flex-column" style="margin-top: 35px;">
                    <div class="d-flex flex-column flex-1 bg-white-1"
                        style="border-radius: 0px 0px 10px 10px;height: 100%;">

                        <div class="list flex-1 bg-warn-1">
                            <div style="height: 30vh">
                                <el-scrollbar>
                                    <div :class="['p-1 c-p', useKey.isMacroSelected(macro)]"
                                        v-for=" macro in useKey.state.macros?.get()" @click="useKey.clickMacro(macro)">
                                        {{ macro.name }}
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="m-3">
                            <span class="mr-3">{{ $t('key.title_1') }}</span>
                            <el-select v-model="useKey.state.cycleType" placeholder="Select" style="width: 240px;">
                                <el-option v-for="item in useKey.state.cycleTypes" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="m-3">
                            <span class="mr-3">{{ $t('key.title_2') }}</span>
                            <el-input-number v-model="useKey.state.cycleCount" style="width: 150px" type="number" />
                        </div>
                        <div class="d-flex p-4 jc-center" style="border-radius: 0px 0px 10px 10px">
                            <div class="py-1 px-5 but-green text-white mx-3 c-p" @click="useKey.confirmSetMacro">
                                {{ $t('key.but_3') }}
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/keyStore";
import { ref } from 'vue';
import type { DropdownInstance } from 'element-plus'

const useKey = useKeyStore();

const keyMapping = ref<any>(null);

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

</script>
<style scoped lang="scss">
:deep {
    .el-dialog__body {
        padding: 0px !important;
    }
}

.selected {
    background-color: #4743A7 !important;
}

.key {
    font-size: 16px;
    width: 51px;
    height: 51px;
    margin: 2px;
    background: #989aab;
    border-radius: 3px;

    img {
        width: 32px;
        height: 32px;
    }
}

.key2 {
    width: 122px;
}

.key3 {
    width: 87px;
}

.key4 {
    width: 157px;
}

.key5 {
    width: 405px;
}

.key6 {
    width: 71px;
}

.space-l {
    margin-left: 20px;
}

.space-l2 {
    margin-left: 40px;
}

.space-l3 {
    margin-left: 92px;
}

.space-t {
    margin-top: 20px;
}

.p-r {
    position: relative;
}

.key-up {
    position: absolute;
    right: 110px;
    top: 20px;
}

.key-left {
    position: absolute;
    right: 181px;
    top: 20px;
}

.key-down {
    position: absolute;
    right: 110px;
    top: 20px;
}

.key-right {
    position: absolute;
    right: 39px;
    top: 20px;
}

@media screen and (max-width: 1600px) {
    .bg {
        width: 886px;
        padding: 18px;
        padding-left: 30px;
        padding-bottom: 30px;
    }

    .key {
        font-size: 12px;
        width: 36px;
        height: 36px;
        margin: 1.2px;
        border-radius: 3px;

        img {
            width: 24px;
            height: 24px;
        }
    }

    .key2 {
        width: 90px;
    }

    .key3 {
        width: 63px;
    }

    .key4 {
        width: 117px;
    }

    .key5 {
        width: 321px;
    }

    .key6 {
        width: 49px;
    }

    .space-l {
        margin-left: 15px;
    }

    .space-l2 {
        margin-left: 20px;
    }

    .space-l3 {
        margin-left: 69px;
    }

    .space-t {
        margin-top: 20px;
    }

    .p-r {
        position: relative;
    }

    .key-up {
        right: 70px;
        top: 10px;
    }

    .key-left {
        right: 123px;
        top: 10px;
    }

    .key-down {
        right: 70px;
        top: 10px;
    }

    .key-right {
        right: 17px;
        top: 10px;
    }
}

@media screen and (max-width: 1200px) {
    .bg {
        width: 715px;
        padding: 10px;
        padding-left: 20px;
        padding-bottom: 20px;
    }

    .key {
        font-size: 10px;
        width: 26px;
        height: 26px;
        margin: 0.8px;
        border-radius: 3px;

        img {
            width: 18px;
            height: 18px;
        }
    }

    .key2 {
        width: 68px;
    }

    .key3 {
        width: 47px;
    }

    .key4 {
        width: 89px;
    }

    .key5 {
        width: 232px;
    }

    .key6 {
        width: 39px;
    }

    .space-l {
        margin-left: 11px;
    }

    .space-l2 {
        margin-left: 20px;
    }

    .space-l3 {
        margin-left: 55px;
    }

    .space-t {
        margin-top: 20px;
    }

    .p-r {
        position: relative;
    }

    .key-up {
        position: absolute;
        right: 66px;
        top: 8px;
    }

    .key-left {
        position: absolute;
        right: 109px;
        top: 8px;
    }

    .key-down {
        position: absolute;
        right: 66px;
        top: 8px;
    }

    .key-right {
        position: absolute;
        right: 23px;
        top: 8px;
    }
}
</style>