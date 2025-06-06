<template>
    <div class="d-flex jc-center w-100">
        <div class="d-flex flex-column my-4 bg-warn-1" style="width: 80%;">
            <div class="d-flex flex-column flex-1">
                <div class="d-flex jc-between bg-white p-2" style="border-radius: 10px 10px 0px 0px;line-height: 30px;">
                    <div>
                        {{ $t("tft.title_1") }}
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
                            <el-dialog v-model="dialogVisible" top="20vh" width="780px" :lock-scroll="true">
                                <Cropper @closeShow="closeShow" @clickSure="clickSure" :imageUrl="imageUrl"
                                    :cropOption="cropOption" :img_list="img_list" :index="index" :loading="loading"
                                    @clickFrame="clickFrame" />
                            </el-dialog>
                            <el-upload :on-change='handleChangeUpload' :show-file-list="false" :auto-upload="false">
                                <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center">
                                    {{ $t("tft.title_2") }}
                                </div>
                            </el-upload>
                            <div>{{ $t("tft.desc_4") }}</div>
                        </div>
                        <div class="d-flex my-3">
                            <el-upload :before-upload='handleBeforeUpload' :show-file-list="false" :auto-upload="true">
                                <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center">
                                    {{ $t("tft.title_3") }}
                                </div>
                            </el-upload>
                            <div>{{ $t("tft.desc_1") }}</div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center" @click="saveImg">
                                {{ $t("tft.but_1") }}
                            </div>
                            <div>
                                <el-checkbox v-model="frame" :label="$t('set.layer_1')">
                                    {{ $t("tft.desc_2") }}
                                </el-checkbox>
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center"
                                @click="useTft.undoFrame">
                                {{ $t("tft.but_2") }}
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <div class="py-1 px-4 but-blue text-white mx-3 c-p but text-center"
                                @click="useTft.playFrame()" v-if="!state.play">
                                {{ $t("tft.but_3") }}
                            </div>
                            <div class="py-1 px-4 but-red text-white mx-3 c-p but text-center"
                                @click="useTft.stopFrame()" v-else>
                                {{ $t("tft.but_4") }}
                            </div>
                            <div>
                                <span>
                                    <el-input-number style="width: 120px" v-model="state.delay"
                                        aria-placeholder="Please input delay" type="number" />
                                </span>{{ $t("tft.desc_3") }}
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
                            {{ $t("tft.title_4") }}({{ frames?.list.length }}{{ $t("tft.title_4") }})
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
            <el-dialog v-model="saveShow.isShow" :show-close="false" width="500" :close-on-click-modal="false"
                :close-on-press-escape="false">
                <div class="text-center pb-4">{{ $t("tft.title_6") }}</div>
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
import { useTftStore } from "../../stores/rk_s98/tftStore";
import { storeToRefs } from "pinia";
import { RK_S98, RK_S98_EVENT_DEFINE } from "../../keyboard/beiying/rk_s98/rk_s98";
import { keyboard } from "../../keyboard/beiying/keyboard";
import { log } from 'console';
import { SuperGif } from '../../assets/js/libgif.js'

const useTft = useTftStore();
const saveShow = ref({
    isShow: false,
    isSuccess: false
});
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
    autoCropWidth: 320,
    autoCropHeight: 170,
    deleteLeft: 80,
    updateLeft: 28,
    disabled: false
})
const imageUrl = ref<any>('')
const addUrl = ref<any>('')
const addElement = ref<HTMLImageElement>();
const images = ref<Array<HTMLImageElement>>()
const rk_s98 = ref<RK_S98>();
const img_list = ref<any>([]);
const index = ref(0)
const loading = ref(false)

// 解构出t方法
const { t } = useI18n();
const frame = ref(false);
const dialogVisible = ref(false)

onMounted(async () => {
    await useTft.init();
    rk_s98.value = keyboard.protocol as RK_S98;
    rk_s98.value.addEventListener(RK_S98_EVENT_DEFINE.OnTftSetEvent, tftPicSetted, false);
    if (useTft.frames != undefined) {
        state.value.delay = useTft.frames?.delay;
    }
});

onBeforeUnmount(() => {
    if (rk_s98.value != undefined) {
        rk_s98.value.removeEventListener(RK_S98_EVENT_DEFINE.OnTftSetEvent, tftPicSetted, false);
    }
});

const dataURLtoFile = (dataurl: any, filename: any) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    var n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
// 将canvas转换成file对象
const convertCanvasToImage = (canvas: any, filename: any) => {
    return dataURLtoFile(canvas.toDataURL('image/png'), filename);
}
const pre_load_gif = (gif_source: any) => {
    loading.value = true;
    const gifImg = document.createElement('gifImg');
    // gif库需要img标签配置下面两个属性
    gifImg?.setAttribute('rel:animated_src', URL.createObjectURL(gif_source))
    gifImg?.setAttribute('rel:auto_play', '0')
    // 新建gif实例
    var rub = new (SuperGif as any)({ gif: gifImg });
    rub.load(() => {
        for (let i = 1; i <= rub.get_length(); i++) {
            // 遍历gif实例的每一帧
            rub.move_to(i);
            // 将每一帧的canvas转换成file对象
            let cur_file = convertCanvasToImage(rub.get_canvas(), gif_source.name.replace('.gif', '') + `-${i}`)
            img_list.value.push({
                file_name: cur_file.name,
                url: URL.createObjectURL(cur_file),
                file: cur_file,
                index: i,
            })
        }
        loading.value = false;
    });
}

const clickFrame = (i: any) => {
    index.value = i
}
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
    if (file.raw?.type !== 'image/jpeg' && file.raw?.type !== 'image/png' && file.raw?.type !== 'image/jpg' && file.raw?.type !== 'image/gif') {
        ElMessage.error('Format error!')
        return false
    } else if (file.size != undefined && file.size / 1024 / 1024 > 2) {
        ElMessage.error('Picture size can not exceed 2MB!')
        return false
    }
    dialogVisible.value = true
    imageUrl.value = URL.createObjectURL(file.raw)
    index.value = 0;
    img_list.value = [];
    if (file.raw?.type == 'image/gif') {
        pre_load_gif(file.raw)
    }
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
const clickSure = (data: any, cropper: any) => {

    if (frames.value != undefined && (frames.value.list.length + img_list.value.length) > 100) {
        ElMessageBox.alert(
            t('tft.error_5'),
            t('tft.error_2'),
            {
                cancelButtonText: 'ok',
                customClass: 'set-to-default',
            }
        );
    } else {
        if (img_list.value.length > 0) {
            for (let i = index.value; i < img_list.value.length; i++) {
                //for (let i = index.value; i < 1; i++) {
                const Img = new Image();
                Img.src = img_list.value[i].url;
                Img.onload = () => {
                    //1，创建画布
                    let canvas = document.createElement('canvas');
                    //2，创建画笔
                    const context = canvas.getContext('2d');
                    //3，设置背景的宽高
                    canvas.width = Img.width * cropper.scale;
                    canvas.height = Img.height * cropper.scale;
                    // 将变换原点设置为canvas的中心
                    context?.translate(canvas.width / 2, canvas.height / 2);
                    // 旋转
                    context?.rotate(cropper.rotate * Math.PI / 2);
                    // 将图像绘制到canvas上，旋转后的图像位于中心位置，需要向上移动一半的宽度，向左移动一半的高度
                    context?.drawImage(Img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
                    //裁剪
                    const myImage = new Image();
                    myImage.src = canvas.toDataURL("image/png");
                    
                    myImage.onload = () => {
                        //1，创建画布
                        let Imgcanvas = document.createElement('canvas');
                        //2，创建画笔
                        const Imgcontext = Imgcanvas.getContext('2d');
                        //3，设置背景的宽高
                        Imgcanvas.width = cropOption.autoCropWidth * 2;
                        Imgcanvas.height = cropOption.autoCropHeight * 2;

                        let imgX = cropper.cropOffsertX - cropper.x - (cropper.trueWidth - myImage.width) / 2;
                        let imgY = cropper.cropOffsertY - cropper.y - (cropper.trueHeight - myImage.height) / 2;
                        Imgcontext?.clearRect(0, 0, Imgcanvas.width, Imgcanvas.height);
                        Imgcontext?.drawImage(
                            myImage, //规定要使用的图像、画布或视频。
                            imgX, imgY, //开始剪切的 x 坐标位置。
                            cropper.cropW, cropper.cropH,  //被剪切图像的高度。
                            0, 0,//在画布上放置图像的 x 、y坐标位置。
                            Imgcanvas.width, Imgcanvas.height  //要使用的图像的宽度、高度
                        );
                        useTft.newFrame(Imgcanvas.toDataURL("image/png"))
                    }
                }
            }
        } else {
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
        }
        dialogVisible.value = false
    }
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
        useTft.frames.delay = state.value.delay;
    }
    
    saveShow.value.isShow = useTft.saveFrames();
    if (saveShow.value.isShow) {
        saveShow.value.isSuccess = false;
        Saving();
    } else {
        ElMessageBox.alert(
            t('tft.error_1'),
            t('tft.error_2'),
            {
                cancelButtonText: 'ok',
                customClass: 'set-to-default',
            }
        );
    }
}

let intervalId: any = null;
let count: number = 0;

const Saving = () => {
    intervalId = setInterval(() => {
        count++
        if (count > 15) {
            count = 0
            saveShow.value.isShow = false
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            if (!saveShow.value.isSuccess) {
                rk_s98.value?.stopTFTPicDownload();
                ElMessageBox.alert(
                    t('tft.error_3'),
                    t('tft.error_4'),
                    {
                        cancelButtonText: 'ok',
                        customClass: 'set-to-default',
                    }
                );
            }
        }
    }, 1000);
}

const tftPicSetted = (event: any) => {
    console.log('TFT picture setting: ', `frameIndex[${event.detail.frameIndex}] | frameNum[${event.detail.frameNum}] | packageIndex[${event.detail.packageIndex}] | packageNum[${event.detail.packageNum}]`);
    let totalPkg = event.detail.frameNum * 213;
    let curPkg = event.detail.frameIndex * 213 + event.detail.packageIndex;
    percentage.value = Math.floor(curPkg / totalPkg * 100)
    percentage.value = percentage.value >= 100 ? 100 : percentage.value;
    count = 0;
    if (percentage.value >= 100) {
        saveShow.value.isShow = false;
        saveShow.value.isSuccess = true;
    }
};
</script>
<style lang="scss" scoped>
.active-class {
    color: transparent;
}

.but {
    min-width: 110px;
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
    width: 320px;
    height: 170px;
    margin: 10px;
    flex-shrink: 0;
}
</style>