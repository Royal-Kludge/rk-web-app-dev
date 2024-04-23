import { type LightEffectEnum } from '../enum'
import { type LedColor } from '../interface'
import { LED_COLOR_LENGTH, LED_EFFECT_COLOR_COUNT, LED_EFFECT_COUNT, PACKET_HEAD_LENGTH } from "./packets/packet";

export class LedColors {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setLedColor(effect: LightEffectEnum, color: LedColor) {
        let offset = effect * (3 * 7);
        this.buffer.setUint8(offset, color.red);
        this.buffer.setUint8(offset + 1, color.green);
        this.buffer.setUint8(offset + 2, color.blue);
    }

    getLedColor(effect: LightEffectEnum) : LedColor {
        let offset = effect * (3 * 7);
        let r = this.buffer.getUint8(offset);
        let g = this.buffer.getUint8(offset + 1);
        let b = this.buffer.getUint8(offset + 2);
        let color: LedColor = {
            red: r,
            green: g,
            blue: b,
            color: LedColors.getColorString(r, g, b)
        }

        return color;
    }

    static getColorString(r: number, g: number, b: number) : string {
        return `#${r.toString(16).toUpperCase().padStart(2, '0')}${g.toString(16).toUpperCase().padStart(2, '0')}${b.toString(16).toUpperCase().padStart(2, '0')}`;
    }

    static fromReportData(data: DataView) : LedColors | undefined {
        let colors = undefined;
        
        if (data.byteLength >= LED_COLOR_LENGTH * LED_EFFECT_COLOR_COUNT * LED_EFFECT_COUNT + PACKET_HEAD_LENGTH) {
            let buffer = new DataView(data.buffer.slice(PACKET_HEAD_LENGTH, data.byteLength));
            colors = new LedColors(buffer);
        }

        return colors;
    }
}