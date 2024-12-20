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
 * Device type
 */
export enum DeviceType {
    Keyboard = 'keyboard',
    Mouse = 'mouse'
}