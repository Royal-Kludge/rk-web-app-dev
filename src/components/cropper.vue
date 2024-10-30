<template>
    <div>
        <div style="display: flex">
            <div class="cut">
                <vue-cropper ref="cropper" :img="imageUrl" :output-size="option.size" :output-type="option.outputType"
                    :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber"
                    :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                    :original="option.original" :auto-crop="option.autoCrop"
                    :auto-crop-width="props.cropOption.autoCropWidth"
                    :auto-crop-height="props.cropOption.autoCropHeight" :center-box="option.centerBox"
                    :high="option.high" mode="cover" :max-img-size="option.max" :enlarge="option.enlarge"
                    @real-time="realTime">
                </vue-cropper>
            </div>
            <div
                :style="{ 'width': previews.w + 'px', 'height': previews.h + 'px', 'overflow': 'hidden', 'margin-left': '5px' }">
                <div :style="previews.div">
                    <img :src="previews.url" :style="previews.img" alt="">
                </div>
            </div>
        </div>
        <div class="menuBox">
            <div class="menuBtn" @click="changeScale(1)">
                <el-icon>
                    <ZoomIn />
                </el-icon>
            </div>
            <div class="menuBtn" @click="changeScale(-1)">
                <el-icon>
                    <ZoomOut />
                </el-icon>
            </div>
            <div class="menuBtn" @click="rotateLeft">
                <el-icon>
                    <RefreshLeft />
                </el-icon>
            </div>
            <div class="menuBtn" @click="rotateRight">
                <el-icon>
                    <RefreshRight />
                </el-icon>
            </div>
        </div>
        <div class="button">
            <el-button class="sureBtn" @click="clickSure" type="primary">确 定</el-button>
            <el-button class="closeBtn" @click="closeShow">取 消</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { VueCropper } from "vue-cropper"
import { Plus, ZoomIn, ZoomOut, RefreshRight, RefreshLeft, Delete } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'

const props = defineProps(['imageUrl', 'cropOption'])
const emit = defineEmits(['closeShow', 'clickSure'])
const cropper = ref(VueCropper)

let previews = ref({})  // 即时预览

const option = reactive({
    img: '',  // 上传图片地址
    size: 1,  // 输出图片大小
    full: false,  // 是否输出原图比例
    outputType: 'png',  // 输出图片格式
    canMove: true, // 图片是否可移动
    fixedBox: true,  // 截图框是否固定
    original: true,  // 图片是否按比例
    canMoveBox: false, // 截图框是否可移动
    autoCrop: true,  // 是否开启截图
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: '',  // 输出图片宽高
    autoCropHeight: '',  // 输出图片宽高
    centerBox: true,  // 是否开启截图框固定宽高
    high: true,  // 是否开启图片移动
    max: 99999,  // 输出图片大小限制
    enlarge: "2" //图片根据截图框输出比例倍数
})

const fixed = ref(false)  // 是否开启截图框固定宽高
const imageUrl = computed(() => props.imageUrl) // 图片地址
const fixedNumber = ref([240, 135])  // 截图框固定宽高

/**
* 关闭弹窗
*/
const closeShow = () => {
    emit('closeShow')
}
/**
* 图片缩放
* @param num
*/
const changeScale = (num: any) => {
    num = num || 1
    cropper.value.changeScale(num)
}

/**
* 图片旋转 - 顺时针
*/
const rotateLeft = () => {
    cropper.value.rotateLeft()
}

/**
* 图片旋转 - 逆时针
*/
const rotateRight = () => {
    cropper.value.rotateRight()
}

/**
* 实时预览函数
* @param data
*/
const realTime = (data: any) => {
    previews.value = data
}

/**
* 确定按钮
*/
const clickSure = () => {
    cropper.value.getCropBlob(async (data: any) => {
        // const imgUrl = window.URL.createObjectURL(data);

        // const response = await fetch(imgUrl);
        // const blobData = await response.blob();

        // const formData = new FormData();
        // formData.append('file', blobData, 'filename.png');
        emit('clickSure', data)
    })
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.cut {
    width: 480px;
    height: 300px;
    flex-shrink: 0;
    display: flex;
    margin-bottom: 20px;
    box-sizing: border-box;
    overflow: hidden;
}

.cropperModal {
    width: 4636px;
    height: 300px;
}

.c-item {
    max-width: 800px;
    margin: 20px auto 10px;
}

.content {
    max-width: 1200px;
    margin: auto auto 100px;
}

.button {
    display: flex;
    align-content: center;
    justify-content: flex-end;
}

.btnUp {
    width: 200px;
    height: 140px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    background-color: #fbfdff;
    cursor: pointer;
    text-align: center;
    line-height: 140px;
    font-size: 20px;
    color: #DCDFE6;
    position: relative;
}

.btnUp i {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
}

.showImg {
    height: 140px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    background-color: #fbfdff;
    cursor: pointer;
    text-align: center;
    line-height: 140px;
    font-size: 20px;
    color: #DCDFE6;
    position: relative;
}

.showImg img {
    width: 100%;
    height: 100%;
}

.showImg:hover .powerBtn {
    visibility: visible;
}

#uploads {
    position: absolute;
    clip: rect(0 0 0 0)
}

.tip {
    color: #8c939d;
    display: flex;
    justify-content: center;
    font-size: 12px;
}

.powerBtn {
    visibility: hidden;
    position: absolute;
    font-size: 24px;
    width: 24px;
    height: 24px;
    color: #fefeff;
    cursor: pointer;
}


.sureBtn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0 0;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
}

.closeBtn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0 0;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
}

.menuBox {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: 30px;
    width: 460px;
    justify-content: center;
}

.menuBtn {
    white-space: nowrap;
    cursor: pointer;
    background: #ff4d51;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin-right: 10px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
    height: 30px;
    width: 50px;
}

.des {
    line-height: 30px;
}

code.language-html {
    padding: 10px 20px;
    margin: 10px 0;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
}

.show-info {
    margin-bottom: 50px;
}

.show-info h2 {
    line-height: 50px;
}

.title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
}

.test {
    height: 500px;
}

.model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
}

.model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
    display: block;
    user-select: none;
}

@keyframes slide {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>
