/**
 * Connection type
 */
export enum ConnectionType {
    Disconnected = 'none',
    /** The keyboard is connected via USB */
    USB = 'usb',
    /** The keyboard is connected via BT */
    Bluetooth = 'bt',
    /** The keyboard is connected via Dongle */
    Dongle = 'dongle'
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
export enum KeyRemappingType {
    KeyBoard = 0,
    Mousue = 1,
    Media = 2,
    Macro = 3
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
    //Music = 17
}