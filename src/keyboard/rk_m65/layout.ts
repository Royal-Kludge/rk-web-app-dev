import { KeyDefineEnum } from '@/common/keyCode'
import { LightEffectEnum } from '../enum'
import type { LightEffect } from '../interface'

export const KeyMap_Normal_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_ESC,             KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_1,               KeyDefineEnum.KEY_Q,            KeyDefineEnum.KEY_A,            KeyDefineEnum.KEY_Z,                KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,                KeyDefineEnum.KEY_L_ALT, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_NextTr,     KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6	
	KeyDefineEnum.KEY_PlayPause,  KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,     KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_Stop,       KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.SP_BT_DEV2,     KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.SP_BT_DEV1,     KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.SP_BT_DEV0,     KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.KEY_CODE56,           KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.SP_BT_DEV3,     KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_CODE29,       KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------14
	
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Mute,            KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_DEL,             KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.NONE,                 KeyDefineEnum.KEY_RightArrow,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]

export const KeyMap_FN1_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_FN2_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_Tap_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,        	KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,      	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const KeyMap_Normal_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_ESC,             KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_1,               KeyDefineEnum.KEY_Q,            KeyDefineEnum.KEY_A,            KeyDefineEnum.KEY_Z,                KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,                KeyDefineEnum.KEY_L_ALT, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_NextTr,     KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6	
	KeyDefineEnum.KEY_PlayPause,  KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,     KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_Stop,       KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.SP_BT_DEV2,     KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.SP_BT_DEV1,     KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.SP_BT_DEV0,     KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.KEY_CODE56,           KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.SP_BT_DEV3,     KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_CODE29,       KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------14
	
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Mute,            KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_DEL,             KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.NONE,                 KeyDefineEnum.KEY_RightArrow,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]

export const KeyMap_FN1_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_FN2_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_Tap_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,        	KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,      	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const KeyMap_Normal_UK_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_ESC,             KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_1,               KeyDefineEnum.KEY_Q,            KeyDefineEnum.KEY_A,            KeyDefineEnum.KEY_Z,                KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,                KeyDefineEnum.KEY_L_ALT, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_NextTr,     KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6	
	KeyDefineEnum.KEY_PlayPause,  KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,     KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_Stop,       KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.SP_BT_DEV2,     KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.SP_BT_DEV1,     KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.SP_BT_DEV0,     KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.KEY_CODE56,           KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.SP_BT_DEV3,     KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_CODE29,       KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------14
	
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Mute,            KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_DEL,             KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.NONE,                 KeyDefineEnum.KEY_RightArrow,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]

export const KeyMap_FN1_UK_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_FN2_UK_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_Tap_UK_Win: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,        	KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,      	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const KeyMap_Normal_UK_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_ESC,             KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_1,               KeyDefineEnum.KEY_Q,            KeyDefineEnum.KEY_A,            KeyDefineEnum.KEY_Z,                KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,                KeyDefineEnum.KEY_L_ALT, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_NextTr,     KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6	
	KeyDefineEnum.KEY_PlayPause,  KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,     KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_Stop,       KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.SP_BT_DEV2,     KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.SP_BT_DEV1,     KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.SP_BT_DEV0,     KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.KEY_CODE56,           KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.SP_BT_DEV3,     KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_CODE29,       KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------14
	
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_Mute,            KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_DEL,             KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.NONE,                 KeyDefineEnum.KEY_RightArrow,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]

export const KeyMap_FN1_UK_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_FN2_UK_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          	  KeyDefineEnum.KEY_ESC,	      KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_Mode,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F1,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F2,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F3,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F4,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F5,           KeyDefineEnum.NONE,          KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_ProfileReset,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F6,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F7,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F8,           KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F9,           KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F10,          KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_SCRLOCK,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_INS,       KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//------- -----------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,               KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_LUMINI,      KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_HOME,       KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_Tap_UK_Mac: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,        	KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,      	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,        	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,       	 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,          KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.NONE,   		 KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,            KeyDefineEnum.NONE,                KeyDefineEnum.NONE,	
	//===============
	//KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const LightEffects: Array<LightEffect> = [
    { effect: LightEffectEnum.FixedOn, speed: false, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.Respire, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.Rainbow, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.FlashAway, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.Raindrops, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.RainbowWheel, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.RippleShining, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.StarsTwinkle, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.ShadowDisappear, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.RetroSnake, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.NeonStream, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.Reaction, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.SineWave, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.Blossoming, speed: true, brightness: true, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.SelfDefine, speed: false, brightness: false, color: undefined, mixColor: false, sleep: 0 },
    { effect: LightEffectEnum.OFF, speed: false, brightness: false, color: undefined, mixColor: false, sleep: 0 },
	//{ effect: LightEffectEnum.Music, speed: false, brightness: false, color: undefined, mixColor: false, sleep: 0 },
]