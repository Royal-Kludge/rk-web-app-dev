import type { MouseState } from '../interface';
import { RK_M3 } from './rk_m3';
import { REPORT_ID_USB } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { SetDpiPacket } from './packets/setDpiPacket';
import { LedTableEnum } from './ledTable';
import { SetFactoryPacket } from './packets/setFactoryPacket';
import { SetLedParamPacket } from './packets/setLedParamPacket';
import type { KeyTableEnum } from './keyTable';
import { SetPerKeyPacket } from './packets/setPerKeyPacket';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_M3_Usb extends RK_M3 {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;
    }

    static async create(state: MouseState, device: HIDDevice) {
        return new RK_M3_Usb(state, device);
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

    async setDpi(level: number): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetDpiPacket();
            let u8Data = new DataView(new Uint8Array(6).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.DpiLevel));

            let dpi = this.data.led.getDpiValue(level);
            if (dpi > 42000) dpi = 42000;
            if (dpi <= 30000) dpi = (dpi / 50) - 1;

            u8Data.setUint16(1, dpi, true);
            
            let color = this.data.led.getDpiColor(level);
            u8Data.setUint8(3, color.red);
            u8Data.setUint8(4, color.green);
            u8Data.setUint8(5, color.blue);

            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set dpi data to queue.`);
        }
    }

    async setFactory(): Promise<void> {
        let packet = new SetFactoryPacket();
        let u8Data = new DataView(new Uint8Array(1).buffer);

        u8Data.setUint8(0, 0xff);

        packet.setPayload(u8Data);

        worker.postMessage(packet.setReport);
        console.log(`Push set factory data to queue.`);
    }

    async setReportRate(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);

            u8Data.setUint8(0, this.data.led.getReportRate());
            
            packet.dataOffset = LedTableEnum.ReportRate;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set report rate data to queue.`);
        }
    }

    async setDebounce(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.Debounce));
            
            packet.dataOffset = LedTableEnum.Debounce;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set debounce data to queue.`);
        }
    }

    async setPerformance(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.Performance));
            
            packet.dataOffset = LedTableEnum.Performance;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set performance data to queue.`);
        }
    }

    async setLodHeight(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.LodHeight));
            
            packet.dataOffset = LedTableEnum.LodHeight;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set performance data to queue.`);
        }
    }

    async setSleepTime(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            let u8Data = new DataView(new Uint8Array(1).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.WorkSleepTime));
            
            packet.dataOffset = LedTableEnum.WorkSleepTime;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set performance data to queue.`);
        }
    }

    async setKeyMapping(index: number): Promise<void> {
        if (this.data.keys != undefined) {
            let packet = new SetPerKeyPacket();
            let u8Data = new DataView(new Uint8Array(4).buffer);

            let keyMapping = this.data.keys.getKeyMapping(index);
            u8Data.setUint32(0, keyMapping.keyRaw);
            
            packet.dataOffset = index * 4;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set key mapping data to queue.`);
        }
    }

    async getMacros(): Promise<void> {

    }

    async setMacros(): Promise<void> {
        
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {

    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}