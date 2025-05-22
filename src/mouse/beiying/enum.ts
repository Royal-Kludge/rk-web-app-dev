/**
 * Key remapping type
 */
export enum KeyMappingType {
    Disable = 0,
    Keyboard = 0,
    Mouse = 1,
    Media = 2,
    Macro = 3,
    Custom = 4,
    DPIKey = 5,
    ProfileSwitch = 6,
    ReportRate = 9,
    KeyCombo = 0x10,
    ModifyCombo = 0x10,
}

export enum KeyFunctionType {
    MouseKey = 0,
    Dpi = 1,
    ReportRate = 2,
    Media = 3,
    Keyboard = 4,
    Macro = 5,
    GameAdv = 6,
    Shortcuts = 7,
    Disable = 8
}

export enum MouseKeyCode {
    LeftKey = 1,
    RightKey = 2,
    MidKey = 3,
    ForwardKey = 4,
    BackKey = 5,
    LeftShaft = 6,
    RightShaft = 7,
    WheelUp = 8,
    WheelDown = 9,
    XAxleLeft = 10,
    XAxleRight = 11,
    YAxleUp = 12,
    YAxleDown = 13
}

export enum MacroLoopEnum {
    LoopCount = 1,
    LoopToAnyKeyDown = 2,
    LoopToKeyUp = 4
}

export enum DpiCodeEnum {
    DpiIncrease = 1,
    DpiDecrease = 2,
    DpiLoop = 4,
    DpiLock = 10
}

export enum ReportRateCodeEnum {
    ReportRateIncrease = 1,
    ReportRateDecrease = 2,
    ReportRateLoop = 4
}

export enum ModifyKey {
    LCtrl = 0x01,
    LShift = 0x02,
    LAlt = 0x04,
    LWin = 0x08,
    RCtrl = 0x10,
    RShift = 0x20,
    RAlt = 0x40,
    RWin = 0x80,
}

export enum PopupCmdId {
    ConnectStatusChanged = 0x02,
    DpiLevelChanged = 0x03,
    ProfileChanged = 0x04,
    BetteryChanged = 0x05,
    CustomKeyPressed = 0x08,
    LodHeightChanged = 0x0B,
}

export enum GetReportCmdId {
    None = 0x00,
    SetPerKeyCmd = 0x30,
    SetMultiKeyStartCmd = 0x31,
    SetMultiKeyEndCmd = 0x32,
    SetLedParamCmd = 0x35,
    SetDpiCmd = 0x3A,
    SetFactoryResetCmd = 0x04,
    GetOnlineCmd = 0x47,
    SetStartDataTransCmd = 0x44,
    SetInitOtaEventCmd = 0x57,
    SetCheckOtaEventCmd = 0x52,
    SetFormatFlashCmd = 0x55,
    SetMacroDataCmd = 0x50,
    SetCheckMacroCmd = 0x51,
    SetEndDataTransCmd = 0x5E,
    GetFwVerCmd = 0x92,
}

export enum BigDataTransType {
    None = 0x00,
    SetMacroData = 0x50,
    GetFwVer = 0x92,
}