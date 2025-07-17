import { type KeyInfo, type Axis, type KeyboardState, type LedColor, type KeyCmdValue } from '../interface'
import { REPORT_HEAD, REPORT_HEAD_LENGTH, REPORT_ID_USB, REPORT_LENGTH } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { BoardId, COMMAND_ID, FwVersion, HwVersion, RK_C61, RK_C61_EVENT_DEFINE } from './rk_c61';
import { KeyText, type KeyCodeEnum, type KeyDefineEnum } from '@/common/keyCode_sparklink';
import { LayoutTypeEnum, LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum, MatrixTable, OrderTypeEnum, RWTypeEnum, SuperResponseEnum } from '../enum';
import { AxisList } from '../constant';
import type { Action, Macro, MacroExecModeEnum } from '../macros';
import { LOG_TYPE, Logging } from '@/common/logging';
import { KB2_CMD_FAIL } from './packets/usb/KB2_CMD_FAIL';
import { KB2_CMD_SYNC } from './packets/usb/KB2_CMD_SYNC';
import { KB2_CMD } from './packets/usb/KB2_CMD';
import { KB2_CMD_KEY } from './packets/usb/KB2_CMD_KEY';
import { KB2_CMD_KRGB } from './packets/usb/KB2_CMD_KRGB';
import { KB2_CMD_DB } from './packets/usb/KB2_CMD_DB';
import { KB2_CMD_PRGB } from './packets/usb/KB2_CMD_PRGB';
import { KB2_CMD_DEFKEY } from './packets/usb/KB2_CMD_DEFKEY';
import { KB2_CMD_RM6X21 } from './packets/usb/KB2_CMD_RM6X21';
import { KB2_CMD_DKS } from './packets/usb/KB2_CMD_DKS';
import { KB2_CMD_MT } from './packets/usb/KB2_CMD_MT';
import { KB2_CMD_TGL } from './packets/usb/KB2_CMD_TGL';
import { KB2_CMD_MPT } from './packets/usb/KB2_CMD_MPT';
import { KB2_CMD_END } from './packets/usb/KB2_CMD_END';
import { KB2_CMD_SOCD } from './packets/usb/KB2_CMD_SOCD';
import { KB2_CMD_MACROV2 } from './packets/usb/KB2_CMD_MACROV2';
import { KB2_CMD_MACRO_MODE } from './packets/usb/KB2_CMD_MACRO_MODE';

const worker = new Worker(new URL('@/common/communication.ts', import.meta.url));

export class RK_C61_Usb extends RK_C61 {

    KB2_CMD_FAIL: KB2_CMD_FAIL;
    KB2_CMD_SYNC: KB2_CMD_SYNC;
    KB2_CMD: KB2_CMD;
    KB2_CMD_KEY: KB2_CMD_KEY;
    KB2_CMD_KRGB: KB2_CMD_KRGB;
    KB2_CMD_DB: KB2_CMD_DB;
    KB2_CMD_PRGB: KB2_CMD_PRGB;
    KB2_CMD_DEFKEY: KB2_CMD_DEFKEY;
    KB2_CMD_RM6X21: KB2_CMD_RM6X21;
    KB2_CMD_DKS: KB2_CMD_DKS;
    KB2_CMD_MT: KB2_CMD_MT;
    KB2_CMD_TGL: KB2_CMD_TGL;
    KB2_CMD_MPT: KB2_CMD_MPT;
    KB2_CMD_END: KB2_CMD_END;
    KB2_CMD_SOCD: KB2_CMD_SOCD;
    KB2_CMD_MACROV2: KB2_CMD_MACROV2;
    KB2_CMD_MACRO_MODE: KB2_CMD_MACRO_MODE;

    constructor(state: KeyboardState, device: HIDDevice) {
        super(state, device);
        state.connectType = ConnectionType.USB;

        this.KB2_CMD_FAIL = new KB2_CMD_FAIL(this.onFailCmd.bind(this));
        this.KB2_CMD_SYNC = new KB2_CMD_SYNC(this.onSyncCmd.bind(this));
        this.KB2_CMD = new KB2_CMD(this.onCmdResult.bind(this));
        this.KB2_CMD_KEY = new KB2_CMD_KEY(this.onKeyCmd.bind(this));
        this.KB2_CMD_KRGB = new KB2_CMD_KRGB(this.onKrgbCmd.bind(this));
        this.KB2_CMD_DB = new KB2_CMD_DB(this.onDbCmd.bind(this));
        this.KB2_CMD_PRGB = new KB2_CMD_PRGB(this.onPrgbCmd.bind(this));
        this.KB2_CMD_DEFKEY = new KB2_CMD_DEFKEY(this.onDefKeyCmd.bind(this));
        this.KB2_CMD_RM6X21 = new KB2_CMD_RM6X21(this.onRm6x21.bind(this));
        this.KB2_CMD_DKS = new KB2_CMD_DKS(this.onCmdCallback.bind(this));
        this.KB2_CMD_MT = new KB2_CMD_MT(this.onCmdCallback.bind(this));
        this.KB2_CMD_TGL = new KB2_CMD_TGL(this.onCmdCallback.bind(this));
        this.KB2_CMD_MPT = new KB2_CMD_MPT(this.onCmdCallback.bind(this));
        this.KB2_CMD_END = new KB2_CMD_END(this.onCmdCallback.bind(this));
        this.KB2_CMD_SOCD = new KB2_CMD_SOCD(this.onCmdCallback.bind(this));
        this.KB2_CMD_MACROV2 = new KB2_CMD_MACROV2(this.onCmdCallback.bind(this));
        this.KB2_CMD_MACRO_MODE = new KB2_CMD_MACRO_MODE(this.onMacroMode.bind(this));
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
                    await this.setReport(REPORT_ID_USB, event.data as Uint8Array);
                } catch (e) {
                    this.device.close();
                }
            }
        };

        worker.postMessage('start');

        await this.sync();
        await this.cmd(OrderTypeEnum.GetProtoVer, 0xff);
        await this.cmd(OrderTypeEnum.GetKbName, 0xff);
        await this.cmd(OrderTypeEnum.Travel, 0xff);
        await this.cmd(OrderTypeEnum.SwitchProfile, 0x04);
        await this.cmd(OrderTypeEnum.QuerySupportAxis, 0xff);
        await this.cmd(OrderTypeEnum.SetReportRate, 0x07);
        await this.cmd(OrderTypeEnum.QueryWinMode, 0xff);
        await this.cmd(OrderTypeEnum.QueryMacMode, 0xff);
        await this.cmd(OrderTypeEnum.SwitchDeadZone, 0x02);
        // await this.getDbParam();
        // await this.getPrgb();
        // await this.getKeyDefLayout(0, 1);
        // await this.getKeyDefLayout(2, 3);
        // await this.getKeyDefLayout(4, 5);
    }

    buffer: Uint8Array | null = null;

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (reportId == REPORT_ID_USB && data.byteLength == REPORT_LENGTH) {
            if (data.getUint8(0) == REPORT_HEAD) {
                let cmd = data.getUint8(2) - 0x80;
                switch (cmd) {
                    case COMMAND_ID.KB2_CMD_SYNC:
                        this.KB2_CMD_SYNC.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD:
                        this.KB2_CMD.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_KEY:
                        this.KB2_CMD_KEY.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_DB:
                        this.KB2_CMD_DB.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_PRGB:
                        this.KB2_CMD_PRGB.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_KRGB:
                        this.KB2_CMD_KRGB.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_DEFKEY:
                        this.KB2_CMD_DEFKEY.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_RM6X21:
                        this.buffer = new Uint8Array(data.buffer);
                        this.buffer[1] = 188;
                        break;
                    case COMMAND_ID.KB2_CMD_TDKS:
                        this.KB2_CMD_DKS.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_MT:
                        this.KB2_CMD_MT.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_TGL:
                        this.KB2_CMD_TGL.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_DDKS:
                        this.KB2_CMD_MPT.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_END:
                        this.KB2_CMD_END.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_SOCD:
                        this.KB2_CMD_SOCD.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_MACRO:
                        this.KB2_CMD_MACROV2.fromReportData(data);
                        break;
                    case COMMAND_ID.KB2_CMD_MACROMODE:
                        this.KB2_CMD_MACRO_MODE.fromReportData(data);
                        break;
                }
            } else if (this.buffer != null && this.buffer[2] - 0x80 == COMMAND_ID.KB2_CMD_RM6X21) {
                const recData = new Uint8Array(data.buffer);
                const buf = new Uint8Array(this.buffer.length + recData.length);
                buf.set(this.buffer, 0);
                buf.set(recData, this.buffer.length);
                this.buffer = buf;
                if (this.buffer[1] <= this.buffer.length) {
                    // 长度足够
                    this.KB2_CMD_RM6X21.fromReportData(new DataView(this.buffer.buffer));
                    // 数据用完，清空
                    this.buffer = null;
                }
            }
            worker.postMessage("report");
        }
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //#region GetCommand
    async sync(): Promise<void> {
        worker.postMessage(this.KB2_CMD_SYNC.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_SYNC data to queue.`);
    }

    async cmd(order: OrderTypeEnum, arg: number): Promise<void> {
        this.KB2_CMD.order = order;
        this.KB2_CMD.arg = arg;
        worker.postMessage(this.KB2_CMD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD [${this.KB2_CMD.arg}] data to queue.`);
    }

    async loadData(): Promise<void> {
        await this.getDbParam();
        await this.getPrgb();
        await this.getKeyDefLayout(0, 1);
        await this.getKeyDefLayout(2, 3);
        await this.getKeyDefLayout(4, 5);
    }

    async getDbParam(): Promise<void> {
        this.KB2_CMD_DB.rw = RWTypeEnum.Read;
        worker.postMessage(this.KB2_CMD_DB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_DB data to queue.`);
    }

    async getPrgb(): Promise<void> {
        this.KB2_CMD_PRGB.rw = RWTypeEnum.Read;
        worker.postMessage(this.KB2_CMD_PRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_PRGB data to queue.`);
    }

    async getKeyDefLayout(rowX: number, rowY: number): Promise<void> {
        this.KB2_CMD_DEFKEY.rw = RWTypeEnum.Read;
        this.KB2_CMD_DEFKEY.rowX = rowX;
        this.KB2_CMD_DEFKEY.rowY = rowY;
        worker.postMessage(this.KB2_CMD_DEFKEY.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_DEFKEY data to queue.`);
    }

    async getKeyValues(): Promise<void> {
        const keyValues = this.data.keyInfoData.getAllKeyValue();
        const layouts = new Array(14);
        const keys = new Array(14);
        const values = new Array(14);
        let count = 0;

        for (let i = 0; i < 14; i++) {
            layouts[i] = 0xff;
            keys[i] = 0xff;
            values[i] = 0xff;
        }

        for (let i = 0; i < keyValues.length; i++) {
            layouts[count] = 0x08;
            keys[count] = keyValues[i];
            values[count] = 0x00;
            count++;

            if (count >= 14) {
                this.KB2_CMD_KEY.rw = RWTypeEnum.Read;
                this.KB2_CMD_KEY.layouts = layouts;
                this.KB2_CMD_KEY.keys = keys;
                this.KB2_CMD_KEY.values = values;
                worker.postMessage(this.KB2_CMD_KEY.command());
                Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
                for (let j = 0; j < 14; j++) {
                    layouts[j] = 0xff;
                    keys[j] = 0xff;
                    values[j] = 0xff;
                }
                count = 0;
            }
        }
        this.KB2_CMD_KEY.rw = RWTypeEnum.Read;
        this.KB2_CMD_KEY.layouts = layouts;
        this.KB2_CMD_KEY.keys = keys;
        this.KB2_CMD_KEY.values = values;
        worker.postMessage(this.KB2_CMD_KEY.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
        count = 0;

        for (let layout = 0; layout < 26; layout++) {
            for (let i = 0; i < 14; i++) {
                layouts[i] = 0xff;
                keys[i] = 0xff;
                values[i] = 0xff;
            }

            for (let i = 0; i < keyValues.length; i++) {
                layouts[count] = layout;
                keys[count] = keyValues[i];
                values[count] = 0x00;
                count++;

                if (count >= 14) {
                    this.KB2_CMD_KEY.rw = RWTypeEnum.Read;
                    this.KB2_CMD_KEY.layouts = layouts;
                    this.KB2_CMD_KEY.keys = keys;
                    this.KB2_CMD_KEY.values = values;
                    worker.postMessage(this.KB2_CMD_KEY.command());
                    Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
                    for (let j = 0; j < 14; j++) {
                        layouts[j] = 0xff;
                        keys[j] = 0xff;
                        values[j] = 0xff;
                    }
                    count = 0;
                }
            }
            this.KB2_CMD_KEY.rw = RWTypeEnum.Read;
            this.KB2_CMD_KEY.layouts = layouts;
            this.KB2_CMD_KEY.keys = keys;
            this.KB2_CMD_KEY.values = values;
            worker.postMessage(this.KB2_CMD_KEY.command());
            Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
            count = 0;
        }
    }

    async getKeyRgb(): Promise<void> {
        const keyValues = this.data.keyInfoData.getAllKeyValue();
        // 读取灯光颜色
        const keysColor = new Array(14);
        const R = new Array(14);
        const G = new Array(14);
        const B = new Array(14);
        let colorCount = 0;

        for (let n = 0; n < 14; n++) {
            R[n] = 0x00;
            G[n] = 0x00;
            B[n] = 0x00;
        }

        for (let m = 0; m < keyValues.length; m++) {
            keysColor[colorCount] = keyValues[m];
            colorCount++;

            if (colorCount >= 14) {
                this.KB2_CMD_KRGB.rw = RWTypeEnum.Read;
                this.KB2_CMD_KRGB.keys = keysColor;
                this.KB2_CMD_KRGB.r = R;
                this.KB2_CMD_KRGB.g = G;
                this.KB2_CMD_KRGB.b = B;
                worker.postMessage(this.KB2_CMD_KRGB.command());
                Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
                for (let k = 0; k < 14; k++) {
                    keysColor[k] = 0xff;
                }
                colorCount = 0;
            }
        }
        this.KB2_CMD_KRGB.rw = RWTypeEnum.Read;
        this.KB2_CMD_KRGB.keys = keysColor;
        this.KB2_CMD_KRGB.r = R;
        this.KB2_CMD_KRGB.g = G;
        this.KB2_CMD_KRGB.b = B;
        worker.postMessage(this.KB2_CMD_KRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
    }

    async getAdustingData(type: number, page: number) {
        this.KB2_CMD_RM6X21.type = type;
        this.KB2_CMD_RM6X21.page = page;
        worker.postMessage(this.KB2_CMD_RM6X21.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_RM6X21 data to queue.`);
    }

    async getMacros(): Promise<void> {
        this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    async getMacroMode(keyCode: KeyDefineEnum): Promise<void> {
        this.KB2_CMD_MACRO_MODE.rw = RWTypeEnum.Read;
        this.KB2_CMD_MACRO_MODE.key = keyCode;
        this.KB2_CMD_MACRO_MODE.index = 0;
        this.KB2_CMD_MACRO_MODE.stepLen = 0;
        this.KB2_CMD_MACRO_MODE.mode = 0;
        this.KB2_CMD_MACRO_MODE.repeatConut = 0;
        this.KB2_CMD_MACRO_MODE.delay = 0;
        worker.postMessage(this.KB2_CMD_MACRO_MODE.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MACRO_MODE data to queue.`);
    }
    //#endregion

    //#region SetCommand
    async setKeyValues(keyCmdValues: Array<KeyCmdValue>) {
        const layouts = new Array(14);
        const keys = new Array(14);
        const values = new Array(14);
        let count = 0;

        for (let i = 0; i < 14; i++) {
            layouts[i] = 0x00;
            values[i] = 0x00;
            keys[i] = 0x00;
        }

        for (let i = 0; i < keyCmdValues.length; i++) {
            const keyCmdValue = keyCmdValues[i];
            if (keyCmdValue != undefined && keyCmdValue != null) {
                layouts[count] = keyCmdValue.layout;
                keys[count] = keyCmdValue.keyCode;
                values[count] = keyCmdValue.value;
                count++;
            }

            if (count >= 14) {
                this.KB2_CMD_KEY.rw = RWTypeEnum.Write;
                this.KB2_CMD_KEY.layouts = layouts;
                this.KB2_CMD_KEY.keys = keys;
                this.KB2_CMD_KEY.values = values;
                worker.postMessage(this.KB2_CMD_KEY.command());
                Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
                for (let j = 0; j < 14; j++) {
                    layouts[j] = 0xff;
                    keys[j] = 0xff;
                    values[j] = 0xff;
                }
                count = 0;
            }
        }

        this.KB2_CMD_KEY.rw = RWTypeEnum.Write;
        this.KB2_CMD_KEY.layouts = layouts;
        this.KB2_CMD_KEY.keys = keys;
        this.KB2_CMD_KEY.values = values;
        worker.postMessage(this.KB2_CMD_KEY.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KEY data to queue.`);
    }

    async setPrgb(): Promise<void> {
        this.KB2_CMD_PRGB.rw = RWTypeEnum.Write;
        this.KB2_CMD_PRGB.lightColorList = this.data.lightSetting.lightColorList;
        this.KB2_CMD_PRGB.lightSwitch = this.data.lightSetting.lightSwitch;
        this.KB2_CMD_PRGB.lightDirection = this.data.lightSetting.lightDirection;
        this.KB2_CMD_PRGB.superResponse = this.data.lightSetting.superResponse;
        this.KB2_CMD_PRGB.lightBrightness = this.data.lightSetting.lightBrightness;
        this.KB2_CMD_PRGB.lightMode = this.data.lightSetting.lightMode;
        this.KB2_CMD_PRGB.lightSpeed = this.data.lightSetting.lightSpeed;
        this.KB2_CMD_PRGB.lightSleepDelay = this.data.lightSetting.lightSleepDelay;
        this.KB2_CMD_PRGB.staticLightMode = this.data.lightSetting.staticLightMode;
        worker.postMessage(this.KB2_CMD_PRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_PRGB data to queue.`);
    }

    async setKeyKrgb(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [14];
        let r: Array<number> = [14];
        let g: Array<number> = [14];
        let b: Array<number> = [14];
        let count = 0;

        for (let i = 0; i < 14; i++) {
            keys[i] = 0xff;
            r[i] = 0xff;
            g[i] = 0xff;
            b[i] = 0xff;
        }

        for (let index = 0; index < keyInfos.length; index++) {
            const keyInfo = keyInfos[index];
            if (keyInfo != undefined && keyInfo != null) {
                keys[count] = keyInfo.keyValue;
                r[count] = keyInfo.color.red;
                g[count] = keyInfo.color.green;
                b[count] = keyInfo.color.blue;
                count++;
            }

            if (count >= 14) {
                this.KB2_CMD_KRGB.rw = RWTypeEnum.Write;
                this.KB2_CMD_KRGB.keys = keys;
                this.KB2_CMD_KRGB.r = r;
                this.KB2_CMD_KRGB.g = g;
                this.KB2_CMD_KRGB.b = b;
                worker.postMessage(this.KB2_CMD_KRGB.command());
                Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
                for (let j = 0; j < 14; j++) {
                    keys[count] = 0xff;
                    r[count] = 0xff;
                    g[count] = 0xff;
                    b[count] = 0xff;
                }
                count = 0;
            }
        }

        this.KB2_CMD_KRGB.rw = RWTypeEnum.Write;
        this.KB2_CMD_KRGB.keys = keys;
        this.KB2_CMD_KRGB.r = r;
        this.KB2_CMD_KRGB.g = g;
        this.KB2_CMD_KRGB.b = b;
        worker.postMessage(this.KB2_CMD_KRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
    }

    async setKrgb(): Promise<void> {
        let keys = [14];
        let r: Array<number> = [14];
        let g: Array<number> = [14];
        let b: Array<number> = [14];
        let count = 0;

        for (let i = 0; i < 14; i++) {
            keys[i] = 0x00;
            r[i] = 0x00;
            g[i] = 0x00;
            b[i] = 0x00;
        }

        for (let row = 0; row < this.data.keyInfoData.keyInfoArray.length; row++) {
            for (let col = 0; col < this.data.keyInfoData.keyInfoArray[row].length; col++) {
                const keyInfo = this.data.keyInfoData.keyInfoArray[row][col];
                if (keyInfo != undefined && keyInfo != null) {
                    keys[count] = keyInfo.keyValue;
                    r[count] = keyInfo.color.red;
                    g[count] = keyInfo.color.green;
                    b[count] = keyInfo.color.blue;
                    count++;
                }

                if (count >= 14) {
                    this.KB2_CMD_KRGB.rw = RWTypeEnum.Write;
                    this.KB2_CMD_KRGB.keys = keys;
                    this.KB2_CMD_KRGB.r = r;
                    this.KB2_CMD_KRGB.g = g;
                    this.KB2_CMD_KRGB.b = b;
                    worker.postMessage(this.KB2_CMD_KRGB.command());
                    Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
                    for (let j = 0; j < 14; j++) {
                        keys[count] = 0xff;
                        r[count] = 0xff;
                        g[count] = 0xff;
                        b[count] = 0xff;
                    }
                    count = 0;
                }
            }
        }

        this.KB2_CMD_KRGB.rw = RWTypeEnum.Write;
        this.KB2_CMD_KRGB.keys = keys;
        this.KB2_CMD_KRGB.r = r;
        this.KB2_CMD_KRGB.g = g;
        this.KB2_CMD_KRGB.b = b;
        worker.postMessage(this.KB2_CMD_KRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
    }

    async setDB(): Promise<void> {
        this.KB2_CMD_DB.rw = RWTypeEnum.Write;
        let multiple = 10 ** this.data.performanceData.decimalPlace;
        this.KB2_CMD_DB.globalTouchTravel = this.data.performanceData.globalTouchTravel * multiple;
        this.KB2_CMD_DB.pressDead = this.data.performanceData.pressDead * multiple;
        this.KB2_CMD_DB.releaseDead = this.data.performanceData.releaseDead * multiple;
        worker.postMessage(this.KB2_CMD_DB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_DB data to queue.`);
    }

    async setReportRate(): Promise<void> {
        this.KB2_CMD.order = OrderTypeEnum.SetReportRate;
        this.KB2_CMD.arg = this.data.performanceData.rateOfReturn;
        worker.postMessage(this.KB2_CMD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD [${this.KB2_CMD.arg}] data to queue.`);
    }

    async setAdjustingOn(): Promise<void> {
        this.KB2_CMD.order = OrderTypeEnum.EnableCalibration;
        this.KB2_CMD.arg = 0xff;
        worker.postMessage(this.KB2_CMD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD [${this.KB2_CMD.arg}] data to queue.`);
    }

    async setAdjustingOff(): Promise<void> {
        this.KB2_CMD.order = OrderTypeEnum.DisableCalibration;
        this.KB2_CMD.arg = 0xff;
        worker.postMessage(this.KB2_CMD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD [${this.KB2_CMD.arg}] data to queue.`);
    }

    async setDks(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let dksInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            dksInfos.push(keyInfos[i].DKSInfo);
        }

        this.KB2_CMD_DKS.rw = RWTypeEnum.Write;
        this.KB2_CMD_DKS.keys = keys;
        this.KB2_CMD_DKS.dksInfos = dksInfos;
        this.KB2_CMD_DKS.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_DKS.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_DKS data to queue.`);
    }

    async setMt(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let mtInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            mtInfos.push(keyInfos[i].MTInfo);
        }

        this.KB2_CMD_MT.rw = RWTypeEnum.Write;
        this.KB2_CMD_MT.keys = keys;
        this.KB2_CMD_MT.mtInfos = mtInfos;
        this.KB2_CMD_MT.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_MT.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MT data to queue.`);
    }

    async setTgl(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let tglInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            tglInfos.push(keyInfos[i].TGLInfo);
        }

        this.KB2_CMD_TGL.rw = RWTypeEnum.Write;
        this.KB2_CMD_TGL.keys = keys;
        this.KB2_CMD_TGL.tglInfos = tglInfos;
        this.KB2_CMD_TGL.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_TGL.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_TGL data to queue.`);
    }

    async setMpt(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let mptInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            mptInfos.push(keyInfos[i].MPTInfo);
        }

        this.KB2_CMD_MPT.rw = RWTypeEnum.Write;
        this.KB2_CMD_MPT.keys = keys;
        this.KB2_CMD_MPT.mptInfos = mptInfos;
        this.KB2_CMD_MPT.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_MPT.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MPT data to queue.`);
    }

    async setEnd(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let endInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            endInfos.push(keyInfos[i].ENDInfo);
        }

        this.KB2_CMD_END.rw = RWTypeEnum.Write;
        this.KB2_CMD_END.keys = keys;
        this.KB2_CMD_END.endInfos = endInfos;
        this.KB2_CMD_END.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_END.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_END data to queue.`);
    }

    async setSocd(keyInfos: Array<KeyInfo>): Promise<void> {
        let keys = [];
        let socdInfos = [];
        
        for (let i = 0; i < keyInfos.length; i++) {
            keys.push(keyInfos[i].keyValue);
            socdInfos.push(keyInfos[i].SOCDInfo);
        }

        this.KB2_CMD_SOCD.rw = RWTypeEnum.Write;
        this.KB2_CMD_SOCD.socdInfos = socdInfos;
        this.KB2_CMD_SOCD.version = this.data.protocolVersion;
        worker.postMessage(this.KB2_CMD_SOCD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_SOCD data to queue.`);
    }

    async setMacroV2(macro: Macro): Promise<void> {
        let count = 0;
        let length = 0;
        const actList = new Array<Action | null>(9);
        
        for (length = 0; length < 9; length++) {
            actList[length] = null;
        }

        length = 0;
        count = 256;

        for (let i = 0; i < macro.actions.length; i++) {
            actList[length] = macro.actions[i];
            length++;
            count++;

            if (length == 9) {
                this.KB2_CMD_MACROV2.rw = RWTypeEnum.Write;
                this.KB2_CMD_MACROV2.actions = actList;
                this.KB2_CMD_MACROV2.count = length;
                this.KB2_CMD_MACROV2.offset = count - length;
                worker.postMessage(this.KB2_CMD_MACROV2.command());
                Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MACROV2 data to queue.`);
                
                for (let j = 0; j >= 9; j++) {
                    actList[j] = null;
                }

                length = 0;
            }
        }

        if (length > 0) {
            this.KB2_CMD_MACROV2.rw = RWTypeEnum.Write;
            this.KB2_CMD_MACROV2.actions = actList;
            this.KB2_CMD_MACROV2.count = length;
            this.KB2_CMD_MACROV2.offset = count - length;
            worker.postMessage(this.KB2_CMD_MACROV2.command());
            Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MACROV2 data to queue.`);
        }
    }

    async setMacroMode(keyCode: KeyDefineEnum, mode: MacroExecModeEnum, repeatConut: number, delay: number, macro: Macro): Promise<void> {
        this.KB2_CMD_MACRO_MODE.rw = RWTypeEnum.Write;
        this.KB2_CMD_MACRO_MODE.key = keyCode;
        this.KB2_CMD_MACRO_MODE.index = macro.index;
        this.KB2_CMD_MACRO_MODE.stepLen = macro.actions.length;
        this.KB2_CMD_MACRO_MODE.mode = mode;
        this.KB2_CMD_MACRO_MODE.repeatConut = repeatConut;
        this.KB2_CMD_MACRO_MODE.delay = delay;
        worker.postMessage(this.KB2_CMD_MACRO_MODE.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_MACRO_MODE data to queue.`);
    }
    //#endregion

    //#region Data analysis
    private onCmdCallback(event: any) {
        if (event.detail.errCode == 0) {
            Logging.console(LOG_TYPE.SUCCESS, `Command [${event.detail.cmd}] was response success`);
        } else {
            Logging.console(LOG_TYPE.ERROR, `Command [${event.detail.cmd}] was response error [${event.detail.errCode}]`);
        }
    }

    private onFailCmd(event: any) {
        let ackCmd: number = event.detail.ackCmd;
        let sArg: Uint8Array = event.detail.ackCmd;

        Logging.console(LOG_TYPE.ERROR, `Command fail [${ackCmd}] arg [${sArg.toString()}]`);
    }

    private onSyncCmd(event: any) {
        let boardId: BoardId = {
            id: event.detail.boardId,
            kbLayout: event.detail.kbLayout,
            axisType: event.detail.axisType
        };

        let hwVersion: HwVersion = new HwVersion();

        if (event.detail.hwVersion < 1000) {
            hwVersion.major = Math.floor(event.detail.hwVersion / 100);
            hwVersion.minor = Math.floor((event.detail.hwVersion % 100) / 10);
            hwVersion.patch = event.detail.hwVersion % 10;
            hwVersion.version = `V${hwVersion.major}.${hwVersion.minor}.${hwVersion.patch}`;
        } else {
            hwVersion.fwSize = event.detail.hwVersion * 256;
        }

        const decoder = new TextDecoder('utf-8');
        let sn = decoder.decode(event.detail.kbSn);

        let fwVersion: FwVersion = new FwVersion();
        const versionBuff = decoder.decode(event.detail.fwVersion.slice(0, 4));
        if (versionBuff.startsWith('Boot')) {
            fwVersion.appVersion = decoder.decode(event.detail.fwVersion.slice(0, 11));
        } else {
            fwVersion.appVersion = decoder.decode(event.detail.fwVersion.slice(0, 10));
        }

        fwVersion.buildDate = decoder.decode(event.detail.fwVersion.slice(17, 28));

        this.data.boardId = boardId;
        this.data.runMode = event.detail.runMode;
        this.data.sn = sn;
        this.data.hwVersion = hwVersion;
        this.data.fwVersion = fwVersion;
        this.data.keyInfoData.axisTypeId = event.detail.axisType;

        Logging.console(LOG_TYPE.SUCCESS, `\nID: ${boardId.id}\nLayout: ${boardId.kbLayout}\nAxisType: ${boardId.axisType}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nRunMode: ${event.detail.runMode}\nSN：${sn}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nFwSize: ${hwVersion.fwSize}\nHwVersion: ${hwVersion.version}\nFwVersion: ${fwVersion.appVersion}\nBuildDate: ${fwVersion.buildDate}`,);
    }

    private onKeyCmd(event: any) {
        let isLastKey: boolean = false;

        let keyValue: KeyDefineEnum = event.detail.keyValue;
        let layout: LayoutTypeEnum = event.detail.layout;
        let value: number = event.detail.value;

        switch (layout) {
            case LayoutTypeEnum.FN0:
            case LayoutTypeEnum.FN1:
            case LayoutTypeEnum.FN2:
            case LayoutTypeEnum.FN3:
                this.data.keyInfoData.updateFnKeyValue(keyValue, layout, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} Layout: ${layout} Value: ${layout}`);
                break;
            case LayoutTypeEnum.DB0:
                const touchTravel = value / 1000.0;
                this.data.keyInfoData.updateTouchTravel(keyValue, Number.parseFloat(touchTravel.toFixed(this.data.performanceData.decimalPlace)));
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TouchTravel: ${touchTravel}`);
                break;
            case LayoutTypeEnum.MODE:
                const uint8Value = value & 0xff;
                const touchMode = (uint8Value >> 4) & 0x0f;
                const advancedKeyMode = uint8Value & 0x0f;
                this.data.keyInfoData.updateTouchMode(keyValue, touchMode);
                this.data.keyInfoData.updateAdvancedKeyMode(keyValue, advancedKeyMode);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TouchMode: ${touchMode} AdvancedKeyMode: ${advancedKeyMode}`);
                break;
            case LayoutTypeEnum.RT_PressTravel:
                this.data.keyInfoData.updateQuickTouchPTravel(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} QuickTouchPTravel: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.RT_ReleaseTravel:
                this.data.keyInfoData.updateQuickTouchRTravel(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} QuickTouchRTravel: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.DB1:
                this.data.keyInfoData.updateAdvancedKeyDB1(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DB1: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.DB2:
                this.data.keyInfoData.updateAdvancedKeyDB2(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DB2: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.DB3:
                this.data.keyInfoData.updateAdvancedKeyDB3(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DB3: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.DKS1:
                this.data.keyInfoData.updateAdvancedKeyDKS1(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DKS1: ${value}`);
                break;
            case LayoutTypeEnum.DKS2:
                this.data.keyInfoData.updateAdvancedKeyDKS2(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DKS2: ${value}`);
                break;
            case LayoutTypeEnum.DKS3:
                this.data.keyInfoData.updateAdvancedKeyDKS3(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DKS3: ${value}`);
                break;
            case LayoutTypeEnum.DKS4:
                this.data.keyInfoData.updateAdvancedKeyDKS4(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DKS4: ${value}`);
                break;
            case LayoutTypeEnum.TRPS1:
                this.data.keyInfoData.updateAdvancedKeyTRPS1(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TRPS1: ${value}`);
                break;
            case LayoutTypeEnum.TRPS2:
                this.data.keyInfoData.updateAdvancedKeyTRPS2(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TRPS2: ${value}`);
                break;
            case LayoutTypeEnum.TRPS3:
                this.data.keyInfoData.updateAdvancedKeyTRPS3(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TRPS3: ${value}`);
                break;
            case LayoutTypeEnum.TRPS4:
                this.data.keyInfoData.updateAdvancedKeyTRPS4(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} TRPS4: ${value}`);
                break;
            case LayoutTypeEnum.MT_TGL_Delay:
                this.data.keyInfoData.updateAdvancedKeyDelay(keyValue, value * 10);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} Delay: ${value}`);
                break;
            case LayoutTypeEnum.PressDeadZone:
                this.data.keyInfoData.updateDeadPress(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DeadPress: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.ReleaseDeadZone:
                this.data.keyInfoData.updateDeadRelease(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} DeadRelease: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.KeyReleaseTravel:
                this.data.keyInfoData.updateSingleTouchRelease(keyValue, value / 1000.0);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} SingleTouchRelease: ${value / 1000.0}`);
                break;
            case LayoutTypeEnum.KeyAxis:
                isLastKey = this.data.keyInfoData.updateAxisID(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} AxisID: ${value / 1000.0}`);
                break;
        }

        if (isLastKey) {
            this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyValuesGotten, { detail: this.data.keyInfoData }));
            this.getKeyRgb();
            return;
        }
    }

    private onKrgbCmd(event: any) {
        let keyCode: KeyDefineEnum = event.detail.key;
        let r: LayoutTypeEnum = event.detail.r;
        let g: number = event.detail.g;
        let b: number = event.detail.b;

        let isLast = this.data.keyInfoData.updateKeyColor(keyCode, r, g, b);
        let R = r.toString(16).toUpperCase().padStart(2, '0');
        let G = g.toString(16).toUpperCase().padStart(2, '0');
        let B = b.toString(16).toUpperCase().padStart(2, '0');
        Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${keyCode} Color: #${R}${G}${B}`);

        if (isLast) {
            this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyRgbGotten, { detail: this.data.keyInfoData }));
        }
    }

    private onCmdResult(event: any) {
        let order: OrderTypeEnum = event.detail.order;
        let s_arg = event.detail.s_arg;

        switch (order) {
            case OrderTypeEnum.GetKbName:
                const decoder = new TextDecoder('utf-8');
                //const filteredData = s_arg.slice(0, 31).filter(p => p !== 0x00);

                // 解码过滤后的数据
                this.data.keyboardName = decoder.decode(new Uint8Array(s_arg));

                Logging.console(LOG_TYPE.SUCCESS, `\nKeyboard Name: ${this.data.keyboardName}`);
                break;
            case OrderTypeEnum.GetProtoVer:
                // 第一个字节的低4位是版本号的第一位
                const version1 = s_arg[1] & 0x0f;
                // 第二个字节的高4位是版本号的第二位
                const version2 = (s_arg[0] >> 4) & 0x0f;
                // 第二个字节的低4位是版本号的第三位
                const version3 = s_arg[0] & 0x0f;

                this.data.protocolVersion = `${version1}.${version2}.${version3}`;
                this.data.keyInfoData.protocolVersion = this.data.protocolVersion;
                Logging.console(LOG_TYPE.SUCCESS, `\nPotocol ver: ${this.data.protocolVersion}`);
                break;
            case OrderTypeEnum.Travel:
                this.data.performanceData.precision = s_arg[0] / 1000;
                this.data.performanceData.minTouchTravel = ((s_arg[2] << 8) | s_arg[1]) / 1000;
                this.data.performanceData.maxTouchTravel = ((s_arg[4] << 8) | s_arg[3]) / 1000;
                // 小数位
                const str = this.data.performanceData.precision.toString();
                const decimalPart = str.split('.')[1];
                this.data.performanceData.decimalPlace = decimalPart.length;

                Logging.console(LOG_TYPE.SUCCESS,
                    `\nPrecision: ${this.data.performanceData.precision.toFixed(3)}\nDecimalPlace: ${this.data.performanceData.decimalPlace}\nMinTouchTravel: ${this.data.performanceData.minTouchTravel.toFixed(2)}\nMaxTouchTravel: ${this.data.performanceData.maxTouchTravel.toFixed(2)}`);
                break;
            case OrderTypeEnum.SwitchProfile:
                this.data.configId = s_arg[0];
                Logging.console(LOG_TYPE.SUCCESS, `\nConfigID: ${this.data.configId}`);
                break;
            case OrderTypeEnum.QuerySupportAxis:
                this.data.axisList = [];
                for (let i = 0; i < 8; i++) {
                    const id = (s_arg[i * 2] << 8) | s_arg[i * 2 + 1];
                    if (id === 0xffff || id === 0) {
                        break;
                    } else {
                        const axis: Axis = {
                            id,
                            name: AxisList[id].name,
                            minTravel: AxisList[id].minTravel,
                            maxTravel: AxisList[id].maxTravel,
                            color: AxisList[id].color,
                        };
                        this.data.axisList.push(axis);
                        Logging.console(LOG_TYPE.SUCCESS, `\nSupport axis: [${axis.id}] [${axis.name}] [${axis.minTravel}~${axis.maxTravel}] [${axis.color}]`);
                    }
                }
                break;
            case OrderTypeEnum.SetReportRate:
                this.data.performanceData.rateOfReturn = s_arg[0];
                Logging.console(LOG_TYPE.SUCCESS, `\nReport rate: ${this.data.performanceData.rateOfReturn}`);
                break;
            case OrderTypeEnum.QueryWinMode:
                if (s_arg[0] == 1) {
                    this.data.kbWinMacMode = MatrixTable.WIN;
                    this.data.isWinMacSupport = this.data.isWinMacSupport | 0x01;
                    Logging.console(LOG_TYPE.SUCCESS, '\nSys Mode: Win');
                } else if (s_arg[2] == 0) {
                    this.data.kbWinMacMode = MatrixTable.MAC;
                    this.data.isWinMacSupport = this.data.isWinMacSupport | 0x01;
                } else if (s_arg[2] == 0xff) {
                    this.data.isWinMacSupport = this.data.isWinMacSupport & 0xFE;
                }
                break;
            case OrderTypeEnum.QueryMacMode:
                if (s_arg[0] == 1) {
                    this.data.kbWinMacMode = MatrixTable.MAC;
                    this.data.isWinMacSupport = this.data.isWinMacSupport | 0x02;
                    Logging.console(LOG_TYPE.SUCCESS, '\nSys Mode: Win');
                } else if (s_arg[2] == 0) {
                    this.data.kbWinMacMode = MatrixTable.WIN;
                    this.data.isWinMacSupport = this.data.isWinMacSupport | 0x02;
                } else if (s_arg[2] == 0xff) {
                    this.data.isWinMacSupport = this.data.isWinMacSupport & 0xFD;
                }
                break;
            case OrderTypeEnum.SwitchDeadZone:
                this.data.topDeadSwitch = s_arg[0] > 0;
                Logging.console(LOG_TYPE.SUCCESS, `\nTopDeadSwitch: ${this.data.topDeadSwitch}`);
                this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnSynced, { detail: this.data }));
                break;
        }
    }

    private onDbCmd(event: any) {
        this.data.performanceData.globalTouchTravel = event.detail.globalTouchTravel;
        this.data.performanceData.pressDead = event.detail.pressDead;
        this.data.performanceData.releaseDead = event.detail.releaseDead;

        this.data.keyInfoData.globalTouchTravel = event.detail.globalTouchTravel;

        Logging.console(LOG_TYPE.SUCCESS, `\nGlobalTouchTravel: ${this.data.performanceData.globalTouchTravel}\nPressDead: ${this.data.performanceData.pressDead}\nPressDead: ${this.data.performanceData.releaseDead}`);
    }

    private onPrgbCmd(event: any) {
        this.data.lightSetting.lightColorList = event.detail.lightColorList;
        this.data.lightSetting.lightSwitch = event.detail.lightSwitch;
        this.data.lightSetting.lightMode = event.detail.lightMode;
        this.data.lightSetting.lightBigMode = event.detail.lightBigMode;
        this.data.lightSetting.lightBrightness = event.detail.lightBrightness;
        this.data.lightSetting.lightSpeed = event.detail.lightSpeed;
        this.data.lightSetting.lightSleepDelay = event.detail.lightSleepDelay;
        this.data.lightSetting.lightDirection = event.detail.lightDirection;
        this.data.lightSetting.superResponse = event.detail.superResponse;
        this.data.lightSetting.staticLightMode = event.detail.staticLightMode;

        Logging.console(LOG_TYPE.SUCCESS, `
Color: [${this.data.lightSetting.lightColorList[0].color}] [${this.data.lightSetting.lightColorList[1].color}] [${this.data.lightSetting.lightColorList[2].color}] [${this.data.lightSetting.lightColorList[3].color}] [${this.data.lightSetting.lightColorList[4].color}] [${this.data.lightSetting.lightColorList[5].color}] [${this.data.lightSetting.lightColorList[6].color}]
Mode: ${this.data.lightSetting.lightMode}
Switch: ${this.data.lightSetting.lightSwitch}
Brightness: ${this.data.lightSetting.lightBrightness}
Speed: ${this.data.lightSetting.lightSpeed}
Sleep: ${this.data.lightSetting.lightSleepDelay}
Direction: ${this.data.lightSetting.lightDirection}
SuperResponse: ${this.data.lightSetting.superResponse}
StaticMode: ${this.data.lightSetting.staticLightMode}`);
    }

    private onDefKeyCmd(event: any) {
        if (event.detail.isReset) {
            this.data.keyInfoData.resetAll();
        } else {
            let row = event.detail.row;
            let col = event.detail.col;
            this.data.keyInfoData.updateKeyInfo(row, col, event.detail.keyInfo);
            if (event.detail.keyInfo != null) {
                Logging.console(LOG_TYPE.SUCCESS, `KeyInfo: [${row}][${col}] ${KeyText[event.detail.keyInfo.keyValue]}`);
            }
            if (row == 5 && col == 20) {
                this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyDefaultLayoutGotten, { detail: this.data.keyInfoData }));
                this.getKeyValues();
            }
        }
    }

    private onRm6x21(event: any) {
        // 判断当前页数
        let page = 0;
        if (this.data.performanceData.isAdjusting) {
            page = (this.data.performanceData.adjustingCount % 2) + 1;
        } else {
            page = (this.data.performanceData.keyPressTestCount % 2) + 1;
        }

        // 开始取值的位置
        let index = 0;
        let buff = 0;
        let i = 0;
        let j = 0;

        let dataType = event.detail.dataType as number;
        let data = new DataView(event.detail.values);

        let add = page == 1 ? 0 : 3;
        
        switch (dataType) {
            case 0x02:
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 21; j++) {
                        buff = (data.getUint8(index + 1) << 8) | data.getUint8(index);
                        this.data.keyInfoData.updateAdjustingMM(i + add, j, buff /1000);
                        index += 2;
                    }
                }

                this.data.performanceData.keyPressTestCount += 1;
                                
                if (page == 1 && (this.data.performanceData.isAdjusting || this.data.performanceData.travelTestOn)) {
                    this.getAdustingData(dataType, 2);
                } else if (page == 2) {
                    this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnAdjustingMMDataGotten, { detail: this.data.performanceData.keyPressTestCount }));
                }
                break;
            case 0x03:
                for (i = 0; i < 6; i++) {
                    for (j = 0; j < 21; j++) {
                        buff = data.getUint8(index);
                        this.data.keyInfoData.updateAdjustingPress(i, j, buff);
                        index += 1;
                    }
                }
                this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnAdjustingPressDataGotten, { detail: this.data.keyInfoData }));
                break;
            case 0x06:
                if (page == 1 || page == 2) {
                    let add = page == 1 ? 0 : 3;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 21; j++) {
                            buff = (data.getUint8(index + 1) << 8) | data.getUint8(index);
                            this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnAdjustingAdcValueUpdate, { 
                                detail: {
                                    row: i + add,
                                    col: j,
                                    value: buff
                                }
                            }));
                            //this.data.keyInfoData.updateAdjustingADC(i + add, j, buff);
                            index += 2;
                        }
                    }
                }

                this.data.performanceData.adjustingCount += 1;

                if (page == 1 && this.data.performanceData.isAdjusting) {
                    this.getAdustingData(dataType, 2);
                } else if (page == 2) {
                    this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnAdjustingAdcDataGotten, { detail: this.data.performanceData.adjustingCount }));
                }
                break;
        }
    }

    private onMacroMode(event: any) {
        this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyMacroModeGotten, { detail: event.detail }));
        Logging.console(LOG_TYPE.SUCCESS, `Key Macro Mode [key:${event.detail.key}] [index:${event.detail.index}] [mode:${event.detail.mode}] [repeatCount:${event.detail.repeatCount}] [delay:${event.detail.delay}]`);
    }
    //#endregion
}