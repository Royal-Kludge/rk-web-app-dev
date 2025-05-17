import { Packet_Dongle_Set } from "@/keyboard/rk_r98pro/packets/dongle/setPacket";

export class SetLedColorsPacket extends Packet_Dongle_Set {

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x02, callback, pktFinish);
    }
}