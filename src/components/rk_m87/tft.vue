<template>
    <div class="d-flex jc-center w-100">
        <div class="d-flex flex-column my-4 bg-warn-1" style="width: 80%;">
            <div class="d-flex flex-column flex-1">
                <div class="d-flex jc-between bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                    <div>
                        屏幕预览
                    </div>
                </div>
                <div class="d-flex ai-center m-4">
                    <div class="bg-black d-flex jc-center ai-center"
                        style="width: 480px;height: 270px;border: 1px dashed #e9ebf3;position: relative;overflow: hidden;">
                        <Vue3DraggableResizable classNameActive="active-class" v-model:initW="imgOption.w"
                            v-model:initH="imgOption.h" v-model:x="imgOption.x" v-model:y="imgOption.y"
                            v-model:w="imgOption.w" v-model:h="imgOption.h" v-model:active="imgOption.active"
                            :draggable="true" :resizable="true" @wheel="onWheel" @activated="print('activated')"
                            @deactivated="print('deactivated')" @drag-start="print('drag-start')"
                            @resize-start="print('resize-start')" @dragging="print('dragging')"
                            @resizing="print('resizing')" @drag-end="print('drag-end')"
                            @resize-end="print('resize-end')" v-if="addUrl !== ''" style="cursor: move;">
                            <img :src="addUrl" ref="addElement"
                                :style="{ 'width': imgOption.w + 'px', 'height': imgOption.h + 'px' }"
                                v-if="addUrl !== ''">
                        </Vue3DraggableResizable>
                        <canvas id="imgCanvas" width="480" height="270"></canvas>
                    </div>
                    <div class="d-flex flex-column ml-3 flex-1">
                        <div class="d-flex my-3">
                            <el-dialog v-model="dialogVisible" top="30vh" width="780px" :lock-scroll="true">
                                <Cropper @closeShow="closeShow" @clickSure="clickSure" :imageUrl="imageUrl"
                                    :cropOption="cropOption" />
                            </el-dialog>
                            <el-upload :on-change='handleChangeUpload' :show-file-list="false" :auto-upload="false">
                                <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center">
                                    加载图片
                                </div>
                            </el-upload>
                        </div>
                        <div class="d-flex my-3">
                            <el-upload :before-upload='handleBeforeUpload' :show-file-list="false" :auto-upload="true">
                                <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center">
                                    添加图层
                                </div>
                            </el-upload>
                            <div>左键拖动图层，滚轮缩放图层</div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center" @click="saveImg">
                                保存修改
                            </div>
                            <div>
                                <el-checkbox v-model="frame" :label="$t('set.layer_1')">
                                    应用到所有帧
                                </el-checkbox>
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center"
                                @click="useTft.undoFrame">
                                撤销修改
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center"
                                @click="useTft.playFrame()" v-if="!state.play">
                                播放
                            </div>
                            <div class="py-1 px-4 but-red text-white mx-3 c-p but text-center"
                                @click="useTft.stopFrame()" v-else>
                                暂停
                            </div>
                            <div>
                                <span>
                                    <el-input-number style="width: 120px" v-model="delay"
                                        aria-placeholder="Please input delay" type="number" />
                                </span>播放问隔(毫秒)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" style="height: 360px;margin-bottom: 32px;">
                <div class="d-flex flex-column">
                    <div class="d-flex jc-between bg-white p-2"
                        style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                        <div>
                            帧列表({{ frames?.list.length }}帧)
                        </div>
                        <div class="d-flex">
                            <div class="mx-2 c-p"><img src="../../assets/images/title/add.png" class="img-title"
                                    @click="useTft.newFrame()" />
                            </div>
                            <div class="mx-2 c-p"><img src="../../assets/images/title/del.png" class="img-title"
                                    @click="useTft.delFrame()" />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column flex-1 bg-white-1" style="border-radius: 0px 0px 10px 10px;">
                        <div class="d-flex flex-1 warn-1">
                            <div style="height: 25vh;width: 100%;">
                                <el-scrollbar>
                                    <div class="d-flex" style="width: 100vh;">
                                        <div v-for="item in frames?.get()">
                                            <div class="d-flex flex-column ai-center jc-center c-p"
                                                @click="useTft.clickFrame(item)">
                                                <div>
                                                    {{ (item.index + 1) }}
                                                </div>
                                                <div
                                                    :class="['d-flex frame bg-black jc-center ai-center', useTft.selecteFrame(item)]">
                                                    <img :id="`frame${item.index}`" ref="images" :src="item.url"
                                                        v-if="item.url !== ''"
                                                        style="max-width: 100%; max-height: 100%; width: auto;  height: auto;" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="d-flex bg-white p-2 jc-center" style="border-radius: 0px 0px 10px 10px">
                            <div class="py-1 px-5 but-green text-white c-p but text-center" @click="saveFrames">
                                {{ $t('macro.but_7') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog v-model="saveShow" :show-close="false" width="500" :close-on-click-modal="false"
                :close-on-press-escape="false">
                <div class="text-center pb-4">保存中...</div>
                <el-progress :percentage="percentage" :stroke-width="15" striped striped-flow :duration="10" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import type { UploadProps } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
import Cropper from '@/components/cropper.vue'
import { useTftStore } from "../../stores/rk_m87/tftStore";
import { storeToRefs } from "pinia";
import { RK_M87, RK_M87_EVENT_DEFINE } from "../../keyboard/rk_m87/rk_m87";
import { keyboard } from "../../keyboard/keyboard";
import { log } from 'console';

const useTft = useTftStore();
const saveShow = ref(false);
const percentage = ref(0)
const { state, frames } = storeToRefs(useTft);
const imgOption = reactive({
    x: 0,
    y: 0,
    h: 0,
    w: 0,
    active: true,
})
/**
 * 截图配置
 */
const cropOption = reactive({
    autoCropWidth: 240,
    autoCropHeight: 135,
    deleteLeft: 80,
    updateLeft: 28,
    disabled: false
})
const imageUrl = ref<any>('')
const addUrl = ref<any>('')
const addElement = ref<HTMLImageElement>();
const images = ref<Array<HTMLImageElement>>()
const rk_m87 = ref<RK_M87>();

// 解构出t方法
const { t } = useI18n();
const frame = ref(false);
const delay = ref(0);
const dialogVisible = ref(false)

onMounted(async () => {
    await useTft.init();
    rk_m87.value = keyboard.protocol as RK_M87;
    rk_m87.value.addEventListener(RK_M87_EVENT_DEFINE.OnTftSetEvent, tftPicSetted, false);
    if (useTft.frames != undefined) {
        delay.value = useTft.frames?.delay;
    }
});

onBeforeUnmount(() => {
    if (rk_m87.value != undefined) {
        rk_m87.value.removeEventListener(RK_M87_EVENT_DEFINE.OnTftSetEvent, tftPicSetted, false);
    }
});

const print = (val: any) => {
    console.log(val)
}
const onWheel = (event: any) => {
    // 阻止默认的滚轮行为
    event.preventDefault();

    // 根据事件的deltaY调整大小
    if (event.deltaY < 0) {
        imgOption.w += 10;
        imgOption.h += 10;
    } else {
        imgOption.w -= 10;
        imgOption.h -= 10;
    }
    // 确保大小不会小于0
    imgOption.w = Math.max(imgOption.w, 0);
    imgOption.h = Math.max(imgOption.h, 0);
}
const handleChangeUpload: UploadProps['onChange'] = (file) => {
    if (file.raw?.type !== 'image/jpeg' && file.raw?.type !== 'image/png' && file.raw?.type !== 'image/jpg') {
        ElMessage.error('Format error!')
        return false
    } else if (file.size != undefined && file.size / 1024 / 1024 > 2) {
        ElMessage.error('Picture size can not exceed 2MB!')
        return false
    }
    dialogVisible.value = true
    imageUrl.value = URL.createObjectURL(file.raw)
    return true
}
const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg') {
        ElMessage.error('File format error')
        return false
    } else if (rawFile.size != undefined && rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Picture size can not exceed 2MB!')
        return false
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            if (img.width <= cropOption.autoCropWidth && img.height <= cropOption.autoCropHeight) {
                imgOption.w = img.width
                imgOption.h = img.height
            }
            else if (img.width / img.height > cropOption.autoCropWidth / cropOption.autoCropHeight) {
                imgOption.w = cropOption.autoCropWidth
                imgOption.h = img.height * (cropOption.autoCropWidth / img.width)
            }
            else {
                imgOption.w = img.width * (cropOption.autoCropHeight / img.height)
                imgOption.h = cropOption.autoCropHeight
            }
            imgOption.w *= 2
            imgOption.h *= 2
        };

        img.src = URL.createObjectURL(rawFile);
        addUrl.value = img.src
    };
    reader.readAsDataURL(rawFile);
    // 返回false告诉组件不需要自动上传
    return false;
}

const closeShow = () => {
    dialogVisible.value = false
}
const clickSure = (data: any) => {
    const Img = new Image();
    Img.src = window.URL.createObjectURL(data);
    Img.onload = () => {
        //1，创建画布
        let canvas = document.createElement('canvas');
        //2，创建画笔
        const context = canvas.getContext('2d');
        //3，设置背景的宽高
        canvas.width = cropOption.autoCropWidth * 2;
        canvas.height = cropOption.autoCropHeight * 2;

        let imgX = (canvas.width - Img.width) / 2;
        let imgY = (canvas.height - Img.height) / 2;
        context?.clearRect(0, 0, canvas.width, canvas.height);
        context?.drawImage(
            Img, //规定要使用的图像、画布或视频。
            0, 0, //开始剪切的 x 坐标位置。
            Img.width, Img.height,  //被剪切图像的高度。
            imgX, imgY,//在画布上放置图像的 x 、y坐标位置。
            Img.width, Img.height  //要使用的图像的宽度、高度
        );
        useTft.newFrame(canvas.toDataURL("image/png"))
    }
    dialogVisible.value = false
}

const saveImg = () => {
    if (addElement.value == null)
        return;

    //1，创建画布
    let Imgcanvas = document.createElement('canvas');
    //2，创建画笔
    const Imgcontext = Imgcanvas.getContext('2d');
    //3，设置背景的宽高
    Imgcanvas.width = imgOption.w;
    Imgcanvas.height = imgOption.h;

    const Img = new Image();
    Img.src = addElement.value.src;
    Img.onload = () => {
        Imgcontext?.drawImage(Img, 0, 0, Imgcanvas.width, Imgcanvas.height);

        //1，获取画布
        let canvas = <HTMLCanvasElement>document.getElementById("imgCanvas");
        //2，创建画笔
        const context = canvas?.getContext('2d');

        const myImage = new Image();
        myImage.src = Imgcanvas.toDataURL("image/png");
        myImage.onload = () => {
            context?.drawImage(myImage, 0, 0, imgOption.w, imgOption.h, imgOption.x, imgOption.y, imgOption.w, imgOption.h);
            useTft.backFrame()
            useTft.updateFrame(canvas.toDataURL("image/png"))
            addUrl.value = ''
        }
        //document.body.appendChild(canvas);
    }
    //document.body.appendChild(Imgcanvas);
}

const saveFrames = () => {
    if (useTft.frames != undefined) {
        useTft.frames.delay = delay.value;
    }
    useTft.saveFrames();
    saveShow.value = true
    Saving()
}

let intervalId: any = null;
let count: number = 0;

const Saving = () => {
    intervalId = setInterval(() => {
        count++
        if (count > 15) {
            count = 0
            saveShow.value = false
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }
    }, 1000);
}

const tftPicSetted = (event: any) => {
    console.log('TFT picture setting: ', `frameIndex[${event.detail.frameIndex}] | frameNum[${event.detail.frameNum}] | packageIndex[${event.detail.packageIndex}] | packageNum[${event.detail.packageNum}]`);
    let totalPkg = event.detail.frameNum * 127;
    let curPkg = event.detail.frameIndex * 127 + event.detail.packageIndex;
    percentage.value = Math.floor(curPkg / totalPkg * 100)
    percentage.value = percentage.value >= 100 ? 100 : percentage.value;
    count = 0;
    if (percentage.value >= 100) {
        saveShow.value = false
    }
};
</script>
<style lang="scss" scoped>
.active-class {
    color: transparent;
}

.but {
    min-width: 75px;
}

.selected {
    border: 1px solid #ffffffaf;
}

.input {
    .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 3px var(--el-input-focus-border-color) inset !important;
    }
}

.frame {
    width: 240px;
    height: 135px;
    margin: 10px;
    flex-shrink: 0;
}
</style>