import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Frame, Frames } from '@/keyboard/rk_m87/frames';
import { storage } from '@/keyboard/storage';
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
    })
    let intervalId: any = null;

    const init = () => {
        if (rk_m87.value == undefined) {
            rk_m87.value = (keyboard.protocol as RK_M87);
        }

        let tmp = storage.get('frame') as Frames;
        let ms = new Frames();
        if (tmp != null) {
            for (let m of tmp.list) {
                let tm = new Frame(m.url);
                tm.rgb565 = m.rgb565;
                ms.add(tm);
            }
            ms.delay = tmp.delay;
        }
        frames.value = ms;
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

    const saveFrames = () => {
        if (frames.value != undefined) {
            storage.set('frame', frames.value);
            let buffers = new Array<Uint16Array>();
            let index: number;
            for (index = 0; index < frames.value.list.length; index++) {
                let rgb565 = frames.value.list[index].rgb565;
                if (rgb565 != undefined) {
                    let buff = new Uint16Array(rgb565.length);
                    let j: number;
                    for (j = 0; j < rgb565.length; j++) {
                        buff[j] = rgb565[j].valueOf();
                    }
                    buffers.push(buff);
                }
            }
            rk_m87.value?.setTftPic(buffers, frames.value.delay);
        }
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
                if (Imgcontext2 != undefined) {
                    const imageData = Imgcontext2.getImageData(0, 0, Imgcanvas.width, Imgcanvas.height);
                    frame.rgb565 = Array.from(convertToRgb565(imageData.data));
                }
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
            frames.value.remove(frame.value);
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

    return { frames, state, init, saveFrame, saveFrames, newFrame, clickFrame, selecteFrame, delFrame, playFrame, stopFrame, backFrame, undoFrame, updateFrame }
});