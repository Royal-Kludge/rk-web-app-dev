import type { IPacket } from "@/keyboard/interface";
import { LED_COLOR_LENGTH, LED_EFFECT_COLOR_COUNT, LED_EFFECT_COUNT } from "@/keyboard/rk_l87/packets/packet";
import { Packet_Dongle_Get } from "@/keyboard/rk_l87/packets/dongle/getPacket";
import { LedColors } from "../../ledColors";

export class GetLedColorsPacket extends Packet_Dongle_Get {

    constructor(callback: (event: any) => void) {
        super(0x49, callback);
    }

    fromReportData(buffer: DataView) : IPacket {
        super.fromReportData(buffer);

        if (this.packageNum - 1 == this.packageIndex) {
            if (this.buffer != undefined) {
                this.getReport = new DataView(this.buffer.buffer);
                if (this.getReport.byteLength >= LED_COLOR_LENGTH * LED_EFFECT_COLOR_COUNT * LED_EFFECT_COUNT) {
                    let ledColors = LedColors.fromReportData(new DataView(this.getReport.buffer.slice(0, LED_COLOR_LENGTH * LED_EFFECT_COLOR_COUNT * LED_EFFECT_COUNT)));
                    this.dispatchEvent(new CustomEvent('onReportDataRecvied', { detail: ledColors }));
                }
            }
        }

        return this;
    }
}