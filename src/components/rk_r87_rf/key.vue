<template>
    <div class="d-flex jc-center ai-center">
        <div v-if="isMin" class="fs-big">Not enough space to display keyboard</div>
        <div v-else>
            <div class="keybox d-flex flex-column bg-white p-3" style="border-radius: 15px;position: relative;"
                @contextmenu.prevent @mousedown="handleMouseDown"
                v-if="useLight.state.lightProps.light == LightEffectEnum.SelfDefine">
                <div class="d-flex" v-for="line in useKey.state.keyMatrix as Array<KeyLine>" :class="[`${line.style}`]">
                    <div :id="`key${key.index}`" trigger="contextmenu" ref="keyMapping"
                        @visible-change="handleOpen($event, `key${key.index}`)" v-for="key in line.keys"
                        v-if="meunid == 1">
                        <div @click="keyClick(key.index)" class="d-flex ai-center jc-center c-p"
                            :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]">
                            <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                                :style="`word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                                <span style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                            </div>
                        </div>
                    </div>
                    <div :i="key.index" class="item d-flex ai-center jc-center c-p"
                        :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]"
                        v-for="key in line.keys" v-else @click="keyClick(key.index)">
                        <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                            :style="`word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                            <span style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                        </div>
                    </div>
                    <div :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top"
                        class="mask">
                    </div>
                </div>
            </div>
            <div class="keybox d-flex flex-column bg-white p-3" style="border-radius: 15px;position: relative;" v-else>
                <div class="d-flex" v-for="line in useKey.state.keyMatrix as Array<KeyLine>" :class="[`${line.style}`]">
                    <div :id="`key${key.index}`" trigger="contextmenu" ref="keyMapping"
                        @visible-change="handleOpen($event, `key${key.index}`)" v-for="key in line.keys"
                        v-if="meunid == 1">
                        <div @click="keyClick(key.index)" class="d-flex ai-center jc-center c-p"
                            :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]">
                            <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                                :style="`word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                                <span style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                            </div>
                        </div>
                    </div>
                    <div :i="key.index" class="item d-flex ai-center jc-center c-p"
                        :class="[`d-flex p-2 pl-3 ${key.style}`, useKey.keyColor(key.keyData), useKey.isSelected(key.index)]"
                        v-for="key in line.keys" v-else @click="keyClick(key.index)">
                        <div :class="[`text-white-1`, keyTextColorClass(key.keyData)]"
                            :style="`word-wrap: break-word;overflow: hidden;text-align: center;${keyTextColorStyle(key.keyData)}`">
                            <span style="word-wrap: break-word;" v-html="useKey.keyText(key.keyData)"></span>
                        </div>
                    </div>
                    <div :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top"
                        class="mask">
                    </div>
                </div>
            </div>
            <div class="d-flex jc-center mt-3" v-if="meunid == 1">
                <div class="py-1 px-3 but-red text-white c-p" @click="useKey.keySetToDefaultAll">
                    {{ $t('light.title_8') }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/rk_r87_rf/keyStore";
import { useMenuStore } from "@/stores/rk_r87_rf/menuStore";
import { uselightStore } from "@/stores/rk_r87_rf/lightStore";
import { ref, onMounted, onBeforeUnmount, watch, reactive, computed } from 'vue';
import type { DropdownInstance } from 'element-plus'
import { storeToRefs } from "pinia";
import type { KeyLine, KeyState, KeyTableData } from "@/keyboard/interface";
import { LightEffectEnum } from '@/keyboard/rk_r87_rf/enum'
import { useMacroStore } from "@/stores/rk_r87_rf/macroStore";

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
        if (meunid.value == 1) {
            useKey.unSelected();
        }
        useKey.keyClick(index);
    }

    if (meunid.value == 3) {
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
                color = `color:rgb(0, 0, 0);`;
                if (useLight.state.lightProps.light == LightEffectEnum.SelfDefine)
                    color = `color: ${useLight.keyTextColor(key.index)};`;
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

const mediaStrKey = (key: string | undefined) => {
    return `mediaKey.${key}`
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

.space-l {
    margin-left: 18px;
}

.space-l2 {
    margin-left: 40px;
}

.space-l3 {
    margin-left: 82px;
}

.space-t {
    margin-top: 10px;
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

    .space-l {
        margin-left: 11px;
    }

    .space-l2 {
        margin-left: 20px;
    }

    .space-l3 {
        margin-left: 53px;
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