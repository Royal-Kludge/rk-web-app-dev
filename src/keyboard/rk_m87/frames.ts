export class Frames {
    list: Array<Frame>;
    delay: number

    constructor() {
        this.list = new Array<Frame>();
        this.delay = 1000
    }

    add(frame: Frame) {
        frame.index = this.list.length;
        this.list.push(frame);
    }

    find(index: number): Frame | undefined {
        return this.list.find(obj => obj.index === index);
    }

    update(index: number, frame: Frame) {
        this.list.splice(index, 1, frame);
    }

    remove(frame: Frame) {
        let index = this.list.findIndex(obj => obj.index === frame.index);
        if (index !== -1) {
            this.list.splice(index, 1);
        }

        index = 0;
        this.list.forEach((p) => {
            p.index = index++;
        });
    }

    get(): Array<Frame> {
        this.list.sort(function (a, b) {
            return a.index - b.index;
        });
        return this.list;
    }
}
export class Frame {
    url: string;
    //rgb565?: Array<Number>;
    index = 0;

    constructor(url: string) {
        this.url = url;
    }
}