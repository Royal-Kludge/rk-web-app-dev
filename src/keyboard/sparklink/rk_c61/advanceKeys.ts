import { DKSActionTypeEnum, MagKeyAdvanceTypeEnum } from "@/keyboard/sparklink/enum";

export abstract class MagKeyAdvanced {
  index: number;
  advType: MagKeyAdvanceTypeEnum;
  data: Uint8Array;
  isSelected: boolean;

  constructor(type: MagKeyAdvanceTypeEnum) {
    this.advType = type;
    this.data = new Uint8Array(40);
    this.index = 0;
    this.isSelected = false;
  }

  abstract getData(): Uint8Array;
}

export class DKSAction {
  data: Uint8Array = new Uint8Array(8);

  //keyType: KeyMappingType = KeyMappingType.Keyboard;
  keyCode: number = 0x00;

  downAction1: DKSActionTypeEnum = DKSActionTypeEnum.None;
  downAction2: DKSActionTypeEnum = DKSActionTypeEnum.None;
  upAction1: DKSActionTypeEnum = DKSActionTypeEnum.None;
  upAction2: DKSActionTypeEnum = DKSActionTypeEnum.None;

  getData(): Uint8Array {
    this.data.fill(0);
    if (this.keyCode <= 255) {
      this.data[0] = 0x00;
      this.data[1] = this.keyCode;
      this.data[2] = 0x00;
      this.data[3] = 0x00;
    } else {
      this.data[0] = this.keyCode >> 24;
      this.data[1] = (this.keyCode >> 16) & 0x000000ff;
      this.data[2] = (this.keyCode >> 8) & 0x000000ff;
      this.data[3] = this.keyCode & 0x000000ff;
    }

    this.data[4] = this.downAction1;
    this.data[5] = this.downAction2;
    this.data[6] = this.upAction1;
    this.data[7] = this.upAction2;

    return this.data;
  }

  setData(data: Uint8Array) {
    let index = 0;
    if (data[index] == 0x00) {
      index++;
      this.keyCode = data[index++];
      index += 2;
    } else {
      this.keyCode = (data[index++] << 24) | (data[index++] << 16) | (data[index++] << 8) | data[index++];
    }
    this.downAction1 = data[index++];
    this.downAction2 = data[index++];
    this.upAction1 = data[index++];
    this.upAction2 = data[index++];
  }
}

export class MagKeyDKS extends MagKeyAdvanced {
  downTravel1: number = 18;
  downTravel2: number = 36;
  upTravel1: number = 36;
  upTravel2: number = 18;
  dksActions: Array<DKSAction>;

  constructor() {
    super(MagKeyAdvanceTypeEnum.DKS);
    this.dksActions = [new DKSAction(), new DKSAction(), new DKSAction(), new DKSAction()];
  }

  getData(): Uint8Array {
    this.data.fill(0);

    let index = 0;
    this.data[index++] = this.advType;
    this.data[index++] = this.downTravel1;
    this.data[index++] = this.downTravel2;
    this.data[index++] = this.upTravel1;
    this.data[index++] = this.upTravel2;
    let i: number;
    for (i = 0; i < this.dksActions.length; i++) {
      let actData = this.dksActions[i].getData();
      this.data.set(actData, index);
      index += actData.length;
    }
    return this.data;
  }

  static fromData(data: Uint8Array) {
    let magKeyDKS = new MagKeyDKS();
    magKeyDKS.data = data;

    let index = 1;

    magKeyDKS.downTravel1 = data[index++];
    magKeyDKS.downTravel2 = data[index++];
    magKeyDKS.upTravel1 = data[index++];
    magKeyDKS.upTravel2 = data[index++];

    let i: number;
    for (i = 0; i < magKeyDKS.dksActions.length; i++) {
      let tmp = data.slice(index, index + 8);
      magKeyDKS.dksActions[i].setData(tmp);
      index = index + 8;
    }

    return magKeyDKS;
  }
}

export class MagKeyMT extends MagKeyAdvanced {
  shortPressKeyCode: number = 0x00;
  longPressKeyCode: number = 0x00;
  tapTime: number = 0x01;

  constructor() {
    super(MagKeyAdvanceTypeEnum.MT);
  }

  getData(): Uint8Array {
    this.data.fill(0);

    let index = 0;
    this.data[index++] = this.advType;
    if (this.longPressKeyCode <= 255) {
      this.data[index++] = 0x00;
      this.data[index++] = this.longPressKeyCode;
      this.data[index++] = 0x00;
      this.data[index++] = 0x00;
    } else {
      this.data[index++] = this.longPressKeyCode >> 24;
      this.data[index++] = (this.longPressKeyCode >> 16) & 0x000000ff;
      this.data[index++] = (this.longPressKeyCode >> 8) & 0x000000ff;
      this.data[index++] = this.longPressKeyCode & 0x000000ff;
    }
    if (this.shortPressKeyCode <= 255) {
      this.data[index++] = 0x00;
      this.data[index++] = this.shortPressKeyCode;
      this.data[index++] = 0x00;
      this.data[index++] = 0x00;
    } else {
      this.data[index++] = this.shortPressKeyCode >> 24;
      this.data[index++] = (this.shortPressKeyCode >> 16) & 0x000000ff;
      this.data[index++] = (this.shortPressKeyCode >> 8) & 0x000000ff;
      this.data[index++] = this.shortPressKeyCode & 0x000000ff;
    }
    this.data[index++] = this.tapTime;
    return this.data;
  }

  static fromData(data: Uint8Array) {
    let magKeyMt = new MagKeyMT();
    magKeyMt.data = data;

    let index = 1;
    if (data[index] == 0x00) {
      index++;
      magKeyMt.shortPressKeyCode = data[index++];
      index += 2;
    } else {
      magKeyMt.shortPressKeyCode = (data[index++] << 24) | (data[index++] << 16) | (data[index++] << 8) | data[index++];
    }

    if (data[index] == 0x00) {
      index++;
      magKeyMt.longPressKeyCode = data[index++];
      index += 2;
    } else {
      magKeyMt.longPressKeyCode = (data[index++] << 24) | (data[index++] << 16) | (data[index++] << 8) | data[index++];
    }

    magKeyMt.tapTime = data[index++];

    return magKeyMt;
  }
}

export class MagKeyTGL extends MagKeyAdvanced {
  keyCode: number = 0x00;

  constructor() {
    super(MagKeyAdvanceTypeEnum.TGL);
  }

  getData(): Uint8Array {
    this.data.fill(0);

    let index = 0;

    this.data[index++] = this.advType;
    if (this.keyCode <= 255) {
      this.data[index++] = 0x00;
      this.data[index++] = this.keyCode;
      this.data[index++] = 0x00;
      this.data[index++] = 0x00;
    } else {
      this.data[index++] = this.keyCode >> 24;
      this.data[index++] = (this.keyCode >> 16) & 0x000000ff;
      this.data[index++] = (this.keyCode >> 8) & 0x000000ff;
      this.data[index++] = this.keyCode & 0x000000ff;
    }
    return this.data;
  }

  static fromData(data: Uint8Array) {
    let magKeyTGL = new MagKeyTGL();
    magKeyTGL.data = data;

    let index = 1;
    if (data[index] == 0x00) {
      index++;
      magKeyTGL.keyCode = data[index++];
      index += 2;
    } else {
      magKeyTGL.keyCode = (data[index++] << 24) | (data[index++] << 16) | (data[index++] << 8) | data[index++];
    }

    return magKeyTGL;
  }
}
