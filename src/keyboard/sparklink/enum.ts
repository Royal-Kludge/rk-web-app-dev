export enum KeyMatrixLayer {
  FN0 = 0x00,
  FN1 = 0x01,
  FN2 = 0x02,
}

export enum MatrixTable {
  WIN = 0x00,
  MAC = 0x01,
}

export enum RWTypeEnum {
  Read = 0x00,
  Write = 0x01,
}
export enum LightModeEnum {
  Disable = 0,
  Static = 1,
  Dynamics = 2,
  Custom = 3,
}

export enum LightEffectEnum {
  Off = 99,
  M1 = 1,
  M2 = 2,
  M3 = 3,
  M4 = 4,
  M5 = 5,
  M6 = 6,
  M7 = 7,
  M8 = 8,
  M9 = 9,
  M10 = 10,
  M11 = 11,
  M12 = 12,
  M13 = 13,
  M14 = 14,
  M15 = 15,
  M16 = 16,
  M17 = 17,
  M18 = 18,
  M19 = 19,
  M20 = 20,
  Static = 0,
  SelfDefine = 21,
}

export enum DKSActionTypeEnum {
  None = 0,
  OnceClick = 1,
  Holding = 2
}

export enum MagKeyAdvanceTypeEnum {
  DKS = 1,
  MT = 2,
  TGL = 3,
  MPT = 4,
  END = 5,
  SOCD = 6,
  MACRO = 7
}

export enum OrderTypeEnum {
  GetProtoVer = 0x01,  // 获取协议版本
  SaveParam = 0x02,  // 手动保存参数
  ReloadParam = 0x03,  // 重新加载参数
  ClearCalibration = 0x04,  // 清除校准数据
  EnableDKS = 0x05,  // 开启 DKS
  DisableDKS = 0x06,  // 关闭 DKS
  Reverse = 0x07,  // 反向
  EnableRemapping = 0x08,  // 开启重映射
  DisableRemapping = 0x09,  // 关闭重映射
  EnableRelativeTrigger = 0x0A,  // 开启相对触发
  DisableRelativeTrigger = 0x0B,  // 关闭相对触发
  EnableCalibration = 0x0C,  // 开启校准,保留项，s_arg为霍尔电压最大最小变化范围（单位mV）
  DisableCalibration = 0x0D,  // 关闭校准,保留项，s_arg =0表示已退出
  EnableDemo = 0x0E,  // 演示功能打开
  DisableDemo = 0x0F,  // 演示功能关闭
  ClearMacroArea = 0x10,  // 宏参数保存前需调用该指令擦除相应的存储区
  RestoreFactory = 0x11,  // 恢复出厂设置,等待响应超时应 > 200ms
  // query 指令返回 s_arg参数为 1表示查询为真,即所查询的内容被确认为真,其它值为否
  QueryWinLock = 0x20,  // query, 查询锁WIN键
  QueryWinMode = 0x21,  // query, 查询是否为 Win 模式，若回0xFF则表示不存在该模式
  QueryMacMode = 0x22,  // query, 查询是否为 Mac 模式，若回0xFF则表示不存在该模式
  QueryStandMode = 0x23,  // query, 查询是否为 标准 模式
  QueryTravelAdj = 0x24,  // query, 查询是否为 可调行程 模式
  Travel = 0x25,  // 8bit精度+16bit最小行程度+16bit最大行程。以um为单位，如10精度(10um)为0.01mm,50精度(50um)为0.05mm。行程范围0~4000um。
  GetKbName = 0x26, // 读取键盘名字
  GetKbColor = 0x27, // 读取/设置键盘颜色，h_arg / s_arg = 0[black],1[gray]，其他参数：查询配置
  SwitchWin = 0x30,  // switch, 切换到 Win 模式，s_arg =1表示成功
  SwitchMac = 0x31,  // switch, 切换到 Mac 模式，s_arg =1表示成功
  SwitchStand = 0x32,  // switch, 切换到 标准 模式
  SwitchTravelAdj = 0x33,  // switch, 切换到 可调行程 模式
  SwitchDeadZone = 0x34,  // switch,顶部死区开关，h_arg =0表示关闭，h_arg =1表示开启，大于1为查询
  WriteRgbGray1 = 0x40,  // 写入 RGB 灰度 1, h_arg = 0xFF 为无效，s_arg表示返回灰度值
  WriteRgbGray2 = 0x41,  // 写入 RGB 灰度 2
  WriteRgbGray3 = 0x42,  // 写入 RGB 灰度 3
  WriteRgbGray4 = 0x43,  // 写入 RGB 灰度 4
  SetReportRate = 0x50,  // 设置回报率, h_arg / s_arg = 0[8KHz], 1[4KHz], 2[2KHz], 3[1KHz], 4[500Hz], 5[250Hz]，6[125Hz], 无效，只可用于获取当前的回报率
  SetWWW = 0x60,  // 一键打开网址设置，h_arg[n] = 网址字符ascii码，最长50字节
  SwitchProfile = 0x70,  // 切换配置功能，h_arg / s_arg = 0[配置1],1[配置2],2[配置3],3[配置4]，其他参数：查询配置
  QuerySupportAxis = 0x76, // 查询键盘支持的轴体，s_arg = [uint16,uint]
  SwitchKbColor = 0xA0, //切换读取键盘外观颜色，h_arg = 1(白色),2(紫色),3(红色),4(粉色),5(黑色),0xFF(查询)
}

export enum ErrorCodeEnum {
  Invalid = 0xFF, // 命令无效
  FlashAddrOverflow = 0x01, // Flash操作地址溢出
  FlashSizeOverflow = 0x02, // Flash操作大小溢出
  CacheOverflow = 0x03, // 缓存溢出
  ParamError = 0x04, // 参数错误
  SignInvalid = 0x05, // 签名失效
  SignError = 0x06, // 签名错误
  SignDataError = 0x07, // 签名数据错误
  SignStateError = 0x08, // 签名状态错误,没有签名步骤 1 直接进入签名步骤 2将返回该错误
  SignNoOptError = 0x09, // 签名状态错误,没有该操作
  Busy = 0x0A, // 设备忙
  WriteRepetition = 0x0B, // 写重复,在刷写固件时因先擦除后写入,当待写入区域有数据时发送该错误码
  StateError = 0x0C, // 状态错误
  CrcError = 0x0D, // CRC错误
  Success = 0x00, // 无错误，表示指令执行成功
}

export enum RunModeEnum {
  Boot = 0xFF,    // boot mode
  App = 0x00,    // app mode
}

export enum UnlockEnum {
  Invalid = 0x00,   // 无效
  Sign = 0x02,   // 签名
  Clear = 0x03,   // 解锁擦除
  Reboot = 0x04,   // 解锁重启
  Jumper = 0x05,   // 解锁跳转
  Write = 0x06,   // 解锁写操作
  Read = 0x07,   // 解锁读操作
}

export enum MatrixDataEnum {
  Travel = 0x02, // ADC 数据,Hall 行程实时数据，16bit数据
  Pressed = 0x03, // 按键按下状态，8bit数据
  AdcChangeData = 0x04, // ADC变化数据，16bit数据
  AdcOriData = 0x06, // ADC 原始数据，16bit数据
  AdcMinValue = 0x07, // ADC 最小值，16bit数据
  AdcMaxValue = 0x08, // ADC 最大值，16bit数据
}

export enum LayoutTypeEnum {
  FN0 = 0x00,   // FN0 层
  FN1 = 0x01,   // FN1 层
  FN2 = 0x02,   // FN2 层
  FN3 = 0x03,   // FN3 层
  DB0 = 0x04,   // DB0 层,行程值1（0x01~0xFA0）
  DB1 = 0x05,   // DB1 层,行程值2（0x01~0xFA0）
  DB2 = 0x06,   // DB2 层,行程值3（0x01~0xFA0）
  DB3 = 0x07,   // DB3 层,行程值4（0x01~0xFA0）
  MODE = 0x08,   // MODE 层，按键工作模式,如把A键设置为TGL或宏定义功能。
  DKS1 = 0x09,   // DKS1 层,按键值1
  DKS2 = 0x0A,   // DKS2 层,按键值2
  DKS3 = 0x0B,   // DKS3 层,按键值3
  DKS4 = 0x0C,   // DKS4 层,按键值4
  TRPS1 = 0x0D,   // TRPS1 层,DKS 模式触发点使能1
  TRPS2 = 0x0E,   // TRPS2 层,DKS 模式触发点使能2
  TRPS3 = 0x0F,   // TRPS3 层,DKS 模式触发点使能3
  TRPS4 = 0x10,   // TRPS4 层,DKS 模式触发点使能4
  MacroAddr = 0x11,   // Macro addr, 复制宏数据
  MacroLong = 0x12,   // Macro long，保存宏数据至flash
  MT_TGL_Delay = 0x13,   // MT/TGL 延时参数
  RT_PressTravel = 0x14,   // RT按下行程
  RT_ReleaseTravel = 0x15,   // RT释放行程
  PressDeadZone = 0x16,   // 按下死区
  ReleaseDeadZone = 0x17,   // 抬起死区
  KeyReleaseTravel = 0x18,   // 单键释放行程
  KeyAxis = 0x19,   // 单键轴体
  MacroInterrupt = 0x1A,   // 宏中断标志，重复次数
  MacroRepeat = 0x1B,   // 宏重复次数
}

export enum KeyTouchModeEnum {
  GlobalMode = 0x00,
  SingleMode = 0x01,
  QuickMode = 0x02
}

export enum LightSwitchEnum {
  On = 0x01,
  Off = 0x00
}

export enum LightDirectionEnum {
  Forward = 0x02,
  Reverse = 0x00
}

export enum SuperResponseEnum {
  On = 0x10,
  Off = 0x00
}

export enum AdvKeyTypeEnum {
  DKS = 0x01,
  MPT = 0x02,
  MT = 0x03,
  TGL = 0x04,
  END = 0x05,
  MACRO = 0x06,
  SOCD = 0x08,
  RS = 0x09
}

export enum KeyMappingType {
  KeyBoard = 0,
  Consumer = 1,
  GameControls = 2,
  SportControls = 3,
  VRControls = 4,
  GenericDesktop = 5,
  MultiAndMix = 6,
  Mouse = 7,
  SparkLinkKbFun = 15,
}