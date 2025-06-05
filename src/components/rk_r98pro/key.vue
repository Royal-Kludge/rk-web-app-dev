<template>
    <div class="d-flex jc-center ai-center">
        <div v-if="isMin" class="fs-big">Not enough space to display keyboard</div>
        <div v-else>
            <div class="keybox d-flex flex-column bg-white p-3" style="border-radius: 15px;position: relative;"
                @contextmenu.prevent @mousedown="handleMouseDown"
                v-if="useLight.state.lightProps.light == LightEffectEnum.SelfDefine && meunid == 3">
                <div class="d-flex" v-for="line in useKey.state.keyMatrix as Array<KeyLine>" :class="[`${line.style}`]">
                    <div :i="key.index" class="item d-flex ai-center jc-center c-p p-r"
                        :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]"
                        v-for="key in (line as KeyLine).keys" @click="keyClick(key.index)">
                        <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                            :style="`z-index:1;word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                            <span v-if="useKey.isCombinKey(key.keyData)" style="word-wrap: break-word;">{{ $t('key.menu_3') }}</span>
                            <span v-else style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                        </div>
                    </div>
                    <div :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top"
                        class="mask">
                    </div>
                </div>
            </div>
            <div class="keybox d-flex flex-column bg-white p-3" style="border-radius: 15px;position: relative;" v-else>
                <div class="d-flex" v-for="line in useKey.state.keyMatrix as Array<KeyLine>" :class="[`${line.style}`]">
                    <el-tooltip effect="light" :disabled="!useKey.isCombinKey(key.keyData)" :content="useKey.keyTipText(key.keyData)" placement="top" popper-class="tip_font"
                        v-for="key in (line as KeyLine).keys" v-if="meunid == 1">
                        <el-dropdown :id="`key${key.index}`" trigger="contextmenu" ref="keyMapping"
                            @visible-change="handleOpen($event, `key${key.index}`)">
                            <div @click="keyClick(key.index)" class="d-flex ai-center jc-center c-p"
                                :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]">
                                <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                                    :style="`z-index:1;word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                                    <span v-if="useKey.isCombinKey(key.keyData)" style="word-wrap: break-word;">{{ $t('key.menu_3') }}</span>
                                    <span v-else style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                                </div>
                            </div>
                            <template #dropdown>
                                    <el-dropdown-menu style="padding: 0px;">
                                        <el-dropdown-item @click="keySetToDefault(key.index)" style="height: min-content;">
                                            {{ $t('key.menu_1') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="useKey.keySetMacro(key.index)" style="height: min-content;">
                                            {{ $t('key.menu_2') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="useKey.setCombineKey(key.index)" style="height: min-content;">
                                            {{ $t('key.menu_3') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="useKey.setMediaKey(key.index)" style="height: min-content;">
                                            {{ $t('key.menu_4') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="useKey.setShortcutKey(key.index)" style="height: min-content;">
                                            {{ $t('key.menu_5') }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                        </el-dropdown>
                    </el-tooltip>
                    <div :i="key.index" class="item d-flex ai-center jc-center c-p p-r"
                        :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]"
                        v-for="key in line.keys" v-else @click="keyClick(key.index)">
                        <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                            :style="`z-index:1;word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                            <span v-if="useKey.isCombinKey(key.keyData)" style="word-wrap: break-word;">{{ $t('key.menu_3') }}</span>
                            <span v-else style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                        </div>
                    </div>
                    <div :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top"
                        class="mask">
                    </div>
                </div>
            </div>
            <el-dialog v-model="useKey.state.macroDialogShow" top="18vh" width="680px"
                    style="--el-dialog-padding-primary:3px;">
                    <div class="d-flex flex-column" style="margin-top: 35px;">
                        <div class="d-flex flex-column flex-1 bg-white-1"
                            style="border-radius: 0px 0px 10px 10px;height: 100%;">
                            <div class="list flex-1 bg-warn-1">
                                <div style="height: 30vh">
                                    <el-scrollbar>
                                        <div :class="['p-1 c-p', useKey.isMacroSelected(macro)]"
                                            v-for=" macro in useKey.state.macros?.get()"
                                            @click="useKey.clickMacro(macro)">
                                            {{ macro.name }}
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                            <div class="m-3">
                                <span class="mr-3">{{ $t('key.title_1') }}</span>
                                <el-select v-model="useKey.state.cycleType" placeholder="Select" style="width: 240px;">
                                    <el-option v-for="item in useKey.state.cycleTypes" :key="item.value"
                                        :label="$t(item.strKey)" :value="item.value" />
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
                <el-dialog v-model="useKey.state.combineKeyDialogShow" top="20vh" width="480px"
                    style="--el-dialog-padding-primary:3px;" @opened="dialogOpened" @closed="dialogClosed" :close-on-press-escape="false" :close-on-click-modal="false">
                    <div class="d-flex flex-column ml-4">
                        <div class="m-3" id="input">
                            <span class="mr-3">Input</span>
                            <el-input style="width: 150px" v-model="useKey.state.keyStr" aria-placeholder="Please input"
                                :readonly="true" maxlength="1" />
                        </div>
                        <div class="d-flex m-3">
                            <el-checkbox v-model="useKey.state.shiftKey" label="Shift" />
                            <el-checkbox v-model="useKey.state.ctrlKey" label="Ctrl" />
                            <el-checkbox v-model="useKey.state.winKey" label="Win" />
                            <el-checkbox v-model="useKey.state.altKey" label="Alt" />
                        </div>
                        <div class="d-flex p-4 jc-center" style="border-radius: 0px 0px 10px 10px">
                            <div class="py-1 px-5 but-green text-white mx-3 c-p" @click="useKey.confirmSetCombineKey">
                                {{ $t('key.but_3') }}
                            </div>
                        </div>
                    </div>
                </el-dialog>
                <el-dialog v-model="useKey.state.mediaKeyDialogShow" top="24vh" width="380px"
                    style="--el-dialog-padding-primary:3px;" @opened="dialogOpened" @closed="dialogClosed" :close-on-press-escape="false" :close-on-click-modal="false">
                    <div class="d-flex flex-column ml-4">
                        <div class="m-3" id="input">
                            <el-select
                                v-model="useKey.state.mediaKey"
                                :placeholder="$t('key.select')"
                                size="large"
                                style="width: 240px"
                                >
                                <el-option class="fs-xxxl"
                                    v-for="item in useKey.state.mediaKeyOptions"
                                    :key="item.key"
                                    :label="$t(mediaStrKey(item.text))"
                                    :value="item.key"
                                />
                                </el-select>
                        </div>
                        <div class="d-flex p-4 " style="border-radius: 0px 0px 10px 10px">
                            <div class="py-1 px-5 but-green text-white mx-3 c-p" @click="useKey.confirmMediaKey(useKey.state.mediaKey)">
                                {{ $t('key.but_3') }}
                            </div>
                        </div>
                    </div>
                </el-dialog>
                <el-dialog v-model="useKey.state.shortcutsKeyDialogShow" top="24vh" width="380px"
                    style="--el-dialog-padding-primary:3px;" @opened="dialogOpened" @closed="dialogClosed" :close-on-press-escape="false" :close-on-click-modal="false">
                    <div class="d-flex flex-column ml-4">
                        <div class="m-3" id="input">
                            <el-select
                                v-model="useKey.state.shortcutsKey"
                                :placeholder="$t('key.select')"
                                size="large"
                                style="width: 240px"
                                >
                                <el-option class="fs-xxxl"
                                    v-for="item in useKey.state.shortcutsKeyOptions"
                                    :key="item.key"
                                    :label="$t(shortcutStrKey(item.text))"
                                    :value="item.key"
                                />
                                </el-select>
                        </div>
                        <div class="d-flex p-4 " style="border-radius: 0px 0px 10px 10px">
                            <div class="py-1 px-5 but-green text-white mx-3 c-p" @click="useKey.confirmShortcutKey(useKey.state.shortcutsKey)">
                                {{ $t('key.but_3') }}
                            </div>
                        </div>
                    </div>
                </el-dialog>
            <div class="d-flex jc-center mt-3" v-if="meunid == 1">
                <div class="py-1 px-3 but-red text-white c-p" @click="useKey.keySetToDefaultAll">
                    {{ $t('light.title_8') }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/rk_r98pro/keyStore";
import { useMenuStore } from "@/stores/rk_r98pro/menuStore";
import { uselightStore } from "@/stores/rk_r98pro/lightStore";
import { ref, onMounted, onBeforeUnmount, watch, reactive, computed } from 'vue';
import type { DropdownInstance } from 'element-plus'
import { storeToRefs } from "pinia";
import type { KeyLine, KeyState, KeyTableData } from "@/keyboard/interface";
import { LightEffectEnum } from '@/keyboard/rk_r98pro/enum'
import { useMacroStore } from "@/stores/rk_r98pro/macroStore";

const useMacro = useMacroStore();
const useMenu = useMenuStore();
const { meunid } = storeToRefs(useMenu);

const useKey = useKeyStore();
const useLight = uselightStore();
const screenWidth = ref(0);
const isMin = ref(false);

const isMoving = ref(false);

const keyMapping = ref<any>(null);

const positionList = reactive({
    is_show_mask: false,
    box_screen_left: 0, // 盒子距离浏览器左侧的距离
    box_screen_top: 0, // 盒子距离浏览器顶部的距离
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
    is_selected: false
})


const mask_width = computed(() => (`${Math.abs(positionList.end_x - positionList.start_x)}px;`))
const mask_height = computed(() => (`${Math.abs(positionList.end_y - positionList.start_y)}px;`))
const mask_left = computed(() => (`${Math.min(positionList.start_x, positionList.end_x) - positionList.box_screen_left}px;`))
const mask_top = computed(() => (`${Math.min(positionList.start_y, positionList.end_y) - positionList.box_screen_top}px;`))

onMounted(async () => {
    await useKey.init();
    await useLight.init();
    await useMacro.init();
    useKey.state.macros = useMacro.macros;
    screenWidth.value = document.body.clientWidth;
    window.onresize = () => {
        //屏幕尺寸变化
        return (() => {
            screenWidth.value = document.body.clientWidth;
        })();
    };

    useKey.refresh();
});

onBeforeUnmount(() => {
    useKey.destroy();
    useLight.destroy()
});
watch(
    () => screenWidth,
    (to) => {
        if (to.value <= 1024) isMin.value = true;
        else isMin.value = false;
    },
    {
        deep: true,
    }
);
const handleMouseDown = (event: any) => {
    // 0 左键 2 右键
    //console.log(event.button)    
    positionList.is_show_mask = true
    positionList.start_x = event.clientX
    positionList.start_y = event.clientY
    positionList.end_x = event.clientX
    positionList.end_y = event.clientY
    positionList.box_screen_left = document.querySelector('.keybox')?.getBoundingClientRect().left as number
    positionList.box_screen_top = document.querySelector('.keybox')?.getBoundingClientRect().top as number
    document.body.addEventListener('mousemove', handleMouseMove) // 监听鼠标移动事件
    document.body.addEventListener('mouseup', handleMouseUp) // 监听鼠标抬起事件
    isMoving.value = false
    positionList.is_selected = false;
}
const handleMouseMove = (event: any) => {
    isMoving.value = true
    useKey.unSelected()
    positionList.end_x = event.clientX
    positionList.end_y = event.clientY
}
const handleMouseUp = async (event: any) => {
    document.body.removeEventListener('mousemove', handleMouseMove)
    document.body.removeEventListener('mouseup', handleMouseUp)
    positionList.is_show_mask = false
    await handleDomSelect()
    resSetXY()
    isMoving.value = false
}
const handleDomSelect = async () => {
    if (positionList.start_x == positionList.end_x && positionList.start_y == positionList.start_y) {
        return;
    }

    positionList.is_selected = true;
    const dom_mask = window.document.querySelector('.mask')
    const rect_select = dom_mask?.getClientRects()[0]
    document.querySelectorAll('.item').forEach((node, index) => {
        const rects = node.getClientRects()[0]
        if (collide(rects, rect_select) === true && isMoving.value) {
            const index = node.getAttribute('i')
            //keyClick(Number(i))\
            let i: any;
            for (i in useKey.state.keyState) {
                if ((useKey.state.keyState as Array<KeyState>)[i].index == Number(index)) {
                    (useKey.state.keyState as Array<KeyState>)[i].selected = true;
                    useLight.setSelectedKeyColor((useKey.state.keyState as Array<KeyState>)[i].index);
                }
            }
        }
    });

    await useLight.saveLedColorsToDevice();
}

const collide = (rect1: any, rect2: any) => {
    const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)
    const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)
    const minX = Math.min(rect1.x, rect2.x)
    const minY = Math.min(rect1.y, rect2.y)
    return maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height
}

const resSetXY = () => {
    positionList.start_x = 0
    positionList.start_y = 0
    positionList.end_x = 0
    positionList.end_y = 0
}

const keySetToDefault = (Index: number) => {
    useKey.keySetToDefault(Index);
    useKey.saveProfile();
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

const keyClick = async (index: number) => {
    if (positionList.is_selected) return;

    if (meunid.value == 1 || (meunid.value == 3 && useLight.state.lightProps.light == LightEffectEnum.SelfDefine)) {
        useKey.unSelected();
        await useKey.keyClick(index);
    }

    if (meunid.value == 3 && useLight.state.lightProps.light == LightEffectEnum.SelfDefine) {
        useLight.keyChanged(index);
        let key = (useKey.state.keyState[index] as KeyState);
        if (key.selected) {
            useLight.setSelectedKeyColor(key.index);
            await useLight.saveLedColorsToDevice();
        } else {
            useLight.SelfDefineDefault();
        }

        await useKey.saveProfile();
    }
}

const keyTextColorClass = (key: KeyTableData | undefined): string => {
    let color = '';
    switch (meunid.value) {
        case 1:
            color = useKey.keybgColor(key);
            break;
    }

    return color;
}

const keyTextColorStyle = (key: KeyTableData | undefined): string => {
    let color = '';
    switch (meunid.value) {
        case 3:
            if (key != undefined) {
                color = `position: relative;left: -99999px;filter: drop-shadow(${useLight.keyTextColor(key.index)} 99999px 0);color:rgb(0, 0, 0);`;
                if (useLight.state.lightProps.light == LightEffectEnum.SelfDefine)
                    color = `position: relative;left: -99999px;filter: drop-shadow(${useLight.keyTextColor(key.index)} 99999px 0);color: ${useLight.keyTextColor(key.index)};`;
            }
            break;
    }

    return color;
}

const dialogOpened = () => {
    document.addEventListener('keydown', useKey.onKeyDown);
}


const dialogClosed = () => {
    document.removeEventListener('keydown', useKey.onKeyDown);
}

const mediaStrKey = (key: String[] | undefined) => {
    if (key == undefined) return '';
    if (key.length > 0) {
        return `mediaKey.${key[0]}`
    }
    return ``
}

const shortcutStrKey = (key: String[] | undefined) => {
    if (key == undefined) return '';
    if (key.length > 0) {
        return `${key[0]}`
    }
    return ``
}
</script>
<style scoped lang="scss">
* {
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE10+/Edge */
    user-select: none;
    /* Standard syntax */
}

.mask {
    position: absolute;
    background: #4743A7;
    opacity: 0.1;
    border: 1px dashed #000;
    pointer-events: none;
}

:deep(.el-dialog__body) {
    padding: 0px !important;
}

:deep(.el-dropdown) {
    line-height: 1.3 !important;
    position: static;
}

.key_remapped {
    color: #07072A;
}

.selected {
    background-color: #4743A7 !important;
}

.key:hover {
    background: #4743A7;
    opacity: 0.8;
}

.key {
    font-size: 14px;
    width: 45px;
    height: 45px;
    margin: 2px;
    background: #989aab;
    border-radius: 3px;

    img {
        width: 32px;
        height: 32px;
    }
}

.key2 {
    width: 110px;
}

.key3 {
    width: 78px;
}

.key4 {
    width: 142px;
}

.key5 {
    width: 321px;
}

.key6 {
    width: 70px;
}

.key7 {
    width: 78px;
}

.key8 {
    width: 94px;
}

.key9 {
    height: 104px;
    margin-top: -57px;
}

.key10 {
    height: 104px;
    position: absolute !important;
    right: 10px;
}

.space-l {
    margin-left: 18px;
}

.space-l2 {
    margin-left: 40px;
}

.space-l3 {
    margin-left: 82px;
}

.space-l4 {
    margin-left: 52px;
}

.space-l5 {
    margin-left: 54px;
}

.space-l6 {
    //margin-left: 114px;
    position: absolute !important;
    right: 204px;
}

.space-l7 {
    //margin-left: 114px;
    position: absolute !important;
    right: 140px;
}

.space-l8 {
    //margin-left: 114px;
    position: absolute !important;
    right: 76px;
}

.space-t {
    margin-top: 10px;
}

.p-r {
    position: relative;
}

.key-up {
    position: absolute;
    right: 71px;
    top: 10px;
    //right: 110px;
    //top: 20px;
}

.key-left {
    position: absolute;
    right: 134px;
    top: 10px;
    //right: 181px;
    //top: 20px;
}

.key-down {
    position: absolute;
    right: 70px;
    top: 10px;
    //right: 110px;
    //top: 20px;
}

.key-right {
    position: absolute;
    right: 7px;
    top: 10px;
    //right: 39px;
    //top: 20px;
}

.key_enter {
    &::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0;
        bottom: -59px;
        width: 60px;
        background: inherit;
        border-radius: 3px;
    }
}



@media screen and (max-width: 1600px),screen and (max-height: 900px) {
    .bg {
        width: 886px;
        padding: 18px;
        padding-left: 30px;
        padding-bottom: 30px;
    }

    .key {
        font-size: 11px;
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

    .key7 {
        width: 63px;
    }

    .key8 {
        width: 90px;
    }

    .key9 {
        height: 84px;
        margin-top: -47px;
    }

    .key10 {
        height: 84px;
        margin-bottom: -47px;
    }

    .space-l {
        margin-left: 15px;
    }

    .space-l2 {
        margin-left: 34px;
    }

    .space-l3 {
        margin-left: 69px;
    }

    .space-l4 {
    margin-left: 26px;
    }

    .space-l5 {
        margin-left: 14px;
    }

    .space-t {
        margin-top: 20px;
    }

    .p-r {
        position: relative;
    }

    .key-up {
        right: 60px;
        top: 5px;
    }

    .key-left {
        right: 115px;
        top: 5px;
    }

    .key-down {
        right: 60px;
        top: 5px;
    }

    .key-right {
        right: 5px;
        top: 5px;
    }

    .key_enter {
        &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0;
            bottom: -48px;
            width: 51px;
            background: inherit;
            border-radius: 3px;
        }
    }
}

@media screen and (max-width: 1200px),screen and (max-height: 768px) {
    .bg {
        width: 715px;
        padding: 10px;
        padding-left: 20px;
        padding-bottom: 20px;
    }

    .key {
        font-size: 9px;
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

    .key7 {
        width: 47px;
    }

    .key8 {
        width: 69px;
    }

    .key9 {
        height: 64px;
        margin-top: -37px;
    }

    .key10 {
        height: 63px;
        margin-bottom: -47px;
    }

    .space-l {
        margin-left: 11px;
    }

    .space-l2 {
        margin-left: 25px;
    }

    .space-l3 {
        margin-left: 53px;
    }

    .space-l4 {
        margin-left: 28px;
    }
    
    .space-l5 {
        margin-left: 21px;
    }

    .space-t {
        margin-top: 20px;
    }

    .p-r {
        position: relative;
    }

    .key-up {
        position: absolute;
        right: 48px;
        top: 3px;
    }

    .key-left {
        position: absolute;
        right: 91px;
        top: 3px;
    }

    .key-down {
        position: absolute;
        right: 48px;
        top: 3px;
    }

    .key-right {
        position: absolute;
        right: 5px;
        top: 3px;
    }

    .key_enter {
        &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0;
            bottom: -37px;
            width: 41px;
            background: inherit;
            border-radius: 3px;
        }
    }
}
</style>