//基本信息表BASIC TABLE，17有效字节， 2个check字节。为只读表，上位机不可配置，无法修改；
//地址偏移	    功能	        默认值，示例	    描述
//0-1	        通讯协议版本	0x0103	
//2-7	        6位密码         0x09,
//                             0x00,
//                             0x00,
//                             0x00,
//                             0x00,
//                             0x01,	            后续不同产品，要用密码区分
//8	            工作模式	    0x01	            0:USB    ;1:2.4G; 2:蓝牙.
//9	            连接状态	    0x01	            连接状态 主要是2.4G的连接状态
//10	        电池电量	    0x64	            电量信息以及充电标识；Bit7为1表示充电中，bit6-bit0为实际电量0-100
//11	        板载指示	    0x21	            板载（Profile）高4bit共几个板载，低4bit代表当前的板载
//12	        最大回报率	    0x04	            4表示4档回报率； 7就是7档；4代表最大1K； 7代表最大8K
//                                                  因为4档代表支持 125， 250， 500， 1000；
//                                                  7代表支持 125， 250， 500， 1000， 2000，4000， 8000；
//
//13	        Sensor类型	    0x01	            高2bit代表sensor摆放方向，低6bit为sensor编码
//14-15	        最大dpi值	    0x3075	            最大的DPI  = 30000
//16	        宏空间          0x40	            最大支持多少K空间的宏数据；
//17-18	        校验码	        0xa5                驱动无需理会，设备保存flash 的校验码
//                              0x5a

/**
 * Profile Field
 */
export enum BaseTableEnum {
    ProtoclVer = 0,             // 通讯协议版本
    Passwd = 2,                 // 6位密码
    WorkMode = 8,               // 工作模式 0:USB  1:2.4G 2:蓝牙.
    ConnectStatus24G = 9,       // 连接状态 主要是2.4G的连接状态
    BatLevel = 10,              // 电池电量 电量信息以及充电标识 Bit7为1表示充电中，bit6-bit0为实际电量0-100
    BoardProfile = 11,          // 板载指示 板载（Profile）高4bit共几个板载，低4bit代表当前的板载
    MaxReportRate = 12,         // 最大回报率
    SensorType = 13,            // Sensor类型 高2bit代表sensor摆放方向，低6bit为sensor编码
    MaxDpi = 14,                // 最大dpi值 最大的DPI  = 30000
    MaxMacroCapacity = 16,      // 宏空间 最大支持多少K空间的宏数据
    CheckCode = 17,             // 校验码 驱动无需理会，设备保存flash 的校验码
}

export const BASIC_TABLE_DATA: Uint8Array = new Uint8Array([
    0x01, 0x03,
    0x09, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x01,
    0x01,
    0x64,
    0x21,
    0x04,
    0x01,
    0x30,
    0x75,
    0x40,
    0xa5,
    0x5a]);

export class BasicTable {
    buffer: DataView;

    constructor(data: DataView) {
        this.buffer = data;
    }

    setFieldValue(field: BaseTableEnum, value: number) {
        this.buffer.setUint8(field, value);
    }

    getFieldValue(field: BaseTableEnum) : number {
        return this.buffer.getUint8(field);
    }

    getPwd() : number {
        return this.buffer.getUint32(BaseTableEnum.Passwd) + this.buffer.getUint16(BaseTableEnum.Passwd + 4);
    }

    getMaxDpi() : number {
        return this.buffer.getUint16(BaseTableEnum.MaxDpi);
    }

    static fromReportData(data: DataView) : BasicTable | undefined {
        let table = undefined;
        
        if (data.byteLength == 19) {
            table = new BasicTable(data);
        }

        return table;
    }
}