import type { KeyboardState } from '../interface'
import { REPORT_ID_USB, MACRO_PER_BLOCK_LENGTH, MACRO_MAX_LENGTH } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '../../../device/enum';
import { KeyMatrixLayer, MatrixTable } from '../enum';
import { RK_S98, RK_S98_EVENT_DEFINE } from './rk_s98';

import { GetProfilePacket } from './packets/usb/getProfilePacket';
import { SetProfilePacket } from './packets/usb/setProfilePacket';

import { GetLedEffectPacket } from './packets/usb/getLedEffectPacket';
import { SetLedEffectPacket } from './packets/usb/setLedEffectPacket';

import { GetKeyMatrixPacket } from './packets/usb/getKeyMatrixPacket';
import { SetKeyMatrixPacket } from './packets/usb/setKeyMatrixPacket';

import { GetMacrosPacket } from './packets/usb/getMacrosPacket';
import { SetMacrosPacket } from './packets/usb/setMacrosPacket';

import { GetLedColorsPacket } from './packets/usb/getLedColorsPacket';
import { SetLedColorsPacket } from './packets/usb/setLedColorsPacket';

import { GetPasswordPacket } from './packets/usb/getPasswordPacket';
import { SetFactoryPacket } from './packets/usb/setFactoryPacket';

import { SetTftPicPacket } from './packets/usb/setTftPicPacket';

import { Macros } from './macros';
import { SetTftPretreatmentPacket } from './packets/usb/setTftPretreatmentPacket';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_S98_Usb extends RK_S98 {

    pktSetTftPicPacket: SetTftPicPacket;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;

        this.pktSetTftPicPacket = new SetTftPicPacket();
    }

    static async create(state: KeyboardState, device: HIDDevice) {
        return new RK_S98_Usb(state, device);
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
        await this.getPassword();
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {

        try {
            let cmdId = data.getUint8(0x01);

            switch (cmdId) {
                case 0x06:
                    if (this.pktSetTftPicPacket.isDuring) {
                        let val = data.getUint8(0x02);
                        // val = 1 success, val = 0 fail
                        if (val == 1) {
                            this.pktSetTftPicPacket.packageIndex = this.pktSetTftPicPacket.packageIndex + 1;
                            if (this.pktSetTftPicPacket.packageIndex >= this.pktSetTftPicPacket.packageNum) {
                                this.pktSetTftPicPacket.packageIndex = 0;
                                this.pktSetTftPicPacket.frameIndex = this.pktSetTftPicPacket.frameIndex + 1;
                                if (this.pktSetTftPicPacket.frameIndex >= this.pktSetTftPicPacket.buffers.length) {
                                    this.pktSetTftPicPacket.isDuring = false;
                                    let packet = new SetTftPretreatmentPacket();
                                    packet.setPayload(this.pktSetTftPicPacket.buffers.length, 0x00, this.pktSetTftPicPacket.delay);
                                    worker.postMessage(packet.setReport);
                                }
                            }
                            
                            if (this.pktSetTftPicPacket.isDuring) {
                                this.pktSetTftPicPacket.setPayload();
                                worker.postMessage(this.pktSetTftPicPacket.setReport);
                            }

                            this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnTftSetEvent, 
                                { detail: 
                                    { 
                                        frameIndex: this.pktSetTftPicPacket.frameIndex, 
                                        frameNum: this.pktSetTftPicPacket.buffers.length, 
                                        packageIndex: this.pktSetTftPicPacket.packageIndex, 
                                        packageNum: this.pktSetTftPicPacket.packageNum, 
                                    } 
                                }));
                        } else {
                            worker.postMessage(this.pktSetTftPicPacket.setReport);
                        }
                    }
                    break;
            }
        } catch (e: any) {
            console.log(`Analysis report data is error: ${e.message}`);
        }
    }

    async getProfile(board: number): Promise<void> {
        let packet = new GetProfilePacket(board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.boardProfile = packet.boardProfile;
        this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnProfileGotten, { detail: this.data.boardProfile }));
    }

    async getPassword(): Promise<void> {
        let packet = new GetPasswordPacket();

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.state.fwVersion = packet.fwVersion;
        //this.dispatchEvent(new CustomEvent(RK_R87_EVENT_DEFINE.OnProfileGotten, { detail: this.data.profile }));
    }

    async setProfile(board: number): Promise<void> {
        if (this.data.boardProfile != undefined) {
            let packet = new SetProfilePacket(board);
            packet.setPayload(this.data.boardProfile.buffer);
            //await this.setFeature(REPORT_ID_USB, packet.setReport);
            worker.postMessage(packet.setReport);
            console.log(`Push profile data to queue.`);
        }
    }

    async getLedEffect(board: number): Promise<void> {
        let packet = new GetLedEffectPacket(board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.ledEffect = packet.ledEffect;
        this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnLedEffectGotten, { detail: this.data.ledEffect }));
    }

    async setLedEffect(board: number): Promise<void> {
        if (this.data.ledEffect != undefined) {
            let packet = new SetLedEffectPacket(board);
            packet.setPayload(this.data.ledEffect.buffer);
            //await this.setFeature(REPORT_ID_USB, packet.setReport);
            worker.postMessage(packet.setReport);
            console.log(`Push led effect data to queue.`);
        }
    }

    async getKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void> {
        let packet = new GetKeyMatrixPacket(layer, table, board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        if (this.data.keyMatrixs != undefined && packet.keyMatrix != undefined) {
            this.data.keyMatrixs[table][layer] = packet.keyMatrix;
        }
        this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnKeyMatrixGotten, { detail: this.data.keyMatrixs }));
    }

    async setKeyMatrix(layer: KeyMatrixLayer, table: MatrixTable, board: number): Promise<void> {
        if (this.data.keyMatrixs != undefined) {
            let packet = new SetKeyMatrixPacket(layer, table, board);
            packet.setPayload(this.data.keyMatrixs[table][layer].buffer);
            //await this.setFeature(REPORT_ID_USB, packet.setReport);
            worker.postMessage(packet.setReport);
            console.log(`Push layer [${layer}] key matrix data to queue.`);
        }
    }

    async getMacros(): Promise<void> {
        let block = 0;
        let blockCount = MACRO_MAX_LENGTH / MACRO_PER_BLOCK_LENGTH;
        let u8 = new Uint8Array(MACRO_MAX_LENGTH);

        for (block = 0; block < blockCount; block++) {
            let packet = new GetMacrosPacket(block, blockCount);
            await this.setFeature(REPORT_ID_USB, packet.setReport);
            packet.fromReportData(await this.getFeature(REPORT_ID_USB));
            if (packet.buffer != undefined) {
                u8.set(packet.buffer, block * MACRO_PER_BLOCK_LENGTH);
            }
        }

        this.data.macros = Macros.deserialize(new DataView(u8.buffer));
        this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    async setMacros(): Promise<void> {
        if (this.data.macros != undefined) {
            let packet = new SetMacrosPacket();
            let u8 = this.data.macros?.serialize();
            let block = 0;
            packet.packageNum = Math.ceil(u8.length / MACRO_PER_BLOCK_LENGTH);

            for (block = 0; block < packet.packageNum; block++) {
                packet.packageIndex = block;
                let begin = block * MACRO_PER_BLOCK_LENGTH;
                let end = begin + ((block + 1) * MACRO_PER_BLOCK_LENGTH > u8.length ? u8.length - (block * MACRO_PER_BLOCK_LENGTH) : MACRO_PER_BLOCK_LENGTH);
                let tmp = u8.slice(begin, end);
                packet.setPayload(new DataView(tmp.buffer));
                await this.setFeature(REPORT_ID_USB, packet.setReport);
            }

            // let pkgs = new Array<DataView>();
            // let index = 0;
            // do {
            //     let end = index + MACRO_PER_BLOCK_LENGTH > u8.length ? u8.length : index + MACRO_PER_BLOCK_LENGTH;
            //     pkgs.push(new DataView(u8.subarray(index, end).buffer));
            //     index = end + 1;
            // } while (index < u8.length)

            // packet.packageNum = pkgs.length;
            // index = 0;
            // for (let pkg of pkgs) {
            //     packet.packageIndex = index;
            //     packet.setPayload(pkg);
            //     await this.setFeature(REPORT_ID_USB, packet.setReport);
            // }
        }
    }

    async getLedColors(board: number): Promise<void> {
        let packet = new GetLedColorsPacket(board);

        await this.setFeature(REPORT_ID_USB, packet.setReport);
        packet.fromReportData(await this.getFeature(REPORT_ID_USB));

        this.data.ledColors = packet.ledColors;
        this.dispatchEvent(new CustomEvent(RK_S98_EVENT_DEFINE.OnLedColorsGotten, { detail: this.data.ledColors }));
    }


    async setLedColors(board: number): Promise<void> {
        if (this.data.ledColors != undefined) {
            let packet = new SetLedColorsPacket(board);
            packet.setPayload(this.data.ledColors.buffer);
            //await this.setFeature(REPORT_ID_USB, packet.setReport);
            worker.postMessage(packet.setReport);
            console.log(`Push led colors data to queue.`);
        }
    }

    async setFactory(): Promise<void> {
        let packet = new SetFactoryPacket();
        //await this.setFeature(REPORT_ID_USB, packet.setReport);
        worker.postMessage(packet.setReport);
    }

    async setTftPic(buffers: Array<Uint16Array>, delay: number): Promise<void> {
        if (buffers != undefined && buffers.length > 0) {
            this.pktSetTftPicPacket.buffers.splice(0, this.pktSetTftPicPacket.buffers.length);
            let index: number = 0;
            for (index = 0; index < buffers.length; index++) {
                let j: number = 0;
                let buff = new Uint8Array(buffers[index].length * 2)
                // The device is use big-endian per byte, so need reverse the pix data
                for (j = 0; j < buffers[index].length; j++) {
                    buff[j * 2] = buffers[index][j] >> 8;
                    buff[(j * 2) + 1] = buffers[index][j] & 0x00FF;
                }
                this.pktSetTftPicPacket.buffers.push(buff);
            }
            this.pktSetTftPicPacket.packageIndex = -1;
            this.pktSetTftPicPacket.frameIndex = 0;
            this.pktSetTftPicPacket.setPayload();
            this.pktSetTftPicPacket.isDuring = true;
            this.pktSetTftPicPacket.delay = delay;

            let packet = new SetTftPretreatmentPacket();
            packet.setPayload(buffers.length, 0x01, delay);
            worker.postMessage(packet.setReport);
        }
    }

    async stopTFTPicDownload(): Promise<void> {
        let packet = new SetTftPretreatmentPacket();
        packet.setPayload(0, 0x02, 0);
        worker.postMessage(packet.setReport);
    }
}