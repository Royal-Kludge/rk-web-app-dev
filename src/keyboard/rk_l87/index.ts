import type { KeyboardState, KeyboardDefine  } from '../interface'
import { KeyMap_Normal, LightEffects  } from './layout'
import { KeyText } from "../keyCode"
import { Protocol } from '../protocol'
import { Profile } from './profile';
import { REPORT_ID } from './packet';
import type { LedColors } from './ledColors';

import { GetProfilePacket } from './packets/getProfilePacket';
import { SetProfilePacket } from './packets/setProfilePacket';

import { GetLedColorsPacket } from './packets/getLedColorsPacket';
import { SetLedColorsPacket } from './packets/setLedColorsPacket';


export class Protocol_RK_L87 extends Protocol {

    buffer: DataView;
    profile?: Profile;
    ledColors?: LedColors;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        this.buffer = new DataView(new ArrayBuffer(519));
    }

    static create(state: KeyboardState, device: HIDDevice) {
        return new Protocol_RK_L87(state, device);
    }

    async init(): Promise<void> {
        //this.profile = await this.getProfile();
    }

    async getProfile(): Promise<Profile | undefined> {
        let packet = new GetProfilePacket(0x00);
        await this.setReport(REPORT_ID, packet.setReport);
        packet.fromReportData(await this.getReport(REPORT_ID));

        this.profile = packet.profile;

        return this.profile;
    }

    async setProfile(): Promise<void> {
        if (this.profile != undefined) {
            let packet = new SetProfilePacket(0x00);
            packet.setPayload(this.profile.buffer);
            await this.setReport(REPORT_ID, packet.setReport);
        }
    }

    async getLedColors(): Promise<LedColors | undefined> {
        let packet = new GetLedColorsPacket();
        await this.setReport(REPORT_ID, packet.setReport);
        packet.fromReportData(await this.getReport(REPORT_ID));

        this.ledColors = packet.ledColors;

        return this.ledColors;
    }

    async setLedColors(): Promise<void> {
        if (this.ledColors != undefined) {
            let packet = new SetLedColorsPacket();
            packet.setPayload(this.ledColors.buffer);
            await this.setReport(REPORT_ID, packet.setReport);
        }
    }
}

export const RK_L87: KeyboardDefine = {
    name: "rk l87",
    vendorId: 0x258A,
    productId: 0x019F,
    usagePage: 0xFF00,
    usage: 1,
    keyText: KeyText,
    keyLayout: KeyMap_Normal,
    lightEffects: LightEffects,
    protocol: Protocol_RK_L87.create
}

