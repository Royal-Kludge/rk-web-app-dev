import { KeyMatrixLayer } from '@/keyboard/enum';

export class Profile {
    name: string;
    layers: Record<number, Uint8Array>;
    index = 0;

    constructor(name: string) {
        this.name = name;
        this.layers = {};
    }
    get(index: KeyMatrixLayer | number): Uint8Array {
        return this.layers[index];
    }
    add(layer: KeyMatrixLayer, data: Uint8Array) {
        this.layers[layer] = data;
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