import { type KeyInfo, type Axis, type KeyboardState, type KeyTableData, type LedColor } from '../interface'
import { REPORT_HEAD, REPORT_HEAD_LENGTH, REPORT_ID_USB, REPORT_LENGTH } from './packets/packet';
import { ConnectionStatusEnum, ConnectionType } from '@/device/enum';
import { BoardId, COMMAND_ID, FwVersion, HwVersion, RK_C61, RK_C61_EVENT_DEFINE } from './rk_c61';
import { KeyText, type KeyCodeEnum, type KeyDefineEnum } from '@/common/keyCode';
import { LayoutTypeEnum, LightDirectionEnum, LightEffectEnum, LightModeEnum, LightSwitchEnum, MatrixTable, OrderTypeEnum, RWTypeEnum, SuperResponseEnum } from '../enum';
import { AxisList } from '../constant';
import { LOG_TYPE, Logging } from '@/common/logging';
import { KB2_CMD_FAIL } from './packets/usb/KB2_CMD_FAIL';
import { KB2_CMD_SYNC } from './packets/usb/KB2_CMD_SYNC';
import { KB2_CMD } from './packets/usb/KB2_CMD';
import { KB2_CMD_KEY } from './packets/usb/KB2_CMD_KEY';
import { KB2_CMD_KRGB } from './packets/usb/KB2_CMD_KRGB';
import { KB2_CMD_DB } from './packets/usb/KB2_CMD_DB';
import { KB2_CMD_PRGB } from './packets/usb/KB2_CMD_PRGB';
import { KB2_CMD_DEFKEY } from './packets/usb/KB2_CMD_DEFKEY';

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
        await this.getDbParam();
        await this.getPrgb();
        await this.getKeyDefLayout(0, 1);
        await this.getKeyDefLayout(2, 3);
        await this.getKeyDefLayout(4, 5);
    }

    async onGetReport(reportId: number, data: DataView): Promise<void> {
        if (reportId == REPORT_ID_USB && data.byteLength == REPORT_LENGTH && data.getUint8(0) == REPORT_HEAD) {
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
            }
            worker.postMessage("report");
        }
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sync() : Promise<void> {
        worker.postMessage(this.KB2_CMD_SYNC.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_SYNC data to queue.`);
    }

    async cmd(order: OrderTypeEnum, arg: number) : Promise<void> {
        this.KB2_CMD.order = order;
        this.KB2_CMD.arg = arg;
        worker.postMessage(this.KB2_CMD.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD data to queue.`);
    }

    async getDbParam() : Promise<void> {
        this.KB2_CMD_DB.rw = RWTypeEnum.Read;
        worker.postMessage(this.KB2_CMD_DB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_DB data to queue.`);
    }
    
    async getPrgb() : Promise<void> {
        this.KB2_CMD_PRGB.rw = RWTypeEnum.Read;
        worker.postMessage(this.KB2_CMD_PRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_PRGB data to queue.`);
    }

    async getKeyDefLayout(rowX: number, rowY: number) : Promise<void> {
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
                    this.KB2_CMD_KEY.isLastCmd = false;
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
            this.KB2_CMD_KEY.isLastCmd = true;
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
                this.KB2_CMD_KRGB.isLastCmd = false;
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
        this.KB2_CMD_KRGB.isLastCmd = true;
        worker.postMessage(this.KB2_CMD_KRGB.command());
        Logging.console(LOG_TYPE.INFO, `Push KB2_CMD_KRGB data to queue.`);
    }

    async getMacros(): Promise<void> {
        this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnMacrosGotten, { detail: this.data.macros }));
    }

    async setMacros(): Promise<void> {
        
    }

    //#region Data analysis
    private onFailCmd(event: any) {
        let ackCmd: number = event.detail.ackCmd;
        let sArg: Uint8Array = event.detail.ackCmd;

        Logging.console(LOG_TYPE.ERROR, `Comand fail [${ackCmd}] arg [${sArg.toString()}]`);
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

        Logging.console(LOG_TYPE.SUCCESS, `\nID: ${boardId.id}\nLayout: ${boardId.kbLayout}\nAxisType: ${boardId.axisType}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nRunMode: ${event.detail.runMode}\nSN：${sn}`);
        Logging.console(LOG_TYPE.SUCCESS, `\nFwSize: ${hwVersion.fwSize}\nHwVersion: ${hwVersion.version}\nFwVersion: ${fwVersion.appVersion}\nBuildDate: ${fwVersion.buildDate}`,);
    }

    private onKeyCmd(event: any) {
        let isLastCmd: boolean = event.detail.isLastCmd;
        if (isLastCmd != undefined && isLastCmd) {
            this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyValuesGotten, { detail: this.data.keyInfoData }));
            this.getKeyRgb();
            return;
        }
        
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
                this.data.keyInfoData.updateAxisID(keyValue, value);
                Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${KeyText[keyValue]} AxisID: ${value / 1000.0}`);
                break;
        }
    }

    private onKrgbCmd(event: any) {
        let isLastCmd: boolean = event.detail.isLastCmd;
        if (isLastCmd != undefined && isLastCmd) {
            this.dispatchEvent(new CustomEvent(RK_C61_EVENT_DEFINE.OnKeyRgbGotten, { detail: this.data.keyInfoData }));
            return;
        }

        let keyCode: KeyDefineEnum = event.detail.key;
        let r: LayoutTypeEnum = event.detail.r;
        let g: number = event.detail.g;
        let b: number = event.detail.b;

        this.data.keyInfoData.updateKeyColor(keyCode, r, g, b);
        let R = r.toString(16).toUpperCase().padStart(2, '0');
        let G = g.toString(16).toUpperCase().padStart(2, '0');
        let B = b.toString(16).toUpperCase().padStart(2, '0');
        Logging.console(LOG_TYPE.SUCCESS, `\nKey: ${keyCode} Color: #${R}${G}${B}`);
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
                    }
                }

                Logging.console(LOG_TYPE.SUCCESS, `\nSupport axis: ${this.data.axisList.toString()}`);
                break;
            case OrderTypeEnum.SetReportRate:
                this.data.reportRate = s_arg[0];
                Logging.console(LOG_TYPE.SUCCESS, `\nReport rate: ${this.data.reportRate}`);
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
        if (this.data.lightSetting == undefined) {
            this.data.lightSetting = {
                lightColorList: new Array<LedColor>,
                lightSwitch: LightSwitchEnum.Off,
                lightMode: LightEffectEnum.Off,
                lightBigMode: LightModeEnum.Disable,
                lightBrightness: 0,
                lightSpeed: 0,
                lightSleepDelay: 0,
                lightDirection: LightDirectionEnum.Forward,
                superResponse: SuperResponseEnum.Off,
                staticLightMode: 0
            };
        }

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
    //#endregion
}