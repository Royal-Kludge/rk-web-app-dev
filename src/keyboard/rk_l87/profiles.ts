import { KeyMatrixLayer } from '@/keyboard/enum';

export class Layer {
    index: KeyMatrixLayer.Nomal;
    data: null;
    constructor(layer: KeyMatrixLayer | number, data: any) {
        this.index = layer
        this.data = data
    }
}
export class Profile {
    name: string;
    layers: Array<Layer>;
    index = 0;

    constructor(name: string) {
        this.name = name;
        this.layers = new Array<Layer>();
    }
    add(layer: Layer) {
        this.layers.push(layer);
    }
    remove(layer: Layer) {
        let index = this.layers.findIndex(obj => obj.index === layer.index);
        if (index !== -1) {
            this.layers.splice(index, 1);
        }

        index = 0;
        this.layers.forEach((p) => {
            p.index = index++;
        });
    }

    addLayerNORMAL(data: any) {
        this.layers.push(new Layer(KeyMatrixLayer.Nomal, data));
    }
    addLayerFN1(data: any) {
        this.layers.push(new Layer(KeyMatrixLayer.FN1, data));
    }
    addLayerFN2(data: any) {
        this.layers.push(new Layer(KeyMatrixLayer.FN2, data));
    }
    addLayerTOP(data: any) {
        this.layers.push(new Layer(KeyMatrixLayer.Tap, data));
    }
}

export class Profiles {
    list: Array<Profile>;

    constructor() {
        this.list = new Array<Profile>();
    }

    add(profile: Profile) {
        profile.index = this.list.length;
        this.list.push(profile);
    }

    remove(profile: Profile) {
        let index = this.list.findIndex(obj => obj.index === profile.index);
        if (index >= 1) {
            this.list.splice(index, 1);
        }

        index = 0;
        this.list.forEach((p) => {
            p.index = index++;
        });
    }

    get(): Array<Profile> {
        return this.list;
    }
}