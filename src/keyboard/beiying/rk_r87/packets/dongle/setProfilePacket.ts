import { Packet_Dongle_Set } from "@/keyboard/beiying/rk_r87/packets/dongle/setPacket";

export class SetProfilePacket extends Packet_Dongle_Set {

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x04, callback, pktFinish);
    }
}