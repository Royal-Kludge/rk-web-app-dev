import { Packet_Dongle_Set } from "@/keyboard/beiying/rk_s98/packets/dongle/setPacket";

export class SetLedEffectPacket extends Packet_Dongle_Set {

    constructor(callback: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x09, callback, pktFinish);
    }
}