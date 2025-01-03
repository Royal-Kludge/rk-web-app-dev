/********************************************************************************
    Copyright (C) 2021, SINO WEALTH ELECTRONIC LTD. All Rights Reserved.
    The information contained herein is property of SINO WEALTH ELECTRONIC LTD..
    Licensees are granted free, non-transferable use of the information. NO
    WARRANTY of ANY KIND is provided. This heading must NOT be removed from
    the file.
 ********************************************************************************
 * File Name     : key_decode.h
 * Author        : Rocky
 * Date          : 2021-09-07
 * Description   : .C file function description
 * Version       : 1.0
 * Function List :
 *
 * Record        :
 * 1.Date        : 2021-09-07
 *   Author      : Rocky
 *   Modification: Created file

*************************************************************************************************************/

#ifndef _KEY_DECODE_H
#define _KEY_DECODE_H
/////////////////////////normal key decode///////////////////////////////////////////
//=============================================================
#define MAKE_U32KEY(type, kid_H, kid_M, kid_L)   /*kid ~key id  */  \
    (   \
        ((unsigned long)(type) <<24) + \
        ((unsigned long)(kid_H)<<16) + \
        ((unsigned long)(kid_M)<<8)  + \
        ((unsigned long)(kid_L)<<0)    \
    )


//=============================================================
typedef enum {
    KEYTYPE_NORMAL      = 0x00,         //�?盘按�?
    KEYTYPE_MOUSE       = 0x01,         //鼠标按键
    KEYTYPE_CONSUMER    = 0x02,         //多媒体键
    KEYTYPE_MACRO       = 0x03,         //宏按�?
    KEYTYPE_USER        = 0x04,         //�?定义�?
    KEYTYPE_DPI         = 0x05,         //DPI �?
    KEYTYPE_CFG_ALT     = 0x06,         //配置切换�?
    KEYTYPE_SPECIAL     = 0x07,         //特殊功能
    KEYTYPE_LED         = 0x08,         //�?�? �?�? 速度 切换�?
    KEYTYPE_ReportRate  = 0x09,         //回报率切换键
    KEYTYPE_SHOOTING    = 0x0A,         //狙击�?
    KEYTYPE_PUSH_GUN    = 0x0B,         //压枪�?
    KEYTYPE_EXIT_GUN    = 0x0C,         //退出压�?�?
    KEYTYPE_FN          = 0x0d,         //FN �?
    KEYTYPE_MATRIX      = 0x0E,         //矩阵切换�?
    KEYTYPE_LOD         = 0x0F,         //LOD�?    // MOUSE sensor;
    KEYTYPE_ACPI        = 0x10,         //POWER CTRL
} keycode_type_t;


//#define   KEY_Fn                    0xFF    //FN�?


/////////////////////////normal key decode///////////////////////////////////////////

#define   KEY_A                         0x04   //8
#define   KEY_B                         0x05   //9
#define   KEY_C                         0x06   //c
#define   KEY_D                         0x07   //e
#define   KEY_E                         0x08
#define   KEY_F                         0x09
#define   KEY_G                         0x0a
#define   KEY_H                         0x0b
#define   KEY_I                         0x0c
#define   KEY_J                         0x0d
#define   KEY_K                         0x0e
#define   KEY_L                         0x0f
#define   KEY_M                         0x10
#define   KEY_N                         0x11
#define   KEY_O                         0x12
#define   KEY_P                         0x13
#define   KEY_Q                         0x14
#define   KEY_R                         0x15
#define   KEY_S                         0x16
#define   KEY_T                         0x17
#define   KEY_U                         0x18
#define   KEY_V                         0x19
#define   KEY_W                         0x1a
#define   KEY_X                         0x1b
#define   KEY_Y                         0x1c
#define   KEY_Z                         0x1d
//
#define   KEY_1                         0x1e
#define   KEY_2                         0x1f
#define   KEY_3                         0x20
#define   KEY_4                         0x21
#define   KEY_5                         0x22
#define   KEY_6                         0x23
#define   KEY_7                         0x24
#define   KEY_8                         0x25
#define   KEY_9                         0x26
#define   KEY_0                         0x27
//---------------------------------------------

#define   KEY_ENTER                     0x28
#define   KEY_ESC                       0x29
#define   KEY_Backspace                 0x2a
#define   KEY_TAB                       0x2b
#define   KEY_SPACEBAR                  0x2c
#define   KEY_Underscore                0x2d   //xia hua xian
#define   KEY_EqualSign                 0x2e   //deng hao
#define   KEY_L_Brackets                0x2f   //zuo zhong kuo hao
#define   KEY_R_Brackets                0x30   //you zhong kuo hao
#define   KEY_Slash                     0x31   //xie gang      //shu xian

#define   KEY_Semicolon                 0x33   //fen hao
#define   KEY_Quotation                 0x34   //yin hao
#define   KEY_TILDE                     0x35   //bo lang
#define   KEY_COMMA                     0x36   //dou hao
#define   KEY_PERIOD                    0x37   //ju hao

#define   KEY_Interrogation             0x38   //dun hao
#define   KEY_CAPSLOCK                  0x39

//////////////////////////////




//--------------------------------------
#define   KEY_F1                        0x3a
#define   KEY_F2                        0x3b
#define   KEY_F3                        0x3c
#define   KEY_F4                        0x3d
#define   KEY_F5                        0x3e
#define   KEY_F6                        0x3f
#define   KEY_F7                        0x40
#define   KEY_F8                        0x41
#define   KEY_F9                        0x42
#define   KEY_F10                       0x43
#define   KEY_F11                       0x44
#define   KEY_F12                       0x45
//
#define   KEY_F13                       0x68
#define   KEY_F14                       0x69
#define   KEY_F15                       0x6A





#define   KEY_PRINT                     0x46
#define   KEY_SCRLOCK                   0x47
#define   KEY_PAUSE                     0x48
#define   KEY_INS                       0x49
#define   KEY_HOME                      0x4a
#define   KEY_PGUP                      0x4b
#define   KEY_DEL                       0x4c
#define   KEY_END                       0x4d
#define   KEY_PGDN                      0x4e
//-------------------------------------------

#define   KEY_RightArrow                0x4f
#define   KEY_LeftArrow                 0x50
#define   KEY_DownArrow                 0x51
#define   KEY_UpArrow                   0x52

//-------------------------------------------
#define   KEY_NUMLOCK                   0x53
#define   KEY_NUM_DIV                   0x54
#define   KEY_NUM_MUL                   0x55
#define   KEY_NUM_MINUS                 0x56
#define   KEY_NUM_PLUS                  0x57
#define   KEY_NUM_ENTER                 0x58
#define   KEY_NUM_DOT                   0x63


//-------------------------------------------
#define   KEY_NUM_1                     0x59
#define   KEY_NUM_2                     0x5a
#define   KEY_NUM_3                     0x5b
#define   KEY_NUM_4                     0x5c
#define   KEY_NUM_5                     0x5d
#define   KEY_NUM_6                     0x5e
#define   KEY_NUM_7                     0x5f
#define   KEY_NUM_8                     0x60
#define   KEY_NUM_9                     0x61
#define   KEY_NUM_0                     0x62
//-------------------------------------------
/////////////////////////////////////////////////////////////////////////
#define   KEY_CODE29                    0x31
#define   KEY_CODE42                    0x32
#define   KEY_CODE45                    0x64
#define   KEY_APP                       0x65
#define   KEY_CODE107                   0x85
#define   KEY_CODE56                    0x87
#define   KEY_CODE133                   0x88
#define   KEY_CODE14                    0x89
#define   KEY_CODE132                   0x8a
#define   KEY_CODE131                   0x8b
#define   KEY_CODE151                   0x90   //key_Hangul
#define   KEY_CODE150                   0x91   //Key_Hanja

//****************************************************************

typedef enum {
    KID_L_CTRL         = 0x01,
    KID_L_SHIFT        = 0x02,
    KID_L_ALT          = 0x04,
    KID_L_WIN          = 0x08,
    KID_R_CTRL         = 0x10,
    KID_R_SHIFT        = 0x20,
    KID_R_ALT          = 0x40,
    KID_R_WIN          = 0x80,
} kid_modifykey_t;

//Modify key
//#define   KEY_L_CTRL                      0x060000e0
//#define   KEY_L_SHIFT                     0x060000e1
//#define   KEY_L_ALT                       0x060000e2
//#define   KEY_L_WIN                       0x060000e3
//#define   KEY_R_CTRL                      0x060000e4
//#define   KEY_R_SHIFT                     0x060000e5
//#define   KEY_R_ALT                       0x060000e6
//#define   KEY_R_WIN                       0x060000e7
#define   KEY_L_CTRL                    MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_CTRL , 0, 0)      //0x00010000    //e0
#define   KEY_L_SHIFT                   MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_SHIFT, 0, 0)      //0x00020000    //e1
#define   KEY_L_ALT                     MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_ALT  , 0, 0)      //0x00040000    //e2
#define   KEY_L_WIN                     MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_WIN  , 0, 0)      //0x00080000    //e3
#define   KEY_R_CTRL                    MAKE_U32KEY(KEYTYPE_NORMAL, KID_R_CTRL , 0, 0)      //0x00100000    //e4
#define   KEY_R_SHIFT                   MAKE_U32KEY(KEYTYPE_NORMAL, KID_R_SHIFT, 0, 0)      //0x00200000    //e5
#define   KEY_R_ALT                     MAKE_U32KEY(KEYTYPE_NORMAL, KID_R_ALT  , 0, 0)      //0x00400000    //e6
#define   KEY_R_WIN                     MAKE_U32KEY(KEYTYPE_NORMAL, KID_R_WIN  , 0, 0)      //0x00800000    //e7

//****************************************************************
//****************************************************************
//macro�?的mouse key定义
#define   MOUSE_L                       0x01
#define   MOUSE_R                       0x02
#define   MOUSE_M                       0x04
#define   MOUSE_B4                      0x08
#define   MOUSE_B5                      0x10
#define   MOUSE_LT                      0xff
#define   MOUSE_RT                      0x01
#define   MOUSE_UP                      0xff
#define   MOUSE_DN                      0x01

//****************************************************************
//组合�?功能
#define   KEY_CTRL_C                    0x00010400 | KEY_C
#define   KEY_CTRL_V                    0x00010000 | KEY_V
//#define   KEY_O_L                     KEY_O | KEY_L

#define   KEY_L_ALT__TAB                MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_ALT, 0, KEY_TAB)
#define   KEY_L_ALT__ESC                MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_ALT, 0, KEY_ESC)

#define   KEY_L_WIN__TAB                MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_WIN, 0, KEY_TAB)
#define   KEY_L_WIN__E                  MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_WIN, 0, KEY_E)
#define   KEY_L_WIN__H                  MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_WIN, 0, KEY_H)

#define   KEY_L_WIN_SPACE               MAKE_U32KEY(KEYTYPE_NORMAL, KID_L_WIN, 0, KEY_SPACEBAR)

#define   KEY_L_WIN_SHIFT_4             MAKE_U32KEY(KEYTYPE_NORMAL, (KID_L_WIN |KID_L_SHIFT), 0, KEY_4)     //�?屏COMMAND+Shift+4
#define   KEY_L_WIN_SHIFT_S             MAKE_U32KEY(KEYTYPE_NORMAL, (KID_L_WIN |KID_L_SHIFT), 0, KEY_S)     //�?屏Win+Shift+S

#define   KEY_CTRL_Up                   0x00010052
#define   KEY_WIN_D                     0x00010007
//****************************************************************
//****************************************************************
//BYTE1:
//1左键�?2右键�?3�?�?�?4前进�?�?5后退�?�?6左摆�?7右摆�?8上滚�?�?9下滚�?�?
//10x轴左�?11X轴右�?12Y轴上�?13Y轴下
typedef enum {
    KID_MS_BUTTON_L         = 0x01,
    KID_MS_BUTTON_R         = 0x02,
    KID_MS_BUTTON_M         = 0x03,
    KID_MS_BUTTON_NEXT      = 0x04,
    KID_MS_BUTTON_PREV      = 0x05,
    KID_MS_BUTTON_TL        = 0x06,
    KID_MS_BUTTON_TR        = 0x07,
    
    KID_MS_SCROLL_UP        = 0x08,
    KID_MS_SCROLL_DN        = 0x09,
    //
    KID_MS_COORD_X_L        = 0x0A,
    KID_MS_COORD_X_R        = 0x0B,
    KID_MS_COORD_Y_L        = 0x0C,
    KID_MS_COORD_Y_R        = 0x0D,
} kid_ms_code_t;            //鼠标�?�?

//BYTE2:0xff�?力键�?0单击一次（按下发按下码，释放发释放码）�?1双击�?2三连�?
typedef enum {
    KID_MS_CLICK_1        = 0,          //0单击
    KID_MS_CLICK_2        = 1,          //1双击
    KID_MS_CLICK_3        = 2,          //2三连�?
    //
    KID_MS_CLICK_CONTINUE = 0xff,       //0xff�?力键
    
} kid_ms_click_times_t;

//BYTE3:击打重�?�时间，0默�?�间隔时�?
/*  typedef enum {
} kid_ms_click_latency_t;       */

//Mouse key
#define   KEY_L_BUTTON                   MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_L,    KID_MS_CLICK_2, 0x00)   //0x01010100
#define   KEY_R_BUTTON                   MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_R,    KID_MS_CLICK_2, 0x00)   //0x01020100
#define   KEY_M_BUTTON                   MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_M,    KID_MS_CLICK_2, 0x00)   //0x01030100
#define   KEY_RB0_BUTTON                 MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_NEXT, KID_MS_CLICK_2, 0x00)   //0x01040100
#define   KEY_RB1_BUTTON                 MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_PREV, KID_MS_CLICK_2, 0x00)   //0x01050100
#define   KEY_TL_BUTTON                  MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_TL  , KID_MS_CLICK_2, 0x00)   //0x01060100
#define   KEY_TR_BUTTON                  MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_BUTTON_TR  , KID_MS_CLICK_2, 0x00)   //0x01070100
#define   KEY_SCROLLUP_BUTTON            MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_SCROLL_UP,   KID_MS_CLICK_2, 0x00)   //0x01080100
#define   KEY_SCROLLDN_BUTTON            MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_SCROLL_DN,   KID_MS_CLICK_2, 0x00)   //0x01090100
//
#define   KEY_MS_X_L                     MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_COORD_X_L,   0x00, 0x00)              //0x010A0000
#define   KEY_MS_X_R                     MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_COORD_X_R,   0x00, 0x00)              //0x010B0000
#define   KEY_MS_Y_L                     MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_COORD_Y_L,   0x00, 0x00)              //0x010C0000
#define   KEY_MS_Y_R                     MAKE_U32KEY(KEYTYPE_MOUSE, KID_MS_COORD_Y_R,   0x00, 0x00)              //0x010D0000
//****************************************************************
//多媒体键
#define   KEY_SysBkBrigth_I             MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0x6F)       //0x0200006f    //屏幕�?�?+
#define   KEY_SysBkBrigth_D             MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0x70)       //0x02000070    //屏幕�?�?-
#define   KEY_IOSBack                   MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0x40)       //0x02000040    //F7


#define   KEY_NextTr                    MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xb5)       //0x020000b5    //0xE8
#define   KEY_PrevTr                    MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xb6)       //0x020000b6    //0xE9
#define   KEY_Stop                      MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xb7)       //0x020000b7    //0xEA
#define   KEY_Eject                     MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xb8)       //0x020000b8    //0xEB
#define   KEY_PlayPause                 MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xcd)       //0x020000cd    //0xEC
#define   KEY_Mute                      MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xE2)       //0x020000E2    //0xED
#define   KEY_VolumI                    MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xe9)       //0x020000e9    //0xEE  //+
#define   KEY_VolumD                    MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x00,0xea)       //0x020000ea    //0xEF  //-

#define   KEY_Media                     MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x01,0x83)       //0x02000183    //F0
#define   KEY_Email                     MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x01,0x8a)       //0x0200018a    //F1
#define   KEY_Calculator                MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x01,0x92)       //0x02000192    //F2
#define   KEY_MyComputer                MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x01,0x94)       //0x02000194    //F3
#define   KEY_Search                    MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x21)       //0x02000221    //F4
#define   KEY_WWW                       MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x23)       //0x02000223    //F5
#define   KEY_Back                      MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x24)       //0x02000224    //F6
#define   KEY_Forward                   MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x25)       //0x02000225    //F7

#define   KEY_iStop                     MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x26)       //0x02000226
#define   KEY_Refresh                   MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x27)       //0x02000227
#define   KEY_Favorites                 MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x2a)       //0x0200022a

#define   KEY_SIR   					0x020000CF
#define   MAC_F3   					    0x0200029F
#define   MAC_F4   					    0x020002A0

#define   KEY_OpenTaskCtrl              MAKE_U32KEY(KEYTYPE_CONSUMER,0,0x02,0x9F)       //0x0200029f    //Open task control //开放任务控�?

//****************************************************************
//byte3�?0x03表示是macro；byte2，用来表示macro的循�?方式；byte1：循�?次数  byte0：用来表示macro序号
//byte2：暂时定义�?�下
//0x01  指定�?�?次数�?0x02�?�?到任意键按下�?0x03�?�?到当前键松开
//Macro Key

typedef enum {
    KID_MacroLoop_TimesFix      = 1,
    KID_MacroLoop_KeyMake       = 2,
    KID_MacroLoop_KeyBreak      = 4,
} kid_macro_loop_type_t;
#define   KEY_MACRO0                    MAKE_U32KEY(KEYTYPE_MACRO,0,0,0x00)         //0x03000000
#define   KEY_MACRO1                    MAKE_U32KEY(KEYTYPE_MACRO,0,0,0x01)         //0x03000001
//****************************************************************
//通过冒泡�?口发送自定义的键值，用于驱动特殊功能处理（例：打开固定的链接）
//�?定义�?
#define   KEY_Define1                   MAKE_U32KEY(KEYTYPE_USER,0,0,0x01)          //0x04000001
#define   KEY_Define2                   MAKE_U32KEY(KEYTYPE_USER,0,0,0x02)          //0x04000002
//****************************************************************
//此功能后�?会不�?更新，后�?3byte进�?�累计区分�?
//如：byte0�?
/*=0 取反wasd于方向�?=1 win开关锁�?=2 开关全�?盘�? =3 按键宏录制启动�?
=4 整键盘�?�位�?=5 蓝牙模式0�?=6 蓝牙模式1�?=7 蓝牙模式2�?=8  2.4G模式�?=9 USB模式�?=10 无线进入测试 */

typedef enum {
    KID_SP_SWAP_ASDW        = 0x00,
    KID_SP_WIN_LOCK         = 0x01,
    KID_SP_AllKeyLock       = 0x02,
    KID_SP_MacroRec_EN      = 0x03,
    KID_SP_ProfileReset     = 0x04,
    
    KID_SP_DEV_BT0          = 0x05,
    KID_SP_DEV_BT1          = 0x06,
    KID_SP_DEV_BT2          = 0x07,
    KID_SP_DEV_2G4          = 0x08,
    KID_SP_DEV_USB          = 0x09,
    
    KID_SP_TEST_EMI         = 0x0a,
    KID_SP_KB_Mode          = 0x15,
    
    KID_SP_Screen_Left      = 0x0B,
    KID_SP_Screen_Right     = 0x0C,
    
    KID_SP_Windows_Mode     = 0x20,
    KID_SP_Mac_Mode         = 0x21,
    KID_SP_Android_Mode     = 0x22,
    KID_SP_IOS_Mode         = 0x23,
    
    KID_SP_O_Mode           = 0x12,
    KID_SP_L_OFF            = 0x0F,
    KID_SP_LED_OFF          = 0x13,
    
    KID_SP_BATT_IND_ENTER   = 0x30,
    KID_SP_BATT_IND_EXIT    = 0x31,
    
} kid_sp_type_t;
//特殊功能�?
#define   SP_SWAP_ASDW                  MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_SWAP_ASDW)       //0x07000000    //取反ASWD与方�?
#define   SP_Winlock                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_WIN_LOCK)        //0x07000001    //WIN Lock
#define   SP_Allkeylock                 MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_AllKeyLock)      //0x07000002    //所有键锁住
#define   SP_MACRO_REC0                 MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_MacroRec_EN)     //0x07000003    //MACRO录制�?
#define   SP_ProfileReset               MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_ProfileReset)    //0x07000004    //所有参数恢复默�?

#define   SP_DEV_BT0                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_DEV_BT0)         //0x07000005    //蓝牙模式0
#define   SP_DEV_BT1                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_DEV_BT1)         //0x07000006    //蓝牙模式1
#define   SP_DEV_BT2                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_DEV_BT2)         //0x07000007    //蓝牙模式2
#define   SP_DEV_2G4                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_DEV_2G4)         //0x07000008    //2.4G模式
#define   SP_DEV_USB                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_DEV_USB)         //0x07000009    //USB模式

#define   SP_TEST_EMI                   MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_TEST_EMI)        //0x0700000a    //无线进入测试
#define   SP_KB_Mode                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_KB_Mode)         //0x07000015    //无线进入测试
#define   SP_Screen_Left                MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_Screen_Left)     //0x0700000B    //screen left
#define   SP_Screen_Right               MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_Screen_Right)    //0x0700000C    //screen right

#define   SP_Windows_Mode               MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_Windows_Mode)    //0x07000020    //进入Windows
#define   SP_Mac_Mode                   MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_Mac_Mode)        //0x07000021    //进入Mac
#define   SP_Android_Mode               MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_Android_Mode)    //0x07000021    //进入android
#define   SP_IOS_Mode                   MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_IOS_Mode)        //0x07000021    //进入IOS

#define   SP_O_Mode                     MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_O_Mode)          //0x07000012    //组合�?白光定义
#define   SP_L_Mode                     MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_L_OFF)           //0x0700000F    //组合�?白光定义
#define   SP_LED_OFF                    MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_LED_OFF)         //0x07000013    

#define   SP_BATT_IND_ENTER             MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_BATT_IND_ENTER)  //0x07000030    //切换电量指示或充电灯�? 入口 
#define   SP_BATT_IND_EXIT              MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,KID_SP_BATT_IND_EXIT)   //0x07000030    //切换电量指示或充电灯�? 退�?

#define   SP_SYS_POWER_DOWN             MAKE_U32KEY(KEYTYPE_SPECIAL,0,0,0xff)  //0x07000030    //for-test
//****************************************************************
//byte0：固�?0x08
//byte1�?0�?效切�?�?1�?效方向，2颜色切换�?3�?度切�?�?4速度切换�?5�?动游戏高手录制，6游戏高手保存�?7录制/保存�?8复位�?9�?效模式指�?
//byte2�?0�?�?�?1+/左，2-/右，如果byte1�?9，具体数字值代表当前模�?
//byte3�?0主键区，1附灯1�?2附灯2


typedef enum {
    KID_ledeffect_chg       = 0x00,         //0x00Ϊ��Ч�л�
    KID_ledeffect_dir       = 0x01,         //0x01 Ϊ��Ч����
    KID_ledcolor_chg        = 0x02,         //0x02Ϊ��ɫ�л�
    KID_ledbright_chg       = 0x03,         //0x03Ϊ�����л�
    KID_ledspeed_chg        = 0x04,         //0x04Ϊ�ٶ��л�
    KID_gameRecord_start    = 0x05,         //0x05 ������Ϸ����¼��
    KID_macro_save          = 0x06,         //0x06 ����
    KID_macroRecord_save    = 0x07,         //0x07¼��/����
    KID_reset               = 0x08,         //0x08Ϊ��λ
    KID_ledeffect_set       = 0x09,         //0x09 ��Чģʽָ��
    //
    KID_factory_reset       = 0xff,         //0x
} kid_led_type_t;

typedef enum {
    KID_led_loop            = 0x00,         //0x00  �?�?
    KID_led_inc             = 0x01,         //0x01  +
    KID_led_left            = 0x01,         //0x01  �?
    KID_led_dec             = 0x02,         //0x02  -
    KID_led_right           = 0x02,         //0x02  �?
    //
    KID_led_def_L           = 0x03,        //0x03 define�?�?  //LOOP
    KID_led_def_I           = 0x04,        //0x04 define +  //INC
    KID_led_def_D           = 0x05,        //0x05 define -  //DEC
} kid_led_dir_t;

typedef enum {
    KID_led_main            = 0x00,         //0x00为主�?区灯�?
    KID_led_logo            = 0x01,         //0x01为附�?1�?�?
    KID_led_side            = 0x02,         //0x02为附�?２灯�?
} kid_led_dev_t;


#define   MAXLEDMODE1                   (17)              //0~11
#define   MAXLEDMODE2                   (36)              //0~9    

//�?光模式�?�定
#define   KEY_mainEffect_0    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x00, KID_led_main)   //0x08090000    //直接设定为模�?0
#define   KEY_mainEffect_1    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x01, KID_led_main)   //0x08090100    //直接设定为模�?1
#define   KEY_mainEffect_2    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x02, KID_led_main)   //0x08090200    //直接设定为模�?2
#define   KEY_mainEffect_3    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x03, KID_led_main)   //0x08090300    //直接设定为模�?3

#define   KEY_mainEffect_4    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x04, KID_led_main)
#define   KEY_mainEffect_5    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x05, KID_led_main)
#define   KEY_mainEffect_6    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x06, KID_led_main)
#define   KEY_mainEffect_7    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x07, KID_led_main)

#define   KEY_mainEffect_8    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x08, KID_led_main)
#define   KEY_mainEffect_9    MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x09, KID_led_main)
#define   KEY_mainEffect_10   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0a, KID_led_main)
#define   KEY_mainEffect_11   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0b, KID_led_main)


#define   KEY_mainEffect_12   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0c, KID_led_main)
#define   KEY_mainEffect_13   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0d, KID_led_main)
#define   KEY_mainEffect_14   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0e, KID_led_main)
#define   KEY_mainEffect_15   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x0f, KID_led_main)


#define   KEY_mainEffect_17   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x10, KID_led_main)
#define   KEY_mainEffect_18   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x11, KID_led_main)
#define   KEY_mainEffect_19   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x12, KID_led_main)
#define   KEY_mainEffect_20   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x13, KID_led_main)

#define   KEY_mainEffect_21   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x21, KID_led_main)             //0x08092100    //直接设定为模�?21
#define   KEY_mainEffect_22   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 0x22, KID_led_main)             //0x08092200    //直接设定为模�?22
#define   KEY_mainEffect_31   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 31, KID_led_main)             //0x08092100    //直接设定为模�?21
#define   KEY_mainEffect_32   MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_set, 32, KID_led_main)  
//--------------------------------------
#define   KEY_mainEffect_default         KEY_mainEffect_3

//--------------------------------------
//��Чģʽ�л�
#define   KEY_mainEffect_L      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_loop, KID_led_main)     //0x08000000    //直接设定为模�?+
#define   KEY_mainEffect_I      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_inc,  KID_led_main)     //0x08000100    //直接设定为模�?-
#define   KEY_mainEffect_D      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_dec,  KID_led_main)     //0x08000200    //直接设定为模式LOOP

#define   KEY_logoEffect_L      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_loop, KID_led_logo)     //0x08000101    //直接设定为模�?+
#define   KEY_logoEffect_I      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_inc,  KID_led_logo)     //0x08000201    //直接设定为模�?-
#define   KEY_logoEffect_D      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_dec,  KID_led_logo)     //0x08000001    //直接设定为模式LOOP

#define   KEY_sideEffect_L      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_loop, KID_led_side)     //0x08000102    //直接设定为模�?+
#define   KEY_sideEffect_I      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_inc,  KID_led_side)     //0x08000202    //直接设定为模�?-
#define   KEY_sideEffect_D      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_dec,  KID_led_side)     //0x08000002    //直接设定为模式LOOP


#define   KEY_UserEffect_L      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_def_L, KID_led_main)    //0x08000300   //直接设定为模�?+        //�?定义 led�?�?
#define   KEY_UserEffect_I      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_def_I  KID_led_main)    //0x08000400   //直接设定为模�?-
#define   KEY_UserEffect_D      MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_chg, KID_led_def_D  KID_led_main)    //0x08000500   //直接设定为模式LOOP


//�?光方向�?�定
#define   KEY_led_direction_L           MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_dir, KID_led_loop, KID_led_main)     //0x08010000    //�?效方向LOOP
#define   KEY_led_direction_I           MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_dir, KID_led_left, KID_led_main)     //0x08010100    //�?效方向左
#define   KEY_led_direction_D           MAKE_U32KEY(KEYTYPE_LED, KID_ledeffect_dir, KID_led_right,KID_led_main)     //0x08010200    //�?效方向右

#define   MAXLEDCOLORMODE               0x07
//�?光�?�色设定
#define   KEY_mainColor_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_loop, KID_led_main)      //0x08020000    //直接设定为�?�色LOOP
#define   KEY_mainColor_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_inc,  KID_led_main)      //0x08020100    //直接设定为�?�色+
#define   KEY_mainColor_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_dec,  KID_led_main)      //0x08020200    //直接设定为�?�色-

#define   KEY_logoColor_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_loop, KID_led_logo)      //0x08020001    //直接设定为�?�色LOOP
#define   KEY_logoColor_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_inc,  KID_led_logo)      //0x08020101    //直接设定为�?�色+
#define   KEY_logoColor_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_dec,  KID_led_logo)      //0x08020201    //直接设定为�?�色-

#define   KEY_sideColor_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_loop, KID_led_side)      //0x08020002    //直接设定为�?�色LOOP
#define   KEY_sideColor_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_inc,  KID_led_side)      //0x08020102    //直接设定为�?�色+
#define   KEY_sideColor_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledcolor_chg, KID_led_dec,  KID_led_side)      //0x08020202    //直接设定为�?�色-


#define   MAXLEDLUM                     0x04
//�?光亮�?luminance设定
#define   KEY_mainBright_L              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_loop, KID_led_main)     //0x08030000    //直接设定为模式LOOP
#define   KEY_mainBright_I              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_inc,  KID_led_main)     //0x08030100    //直接设定为模�?+
#define   KEY_mainBright_D              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_dec,  KID_led_main)     //0x08030200    //直接设定为模�?-

#define   KEY_logoBright_L              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_loop, KID_led_logo)     //0x08030001    //直接设定为模式LOOP
#define   KEY_logoBright_I              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_inc,  KID_led_logo)     //0x08030101    //直接设定为模�?+
#define   KEY_logoBright_D              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_dec,  KID_led_logo)     //0x08030201    //直接设定为模�?-

#define   KEY_sideBright_L              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_loop, KID_led_side)     //0x08030002    //直接设定为模式LOOP
#define   KEY_sideBright_I              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_inc,  KID_led_side)     //0x08030102    //直接设定为模�?+
#define   KEY_sideBright_D              MAKE_U32KEY(KEYTYPE_LED, KID_ledbright_chg, KID_led_dec,  KID_led_side)     //0x08030202    //直接设定为模�?-

#define   MAXLEDBREATH                  0x03
//�?光亮度呼吸速度breath设定
#define   KEY_mainSpeed_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_loop, KID_led_main)      //0x08040000    //直接设定为呼吸速度LOOP
#define   KEY_mainSpeed_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_inc,  KID_led_main)      //0x08040100    //直接设定为呼吸速度+
#define   KEY_mainSpeed_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_dec,  KID_led_main)      //0x08040200    //直接设定为呼吸速度-

#define   KEY_logoSpeed_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_loop, KID_led_logo)      //0x08040001    //直接设定为呼吸速度LOOP
#define   KEY_logoSpeed_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_inc,  KID_led_logo)      //0x08040101    //直接设定为呼吸速度+
#define   KEY_logoSpeed_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_dec,  KID_led_logo)      //0x08040201    //直接设定为呼吸速度-

#define   KEY_sideSpeed_L               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_loop, KID_led_side)      //0x08040002    //直接设定为呼吸速度LOOP
#define   KEY_sideSpeed_I               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_inc,  KID_led_side)      //0x08040102    //直接设定为呼吸速度+
#define   KEY_sideSpeed_D               MAKE_U32KEY(KEYTYPE_LED, KID_ledspeed_chg, KID_led_dec,  KID_led_side)      //0x08040202    //直接设定为呼吸速度-

//游戏高手
#define   SP_LED_REC_Start              MAKE_U32KEY(KEYTYPE_LED, KID_gameRecord_start, KID_led_loop, KID_led_main)  //0x08050000    //LED录制�?�?�?
#define   SP_LED_REC_Save               MAKE_U32KEY(KEYTYPE_LED, KID_macro_save,       KID_led_loop, KID_led_main)  //0x08060000    //LED录制�?保存
#define   SP_LED_REC                    MAKE_U32KEY(KEYTYPE_LED, KID_macroRecord_save, KID_led_loop, KID_led_main)  //0x08070000    //LED录制�?�?�?/保存

#define   SP_LED_REC_Reset              MAKE_U32KEY(KEYTYPE_LED, KID_reset,         KID_led_loop, KID_led_main)     //0x08080000    //LED恢�?�出厂�?�置
#define   SP_KB_REC_Reset               MAKE_U32KEY(KEYTYPE_LED, KID_factory_reset, KID_led_loop, KID_led_main)     //0x08ff0000    //�?盘恢复出厂�?�置

#define   MAXLOGOSPEED                  0x04
#define   MAXLOGOLUMIAN                 0x04
#define   MAXLOGOCOLOR                  0x07
#define   MAXLOGOMODE                   0x07
//****************************************************************
typedef enum {
    KID_ReportRate_set      = 0x00,     //0x00 直接设定档位
    KID_ReportRate_inc      = 0x01,     //0x01 回报�?+
    KID_ReportRate_dec      = 0x02,     //0x02 回报�?-
    KID_ReportRate_loop     = 0x03,     //0x03 回报率循�?
} kid_reportrate_type_t;    //byte2

typedef enum {
    KID_ReportRate_125      = 0,
    KID_ReportRate_250      = 1,
    KID_ReportRate_500      = 2,
    KID_ReportRate_1000     = 3,
} kid_reportrate_list_t;    //byte3

#define   MAXREPRATE                    0x03             //0~3
//ReportRate设定
#define   KEY_ReportRate_0              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_set,  0x00, KID_ReportRate_125)      //0x09000000      //直接设定�?125
#define   KEY_ReportRate_1              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_set,  0x00, KID_ReportRate_250)      //0x09000001      //直接设定�?250
#define   KEY_ReportRate_2              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_set,  0x00, KID_ReportRate_500)      //0x09000002      //直接设定�?500
#define   KEY_ReportRate_3              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_set,  0x00, KID_ReportRate_1000)     //0x09000003      //直接设定�?1000
#define   KEY_ReportRate_I              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_inc,  0x00, 0x00)                    //0x09010000      //回报率档位加
#define   KEY_ReportRate_D              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_dec,  0x00, 0x00)                    //0x09020000      //回报率档位减
#define   KEY_ReportRate_L              MAKE_U32KEY(KEYTYPE_ReportRate, KID_ReportRate_loop, 0x00, 0x00)                    //0x09030000      //回报率档位循�?
//****************************************************************
//FN�?
typedef enum {
    KID_Fn1      = 0x00,    //Key-id Fn1
    KID_Fn2      = 0x01,
} fn_id_t;

#define   KEY_Fn1   MAKE_U32KEY(KEYTYPE_FN,KID_Fn1,0x00,0x00)   //0x0d000000
#define   KEY_Fn2   MAKE_U32KEY(KEYTYPE_FN,KID_Fn2,0x00,0x00)   //0x0d010000
//****************************************************************


//电源�?
#define   KEY_Power     MAKE_U32KEY(KEYTYPE_ACPI,0x00,0x00,0x01)    //0x10000001
#define   KEY_Sleep     MAKE_U32KEY(KEYTYPE_ACPI,0x00,0x00,0x02)    //0x10000002
#define   KEY_WakeUp    MAKE_U32KEY(KEYTYPE_ACPI,0x00,0x00,0x04)    //0x10000004
//
#define   KEY_Fn_Ctrl   0x16000000
/****************************************************************************************/
/****************************************************************************************/
#define     KEYCODE_TH      0x9F        //通用�?�?&特殊�?�? 区别门�??
//*************************************************************************************************
//*************************************************************************************************
#define PROFIlE_MAX                        (3)     // 最大保存，3个PCBA板加载文�? （drive-file�?
//*************************************************************************************************
//*************************************************************************************************
//----------------------------------------------------------
extern void key_make_cnt_10mS (const uint8_t key_pix);
extern void keydelay_10ms_handle (void);

extern void key_decode_make (const uint8_t key_pix);
extern void key_decode_break (const uint8_t key_pix);

extern void key_makecode_parse (uint32_t u32KeyCode);
extern void key_breakcode_parse (uint32_t u32KeyCode);
//****************************************************************
extern void keycode_config_alt_break (void);
extern void keycode_config_alt_make (void);
extern void keycode_DPI_break (void);
extern void keycode_DPI_make (void);
extern void keycode_exit_gun_break (void);
extern void keycode_exit_gun_make (void);
extern void keycode_LED_break (void);
extern void keycode_LED_make (void);
extern void keycode_LOD_break (void);
extern void keycode_LOD_make (void);
extern void keycode_macro_break (void);
extern void keycode_macro_make (uint8_t *macro_data);
extern void keycode_matrix_break (void);
extern void keycode_matrix_make (void);
extern void keycode_mouse_break (void);
extern void keycode_mouse_make (void);
extern void keycode_normal_break (void);
extern void keycode_normal_make (void);
extern void keycode_push_gun_break (void);
extern void keycode_push_gun_make (void);
extern void keycode_ReportRate_break (void);
extern void keycode_ReportRate_make (void);
extern void keycode_shooting_break (void);
extern void keycode_shooting_make (void);
extern void keycode_special_break (void);
extern void keycode_special_make (void);
extern void keycode_user_break (void);
extern void keycode_user_make (void);


//extern uint32_t  keycode_transcoding_check (void);

//****************************************************************

uint32_t KeyMatrix_get_code (uint8_t key_layer,
                             uint8_t key_os,
                             uint8_t key_pix) small;

//****************************************************************

#endif
