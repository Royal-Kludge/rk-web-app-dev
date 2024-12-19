import { Packet_Dongle_Set } from "@/keyboard/rk_l75/packets/dongle/setPacket";

export class SetWebKeyTabPacket extends Packet_Dongle_Set {

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x12, callback, pktFinish);
    }
}