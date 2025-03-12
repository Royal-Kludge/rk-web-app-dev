import type { MouseState } from '../interface';
import { RK_M3 } from './rk_m3';
import { POPUP_CMD_ID, REPORT_ID_POPUP, REPORT_ID_USB } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { SetDpiPacket } from './packets/setDpiPacket';
import { LedTableEnum } from './ledTable';
import { SetFactoryPacket } from './packets/setFactoryPacket';
import { SetLedParamPacket } from './packets/setLedParamPacket';
import { SetPerKeyPacket } from './packets/setPerKeyPacket';
import { GetOnlinePacket } from './packets/getOnlinePacket';
import { RK_MOUSE_EVENT_DEFINE } from '../mouse';
import { PopupCmdId } from '../enum';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_M3_Mouse extends RK_M3 {

    constructor(state: MouseState, device: HIDDevice) {
        super(state, device);
        //state.connectType = ConnectionType.USB;
    }

    static async create(state: MouseState, device: HIDDevice) {
        return new RK_M3_Mouse(state, device);
    }

    async init(): Promise<void> {
        super.init();
        this.state.ConnectionStatus = ConnectionStatusEnum.Connected;

        worker.onmessage = async (event) => {
            if (event.data == 'heartbeat') {
            } else {
                try {
                    await this.setFeature(REPORT_ID_USB, event.data as Uint8Array);
                    await this.getFeature(REPORT_ID_USB);
                } catch (e) {
                    this.device.close();
                }
            }
        };
        
        worker.postMessage('start');
    }

    async getOnline(): Promise<void> {
        let packet = new GetOnlinePacket();
        let u8Data = new DataView(new Uint8Array(0).buffer);
        
        if (this.device != undefined) {
            packet.setPayload(u8Data);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
            let data = await this.getFeature(REPORT_ID_USB);

            if (data.byteLength >= 16 && data.getUint8(2) == 0x00 && data.getUint8(6) == 0x01) {
                let tmp = new DataView(new Uint8Array(8).buffer);
                let index = 0;
                for (index = 2;index <= 7; index++) {
                    tmp.setUint8(index, data.getUint8(index + 5));
                }
                let pwd = tmp.getBigUint64(0);
                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnPasswordGotten, { detail: pwd }));
            }
        }
    }

    async setDpi(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetDpiPacket();
            let u8Data = new DataView(new Uint8Array(6).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.DpiLevel));

            let level = this.data.led.getDpiLevel();
            let dpi = this.data.led.getDpiValue(level);
            let setVal = 0;
            if (dpi > 42000) setVal = 42000;
            if (dpi <= 30000) setVal = (dpi / 50) - 1;

            u8Data.setUint16(1, setVal, true);
            
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
            packet.sn = 0x31;
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
            packet.sn = 0x32;
            let u8Data = new DataView(new Uint8Array(3).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.LodHeight));
            u8Data.setUint8(1, this.data.led.getFieldValue(LedTableEnum.Debounce));
            u8Data.setUint8(2, this.data.led.getFieldValue(LedTableEnum.Performance));
            
            packet.dataOffset = LedTableEnum.LodHeight;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set performance data to queue.`);
        }
    }

    async setPerformance(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            packet.sn = 0x32;
            let u8Data = new DataView(new Uint8Array(3).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.LodHeight));
            u8Data.setUint8(1, this.data.led.getFieldValue(LedTableEnum.Debounce));
            u8Data.setUint8(2, this.data.led.getFieldValue(LedTableEnum.Performance));
            
            packet.dataOffset = LedTableEnum.LodHeight;
            packet.setPayload(u8Data);

            worker.postMessage(packet.setReport);
            console.log(`Push set performance data to queue.`);
        }
    }

    async setLodHeight(): Promise<void> {
        if (this.data.led != undefined) {
            let packet = new SetLedParamPacket();
            packet.sn = 0x32;
            let u8Data = new DataView(new Uint8Array(3).buffer);

            u8Data.setUint8(0, this.data.led.getFieldValue(LedTableEnum.LodHeight));
            u8Data.setUint8(1, this.data.led.getFieldValue(LedTableEnum.Debounce));
            u8Data.setUint8(2, this.data.led.getFieldValue(LedTableEnum.Performance));
            
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
            packet.sn = 0x20;
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
        try {
            let u8 = new Uint8Array(data.buffer, 0, data.buffer.byteLength);
            console.log(`GetReport [${data.byteLength}] bytes -> ${u8.toString()}`);
    
            if (data.byteLength == 31 && reportId == REPORT_ID_POPUP) {
                if (data.getUint8(0) == POPUP_CMD_ID) {
                    let id = data.getUint8(1);
                    switch (id) {
                        case PopupCmdId.ConnectStatusChanged:
                            // let val = data.getUint8(2);
                            // this.state.ConnectionStatus = val == 0x01 ? ConnectionStatusEnum.Connected : ConnectionStatusEnum.Disconnected;
                            // this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnDongleStatusChanged, { detail: this.state.ConnectionStatus }));
                            break;
                    }
                }
            }
        } catch (e) {

        }
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}