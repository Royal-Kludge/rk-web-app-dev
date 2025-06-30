import type { KeyCodeEnum, KeyDefineEnum } from "@/common/keyCode";
import type { LedColor } from "@/keyboard/beiying/interface";
import { ErrorCodeEnum, LayoutTypeEnum, LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum, OrderTypeEnum, RWTypeEnum, SuperResponseEnum } from "@/keyboard/sparklink/enum";
import type { IPacket } from "@/keyboard/sparklink/interface";
import { Packet } from "@/keyboard/sparklink/rk_c61/packets/packet";

export class KB2_CMD_PRGB extends Packet {

    rw: RWTypeEnum;
    lightColorList?: Array<LedColor>;
    lightSwitch: LightSwitchEnum;
    lightDirection: LightDirectionEnum;
    superResponse: SuperResponseEnum;
    lightBrightness: number;
    lightMode: LightEffectEnum;
    lightSpeed: number;
    lightSleepDelay: number;
    staticLightMode: number;

    constructor(callback: (event: any) => void) {
        super(0x18, callback);
        this.len = 0x00;

        this.cmdBuffer = new Uint8Array(43);

        this.rw = RWTypeEnum.Read;
        this.lightSwitch = LightSwitchEnum.Off;
        this.lightDirection = LightDirectionEnum.Forward;
        this.superResponse = SuperResponseEnum.Off;
        this.lightBrightness = 0;
        this.lightMode = 0;
        this.lightSpeed = 0;
        this.lightSleepDelay = 0;
        this.staticLightMode = 0xff;
    }

    command(): Uint8Array {

        if (this.cmdBuffer != undefined) {
            this.cmdBuffer[0] = this.rw;

            this.cmdBuffer[1] = 0x00;
            this.cmdBuffer[2] = 0x00;
            this.cmdBuffer[3] = 0x00;
            this.cmdBuffer[4] = 0x00;

            if (this.lightColorList != undefined && this.lightColorList.length >= 7)
            for (let i = 0; i < 7; i++) {
                this.cmdBuffer[i * 4 + 5] = this.lightColorList[i].blue;
                this.cmdBuffer[i * 4 + 6] = this.lightColorList[i].green;
                this.cmdBuffer[i * 4 + 7] = this.lightColorList[i].red;
                this.cmdBuffer[i * 4 + 8] = 0xff;
            }

            this.cmdBuffer[33] = 0x00;
            this.cmdBuffer[34] = 0x00;
            this.cmdBuffer[35] = 0x00;
            this.cmdBuffer[36] = 0x00;

            let Bitmap = 0;
            Bitmap |= this.lightSwitch;
            Bitmap |= this.lightDirection;
            Bitmap |= this.superResponse;
            this.cmdBuffer[37] = Bitmap;
            this.cmdBuffer[38] = this.lightBrightness;

            this.cmdBuffer[39] = this.lightMode;
            this.cmdBuffer[40] = this.lightSpeed;
            this.cmdBuffer[41] = this.lightSleepDelay;
            this.cmdBuffer[42] = this.staticLightMode;

            this.len = this.cmdBuffer.length;
        }

        super.command();

        return this.setReport;
    }

    async fromReportData(buffer: DataView) : Promise<void> {
        super.fromReportData(buffer);
        
        if (this.recivedBuffer != undefined && this.recivedBuffer.byteLength == this.len && this.errCode == ErrorCodeEnum.Success) {
            const lightColorList: Array<LedColor> = new Array<LedColor>()
            let index = 5;
            for (let i = 0; i < 7; i++) {
                const B = this.recivedBuffer.getUint8(index++);
                const G = this.recivedBuffer.getUint8(index++);
                const R = this.recivedBuffer.getUint8(index++);
                lightColorList.push({
                    blue: B,
                    green: G,
                    red: R,
                    color: `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`})
                index++;
            }
            const lightSwitch: LightSwitchEnum = LightSwitchEnum.On & this.recivedBuffer.getUint8(37);
            const lightDirection: LightDirectionEnum = LightDirectionEnum.Forward & this.recivedBuffer.getUint8(37);
            const superResponse: SuperResponseEnum = SuperResponseEnum.On & this.recivedBuffer.getUint8(37);
            const lightBrightness: number = this.recivedBuffer.getUint8(38);
            const lightMode: LightEffectEnum = this.recivedBuffer.getUint8(39);
            let lightBigMode = LightModeEnum.Disable;
            if (lightMode == 0) {
                lightBigMode = LightModeEnum.Static;
            } else if (lightMode > 0 && lightMode <= 20) {
                lightBigMode = LightModeEnum.Dynamics;
            } else {
                lightBigMode = LightModeEnum.Custom;
            }
            const lightSpeed: number = this.recivedBuffer.getUint8(40);
            const lightSleepDelay: number = this.recivedBuffer.getUint8(41);
            const staticLightMode: number = this.recivedBuffer.getUint8(42);

            this.dispatchEvent(new CustomEvent('onReportDataRecvied', { 
                detail: { 
                    lightColorList: lightColorList,
                    lightSwitch: lightSwitch,
                    lightDirection: lightDirection,
                    superResponse: superResponse,
                    lightBrightness: lightBrightness,
                    lightMode: lightMode,
                    lightBigMode: lightBigMode,
                    lightSpeed: lightSpeed,
                    lightSleepDelay: lightSleepDelay,
                    staticLightMode: staticLightMode
                }
            }));
        }
    }
}