import type { MouseState } from '../interface';
import { RK_M300 } from './rk_k3';
import { REPORT_ID_USB } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_M300_Usb extends RK_M300 {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;
    }

    static async create(state: MouseState, device: HIDDevice) {
        return new RK_M300_Usb(state, device);
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