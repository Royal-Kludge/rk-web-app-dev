import type { KeyboardState } from '../interface'
import { REPORT_ID_USB } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { RK_C61, RK_C61_EVENT_DEFINE } from './rk_c61';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_C61_Usb extends RK_C61 {

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_C61_Usb(state, device);
    }

    async init(): Promise<void> {
        super.init();
        this.state.ConnectionStatus = ConnectionStatusEnum.Connected;

        worker.onmessage = async (event) => {
            if (event.data == 'heartbeat') {
            } else {
                try {
                    await this.setFeature(REPORT_ID_USB, event.data as Uint8Array);
                } catch (e) {
                    this.device.close();
                }
            }
        };
        
        worker.postMessage('start');
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {

    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}