
const tool = {
  ComputeCheckSum(pack) {
    let checkSum = 0x35;
    const len = pack[1];

    checkSum += pack[0];
    checkSum += len;
    checkSum += pack[2];

    if (len > 0 && len <= 63 * 4) {
      checkSum += pack[len + 4 - 1];
    }

    return checkSum;
  },

  method2(param) {
    return `Hello, ${param}`;
  },

  getLightBitmap(LightSwitchOn, reverseEffect, superResponse) {
    // 初始化结果值为0
    let Bitmap = 0;

    // 设置灯光开关（第0位）
    if (LightSwitchOn) {
      Bitmap |= 0x01 << 0;
    }

    // 设置动态灯效方向（第1位）
    if (reverseEffect) {
      Bitmap |= 0x01 << 1;
    }

    // 设置超级响应开关（第4位）
    if (superResponse) {
      Bitmap |= 0x01 << 4;
    }

    return Bitmap;
  },

  // 计算解锁签名
  blSignatureKey: [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476],
  blSignatureParams: [0x65237401, 0x73104256, 0xefab89cd, 0xba98dcfe],
  blSignatureUnlock: [0xaefdb8c9, 0xdc98feba, 0x63742501, 0x27615403],

  shift(x, n) {
    return ((x << n) | (x >>> (32 - n))) >>> 0;
  },

  FF(x, y, z) {
    return ((x & y) | (~x & z)) >>> 0;
  },

  GG(x, y, z) {
    return ((x & z) | (y & ~z)) >>> 0;
  },

  HH(x, y, z) {
    return (x ^ y ^ z) >>> 0;
  },

  II(x, y, z) {
    return (y ^ (x | ~z)) >>> 0;
  },

  byteConvert32Bit(datas) {
    return (datas[0] | (datas[1] << 8) | (datas[2] << 16) | (datas[3] << 24)) >>> 0;
  },

  convertByte(data) {
    return [data & 0xff, (data >> 8) & 0xff, (data >> 16) & 0xff, (data >> 24) & 0xff];
  },

  signatureIteration(v, k) {
    let v0 = v[0];
    let v1 = v[1];
    let sum = 0;
    const delta = 0x9e3779b9;
    for (let i = 0; i < 16; i++) {
      sum = (sum + delta) >>> 0;
      v0 = (v0 + (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + k[1]))) >>> 0;
      v1 = (v1 + (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + k[3]))) >>> 0;
    }
    v[0] = v0;
    v[1] = v1;

    return v;
  },

  blSignature(Datas, KEYS, params, unlock) {
    const datas = [];
    const keys = KEYS.slice(); // 复制密钥数组

    for (let i = 0; i < 4; i++) {
      datas[i] = this.byteConvert32Bit(Datas.slice(i * 4, (i + 1) * 4));
    }

    // console.log("datas", datas[0].toString(16).padStart(8, '0'), datas[1].toString(16).padStart(8, '0'),
    //     datas[2].toString(16).padStart(8, '0'), datas[3].toString(16).padStart(8, '0'))

    // 滚动迭代, 可以确保任意数据都能够影响所有输出
    let buf = [];
    buf = this.signatureIteration(datas.slice(0, 2), keys);
    datas[0] = buf[0];
    datas[1] = buf[1];

    buf = this.signatureIteration(datas.slice(1, 3), keys);
    datas[1] = buf[0];
    datas[2] = buf[1];

    buf = this.signatureIteration(datas.slice(2, 4), keys);
    datas[2] = buf[0];
    datas[3] = buf[1];

    datas[4] = datas[0];
    buf = this.signatureIteration(datas.slice(3, 5), keys);
    datas[3] = buf[0];
    datas[4] = buf[1];

    datas[0] = datas[4];

    // console.log("datas2:", datas[0].toString(16).padStart(8, '0'), datas[1].toString(16).padStart(8, '0'),
    //     datas[2].toString(16).padStart(8, '0'), datas[3].toString(16).padStart(8, '0'))

    // 更新秘钥
    // console.log("unlock:", unlock)
    // console.log("keys:", keys[0].toString(16).padStart(8, '0'), keys[1].toString(16).padStart(8, '0'),
    //     keys[2].toString(16).padStart(8, '0'), keys[3].toString(16).padStart(8, '0'))
    // console.log("params:", params[0].toString(16).padStart(8, '0'), params[1].toString(16).padStart(8, '0'),
    //     params[2].toString(16).padStart(8, '0'), params[3].toString(16).padStart(8, '0'))
    keys[0] = this.FF(keys[0], datas[0], params[0]) + unlock;
    keys[1] = this.GG(keys[1], datas[1], params[1]) + unlock;
    keys[2] = this.HH(keys[2], datas[2], params[2]) + unlock;
    keys[3] = this.II(keys[3], datas[3], params[3]) + unlock;

    // console.log("keys2:", keys[0].toString(16).padStart(8, '0'), keys[1].toString(16).padStart(8, '0'),
    //     keys[2].toString(16).padStart(8, '0'), keys[3].toString(16).padStart(8, '0'))

    // 第二次滚动迭代
    buf = this.signatureIteration(datas.slice(0, 2), keys);
    datas[0] = buf[0];
    datas[1] = buf[1];

    buf = this.signatureIteration(datas.slice(1, 3), keys);
    datas[1] = buf[0];
    datas[2] = buf[1];

    buf = this.signatureIteration(datas.slice(2, 4), keys);
    datas[2] = buf[0];
    datas[3] = buf[1];

    datas[4] = datas[0];
    buf = this.signatureIteration(datas.slice(3, 5), keys);
    datas[3] = buf[0];
    datas[4] = buf[1];

    datas[0] = datas[4];

    // console.log("datas3:", datas[0].toString(16).padStart(8, '0'), datas[1].toString(16).padStart(8, '0'),
    //     datas[2].toString(16).padStart(8, '0'), datas[3].toString(16).padStart(8, '0'))

    // 输出
    let SIGN = [];
    SIGN = SIGN.concat(this.convertByte(datas[0]));
    SIGN = SIGN.concat(this.convertByte(datas[1]));
    SIGN = SIGN.concat(this.convertByte(datas[2]));
    SIGN = SIGN.concat(this.convertByte(datas[3]));

    // console.log("SIGN:", SIGN[0].toString(16).padStart(8, '0'), SIGN[1].toString(16).padStart(8, '0'),
    //     SIGN[2].toString(16).padStart(8, '0'), SIGN[3].toString(16).padStart(8, '0'))

    return SIGN;
  },

  log(type, info) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    const formattedTime = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${milliseconds}]`;

    let logType = '';
    let cssStyle = '';

    switch (type) {
      case 0:
        logType = 'INFO';
        cssStyle = 'color: blue;';
        break;
      case 1:
        logType = 'SUCCESS';
        cssStyle = 'color: green;';
        break;
      case 2:
        logType = 'WARNING';
        cssStyle = 'color: orange;';
        break;
      case 3:
        logType = 'ERROR';
        cssStyle = 'color: red; font-weight: bold;';
        break;
      default:
        logType = 'LOG';
        cssStyle = '';
        break;
    }

    console.log(`%c${formattedTime} [${logType}] ${info}`, cssStyle);
  },

  crc16(fw) {
    const code = new Uint8Array(512);
    let wCRCin = 0x0000;
    const fwSize = fw.length;
    const blockSize = 512;

    console.log(`CRC fw_size: ${fwSize} ${Math.floor(fwSize / 1024)}KB`);

    for (let pos = 0; pos < fwSize; pos += blockSize) {
      let len = fwSize - pos;
      if (len > blockSize) len = blockSize;

      // 获取代码块（模拟 get_fw 函数的效果）
      code.set(fw.slice(pos, pos + len));

      // 计算 CRC
      wCRCin = this.crc16CCITTIteration(wCRCin, code, len);
    }

    return wCRCin;
  },

  crc16CCITTIteration(wCRCin, data, datalen) {
    const wCPoly = 0x8408;

    for (let i = 0; i < datalen; i++) {
      wCRCin ^= data[i];
      for (let j = 0; j < 8; j++) {
        if (wCRCin & 0x01) {
          wCRCin = (wCRCin >> 1) ^ wCPoly;
        } else {
          wCRCin >>= 1;
        }
      }
    }

    return wCRCin;
  },

  padFirmwareDataTo512(firmwareData) {
    const blockSize = 512;
    const currentLength = firmwareData.length;

    // 计算需要补齐的字节数
    const remainder = currentLength % blockSize;
    const paddingLength = remainder === 0 ? 0 : blockSize - remainder;

    // 如果已经是512字节对齐，则不需要补齐
    if (paddingLength === 0) {
      return firmwareData;
    }

    // 创建一个新的 Uint8Array，长度为当前长度加上需要补齐的字节数
    const paddedData = new Uint8Array(currentLength + paddingLength);

    // 复制原始数据到新的数组中
    paddedData.set(firmwareData);

    // 将剩余的字节用 0xff 填充
    for (let i = currentLength; i < paddedData.length; i++) {
      paddedData[i] = 0xff;
    }

    return paddedData;
  },

  compareVersion(keyboardVersion, latestVersion) {
    // 检查键盘版本格式是 Boot 还是 App
    // 返回值说明 0：当前为最新版本 1：有最新版本 2：Boot模式
    if (keyboardVersion.startsWith('Boot')) {
      return 2; // Boot 格式下，后台获取的版本永远是最新的
    }
    if (keyboardVersion.startsWith('App')) {
      // 提取 App 版本号
      const appVersion = keyboardVersion.split(' ')[1].replace('V', '').slice(0, -1);

      console.log(appVersion);

      // 将版本号转换为数组
      const appVersionParts = appVersion.split('.').map(Number);
      const latestVersionParts = latestVersion.split('.').map(Number);

      console.log(appVersionParts, latestVersionParts);

      // 逐位比较版本号
      for (let i = 0; i < 3; i++) {
        if (appVersionParts[i] > latestVersionParts[i]) {
          return 0; // 当前版本大于最新版本
        }
        if (appVersionParts[i] < latestVersionParts[i]) {
          return 1; // 当前版本小于最新版本
        }
      }
      return 0; // 如果所有部分都相等，则为最新版本
    }
    return 0; // 如果格式不符合预期
  },

  // 比较版本号的辅助函数
  compareVersions(v1, v2) {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      // 假设版本号是三部分组成的
      if (v1Parts[i] > v2Parts[i]) return 1;
      if (v1Parts[i] < v2Parts[i]) return -1;
    }
    return 0;
  },

  // 判断功能是否受支持的函数
  isFeatureSupported(featureId, version) {
    // console.log("isFeatureSupported ", featureId);
    // 定义支持的功能和它们对应的版本范围
    const featureVersionMap = {
      socdV2: [
        { since: '1.0.0', until: '1.0.4' }, // 版本1.0.0-1.1.0支持feature1
        { since: '1.2.0' }, // 版本1.2.0及以上再次支持feature1
      ],
      rs: [
        { since: '1.0.0', until: '1.2.5' }, // 版本1.1.0-1.2.5支持feature2
        { since: '1.3.0' }, // 版本1.3.0及以上支持feature2
      ],
      signalDead: [
        { since: '1.0.1' }, // 版本1.0.1及以上支持feature3
      ],
      signalSwitch: [
        { since: '1.0.2' }, // 版本1.2.0及以上支持feature3
      ],
      advancedKeyV2: [
        { since: '1.0.3' }, // 版本1.2.0及以上支持feature3
      ],
      macroV2: [
        { since: '1.0.4' }, // 版本1.2.0及以上支持feature3
      ],
      socdV3: [{ since: '1.0.5' }],
      topDeadSwitch: [
        { since: '1.0.6' }, // 顶部死区开关
      ],
    };

    // console.log(ProtocolVersion.value);
    const currentVersion = version || '0.0.0'; // 默认为0.0.0如果store.version未定义

    const featureRanges = featureVersionMap[featureId] || [];

    for (const range of featureRanges) {
      const { since } = range;
      const until = range.until || '999.999.999'; // 默认直到无限远的未来

      if (this.compareVersions(currentVersion, since) >= 0 && this.compareVersions(currentVersion, until) <= 0) {
        // console.log(featureId, " ", true);
        return true;
      }
    }

    // console.log(featureId, " ", false);
    return false; // 如果没有匹配的版本范围，则默认不支持
  },

  // 添加更多的方法
};

export default tool;
