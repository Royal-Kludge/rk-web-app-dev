import { Packet_Dongle_Block_Set } from "@/keyboard/rk_r87_rf/packets/dongle/setPacket";
import { REPORT_PAYLOAD_LENGTH, MACRO_PER_BLOCK_LENGTH } from "@/keyboard/rk_r87_rf/packets/packet";

export class SetMacrosPacket extends Packet_Dongle_Block_Set {

    constructor(callback: (event: any) => void, nextBlock: (event: any) => void, pktFinish: (event: any) => void) {
        super(0x03, callback, nextBlock, pktFinish);
    }
}