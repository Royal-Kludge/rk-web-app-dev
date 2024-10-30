import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import { Frame, Frames } from '@/keyboard/rk_m87/frames';
import { storage } from '@/keyboard/storage';

export const useTftStore = defineStore("tftinfo_rk_m87", () => {
    const frames = ref<Frames>();
    const frame = ref<Frame>();
    const frameBack = ref<Frame>();//上一步
    const index = ref<number>(0)
    const state = reactive({
        frame: frame,
        play: false,
        frameBack: frameBack,
    })
    let intervalId: any = null;

    const init = () => {
        let tmp = storage.get('frame') as Frames;
        let ms = new Frames();
        if (tmp != null) {
            for (let m of tmp.list) {
                let tm = new Frame(m.url);
                ms.add(tm);
            }
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
    const saveCanvas = (url: any) => {
        //1，获取画布
        let canvas = <HTMLCanvasElement>document.getElementById("imgCanvas");
        //2，创建画笔
        const context = canvas?.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);

        const Img = new Image();
        Img.src = url;
        Img.onload = () => {
            context?.drawImage(Img, 0, 0, canvas.width, canvas.height);
        }
    }
    const newFrame = (url: string = '') => {
        if (frames.value != undefined) {
            let tm = new Frame(url);
            frames.value.add(tm);
            frame.value = tm;
            saveCanvas(url);
        }
    }
    const updateFrame = (url: string = '') => {
        if (frames.value != undefined && frame.value != undefined) {
            let tm = new Frame(url);
            tm.index = frame.value.index;
            frames.value.update(frame.value.index, tm)
            saveCanvas(url);
        }
    }
    const delFrame = () => {
        if (frames.value != undefined && frame.value != undefined) {
            frames.value.remove(frame.value);
        }
    }
    const clickFrame = (obj: Frame) => {
        frame.value = obj;
        saveCanvas(frame.value.url);
    }

    const selecteFrame = (obj: Frame): string => {
        return obj?.index == frame.value?.index ? 'b-green' : '';
    }
    return { frames, state, init, saveFrame, saveFrames, newFrame, clickFrame, selecteFrame, delFrame, playFrame, stopFrame, backFrame, undoFrame, updateFrame }
});