import { KeyDefineEnum } from '@/common/keyCode_s98'
import { LightEffectEnum } from '../enum'
import type { LightEffect } from '../interface'

export const KeyMap_Normal_ES_Win: Array<KeyDefineEnum> = [
	KeyDefineEnum.KEY_ESC,        KeyDefineEnum.KEY_TILDE,           KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,
	//-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,			  KeyDefineEnum.KEY_1,			     KeyDefineEnum.KEY_Q,			 KeyDefineEnum.KEY_A,			 KeyDefineEnum.KEY_Z,				 KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.KEY_F1,         KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,               KeyDefineEnum.KEY_L_ALT,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.KEY_F2,         KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.KEY_F3,         KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4	  
	KeyDefineEnum.KEY_F4,         KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_F5,         KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.KEY_F6,         KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                 KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_F7,         KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_F8,         KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.KEY_F9,         KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.KEY_R_CTRL,					 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.KEY_F10,        KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.KEY_F11,        KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12 
	KeyDefineEnum.KEY_F12,        KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_Slash,        KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.KEY_DEL,        KeyDefineEnum.KEY_HOME,            KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,	 												   				
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.SP_BT_DEV32,    KeyDefineEnum.KEY_NUMLOCK,	     KeyDefineEnum.KEY_NUM_7,		 KeyDefineEnum.KEY_NUM_4,		 KeyDefineEnum.KEY_NUM_1,     	     KeyDefineEnum.KEY_RightArrow,    
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.SP_BT_DEV4,	  KeyDefineEnum.KEY_NUM_DIV, 		 KeyDefineEnum.KEY_NUM_8,		 KeyDefineEnum.KEY_NUM_5,		 KeyDefineEnum.KEY_NUM_2,	 		 KeyDefineEnum.KEY_NUM_0,							   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_NUM_MUL,		 KeyDefineEnum.KEY_NUM_9,		 KeyDefineEnum.KEY_NUM_6,		 KeyDefineEnum.KEY_NUM_3,			 KeyDefineEnum.KEY_NUM_DOT,
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_NUM_MINUS,       KeyDefineEnum.KEY_NUM_PLUS,	 KeyDefineEnum.KEY_CODE107,	     KeyDefineEnum.KEY_NUM_ENTER,	     KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//===============
	KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]

export const KeyMap_FN1_ES_Win: Array<KeyDefineEnum> = [
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,       		  KeyDefineEnum.KEY_LED_MODE20,   KeyDefineEnum.SP_BT_DEV0,    KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.KEY_MyComputer,     KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV1,    KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.KEY_WWW,            KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV2,    KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.KEY_Email,          KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 	 
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.KEY_Calculator,     KeyDefineEnum.NONE,             KeyDefineEnum.Speed_SaveTime,KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_REC_Reset,
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_Media,          KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.KEY_Stop,           KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,         KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_PlayPause,      KeyDefineEnum.NONE,             KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.KEY_NextTr,         KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV3,    KeyDefineEnum.NONE,           KeyDefineEnum.KEY_CODE56,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.KEY_Mute,           KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.KEY_VolumD,         KeyDefineEnum.NONE,             KeyDefineEnum.KEY_INS,       KeyDefineEnum.KEY_LED_MODEL,  KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.KEY_VolumI,         KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.KEY_SCRLOCK,        KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_LED_LUMINI,	KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20
	//===============
	KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]

export const KeyMap_FN2_ES_Win: Array<KeyDefineEnum> = [
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
	KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const KeyMap_Tap_ES_Win: Array<KeyDefineEnum> = [
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

export const KeyMap_Normal_ES_Mac: Array<KeyDefineEnum> = [
	KeyDefineEnum.KEY_ESC,        KeyDefineEnum.KEY_TILDE,           KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,
	//-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,			  KeyDefineEnum.KEY_1,			     KeyDefineEnum.KEY_Q,			 KeyDefineEnum.KEY_A,			 KeyDefineEnum.KEY_Z,				 KeyDefineEnum.KEY_L_WIN,
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.KEY_F1,         KeyDefineEnum.KEY_2,               KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,               KeyDefineEnum.KEY_L_ALT,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.KEY_F2,         KeyDefineEnum.KEY_3,               KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.KEY_F3,         KeyDefineEnum.KEY_4,               KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4	  
	KeyDefineEnum.KEY_F4,         KeyDefineEnum.KEY_5,               KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_F5,         KeyDefineEnum.KEY_6,               KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.KEY_F6,         KeyDefineEnum.KEY_7,               KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                 KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_F7,         KeyDefineEnum.KEY_8,               KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_F8,         KeyDefineEnum.KEY_9,               KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.KEY_F9,         KeyDefineEnum.KEY_0,               KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.KEY_R_CTRL,					 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.KEY_F10,        KeyDefineEnum.KEY_Underscore,      KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.KEY_F11,        KeyDefineEnum.KEY_EqualSign,       KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------12 
	KeyDefineEnum.KEY_F12,        KeyDefineEnum.KEY_Backspace,       KeyDefineEnum.KEY_Slash,        KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,    	  	 KeyDefineEnum.KEY_LeftArrow,
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.KEY_DEL,        KeyDefineEnum.KEY_HOME,            KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,	 												   				
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.SP_BT_DEV32,    KeyDefineEnum.KEY_NUMLOCK,	     KeyDefineEnum.KEY_NUM_7,		 KeyDefineEnum.KEY_NUM_4,		 KeyDefineEnum.KEY_NUM_1,     	     KeyDefineEnum.KEY_RightArrow,    
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.SP_BT_DEV4,	  KeyDefineEnum.KEY_NUM_DIV, 		 KeyDefineEnum.KEY_NUM_8,		 KeyDefineEnum.KEY_NUM_5,		 KeyDefineEnum.KEY_NUM_2,	 		 KeyDefineEnum.KEY_NUM_0,							   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_NUM_MUL,		 KeyDefineEnum.KEY_NUM_9,		 KeyDefineEnum.KEY_NUM_6,		 KeyDefineEnum.KEY_NUM_3,			 KeyDefineEnum.KEY_NUM_DOT,
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,           KeyDefineEnum.KEY_NUM_MINUS,       KeyDefineEnum.KEY_NUM_PLUS,	 KeyDefineEnum.KEY_CODE107,	     KeyDefineEnum.KEY_NUM_ENTER,	     KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,             KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.NONE,
	//===============
	KeyDefineEnum.NONE,				KeyDefineEnum.NONE
]
export const KeyMap_FN1_ES_Mac: Array<KeyDefineEnum> = [
	KeyDefineEnum.NONE,       		  KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.NONE,       		  KeyDefineEnum.KEY_LED_MODE20,   KeyDefineEnum.SP_BT_DEV0,    KeyDefineEnum.SP_Windows_Mode,KeyDefineEnum.NONE,                KeyDefineEnum.SP_Winlock,
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.KEY_MyComputer,     KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV1,    KeyDefineEnum.SP_Mac_Mode,    KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.KEY_WWW,            KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV2,    KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.KEY_Email,          KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 	 
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.KEY_Calculator,     KeyDefineEnum.NONE,             KeyDefineEnum.Speed_SaveTime,KeyDefineEnum.SP_TEST_EMI,    KeyDefineEnum.NONE,                KeyDefineEnum.SP_KB_REC_Reset,
	//-------------------------------------------------------------------------------------------------------------5
	KeyDefineEnum.KEY_Media,          KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE, 
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.KEY_Stop,           KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_PrevTr,         KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.KEY_LED_COLOR_MODEL, KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_PlayPause,      KeyDefineEnum.NONE,             KeyDefineEnum.SP_O_Mode,     KeyDefineEnum.SP_L_Mode,      KeyDefineEnum.NONE,                KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.KEY_NextTr,         KeyDefineEnum.NONE,             KeyDefineEnum.SP_BT_DEV3,    KeyDefineEnum.NONE,           KeyDefineEnum.KEY_CODE56,                KeyDefineEnum.NONE,					 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.KEY_Mute,           KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,			 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.KEY_VolumD,         KeyDefineEnum.NONE,             KeyDefineEnum.KEY_INS,       KeyDefineEnum.KEY_LED_MODEL,  KeyDefineEnum.NONE,                KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------12
	KeyDefineEnum.KEY_VolumI,         KeyDefineEnum.SP_LED_REC,       KeyDefineEnum.KEY_LED_MODEL, KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHD,
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.KEY_SCRLOCK,        KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_PAUSE,     KeyDefineEnum.KEY_END,       KeyDefineEnum.KEY_LED_LUMINI,	KeyDefineEnum.KEY_LED_LUMIND,     	         
	//-------------------------------------------------------------------------------------------------------------14
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.KEY_LED_BREATHI,	 												   
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,							 
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.NONE,               KeyDefineEnum.NONE,             KeyDefineEnum.NONE,          KeyDefineEnum.NONE,           KeyDefineEnum.NONE,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------20
	//===============
	KeyDefineEnum.NONE,				  KeyDefineEnum.NONE
]
export const KeyMap_FN2_ES_Mac: Array<KeyDefineEnum> = [
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
	KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
]

export const KeyMap_Tap_ES_Mac: Array<KeyDefineEnum> = [
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
	KeyDefineEnum.NONE,			 KeyDefineEnum.NONE
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