/**
 * Connection type
 */
export enum ConnectionType {
    None = 'none',
    /** The keyboard is connected via USB */
    USB = 'usb',
    /** The keyboard is connected via BT */
    Bluetooth = 'bt',
    /** The keyboard is connected via Dongle */
    Dongle = 'dongle'
}

/**
 * Connection status
 */
export enum ConnectionStatusEnum {
    Disconnected = 'disconnected',
    Connected = 'connected',
}

/**
 * Connection type
 */
export enum ConnectionEventEnum {
    Disconnect = 'disconnect',
    Open = 'open',
    Close = 'close'
}

/**
 * Key remapping type
 */
export enum KeyMappingType {
    KeyBoard = 0,
    Mousue = 1,
    Media = 2,
    Macro = 3,
    Custom = 4,
    DPIKey = 5,
    ProfileSwitch = 6,
    SpecialFun = 7,
    LightSwitch = 8,
    ReportRate = 9,
    SnipeKey = 0x0A,
    PressGun = 0x0B,
    FnKey = 0x0D,
    LodKey = 0x0F
}

export enum KeyMatrixLayer {
    Nomal = 0x00,
    FN1 = 0x01,
    FN2 = 0x02,
    Tap = 0x03
}

export enum LightEffectEnum {
    FixedOn = 1,
    Respire = 2,
    Rainbow = 3,
    FlashAway = 4,
    Raindrops = 5,
    RainbowWheel = 6,
    RippleShining = 7,
    StarsTwinkle = 8,
    ShadowDisappear = 9,
    RetroSnake = 10,
    NeonStream = 11,
    Reaction = 12,
    SineWave = 13,
    Blossoming = 17,
    SelfDefine = 18,
    OFF = 0,
    Music = 19
}