import { KeyDefineEnum } from "@/common/keyCode_sparklink";
import type { KeyCmdValue, KeyInfo } from "./interface";
import { KeyTouchModeEnum, LayoutTypeEnum } from "./enum";
import tool from "./tool";
import { AxisList } from "./constant";

export class KeyInfoData {

    keyInfoArray: Array<Array<KeyInfo | null>>;
    protocolVersion: string = '';
    globalTouchTravel: number = 0;
    maxTouchTravel: number = 4.0;
    axisTypeId: number = 0;
    lastKeyCode: KeyDefineEnum = KeyDefineEnum.NONE;
    lastRow: number = 0;
    lastCol: number = 0;

    constructor() {
        this.keyInfoArray = Array.from<Array<KeyInfo>>({ length: 6 });
        for (let i = 0; i < 6; i++) {
            this.keyInfoArray[i] = Array.from<KeyInfo>({ length: 21 });
            for (let j = 0; j < 21; j++) {
                this.keyInfoArray[i][j] == null;
            }
        }
    }

    resetAll() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                this.keyInfoArray[i][j] == null;
            }
        }
    }

    updateKeyInfo(row: number, col: number, keyInfo: KeyInfo | null) {
        this.keyInfoArray[row][col] = keyInfo;
        if (keyInfo != null ) {
            if (keyInfo.axisID == 0) keyInfo.axisID = this.axisTypeId;
            if (row >= this.lastRow) {
                if (col > this.lastCol || row != this.lastRow) {
                    this.lastCol = col;
                    this.lastKeyCode = keyInfo.keyValue;
                }
                if (row > this.lastRow) this.lastRow = row;
            }
        }
    }

    getKeyInfo(row: number, col: number): KeyInfo | null {
        return this.keyInfoArray[row][col];
    }

    getKeyInfoByIndex(index: number): KeyInfo | null {
        let row = Math.floor(index / 6);
        let col = index % 6;
        return this.keyInfoArray[row][col];
    }

    getKeyInfoByKey(keyCode: KeyDefineEnum): KeyInfo | null {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyCode) {
                    return keyInfo;
                }
            }
        }

        return null
    }

    getKeyDefValue(row: number, col: number): KeyDefineEnum {
        let keyInfo = this.keyInfoArray[row][col];
        if (keyInfo != null) {
            return keyInfo.keyValue;
        }
        return 0;
    }

    getAllKeyValue(): Array<KeyDefineEnum> {
        const values = new Array<KeyDefineEnum>();
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null) {
                    values.push(keyInfo.keyValue);
                }
            }
        }
        return values;
    }

    getKeyCheckedCount() {
        let count = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != null && keyInfo.isCheck) {
                    count++;
                }
            }
        }
        return count;
    }

    updateFnKeyValue(keyValue: KeyDefineEnum, layout: LayoutTypeEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (layout == 0) {
                        keyInfo.fn0_keyValue = value;
                    } else if (layout == 1) {
                        keyInfo.fn1_keyValue = value;
                    } else if (layout == 2) {
                        keyInfo.fn2_keyValue = value;
                    } else if (layout == 3) {
                        keyInfo.fn3_keyValue = value;
                    }
                }
            }
        }
    }

    updateTouchTravel(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.touchTravel = value;
                }
            }
        } 
    }

    updateTouchMode(keyValue: KeyDefineEnum, mode: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                if (mode === KeyTouchModeEnum.GlobalMode) {
                    keyInfo.touchTravel = this.globalTouchTravel;
                    keyInfo.isSingleTouch = false;
                    keyInfo.isQuickTouch = false;
                } else if (mode === KeyTouchModeEnum.SingleMode) {
                    keyInfo.isSingleTouch = true;
                    keyInfo.isQuickTouch = false;
                } else if (mode === KeyTouchModeEnum.QuickMode) {
                    keyInfo.isSingleTouch = true;
                    keyInfo.isQuickTouch = true;
                }
                }
            }
        }
    }

    updateAdvancedKeyMode(keyValue: KeyDefineEnum, mode: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.advanceKeyType = mode;
                    if (mode > 0) {
                        keyInfo.isAdvancedKey = true;
                    } else {
                        keyInfo.isAdvancedKey = false;
                    }
                }
            }
        }
    }

    updateQuickTouchPTravel(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.quickTouchPress = value;
                }
            }
        }
    }

    updateQuickTouchRTravel(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.quickTouchRelease = value;
                }
            }
        }
    }

    updateDeadPress(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.deadPress = value;
                }
            }
        }
    }

    updateDeadRelease(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.deadRelease = value;
                }
            }
        }
    }

    updateAdvancedKeyDB1(keyValue: KeyDefineEnum, DB1: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        // DKS
                        keyInfo.DKSInfo.DB = DB1;
                    } else if (keyInfo.advanceKeyType === 2) {
                        // MPT
                        keyInfo.MPTInfo.DB[0] = DB1;
                    }
                    return;
                }
            }
        }
  }

    updateAdvancedKeyDB2(keyValue: KeyDefineEnum, DB2: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 2) {
                        // MPT
                        keyInfo.MPTInfo.DB[1] = DB2;
                    } else if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.DB2 = DB2;
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyDB3(keyValue: KeyDefineEnum, DB3: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 2) {
                        // MPT
                        keyInfo.MPTInfo.DB[2] = DB3;
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyDKS1(keyValue: KeyDefineEnum, DKS1: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.DKS[0] = DKS1;
                    } else if (keyInfo.advanceKeyType === 2) {
                        keyInfo.MPTInfo.DKS[0] = DKS1;
                    } else if (keyInfo.advanceKeyType === 3) {
                        keyInfo.MTInfo.DKS[0] = DKS1;
                    } else if (keyInfo.advanceKeyType === 4) {
                        keyInfo.TGLInfo.DKS = DKS1;
                    } else if (keyInfo.advanceKeyType === 5) {
                        keyInfo.ENDInfo.DKS = DKS1;
                    } else if (keyInfo.advanceKeyType === 8) {
                        if (tool.isFeatureSupported('socdV3', this.protocolVersion)) {
                            const pos1 = (DKS1 >> 8) & 0xff;
                            const pos2 = DKS1 & 0xff;

                            console.log(pos1, pos2);

                            const row1 = (pos1 >> 5) & 0x07;
                            const col1 = pos1 & 0x1f;
                            const row2 = (pos2 >> 5) & 0x07;
                            const col2 = pos2 & 0x1f;

                            keyInfo.SOCDInfo.DKS[0] = this.getKeyDefValue(row1, col1);
                            keyInfo.SOCDInfo.DKS[1] = this.getKeyDefValue(row2, col2);
                        } else {
                            keyInfo.SOCDInfo.DKS[0] = keyValue;
                            keyInfo.SOCDInfo.DKS[1] = DKS1;
                        }
                    } else if (keyInfo.advanceKeyType === 9) {
                            keyInfo.RSInfo.DKS[0] = keyValue;
                            keyInfo.RSInfo.DKS[1] = DKS1;
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyDKS2(keyValue: KeyDefineEnum, DKS2: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.DKS[1] = DKS2;
                    } else if (keyInfo.advanceKeyType === 2) {
                        keyInfo.MPTInfo.DKS[1] = DKS2;
                    } else if (keyInfo.advanceKeyType === 3) {
                        keyInfo.MTInfo.DKS[1] = DKS2;
                    } else if (keyInfo.advanceKeyType === 8) {
                        // 去掉高位 只留低位
                        if (tool.isFeatureSupported('socdV3'), this.protocolVersion) {
                            keyInfo.SOCDInfo.DKSV[0] = DKS2;
                        } else {
                            keyInfo.SOCDInfo.mode = DKS2 & 0xff;
                        }
                    }
                    return;
                }
            }
        }
  }

    updateAdvancedKeyDKS3(keyValue: KeyDefineEnum, DKS3: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.DKS[2] = DKS3;
                    } else if (keyInfo.advanceKeyType === 2) {
                        keyInfo.MPTInfo.DKS[2] = DKS3;
                    } else if (keyInfo.advanceKeyType === 8) {
                        if (tool.isFeatureSupported('socdV3', this.protocolVersion)) {
                            keyInfo.SOCDInfo.DKSV[1] = DKS3;
                        }
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyDKS4(keyValue: KeyDefineEnum, DKS4: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.DKS[3] = DKS4;
                    } else if (keyInfo.advanceKeyType === 8) {
                        if (tool.isFeatureSupported('socdV3', this.protocolVersion)) {
                            const mode = DKS4 & 0xff;
                            const type = (DKS4 >> 8) & 0xff;
                            keyInfo.SOCDInfo.type = type;
                            keyInfo.SOCDInfo.mode = mode;
                        }
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyTRPS1(keyValue: KeyDefineEnum, TRPS1: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.TRPS[0] = TRPS1;
                    }
                    return;
            }
          }
        }
    }

    updateAdvancedKeyTRPS2(keyValue: KeyDefineEnum, TRPS2: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.TRPS[1] = TRPS2;
                    }
                    return;
              }
            }
        }
    }

    updateAdvancedKeyTRPS3(keyValue: KeyDefineEnum, TRPS3: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.TRPS[2] = TRPS3;
                    }
                    return;
              }
            }
        }
    }

    updateAdvancedKeyTRPS4(keyValue: KeyDefineEnum, TRPS4: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 1) {
                        keyInfo.DKSInfo.TRPS[3] = TRPS4;
                    }
                    return;
                }
            }
        }
    }

    updateAdvancedKeyDelay(keyValue: KeyDefineEnum, delay: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    if (keyInfo.advanceKeyType === 3) {
                        keyInfo.MTInfo.delay = delay;
                    } else if (keyInfo.advanceKeyType === 4) {
                        keyInfo.TGLInfo.delay = delay;
                    }
                    return;
                }
            }
        }
    }

    updatePressDead(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.deadPress = value;
                }
            }
        }
    }

    updateReleaseDead(keyValue: KeyDefineEnum, value: number) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.deadRelease = value;
                }
            }
        }
    }

    updateAxisID(keyValue: KeyDefineEnum, axisID: number): boolean {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.axisID = axisID > 0 ? axisID : this.axisTypeId; 
                    return i == this.lastRow && j == this.lastCol;
                }
            }
        }

        return false;
    }

    updateKeyColor(keyValue: KeyDefineEnum, r: number, g: number, b: number): boolean {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 21; j++) {
                let keyInfo = this.keyInfoArray[i][j];
                if (keyInfo != undefined && keyInfo != null && keyInfo.keyValue == keyValue) {
                    keyInfo.color.red = r;
                    keyInfo.color.green = g;
                    keyInfo.color.blue = b;
                    let R = r.toString(16).toUpperCase().padStart(2, '0');
                    let G = g.toString(16).toUpperCase().padStart(2, '0');
                    let B = b.toString(16).toUpperCase().padStart(2, '0');
                    keyInfo.color.color = `#${R}${G}${B}`;
                    return i == this.lastRow && j == this.lastCol;
                }
            }
        }

        return false;
    }

    getSwitchMaxTravel(id: number) {
      if (AxisList.length !== 0 && tool.isFeatureSupported('signalSwitch', this.protocolVersion)) {
        return AxisList[id].maxTravel / 1000;
      }
      return this.maxTouchTravel;
    }

    updateAdjustingMM(row: number, col: number, mm: number) {
        let keyInfo = this.keyInfoArray[row][col];
        if (keyInfo != undefined && keyInfo != null) {
            keyInfo.adjustingMM = mm;
            
            if (mm >= this.getSwitchMaxTravel(keyInfo.axisID) - 0.01) {
                keyInfo.adjustingSuccess = true;
            }
        }
    }

    updateAdjustingADC(row: number, col: number, adc: number) {
        let keyInfo = this.keyInfoArray[row][col];
        if (keyInfo != undefined && keyInfo != null) {
            keyInfo.adjustingADC = adc;
        }
    }

    updateAdjustingPress(row: number, col: number, press: number) {
        let keyInfo = this.keyInfoArray[row][col];
        if (keyInfo != undefined && keyInfo != null) {
            keyInfo.adjustingPress = press;
        }
    }

    getAdjustingADC(row: number, col: number) {
        let keyInfo = this.keyInfoArray[row][col];
        if (keyInfo != undefined && keyInfo != null) {
            const { adjustingADC, adjustingMM, adjustingSuccess } = keyInfo;
            return { adjustingADC, adjustingMM, adjustingSuccess };
        }

        return null;
    }

    updateSingleTouchRelease(keyValue: KeyDefineEnum, singleTouchRelease: number) {
        let count = 0;
        const keyValues = new Array<number>();
        const layouts = new Array<number>();
        const values = new Uint16Array(312);

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != undefined && keyInfo != null && keyInfo.isCheck) {
                    keyInfo.touchRelease = singleTouchRelease;
                    
                    keyInfo.isSingleTouch = true;
                    
                    // 模式为单键触发模式
                    const touchMode = KeyTouchModeEnum.SingleMode;
                    
                    // 打包数据，发送给键盘(第八层模式，第四层行程值)
                    keyValues[count] = keyInfo.keyValue;
                    layouts[count] = LayoutTypeEnum.MODE;
                    values[count] = (touchMode << 4) | keyInfo.advanceKeyType;
                    
                    count++;
                    
                    keyValues[count] = keyInfo.keyValue;
                    layouts[count] = LayoutTypeEnum.KeyReleaseTravel;
                    values[count] = keyInfo.touchRelease * 1000;
                    
                    count++;
                }
            }
        }

        return { keyValues, layouts, values };
    }

    // 更新按键全局触发行程
    updateKeyInfoGlobalTouchTravel(globalTouchTravel: number) {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isSingleTouch != true) {
                    keyInfo.touchTravel = globalTouchTravel;
                }
            }
        }
    }

    // 更新选中按键的按下死区
    updateKeyCheckedDeadPress(pressTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck) {
                    keyInfo.deadPress = pressTravel;

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.deadPress * 1000,
                        layout: LayoutTypeEnum.PressDeadZone
                    })

                }
            }
        }

        return keyCmdValues;
    }

    // 更新选中按键的抬起死区
    updateKeyCheckedDeadRelease(releaseTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck) {
                    keyInfo.deadRelease = releaseTravel;

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.deadRelease * 1000,
                        layout: LayoutTypeEnum.PressDeadZone
                    })

                }
            }
        }

        return keyCmdValues;
    }

    // 更新按键行程-RT首次触发行程
    updateKeyInfoRTFirstTouchTravel(firstTouchTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck === true) {
                    keyInfo.touchTravel = firstTouchTravel;
                    
                    keyInfo.isSingleTouch = true;
                    
                    const touchMode = KeyTouchModeEnum.QuickMode;
                    
                    // 打包数据，发送给键盘(第八层模式，第四层行程值)
                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: (touchMode << 4) | keyInfo.advanceKeyType,
                        layout: LayoutTypeEnum.MODE
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.touchTravel * 1000,
                        layout: LayoutTypeEnum.DB0
                    });
                }
            }
        }

        return keyCmdValues;
    }

    // 更新选中按键的快速触发按压行程
    updateKeyCheckedQuickTouchPressTravel(pressTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck) {
                    keyInfo.isQuickTouch = true;
                    keyInfo.quickTouchPress = pressTravel;

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: (KeyTouchModeEnum.QuickMode << 4) | keyInfo.advanceKeyType,
                        layout: LayoutTypeEnum.MODE
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.quickTouchPress * 1000,
                        layout: LayoutTypeEnum.RT_PressTravel
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.quickTouchRelease * 1000,
                        layout: LayoutTypeEnum.RT_ReleaseTravel
                    });
                }
            }
        }

        return keyCmdValues;
    }

    // 更新选中按键的快速触发释放行程
    updateKeyCheckedQuickTouchReleaseTravel(releaseTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck) {
                    keyInfo.isQuickTouch = true;
                    keyInfo.quickTouchRelease = releaseTravel;

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: (KeyTouchModeEnum.QuickMode << 4) | keyInfo.advanceKeyType,
                        layout: LayoutTypeEnum.MODE
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.quickTouchPress * 1000,
                        layout: LayoutTypeEnum.RT_PressTravel
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.quickTouchRelease * 1000,
                        layout: LayoutTypeEnum.RT_ReleaseTravel
                    });
                }
            }
        }
        
        return keyCmdValues;
    }

    updateKeyInfoSingleTouchTravel(singleTouchTravel: number): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null && keyInfo.isCheck == true) {
                    keyInfo.touchTravel = singleTouchTravel;

                    keyInfo.isSingleTouch = true;

                    // 模式为单键触发模式
                    const touchMode = KeyTouchModeEnum.SingleMode;

                    // 打包数据，发送给键盘(第八层模式，第四层行程值)
                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: (touchMode << 4) | keyInfo.advanceKeyType,
                        layout: LayoutTypeEnum.MODE
                    });

                    keyCmdValues.push({
                        keyCode: keyInfo.keyValue,
                        value: keyInfo.touchTravel * 1000,
                        layout: LayoutTypeEnum.DB0
                    });
                }
            }
        }

        return keyCmdValues;
    }

    resetTravel(): Array<KeyCmdValue> {
        let keyCmdValues: Array<KeyCmdValue> = [];

        for (let row = 0; row < 6; row++) {
          for (let col = 0; col < 21; col++) {
            let keyInfo = this.keyInfoArray[row][col];
            if (keyInfo != null && keyInfo.isCheck === true) {
                keyInfo.touchTravel = this.globalTouchTravel;
                keyInfo.isSingleTouch = false;
                keyInfo.isQuickTouch = false;

                const touchMode = KeyTouchModeEnum.GlobalMode;;

                // 打包数据，发送给键盘(第八层模式，第四层行程值)
                keyCmdValues.push({
                    keyCode: keyInfo.keyValue,
                    value: (touchMode << 4) | keyInfo.advanceKeyType,
                    layout: LayoutTypeEnum.MODE
                });

                keyCmdValues.push({
                    keyCode: keyInfo.keyValue,
                    value: keyInfo.touchTravel * 1000,
                    layout: LayoutTypeEnum.DB0
                });
            }
          }
        }

        return keyCmdValues;
    }

    // 按键行程测试：获取当前最大按下行程
    getMaxPressTravel() {
        let max = 0;
        let press = 0;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null) {
                    if (max < keyInfo.adjustingMM) {
                        max = keyInfo.adjustingMM;
                        press = keyInfo.adjustingPress;
                    }
                }
            }
        }
        return { max, press };
    }

    // 清空校准成功缓存：点击开始校准时调用
    clearAdjustingSuccessData() {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 21; col++) {
                let keyInfo = this.keyInfoArray[row][col];
                if (keyInfo != null) {
                    keyInfo.adjustingSuccess = false;
                }
            }
        }
    }
}