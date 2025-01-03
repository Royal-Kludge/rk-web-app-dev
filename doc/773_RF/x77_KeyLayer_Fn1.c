#include "..\include\main.h"
//start address 0xC400,total 512bytes



code const U32 KeyMatrix_Fn1Layer_user[PROFIlE_MAX][2][128] = {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // profile =0
 {
     {
         //Win
         //R0                //R1                //R2                //R3                //R4                //R5
         0,                  0,                  0,                  0,                  0,                  0,                  //C01
         KEY_MyComputer,     KEY_mainEffect_20,   SP_DEV_BT0,         SP_Windows_Mode ,   0,                  SP_Winlock,         //C02
         KEY_WWW,            KEY_mainEffect_31,   SP_DEV_BT1,         SP_Mac_Mode,        0,                  0,                  //C03
         KEY_Email,          KEY_mainEffect_32,   SP_DEV_BT2,         0,/*SP_Android_Mode*/0,                 0,                  //C04
         KEY_Calculator,     0,                  0,                  0,/*SP_IOS_Mode */  0,                  SP_KB_REC_Reset,    //C05
         KEY_Media,          0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
         KEY_Stop,           0,                  0,                  0,                  0,                  0,                  //C07
         KEY_PrevTr,         0,                  0,                  0,                  0,                  0,                  //C08
         KEY_PlayPause,      0,                  0,                  0,                  0,                  0,                  //C09
         KEY_NextTr,         0,                  SP_O_Mode,          SP_L_Mode,                  0,                  KEY_Fn1,            //C10
         KEY_Mute,           0,                  SP_DEV_2G4,         0,                  0,                  0,                  //C11
         KEY_VolumD,         0,                  0,                  0,                  0,                  0,                  //C12
         KEY_VolumI,         0,                  0,                  0,                  0,                  0,                  //C13
         KEY_Calculator,     SP_LED_OFF,         0,                  SP_BATT_IND_ENTER,  0,                  KEY_Fn_Ctrl,       //C14
        
         SP_LED_REC,         KEY_sideEffect_L,   0,                  0,                  0,                  KEY_mainSpeed_D,   //C15
         KEY_mainEffect_L,   KEY_mainColor_L,    0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C16
         0,                  KEY_PAUSE,          0,                  0,                  0,                  KEY_mainSpeed_I,    //C17
         0,                  0,                  0,                  0,                  0,                  0,                  //C18
         0,                  0,                  0,                  0,                  0,                  0,                  //C19
         0,                  0,                  0,                  0,                  0,                  0,                  //C20
         0,                  0,                  0,                  0,                  0,                  0,                  //C21
         //---------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
     {
         //MAC
         //R0                //R1                //R2                //R3                //R4                //R5
         0,                  0,                  0,                  0,                  0,                  0,                  //C01
         KEY_SysBkBrigth_D,  KEY_mainEffect_20,   SP_DEV_BT0,         SP_Windows_Mode,    0,                  0,                  //C02
         KEY_SysBkBrigth_I,  KEY_mainEffect_31,   SP_DEV_BT1,         SP_Mac_Mode,        0,                  0,                  //C03
         MAC_F3,             KEY_mainEffect_32,   SP_DEV_BT2,         0,/*SP_Android_Mode*/0,                 0,                  //C04
         MAC_F4,             0,                  0,                  0,/*SP_IOS_Mode */  0,                  SP_KB_REC_Reset,    //C05
        
         KEY_mainBright_D,   0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
         KEY_mainBright_I,   0,                  0,                  0,                  0,                  0,                  //C07
         KEY_PrevTr,         0,                  0,                  0,                  0,                  0,                  //C08
         KEY_PlayPause,      0,                  0,                  0,                  0,                  0,                  //C09
        
         KEY_NextTr,         0,                  SP_O_Mode,          SP_L_Mode,                  0,                  KEY_Fn1,            //C10
         KEY_Mute,           0,                  SP_DEV_2G4,         0,                  0,                  0,                  //C11
         KEY_VolumD,         0,                  0,                  0,                  0,                  0,                  //C12
         KEY_VolumI,         0,                  0,                  0,                  0,                  0,                  //C13
         KEY_Calculator,     SP_LED_OFF,         0,                  SP_BATT_IND_ENTER,  0,                  KEY_Fn_Ctrl,       //C14
        
         SP_LED_REC,         KEY_sideEffect_L,   0,                  0,                  0,                  KEY_mainSpeed_D,   //C15
         KEY_mainEffect_L,   KEY_mainColor_L,    0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C16
         0,                  KEY_PAUSE,          0,                  0,                  0,                  KEY_mainSpeed_I,    //C17
         0,                  0,                  0,                  0,                  0,                  0,                  //C18
         0,                  0,                  0,                  0,                  0,                  0,                  //C19
         0,                  0,                  0,                  0,                  0,                  0,                  //C20
         0,                  0,                  0,                  0,                  0,                  0,                  //C21
         //---------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
 },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // profile =1
{
    {
        //Win
        //R0                //R1                //R2                //R3                //R4                //R5
        SP_KB_REC_Reset,    0,                  0,                  0,                  KEY_logoEffect_L,   0,                  //C01
        0,                  0,                  SP_DEV_2G4,         SP_Mac_Mode,        0,                  SP_Winlock,         //C02
        KEY_SysBkBrigth_D,  0,                  SP_DEV_BT0,         SP_Windows_Mode,    KEY_logoColor_L,    0,                  //C03
        KEY_SysBkBrigth_I,  0,                  SP_DEV_BT1,       0,/*SP_Android_Mode*/ 0,                  0,                  //C04
        KEY_L_ALT__TAB,     0,                  SP_DEV_BT2,       0,/*SP_IOS_Mode */    0,                  0,                  //C05
        KEY_MyComputer,     0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
        KEY_Search,         0,                  0,                  0,                  SP_BATT_IND_ENTER,  0,                  //C07
        KEY_L_WIN_SHIFT_S,  0,                  0,                  0,                  0,                  0,                  //C08
        KEY_PrevTr,         0,                  0,                  0,                  0,                  KEY_logoBright_L,   //C09
        KEY_PlayPause,      0,                  0,                  0,                  KEY_sideBright_I,   KEY_Fn1,            //C10
        KEY_NextTr,         0,                  KEY_PRINT,          0,                  KEY_sideBright_D,   KEY_logoSpeed_L,    //C11
        KEY_Mute,           KEY_mainColor_L,    KEY_SCRLOCK,        0,                  KEY_sideColor_L,    0,                  //C12
        KEY_VolumD,         KEY_mainEffect_L,   KEY_PAUSE,          0,                  0,                  0,                  //C13
        KEY_VolumI,         0,                  0,                  0,                  KEY_sideEffect_L,   KEY_mainSpeed_D,    //C14
        0,                  0,                  0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C15
        KEY_INS,            KEY_END,            0,                  0,                  0,                  KEY_mainSpeed_I,    //C16
        0,                  0,                  0,                  0,                  0,                  0,                  //C17
        0,                  0,                  0,                  0,                  0,                  0,                  //C18
        0,                  0,                  0,                  0,                  0,                  0,                  //C19
        0,                  0,                  0,                  0,                  0,                  0,                  //C20
        0,                  0,                  0,                  0,                  0,                  0,                  //C21
        //---------------------------------------------------------------------------------------------------------------------------
        0,                  0
    },
    {
        //MAC
        //R0                //R1                //R2                //R3                //R4                //R5
        SP_KB_REC_Reset,    0,                  0,                  0,                  KEY_logoEffect_L,   0,                  //C01
        0,                  0,                  SP_DEV_2G4,         SP_Mac_Mode,        0,                  SP_Winlock,         //C02
        KEY_F1,             0,                  SP_DEV_BT0,         SP_Windows_Mode,    KEY_logoColor_L,    0,                  //C03
        KEY_F2,             0,                  SP_DEV_BT1,       0,/*SP_Android_Mode*/ 0,                  0,                  //C04
        KEY_F3,             0,                  SP_DEV_BT2,       0,/*SP_IOS_Mode */    0,                  0,                  //C05
        KEY_F4,             0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
        KEY_F5,             0,                  0,                  0,                  SP_BATT_IND_ENTER,  0,                  //C07
        KEY_F6,             0,                  0,                  0,                  0,                  0,                  //C08
        KEY_F7,             0,                  0,                  0,                  0,                  KEY_logoBright_L,   //C09
        KEY_F8,             0,                  0,                  0,                  KEY_sideBright_I,   KEY_Fn1,            //C10
        KEY_F9,             0,                  KEY_PRINT,          0,                  KEY_sideBright_D,   KEY_logoSpeed_L,    //C11
        KEY_F10,            KEY_mainColor_L,    KEY_SCRLOCK,        0,                  KEY_sideColor_L,    0,                  //C12
        KEY_F11,            KEY_mainEffect_L,   KEY_PAUSE,          0,                  0,                  0,                  //C13
        KEY_F12,            0,                  0,                  0,                  KEY_sideEffect_L,   KEY_mainSpeed_D,    //C14
        0,                  0,                  0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C15
        KEY_INS,            KEY_END,            0,                  0,                  0,                  KEY_mainSpeed_I,    //C16
        0,                  0,                  0,                  0,                  0,                  0,                  //C17
        0,                  0,                  0,                  0,                  0,                  0,                  //C18
        0,                  0,                  0,                  0,                  0,                  0,                  //C19
        0,                  0,                  0,                  0,                  0,                  0,                  //C20
        0,                  0,                  0,                  0,                  0,                  0,                  //C21
        //------------------------------------------------------------------------------------------------------------------
        0,                  0
    },
},   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// profile =2
{    
    {
        //Win
        //R0                //R1                //R2                //R3                //R4                //R5
        SP_KB_REC_Reset,    0,                  0,                  0,                  KEY_logoEffect_L,   0,                  //C01
        0,                  0,                  SP_DEV_2G4,         SP_Mac_Mode,        0,                  SP_Winlock,         //C02
        KEY_SysBkBrigth_D,  0,                  SP_DEV_BT0,         SP_Windows_Mode,    KEY_logoColor_L,    0,                  //C03
        KEY_SysBkBrigth_I,  0,                  SP_DEV_BT1,       0,/*SP_Android_Mode*/ 0,                  0,                  //C04
        KEY_L_ALT__TAB,     0,                  SP_DEV_BT2,       0,/*SP_IOS_Mode */    0,                  0,                  //C05
        KEY_MyComputer,     0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
        KEY_Search,         0,                  0,                  0,                  SP_BATT_IND_ENTER,  0,                  //C07
        KEY_L_WIN_SHIFT_S,  0,                  0,                  0,                  0,                  0,                  //C08
        KEY_PrevTr,         0,                  0,                  0,                  0,                  KEY_logoBright_L,   //C09
        KEY_PlayPause,      0,                  0,                  0,                  KEY_sideBright_I,   KEY_Fn1,            //C10
        KEY_NextTr,         0,                  KEY_PRINT,          0,                  KEY_sideBright_D,   KEY_logoSpeed_L,    //C11
        KEY_Mute,           KEY_mainColor_L,    KEY_SCRLOCK,        0,                  KEY_sideColor_L,    0,                  //C12
        KEY_VolumD,         KEY_mainEffect_L,   KEY_PAUSE,          0,                  0,                  0,                  //C13
        KEY_VolumI,         0,                  0,                  0,                  KEY_sideEffect_L,   KEY_mainSpeed_D,    //C14
        0,                  0,                  0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C15
        KEY_INS,            KEY_END,            0,                  0,                  0,                  KEY_mainSpeed_I,    //C16
        0,                  0,                  0,                  0,                  0,                  0,                  //C17
        0,                  0,                  0,                  0,                  0,                  0,                  //C18
        0,                  0,                  0,                  0,                  0,                  0,                  //C19
        0,                  0,                  0,                  0,                  0,                  0,                  //C20
        0,                  0,                  0,                  0,                  0,                  0,                  //C21
        //---------------------------------------------------------------------------------------------------------------------------
        0,                  0
    },
    {
        //MAC
        //R0                //R1                //R2                //R3                //R4                //R5
        SP_KB_REC_Reset,    0,                  0,                  0,                  KEY_logoEffect_L,   0,                  //C01
        0,                  0,                  SP_DEV_2G4,         SP_Mac_Mode,        0,                  SP_Winlock,         //C02
        KEY_F1,             0,                  SP_DEV_BT0,         SP_Windows_Mode,    KEY_logoColor_L,    0,                  //C03
        KEY_F2,             0,                  SP_DEV_BT1,       0,/*SP_Android_Mode*/ 0,                  0,                  //C04
        KEY_F3,             0,                  SP_DEV_BT2,       0,/*SP_IOS_Mode */    0,                  0,                  //C05
        KEY_F4,             0,                  0,                  SP_TEST_EMI,        0,                  0,                  //C06
        KEY_F5,             0,                  0,                  0,                  SP_BATT_IND_ENTER,  0,                  //C07
        KEY_F6,             0,                  0,                  0,                  0,                  0,                  //C08
        KEY_F7,             0,                  0,                  0,                  0,                  KEY_logoBright_L,   //C09
        KEY_F8,             0,                  0,                  0,                  KEY_sideBright_I,   KEY_Fn1,            //C10
        KEY_F9,             0,                  KEY_PRINT,          0,                  KEY_sideBright_D,   KEY_logoSpeed_L,    //C11
        KEY_F10,            KEY_mainColor_L,    KEY_SCRLOCK,        0,                  KEY_sideColor_L,    0,                  //C12
        KEY_F11,            KEY_mainEffect_L,   KEY_PAUSE,          0,                  0,                  0,                  //C13
        KEY_F12,            0,                  0,                  0,                  KEY_sideEffect_L,   KEY_mainSpeed_D,    //C14
        0,                  0,                  0,                  0,                  KEY_mainBright_I,   KEY_mainBright_D,   //C15
        KEY_INS,            KEY_END,            0,                  0,                  0,                  KEY_mainSpeed_I,    //C16
        0,                  0,                  0,                  0,                  0,                  0,                  //C17
        0,                  0,                  0,                  0,                  0,                  0,                  //C18
        0,                  0,                  0,                  0,                  0,                  0,                  //C19
        0,                  0,                  0,                  0,                  0,                  0,                  //C20
        0,                  0,                  0,                  0,                  0,                  0,                  //C21
        //------------------------------------------------------------------------------------------------------------------
        0,                  0
    },
},
};


