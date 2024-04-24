import type { KeyDefineEnum } from '../keyCode';
import { KEY_MAXTRIX_LINE, KEY_MAXTRIX_COLOUMN, PACKET_HEAD_LENGTH } from "./packets/packet";

export enum MaxtrixLayer {
    NORMAL = 0x00,
    FN1 = 0x01,
    FN2 = 0x02,
    TOP = 0x03
}

export enum MaxtrixTable {
    WIN = 0x00,
    MAC = 0x04
}

export class KeyMaxtrix {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setKeyMapping(index: number, key: KeyDefineEnum) {
        let offset = index * 4;
        this.buffer.setUint32(offset, key);
    }

    getKeyMapping(index: number) : KeyDefineEnum {
        let offset = index * 4;
        let key: KeyDefineEnum;
        key = this.buffer.getUint32(offset);
        return key;
    }

    static fromReportData(data: DataView) : KeyMaxtrix | undefined {
        let colors = undefined;
        
        if (data.byteLength >= KEY_MAXTRIX_LINE * KEY_MAXTRIX_COLOUMN) {
            //let buffer = new DataView(data.buffer.slice(PACKET_HEAD_LENGTH, data.byteLength));
            colors = new KeyMaxtrix(data);
        }

        return colors;
    }
}