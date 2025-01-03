#include "..\include\main.h"
//start address 0xBC00,total 512
//windows+mac
code const U32 KeyMatrix_NormalLayer_user[PROFIlE_MAX][2][128] = 
{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 {
     {
         //WIN
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         KEY_F1,             KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_WIN,          //C02
         KEY_F2,             KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_ALT,          //C03
         KEY_F3,             KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_F4,             KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_F5,             KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_F6,             KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_F7,             KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_F8,             KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_ALT,          //C09
         KEY_F9,             KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_F10,            KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_APP,            //C11
         KEY_F11,            KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_F12,            KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                    //C13
         KEY_Calculator,     KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_R_CTRL,        //C14
         KEY_PRINT,          KEY_INS,            KEY_DEL,            0,                  0,                      KEY_LeftArrow,      //C15
         KEY_SCRLOCK,        KEY_HOME,           KEY_END,            0,                  KEY_UpArrow,            KEY_DownArrow,      //C16
         KEY_PAUSE,          KEY_PGUP,           KEY_PGDN,           0,                  KEY_Mute,               KEY_RightArrow,     //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
     {
         //MAC
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         KEY_F1,             KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_ALT ,          //C02
         KEY_F2,             KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_WIN,          //C03
         KEY_F3,             KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_F4,             KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_F5,             KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_F6,             KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_F7,             KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_F8,             KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_WIN,          //C09
         KEY_F9,             KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_F10,            KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_APP,            //C11
         KEY_F11,            KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_F12,            KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                 //C13
         KEY_Calculator,     KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_R_CTRL,        //C14
         KEY_PRINT,          KEY_INS,            KEY_DEL,            0,                  0,                      KEY_LeftArrow,      //C15
         KEY_SCRLOCK,        KEY_HOME,           KEY_END,            0,                  KEY_UpArrow,            KEY_DownArrow,      //C16
         KEY_PAUSE,          KEY_PGUP,           KEY_PGDN,           0,                  KEY_Mute,               KEY_RightArrow,     //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
 },
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 {
     //  profile =1,
     {
         //WIN
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         0,                  KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_WIN,          //C02
         KEY_F1,             KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_ALT,          //C03
         KEY_F2,             KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_F3,             KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_F4,             KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_F5,             KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_F6,             KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_F7,             KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_ALT,          //C09
         KEY_F8,             KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_F9,             KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_R_CTRL,         //C11
         KEY_F10,            KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_F11,            KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                  //C13
         KEY_F12,            KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_LeftArrow,      //C14
         KEY_Mute,/*wheel*/  0,                  0,                  0,                  KEY_UpArrow,            KEY_DownArrow,      //C15
         KEY_DEL,            KEY_HOME,           KEY_PGUP,           KEY_PGDN,           0,                      KEY_RightArrow,     //C16
         0,                  0,                  0,                  0,                  0,                      0,                  //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
     {
         //MAC
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         0,                  KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_ALT,          //C02
         KEY_SysBkBrigth_D,  KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_WIN,          //C03
         KEY_SysBkBrigth_I,  KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_L_WIN__TAB,     KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_L_WIN__H,       KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_L_WIN_SPACE,    KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_L_WIN_SHIFT_4,  KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_PrevTr,         KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_WIN,          //C09
         KEY_PlayPause,      KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_NextTr,         KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_R_CTRL,         //C11
         KEY_Mute,           KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_VolumD,         KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                  //C13
         KEY_VolumI,         KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_LeftArrow,      //C14
         KEY_Mute,/*wheel*/  0,                  0,                  0,                  KEY_UpArrow,            KEY_DownArrow,      //C15
         KEY_DEL,            KEY_HOME,           KEY_PGUP,           KEY_PGDN,           0,                      KEY_RightArrow,     //C16
         0,                  0,                  0,                  0,                  0,                      0,                  //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
 },
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 {
     //  profile =2,
     {
         //WIN
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         0,                  KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_WIN,          //C02
         KEY_F1,             KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_ALT,          //C03
         KEY_F2,             KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_F3,             KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_F4,             KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_F5,             KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_F6,             KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_F7,             KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_ALT,          //C09
         KEY_F8,             KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_F9,             KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_R_CTRL,         //C11
         KEY_F10,            KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_F11,            KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                  //C13
         KEY_F12,            KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_LeftArrow,      //C14
         KEY_Mute,/*wheel*/  0,                  0,                  0,                  KEY_UpArrow,            KEY_DownArrow,      //C15
         KEY_DEL,            KEY_HOME,           KEY_PGUP,           KEY_PGDN,           0,                      KEY_RightArrow,     //C16
         0,                  0,                  0,                  0,                  0,                      0,                  //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },
     {
         //MAC
         //R0                //R1                //R2                //R3                //R4                    //R5
         KEY_ESC,            KEY_TILDE,          KEY_TAB,            KEY_CAPSLOCK,       KEY_L_SHIFT,            KEY_L_CTRL,         //C01
         0,                  KEY_1,              KEY_Q,              KEY_A,              KEY_CODE45,             KEY_L_ALT,          //C02
         KEY_SysBkBrigth_D,  KEY_2,              KEY_W,              KEY_S,              KEY_Z,                  KEY_L_WIN,          //C03
         KEY_SysBkBrigth_I,  KEY_3,              KEY_E,              KEY_D,              KEY_X,                  0,                  //C04
         KEY_L_WIN__TAB,     KEY_4,              KEY_R,              KEY_F,              KEY_C,                  0,                  //C05
         KEY_L_WIN__H,       KEY_5,              KEY_T,              KEY_G,              KEY_V,                  KEY_SPACEBAR,       //C06
         KEY_L_WIN_SPACE,    KEY_6,              KEY_Y,              KEY_H,              KEY_B,                  0,                  //C07
         KEY_L_WIN_SHIFT_4,  KEY_7,              KEY_U,              KEY_J,              KEY_N,                  0,                  //C08
         KEY_PrevTr,         KEY_8,              KEY_I,              KEY_K,              KEY_M,                  KEY_R_WIN,          //C09
         KEY_PlayPause,      KEY_9,              KEY_O,              KEY_L,              KEY_COMMA,              KEY_Fn1,            //C10
         KEY_NextTr,         KEY_0,              KEY_P,              KEY_Semicolon,      KEY_PERIOD,             KEY_R_CTRL,         //C11
         KEY_Mute,           KEY_Underscore,     KEY_L_Brackets,     KEY_Quotation,      KEY_Interrogation,      0,                  //C12
         KEY_VolumD,         KEY_EqualSign,      KEY_R_Brackets,     KEY_CODE42,         0,                      0,                  //C13
         KEY_VolumI,         KEY_Backspace,      KEY_Slash,          KEY_ENTER,          KEY_R_SHIFT,            KEY_LeftArrow,      //C14
         KEY_Mute,/*wheel*/  0,                  0,                  0,                  KEY_UpArrow,            KEY_DownArrow,      //C15
         KEY_DEL,            KEY_HOME,           KEY_PGUP,           KEY_PGDN,           0,                      KEY_RightArrow,     //C16
         0,                  0,                  0,                  0,                  0,                      0,                  //C17
         0,                  0,                  0,                  0,                  0,                      0,                  //C18
         0,                  0,                  0,                  0,                  0,                      0,                  //C19
         0,                  0,                  0,                  0,                  0,                      0,                  //C20
         0,                  0,                  0,                  KEY_VolumD,         0,                      KEY_VolumI,         //C21
         //-----------------------------------------------------------------------------------------------------------------------------
         0,                  0
     },        
 },
} ;





















