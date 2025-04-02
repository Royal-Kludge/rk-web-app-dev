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
import { BigDataTransType, GetReportCmdId, PopupCmdId } from '../enum';
import { SetStartDataTransPacket } from './packets/setStartDataTransPacket';
import { SetInitOtaEventPacket } from './packets/setInitOtaEventPacket';
import { SetCheckOtaEventPacket } from './packets/setCheckOtaEventPacket';
import { SetFormatFlashPacket } from './packets/setFormatFlashPacket';
import { SetMacroDataPacket, MACRO_BYTES_PER_PACKET } from './packets/setMacroDataPacket';
import { SetCheckMacroPacket } from './packets/setCheckMacroPacket';
import { setEndDataTransPacket } from './packets/setEndDataTransPacket';
import { GetResponeBigPacket } from './packets/getResponeBigPacket';
import { GetResponePacket } from './packets/getResponePacket';
import { GetFwVerPacket } from './packets/getFwVerPacket';
import { GetBatteryPacket } from './packets/getBatteryPacket';

const worker = new Worker(new URL('@/common/mouseCommunication.ts', import.meta.url));

const CMD_FIX_VAL_SHORT = 0x50;
const CMD_FIX_VAL_LONG = 0x65;
const CMD_RSP_SUCCESS = 0x00;
const CMD_RSP_FAIL = 0x01;
const CMD_RSP_WAIT = 0x02;
const CMD_EXEC_SUCCESS = 0x0E;

export class RK_M3_Mouse extends RK_M3 {

    getReportCmd: GetReportCmdId = GetReportCmdId.None;
    dataTransType: BigDataTransType = BigDataTransType.None;

    setMacroDataPacket: SetMacroDataPacket = new SetMacroDataPacket();

    retry: number = 0;

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
            if (event.data == 'getReport') {
                var data = await this.getFeature(REPORT_ID_USB);
                if (data.byteLength == 16) {
                    let packet = new GetResponePacket();
                    packet.fromReportData(data);
                    if (packet.fixVal == CMD_FIX_VAL_SHORT && packet.cmdRsp == CMD_RSP_SUCCESS) {
                        worker.postMessage("stopGet");
                    }
                } else if (data.byteLength > 41) {
                    let packet = new GetResponeBigPacket();
                    packet.fromReportData(data);
                    if (packet.fixVal == CMD_FIX_VAL_LONG && packet.cmdRsp == CMD_RSP_SUCCESS) {
                        switch (this.getReportCmd) {
                            case GetReportCmdId.None:
                            case GetReportCmdId.SetPerKeyCmd:
                            case GetReportCmdId.SetMultiKeyStartCmd:
                            case GetReportCmdId.SetMultiKeyEndCmd:
                            case GetReportCmdId.SetLedParamCmd:
                            case GetReportCmdId.SetDpiCmd:
                            case GetReportCmdId.SetFactoryResetCmd:
                            case GetReportCmdId.GetOnlineCmd:
                                worker.postMessage("stopGet");
                                break;
                            case GetReportCmdId.SetStartDataTransCmd:
                            case GetReportCmdId.SetInitOtaEventCmd:
                                if (packet.result == 0x01 || packet.result == CMD_EXEC_SUCCESS || packet.otaRsp == CMD_RSP_SUCCESS) {
                                    if (packet.sn == 0x01) {
                                        worker.postMessage("stopGet");
                                        await this.setCheckOtaEvent();
                                    }
                                }
                                break;
                            case GetReportCmdId.SetCheckOtaEventCmd:
                                if (packet.result == CMD_EXEC_SUCCESS) {
                                    if (packet.sn == 0x02) {
                                        worker.postMessage("stopGet");
                                        switch (this.dataTransType) {
                                            case BigDataTransType.GetFwVer:
                                                await this.setGetFwVer();
                                                break;
                                            case BigDataTransType.SetMacroData:
                                                await this.setFormatFlash();
                                                break;
                                            default:
                                                await this.setEndDataTrans();
                                                break;
                                        }
                                    }
                                }
                                break;
                            case GetReportCmdId.SetFormatFlashCmd:
                                if (packet.result == CMD_EXEC_SUCCESS) {
                                    if (packet.sn == 0x03) {
                                        worker.postMessage("stopGet");
                                        await this.setMacroData();
                                    }
                                }
                                break;
                            case GetReportCmdId.SetCheckMacroCmd:
                                if (packet.result == CMD_EXEC_SUCCESS) {
                                    if (packet.sn == 0x60) {
                                        worker.postMessage("stopGet");
                                        if (this.setMacroDataPacket.packetIndex < this.setMacroDataPacket.packetCount) {
                                            await this.setMacroData();
                                        } else {
                                            await this.setEndDataTrans();
                                        }
                                    }
                                }
                                break;
                            case GetReportCmdId.SetEndDataTransCmd:
                                if (packet.result == CMD_EXEC_SUCCESS) {
                                    if (packet.sn == 0x70) {
                                        worker.postMessage("stopGet");
                                    }
                                }
                            case GetReportCmdId.GetFwVerCmd:
                                if (packet.result == CMD_EXEC_SUCCESS) {
                                    if (packet.sn == 0x07 && packet.payloadData != undefined) {
                                        worker.postMessage("stopGet");
                                        if (this.state.connectType == ConnectionType.Dongle) {
                                            this.state.dongleFwVersion = `${packet.payloadData.getUint8(18).toString(16).padStart(2, '0')}${packet.payloadData.getUint8(17).toString(16).padStart(2, '0')}`
                                        } else {
                                            this.state.fwVersion = `${packet.payloadData.getUint8(18).toString(16).padStart(2, '0')}${packet.payloadData.getUint8(17).toString(16).padStart(2, '0')}`
                                            await this.setEndDataTrans();
                                        }
                                    }
                                }
                                break;
                        }
                    }
                } else {
                    this.retry -= 1;
                    if (this.retry <= 0) {
                        worker.postMessage("stopGet");
                    }
                }
            } else {
                try {
                    await this.setFeature(REPORT_ID_USB, event.data as Uint8Array);
                    if (this.getReportCmd != GetReportCmdId.None) {
                        // if (this.getReportCmd == GetReportCmdId.SetStartDataTransCmd) {
                        //     await this.setInitOtaEvent();
                        // } else if (this.getReportCmd == GetReportCmdId.SetMacroDataCmd) {
                        if (this.getReportCmd == GetReportCmdId.SetMacroDataCmd) {
                            this.setMacroDataPacket.packetIndex += 1;
                            if (this.setMacroDataPacket.packetIndex >= this.setMacroDataPacket.packetCount || this.setMacroDataPacket.packetIndex % 40 == 0) {
                                await this.setCheckMacro();
                            } else {
                                await this.setMacroData();
                            }
                        } else {
                            this.retry = 30;
                            worker.postMessage("getReport");
                        }
                    }
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

    async getBattery(): Promise<void> {
        let packet = new GetBatteryPacket();
        packet.sn = 0x02;
        packet.dataOffset = (0x02 << 6) | 0x01;
        let u8Data = new DataView(new Uint8Array(0).buffer);
        
        if (this.device != undefined) {
            packet.setPayload(u8Data);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
            await this.sleep(200);
            let data = await this.getFeature(REPORT_ID_USB);

            if (data.byteLength >= 16 && data.getUint8(2) == 0x00 && data.getUint8(5) == 0x01) {
                let batState = data.getUint8(6) >> 7;
                let batValue = data.getUint8(6) & 0x7F;
                this.dispatchEvent(new CustomEvent(RK_MOUSE_EVENT_DEFINE.OnBatteryGotten, { detail: { state: batState, value: batValue } }));
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
            this.getReportCmd = GetReportCmdId.SetDpiCmd;
            
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
            this.getReportCmd = GetReportCmdId.SetLedParamCmd;

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
            this.getReportCmd = GetReportCmdId.SetLedParamCmd;

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
            this.getReportCmd = GetReportCmdId.SetLedParamCmd;

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
            this.getReportCmd = GetReportCmdId.SetLedParamCmd;

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
            this.getReportCmd = GetReportCmdId.SetLedParamCmd;

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
            this.getReportCmd = GetReportCmdId.SetPerKeyCmd;

            console.log(`Push set key mapping data to queue.`);
        }
    }

    async getFwVer(): Promise<void> {
        this.dataTransType = BigDataTransType.GetFwVer;

        if (this.state.connectType == ConnectionType.Dongle) {
            await this.setGetFwVer();
        } else {
            await this.setInitOtaEvent();
        }
    }

    async getMacros(): Promise<void> {

    }

    async setMacros(): Promise<void> {
        if (this.data.macros != undefined) {
            
            this.setMacroDataPacket.macroData = new DataView(this.data.macros.serialize().buffer);
            this.setMacroDataPacket.packetIndex = 0;
            this.setMacroDataPacket.packetCount = Math.ceil(this.setMacroDataPacket.macroData.byteLength / MACRO_BYTES_PER_PACKET);
            this.setMacroDataPacket.macroCrc = 0;

            this.dataTransType = BigDataTransType.SetMacroData;

            if (this.state.connectType == ConnectionType.Dongle) {
                await this.setStartDataTrans();
            } else {
                await this.setInitOtaEvent();
            }
        }
    }

    async setStartDataTrans(): Promise<void> {
        let packet = new SetStartDataTransPacket();

        if (this.dataTransType == BigDataTransType.GetFwVer) {
            packet.device = 0x00;
        } else {
            packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        }
        
        packet.sn = 0x00;
        packet.rfSn = 0x00;
        packet.setPayload(new DataView(new Uint8Array([0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer));

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        this.getReportCmd = GetReportCmdId.SetStartDataTransCmd;
        await this.setInitOtaEvent();

        console.log(`Push set init data trans to queue.`);
    }

    async setInitOtaEvent(): Promise<void> {
        let packet = new SetInitOtaEventPacket();

        if (this.dataTransType == BigDataTransType.GetFwVer) {
            packet.device = 0x00;
        } else {
            packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        }

        packet.sn = 0x01;
        packet.rfSn = 0x01;
        let payload = new DataView(new Uint8Array([0x57, 0x03, 0x00, 0x00, 0x00, 0x00]).buffer);

        if (this.setMacroDataPacket.macroData != undefined) {
            payload.setUint32(2, this.setMacroDataPacket.macroData.byteLength, true);
        }
       
        packet.setPayload(payload);

        //worker.postMessage(packet.setReport);
        await this.setFeature(REPORT_ID_USB, packet.setReport);
        this.getReportCmd = GetReportCmdId.SetInitOtaEventCmd;
        this.retry = 30;
        worker.postMessage("getReport");

        console.log(`Push set init ota event to queue.`);
    }

    async setCheckOtaEvent(): Promise<void> {
        let packet = new SetCheckOtaEventPacket();

        if (this.dataTransType == BigDataTransType.GetFwVer) {
            packet.device = 0x00;
        } else {
            packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        }

        packet.sn = 0x02;
        packet.rfSn = 0x02;
        packet.setPayload(new DataView(new Uint8Array([0x52, 0x00]).buffer));

        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.SetCheckOtaEventCmd;

        console.log(`Push set check ota event to queue.`);
    }

    async setFormatFlash(): Promise<void> {
        let packet = new SetFormatFlashPacket();
        packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        packet.sn = 0x03;
        packet.rfSn = 0x03;
        packet.setPayload(new DataView(new Uint8Array([0x55, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00]).buffer));

        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.SetFormatFlashCmd;

        console.log(`Push set format flash to queue.`);
    }

    async setMacroData(): Promise<void> {
        if (this.setMacroDataPacket.macroData != undefined) {
            this.setMacroDataPacket.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
            this.setMacroDataPacket.sn = 0x00;
            this.setMacroDataPacket.rfSn = 0x04;
            this.setMacroDataPacket.setPayload(this.setMacroDataPacket.macroData);

            worker.postMessage(this.setMacroDataPacket.setReport);
            this.getReportCmd = GetReportCmdId.SetMacroDataCmd;
    
            console.log(`Push set macro data ${this.setMacroDataPacket.packetIndex}/${this.setMacroDataPacket.packetCount} package to queue.`);
        }
    }

    async setCheckMacro(): Promise<void> {
        let packet = new SetCheckMacroPacket();
        packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        packet.sn = 0x60;
        packet.rfSn = 0x60;
        let payload = new DataView(new Uint8Array([0x51, 0x00, 0x00]).buffer);
        payload.setUint8(1, this.setMacroDataPacket.macroCrc & 0xFF);
        payload.setUint8(2, (this.setMacroDataPacket.macroCrc >> 8) & 0x00FF);
        packet.setPayload(payload);

        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.SetCheckMacroCmd;

        console.log(`Push set format flash to queue.`);
    }

    async setEndDataTrans(): Promise<void> {
        let packet = new setEndDataTransPacket();
        packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        packet.sn = 0x70;
        packet.rfSn = 0x70;
        packet.setPayload(new DataView(new Uint8Array([0x5E]).buffer));

        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.SetEndDataTransCmd;

        console.log(`Push set format flash to queue.`);
    }

    async setGetFwVer(): Promise<void> {
        let packet = new GetFwVerPacket();

        if (this.dataTransType == BigDataTransType.GetFwVer) {
            packet.device = 0x00;
        } else {
            packet.device = this.state.connectType == ConnectionType.Dongle ? 0x01 : 0x00;
        }

        packet.sn = 0x07;
        packet.rfSn = 0x01;
        packet.setPayload(new DataView(new Uint8Array([0x92, 0x00]).buffer));

        worker.postMessage(packet.setReport);
        this.getReportCmd = GetReportCmdId.GetFwVerCmd;

        console.log(`Push set get fw ver to queue.`);
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
                            break;
                        case PopupCmdId.DpiLevelChanged:
                            break;
                        case PopupCmdId.BetteryChanged:
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