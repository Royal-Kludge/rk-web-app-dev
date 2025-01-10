import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Frame, Frames } from '@/keyboard/rk_m87/frames';
import { storage } from '@/common/storage';
import { keyboard } from '@/keyboard/keyboard'
import { RK_M87, RK_M87_EVENT_DEFINE } from '@/keyboard/rk_m87/rk_m87';

export const useTftStore = defineStore("tftinfo_rk_m87", () => {
    const frames = ref<Frames>();
    const frame = ref<Frame>();
    const frameBack = ref<Frame>();//上一步
    const index = ref<number>(0)
    const rk_m87 = ref<RK_M87>();
    const state = reactive({
        frame: frame,
        play: false,
        frameBack: frameBack,
    });

    const rgb256_cache = new Array<{
        index: Number;
        value?: Array<Number>;
    }>;

    let intervalId: any = null;

    const init = () => {
        if (rk_m87.value == undefined) {
            rk_m87.value = (keyboard.protocol as RK_M87);
        }

        // let tmp = storage.get(`${keyboard.keyboardDefine?.name}_frame`) as Frames;
        // let ms = new Frames();
        // if (tmp != null) {
        //     for (let m of tmp.list) {
        //         let tm = new Frame(m.url);
        //         //tm.rgb565 = m.rgb565;
        //         ms.add(tm);
        //     }
        //     ms.delay = tmp.delay;
        // }
        // frames.value = ms;
        // frame.value = frames.value.get()[0];
        frames.value = new Frames();
        frames.value.delay
        frame.value = frames.value.get()[0];
    }

    const playFrame = () => {
        if (frames.value?.list == undefined)
            return;
        state.play = true;
        intervalId = setInterval(() => {
            let m = frames.value?.find(index.value)
            if (m == undefined) {
                index.value = 0
            }
            else {
                clickFrame(m)
                index.value += 1
            }
        }, frames.value.delay);
    };

    const stopFrame = () => {
        state.play = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    const saveFrames = () : boolean => {
        let ret = false;
        if (frames.value != undefined) {
            try {
                //storage.set(`TFT_frame`, frames.value);
                let buffers = new Array<Uint16Array>();
                let index: number;
                for (index = 0; index < frames.value.list.length; index++) {
                    //let rgb565 = frames.value.list[index].rgb565;
                    // let rgb565 = rgb256_cache.find(p => p.index == index);
                    // if (rgb565 != undefined && rgb565.value != undefined) {
                    //     let buff = new Uint16Array(rgb565.value.length);
                    //     let j: number;
                    //     for (j = 0; j < rgb565.value.length; j++) {
                    //         buff[j] = rgb565.value[j].valueOf();
                    //     }
                    //     buffers.push(buff);
                    // }
                    let imgData = getImageData(frames.value.list[index]);
                    if (imgData != undefined) {
                        let rgb565 = convertToRgb565(imgData.data);
                        buffers.push(rgb565);
                    }
                }
                ret = true;
                rk_m87.value?.setTftPic(buffers, frames.value.delay >= 25 ? frames.value.delay - 25 : frames.value.delay);
            }
            catch {
                console.log("save frames error");
            }
        }

        return ret;
    }
    const saveFrame = () => {
        if (frames.value != undefined && frame.value != undefined) {
            frames.value.add(frame.value);
        }
    }
    const backFrame = () => {
        frameBack.value = frame.value;
    }
    const undoFrame = () => {
        frame.value = frameBack.value;
        if (frame.value != undefined) {
            updateFrame(frame.value.url)
        }
    }
    const saveCanvas = (url: any, frame: Frame) => {
        //1，获取画布
        let canvas = <HTMLCanvasElement>document.getElementById("imgCanvas");
        //2，创建画笔
        const context = canvas?.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);

        const Img = new Image();
        Img.src = url;
        Img.onload = () => {
            context?.drawImage(Img, 0, 0, canvas.width, canvas.height);

            //1，创建画布
            let Imgcanvas = document.createElement('canvas');
            //2，创建画笔
            const Imgcontext2 = Imgcanvas.getContext('2d');

            //3，设置背景的宽高
            Imgcanvas.width = 240;
            Imgcanvas.height = 135;
            
            const Img2 = new Image();
            Img2.src = canvas.toDataURL("image/png");
            Img2.onload = () => {
                Imgcontext2?.drawImage(Img2, 0, 0, Imgcanvas.width, Imgcanvas.height);
                // if (Imgcontext2 != undefined) {
                //     const imageData = Imgcontext2.getImageData(0, 0, Imgcanvas.width, Imgcanvas.height);
                //     //frame.rgb565 = Array.from(convertToRgb565(imageData.data));
                //     let rgb565 = rgb256_cache.find(p => p.index == frame.index);
                //     if (rgb565 != undefined) {
                //         rgb565.value = Array.from(convertToRgb565(imageData.data));
                //     } else {
                //         rgb256_cache.push({index: frame.index, value: Array.from(convertToRgb565(imageData.data))});
                //     }
                //     rgb256_cache.push({ index: frame.index, value: undefined})
                // }
            }
        }
    }
    const newFrame = (url: string = '') => {
        if (frames.value != undefined) {
            let tm = new Frame(url);
            frames.value.add(tm);
            frame.value = tm;
            saveCanvas(url, tm);
        }
    }
    const updateFrame = (url: string = '') => {
        if (frames.value != undefined && frame.value != undefined) {
            let tm = new Frame(url);
            tm.index = frame.value.index;
            frames.value.update(frame.value.index, tm)
            saveCanvas(url, tm);
        }
    }
    const delFrame = () => {
        if (frames.value != undefined && frame.value != undefined) {
            let index = frame.value.index;
            frames.value.remove(frame.value);
            
            if (index !== -1) {
                rgb256_cache.splice(index, 1);
            }

            index = 0;
            rgb256_cache.forEach((p) => {
                p.index = index++;
            });
        }
    }
    const clickFrame = (obj: Frame) => {
        frame.value = obj;
        saveCanvas(frame.value.url, obj);
    }

    const selecteFrame = (obj: Frame): string => {
        return obj?.index == frame.value?.index ? 'b-green' : '';
    }

    const convertToRgb565 = (pngBuffer: any): Uint16Array => {
        const rgb565Buffer = new Uint16Array(pngBuffer.length / 4);
        for (let i = 0, j = 0; i < pngBuffer.length; i += 4, j++) {
          const r = pngBuffer[i], g = pngBuffer[i + 1], b = pngBuffer[i + 2];
          // RGB565 is 5 bits for red, 6 bits for green, 5 bits for blue
          rgb565Buffer[j] = (r >> 3) << 11 | (g >> 2) << 5 | (b >> 3);
        }
        return rgb565Buffer;
    }

    const getImageData = (frame: Frame): ImageData | undefined => {
        let imgData = undefined;
        //1，创建画布
        let ImgCanvas = document.createElement('canvas');
        //2，创建画笔
        const ImgContext = ImgCanvas.getContext('2d');
        
        //3，设置背景的宽高
        ImgCanvas.width = 240;
        ImgCanvas.height = 135;
        
        const Img = new Image();
        Img.src = frame.url;
        ImgContext?.drawImage(Img, 0, 0, ImgCanvas.width, ImgCanvas.height);
        if (ImgContext != undefined) {
            imgData = ImgContext.getImageData(0, 0, ImgCanvas.width, ImgCanvas.height);
        }

        return imgData;
    }

    return { frames, state, init, saveFrame, saveFrames, newFrame, clickFrame, selecteFrame, delFrame, playFrame, stopFrame, backFrame, undoFrame, updateFrame }
});