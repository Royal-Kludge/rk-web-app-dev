import { KeyDefineEnum } from '../keyCode'
import { LightEffectEnum } from '../enum'
import type { LightEffect } from '../interface'

export const KeyMap_Normal: Array<KeyDefineEnum> = [
    //-------------------------------------------------------------------------------------------------------------0
	KeyDefineEnum.KEY_ESC,          KeyDefineEnum.KEY_TILDE,        KeyDefineEnum.KEY_TAB,          KeyDefineEnum.KEY_CAPSLOCK,     KeyDefineEnum.KEY_L_SHIFT,          KeyDefineEnum.KEY_L_CTRL,     	 
	//-------------------------------------------------------------------------------------------------------------1
	KeyDefineEnum.KEY_F1,           KeyDefineEnum.KEY_1,            KeyDefineEnum.KEY_Q,            KeyDefineEnum.KEY_A,            KeyDefineEnum.KEY_Z,                KeyDefineEnum.KEY_L_WIN,     
	//-------------------------------------------------------------------------------------------------------------2
	KeyDefineEnum.KEY_F2,           KeyDefineEnum.KEY_2,            KeyDefineEnum.KEY_W,            KeyDefineEnum.KEY_S,            KeyDefineEnum.KEY_X,                KeyDefineEnum.KEY_L_ALT	, 				 	 			
	//-------------------------------------------------------------------------------------------------------------3
	KeyDefineEnum.KEY_F3,           KeyDefineEnum.KEY_3,            KeyDefineEnum.KEY_E,            KeyDefineEnum.KEY_D,            KeyDefineEnum.KEY_C,                KeyDefineEnum.NONE,    					   
	//-------------------------------------------------------------------------------------------------------------4
	KeyDefineEnum.KEY_F4,           KeyDefineEnum.KEY_4,            KeyDefineEnum.KEY_R,            KeyDefineEnum.KEY_F,            KeyDefineEnum.KEY_V,                KeyDefineEnum.NONE,							  						 						
	//-------------------------------------------------------------------------------------------------------------5	
	KeyDefineEnum.KEY_F5,           KeyDefineEnum.KEY_5,            KeyDefineEnum.KEY_T,            KeyDefineEnum.KEY_G,            KeyDefineEnum.KEY_B,                KeyDefineEnum.KEY_SPACEBAR,		 			 			    
	//-------------------------------------------------------------------------------------------------------------6
	KeyDefineEnum.KEY_F6,           KeyDefineEnum.KEY_6,            KeyDefineEnum.KEY_Y,            KeyDefineEnum.KEY_H,            KeyDefineEnum.KEY_N,                KeyDefineEnum.NONE,		
	//-------------------------------------------------------------------------------------------------------------7
	KeyDefineEnum.KEY_F7,           KeyDefineEnum.KEY_7,            KeyDefineEnum.KEY_U,            KeyDefineEnum.KEY_J,            KeyDefineEnum.KEY_M,                KeyDefineEnum.NONE,
	//-------------------------------------------------------------------------------------------------------------8
	KeyDefineEnum.KEY_F8,           KeyDefineEnum.KEY_8,            KeyDefineEnum.KEY_I,            KeyDefineEnum.KEY_K,            KeyDefineEnum.KEY_COMMA,            KeyDefineEnum.KEY_R_ALT,			       			        
	//-------------------------------------------------------------------------------------------------------------9
	KeyDefineEnum.KEY_F9,           KeyDefineEnum.KEY_9,            KeyDefineEnum.KEY_O,            KeyDefineEnum.KEY_L,            KeyDefineEnum.KEY_PERIOD,           KeyDefineEnum.KEY_Fn1,						 
	//-------------------------------------------------------------------------------------------------------------10
	KeyDefineEnum.KEY_F10,          KeyDefineEnum.KEY_0,            KeyDefineEnum.KEY_P,            KeyDefineEnum.KEY_Semicolon,    KeyDefineEnum.KEY_Interrogation,    KeyDefineEnum.KEY_APP,					 
	//-------------------------------------------------------------------------------------------------------------11
	KeyDefineEnum.KEY_F11,          KeyDefineEnum.KEY_Underscore,   KeyDefineEnum.KEY_L_Brackets,   KeyDefineEnum.KEY_Quotation,    KeyDefineEnum.KEY_CODE56,    	  	KeyDefineEnum.NONE,			 
	//------- -----------------------------------------------------------------------------------------------------12
	KeyDefineEnum.KEY_F12,          KeyDefineEnum.KEY_EqualSign,    KeyDefineEnum.KEY_R_Brackets,   KeyDefineEnum.KEY_CODE42,       KeyDefineEnum.KEY_CODE45,           KeyDefineEnum.NONE,		    
	//-------------------------------------------------------------------------------------------------------------13
	KeyDefineEnum.KEY_Calculator,   KeyDefineEnum.KEY_Backspace,    KeyDefineEnum.KEY_CODE29,       KeyDefineEnum.KEY_ENTER,        KeyDefineEnum.KEY_R_SHIFT,          KeyDefineEnum.KEY_R_CTRL, 	 	 	   	       
	//-------------------------------------------------------------------------------------------------------------14
	
	KeyDefineEnum.KEY_PRINT,        KeyDefineEnum.KEY_INS,          KeyDefineEnum.KEY_DEL,          KeyDefineEnum.NONE,             KeyDefineEnum.NONE,                 KeyDefineEnum.KEY_LeftArrow,     	         
	//-------------------------------------------------------------------------------------------------------------15
	KeyDefineEnum.KEY_SCRLOCK,      KeyDefineEnum.KEY_HOME,         KeyDefineEnum.KEY_END,          KeyDefineEnum.NONE,             KeyDefineEnum.KEY_UpArrow,          KeyDefineEnum.KEY_DownArrow,	 												   
	//-------------------------------------------------------------------------------------------------------------16
	KeyDefineEnum.KEY_PAUSE,        KeyDefineEnum.KEY_PGUP,         KeyDefineEnum.KEY_PGDN,         KeyDefineEnum.NONE,             KeyDefineEnum.KEY_Mute,             KeyDefineEnum.KEY_RightArrow,							 
	
	//-------------------------------------------------------------------------------------------------------------17
	KeyDefineEnum.KEY_VolumD,       KeyDefineEnum.KEY_NUMLOCK,      KeyDefineEnum.KEY_NUM_7,        KeyDefineEnum.KEY_NUM_4,        KeyDefineEnum.KEY_NUM_1,            KeyDefineEnum.KEY_NUM_0,
	//-------------------------------------------------------------------------------------------------------------18
	KeyDefineEnum.KEY_VolumI,       KeyDefineEnum.KEY_NUM_DIV,      KeyDefineEnum.KEY_NUM_8,        KeyDefineEnum.KEY_NUM_5,        KeyDefineEnum.KEY_NUM_2,            KeyDefineEnum.NONE,	
	//-------------------------------------------------------------------------------------------------------------19
	KeyDefineEnum.KEY_Mute,         KeyDefineEnum.KEY_NUM_MUL,      KeyDefineEnum.KEY_NUM_9,        KeyDefineEnum.KEY_NUM_6,        KeyDefineEnum.KEY_NUM_3,            KeyDefineEnum.KEY_NUM_DOT,
	//-------------------------------------------------------------------------------------------------------------20			
	KeyDefineEnum.KEY_Calculator,   KeyDefineEnum.KEY_NUM_MINUS,    KeyDefineEnum.KEY_NUM_PLUS,     KeyDefineEnum.KEY_CODE107,      KeyDefineEnum.KEY_NUM_ENTER,        KeyDefineEnum.NONE,	
	//===============
	KeyDefineEnum.NONE,				KeyDefineEnum.NONE
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