
#ifndef	_KEY_DECODE_H
#define	_KEY_DECODE_H
/////////////////////////normal key decode///////////////////////////////////////////
//Kbuf[2]
#define   KEY_A            				0x04   //8
#define   KEY_B            				0x05   //9
#define   KEY_C            				0x06	 //c
#define   KEY_D            				0x07   //e
//Kbuf[3]
#define   KEY_E           				0x08  
#define   KEY_F            				0x09
#define   KEY_G            				0x0a
#define   KEY_H            				0x0b
#define   KEY_I            				0x0c
#define   KEY_J            				0x0d
#define   KEY_K            				0x0e
#define   KEY_L            				0x0f  
//Kbuf[4]
#define   KEY_M            				0x10
#define   KEY_N            				0x11
#define   KEY_O            				0x12
#define   KEY_P            				0x13
#define   KEY_Q            				0x14
#define   KEY_R            				0x15
#define   KEY_S            				0x16
#define   KEY_T            				0x17
//Kbuf[5]
#define   KEY_U            				0x18
#define   KEY_V            				0x19
#define   KEY_W            				0x1a
#define   KEY_X            				0x1b
#define   KEY_Y            				0x1c
#define   KEY_Z            				0x1d
#define   KEY_1          					0x1e
#define   KEY_2          					0x1f 
//Kbuf[6]
#define   KEY_3          					0x20
#define   KEY_4          					0x21
#define   KEY_5          					0x22
#define   KEY_6          					0x23
#define   KEY_7          					0x24
#define   KEY_8          					0x25
#define   KEY_9          					0x26
#define   KEY_0          					0x27
////////////////////////////////
//Kbuf[7]
#define   KEY_ENTER        				0x28
#define   KEY_ESC          				0x29 
#define   KEY_Backspace    				0x2a      
#define   KEY_TAB          				0x2b
#define   KEY_SPACEBAR     				0x2c
#define   KEY_Underscore      		0x2d   //xia hua xian
#define   KEY_EqualSign       		0x2e   //deng hao
#define   KEY_L_Brackets      		0x2f   //zuo zhong kuo hao
//Kbuf[8]
#define   KEY_R_Brackets      		0x30   //you zhong kuo hao
#define   KEY_Slash           		0x31   //xie gang      //shu xian

#define   KEY_Semicolon       		0x33   //fen hao
#define   KEY_Quotation       		0x34   //yin hao
#define   KEY_TILDE           		0x35   //bo lang
#define   KEY_COMMA           		0x36   //dou hao
#define   KEY_PERIOD          		0x37   //ju hao
//Kbuf[9]
#define   KEY_Interrogation   		0x38   //dun hao
#define   KEY_CAPSLOCK     				0x39
#define   KEY_F1         					0x3a
#define   KEY_F2         					0x3b
#define   KEY_F3         					0x3c
#define   KEY_F4         					0x3d
#define   KEY_F5         					0x3e
#define   KEY_F6         					0x3f
//Kbuf[10]
#define   KEY_F7         					0x40
#define   KEY_F8         					0x41
#define   KEY_F9         					0x42
#define   KEY_F10        					0x43
#define   KEY_F11        					0x44
#define   KEY_F12        					0x45        
#define   KEY_PRINT		    				0x46
#define   KEY_SCRLOCK       			0x47
//Kbuf[11]
#define   KEY_PAUSE         			0x48
#define   KEY_INS           			0x49
#define   KEY_HOME            		0x4a
#define   KEY_PGUP           			0x4b
#define   KEY_DEL           			0x4c
#define   KEY_END              		0x4d
#define   KEY_PGDN         				0x4e
#define   KEY_RightArrow       		0x4f
//Kbuf[12]
#define   KEY_LeftArrow        		0x50
#define   KEY_DownArrow        		0x51
#define   KEY_UpArrow          		0x52
#define   KEY_NUMLOCK          		0x53
#define   KEY_NUM_DIV          		0x54
#define   KEY_NUM_MUL          		0x55
#define   KEY_NUM_MINUS        		0x56        
#define   KEY_NUM_PLUS         		0x57
//Kbuf[13]
#define   KEY_NUM_ENTER        		0x58
#define   KEY_NUM_1       				0x59
#define   KEY_NUM_2       				0x5a
#define   KEY_NUM_3       				0x5b
#define   KEY_NUM_4       				0x5c            
#define   KEY_NUM_5       				0x5d
#define   KEY_NUM_6       				0x5e
#define   KEY_NUM_7       				0x5f
//Kbuf[14]
#define   KEY_NUM_8       				0x60
#define   KEY_NUM_9       				0x61
#define   KEY_NUM_0       				0x62
#define   KEY_NUM_DOT          		0x63
#define   KEY_CODE45      				0x64
#define   KEY_APP         				0x65
//Kbuf[15]
#define   KEY_F13        					0x68
#define   KEY_F14        					0x69
#define   KEY_F15        					0x6A

/////////////////////////////////////////////////////////////////////////
#define   KEY_CODE29      				0x31
#define   KEY_CODE42      				0x32
#define   KEY_CODE107     				0x85
#define   KEY_CODE56      				0x87
#define   KEY_CODE133     				0x88
#define   KEY_CODE14      				0x89
#define   KEY_CODE132     				0x8a
#define   KEY_CODE131     				0x8b
#define   KEY_CODE151     				0x90   //key_Hangul
#define   KEY_CODE150    				 	0x91   //Key_Hanja

//****************************************************************
//Modify key
//#define   KEY_L_CTRL       				0x060000e0
//#define   KEY_L_SHIFT      				0x060000e1
//#define   KEY_L_ALT        				0x060000e2
//#define   KEY_L_WIN        				0x060000e3
//#define   KEY_R_CTRL       				0x060000e4
//#define   KEY_R_SHIFT      				0x060000e5
//#define   KEY_R_ALT        				0x060000e6
//#define   KEY_R_WIN        				0x060000e7
#define   KEY_L_CTRL       		0x00010000    //e0
#define   KEY_L_SHIFT      		0x00020000    //e1
#define   KEY_L_ALT        		0x00040000    //e2
#define   KEY_L_WIN        		0x00080000    //e3
#define   KEY_R_CTRL       		0x00100000    //e4
#define   KEY_R_SHIFT      		0x00200000    //e5
#define   KEY_R_ALT        		0x00400000    //e6
#define   KEY_R_WIN        		0x00800000    //e7
//****************************************************************
#define   KEY_NextTr      				0x020000b5//0xE8
#define   KEY_PrevTr      				0x020000b6//0xE9
#define   KEY_Stop        				0x020000b7//0xEA
#define   KEY_Eject       				0x020000b8//0xEB
#define   KEY_PlayPause   				0x020000cd//0xEC
#define   KEY_Mute        				0x020000E2//0xED
#define   KEY_VolumI      				0x020000e9//0xEE  //+
#define   KEY_VolumD     	 				0x020000ea//0xEF  //-

#define   KEY_Media       				0x02000183//F0
#define   KEY_Email       				0x0200018a//F1
#define   KEY_Calculator  				0x02000192//F2
#define   KEY_MyComputer  				0x02000194//F3
#define   KEY_Search      				0x02000221//F4
#define   KEY_WWW         				0x02000223//F5
#define   KEY_Back        				0x02000224//F6
#define   KEY_Forward     				0x02000225//F7

#define   KEY_iStop       				0x02000226
#define   KEY_Refresh     				0x02000227
#define   KEY_Favorites   				0x0200022a
//****************************************************************
//macro中的mouse key定义
#define   MOUSE_L      			0x01
#define   MOUSE_R      			0x02
#define   MOUSE_M      		0x04
#define   MOUSE_B4     		0x08
#define   MOUSE_B5     		0x10
#define   MOUSE_LT     			0xff
#define   MOUSE_RT        		0x01
#define   MOUSE_UP     		0xff
#define   MOUSE_DN     		0x01

//****************************************************************
//组合键功能 
#define   KEY_CTRL_UP	  		0x00010000 | KEY_UpArrow	
#define   KEY_WIN_D	  		0x00080000 | KEY_D
//#define   KEY_O_L  					KEY_O | KEY_L
//****************************************************************
//****************************************************************
//BYTE1:1左键、2右键、3中键、4前进键、5后退键、6左摆、7右摆、8上滚轮、9下滚轮、10X轴左、11X轴右、12Y轴上、13Y轴下
//BYTE2:0xff火力键、0单击一次（按下发按下码，释放发释放码）、1双击、2三连击
//BYTE3:击打重复时间，0默认间隔时间
//Mouse key
#define   KEY_L_BUTTON			0x01010100
#define   KEY_R_BUTTON			0x01020100
#define   KEY_M_BUTTON			0x01030100
#define   KEY_RB0_BUTTON		0x01040100
#define   KEY_RB1_BUTTON		0x01050100
#define   KEY_TL_BUTTON			0x01060100
#define   KEY_TR_BUTTON			0x01070100
#define   KEY_SCROLLUP_BUTTON   0x01080100
#define   KEY_SCROLLDN_BUTTON   0x01090100
#define   KEY_MS_X_L   					0x010A0000
#define   KEY_MS_X_R   					0x010B0000
#define   KEY_MS_Y_L   					0x010C0000
#define   KEY_MS_Y_R   					0x010D0000
//****************************************************************
//多媒体键
#define   KEY_SysBkBrigthInc  0x0200006f
#define   KEY_SysBkBrigthDec  0x02000070
#define   KEY_IOSBack    			0x02000040//F7

#define   KEY_NextTr      		0x020000b5//0xE8
#define   KEY_PrevTr      		0x020000b6//0xE9
#define   KEY_Stop        		0x020000b7//0xEA
#define   KEY_Eject       		0x020000b8//0xEB
#define   KEY_PlayPause   		0x020000cd//0xEC
#define   KEY_Mute        		0x020000E2//0xED
#define   KEY_VolumI      		0x020000e9//0xEE  //+
#define   KEY_VolumD     	 		0x020000ea//0xEF  //-

#define   KEY_Media       		0x02000183//F0
#define   KEY_Email       		0x0200018a//F1
#define   KEY_Calculator  		0x02000192//F2
#define   KEY_MyComputer  		0x02000194//F3
#define   KEY_Search      		0x02000221//F4
#define   KEY_WWW         		0x02000223//F5
#define   KEY_Back        		0x02000224//F6
#define   KEY_Forward     		0x02000225//F7

#define   KEY_iStop       		0x02000226
#define   KEY_Refresh     		0x02000227
#define   KEY_Favorites   		0x0200022a

//****************************************************************
//byte3：0x03表示是macro；byte2，用来表示macro的循环方式；byte1：循环次数  byte0：用来表示macro序号
//byte2：暂时定义如下
//0x01	指定循环次数，0x02循环到任意键按下，0x03循环到当前键松开
//Macro Key
#define   KEY_MACRO0       		0x03000000	
#define   KEY_MACRO1       		0x03000001

//****************************************************************
//通过冒泡端口发送自定义的键值，用于驱动特殊功能处理（例：打开固定的链接）
//自定义键
#define   KEY_Define1      		0x04000001	
#define   KEY_Define2      		0x04000002
//****************************************************************
//特殊功能键
#define   SP_SWAP_ASDW			0x07000000		 //取反ASWD与方向
#define   SP_Winlock				0x07000001		 //WIN Lock
#define   SP_Allkeylock     0x07000002	 	 //所有键锁住
#define   SP_MACRO_REC0		  0x07000003	 	 //MACRO录制键
#define   SP_ProfileReset		0x07000004		 //所有参数恢复默认

#define   SP_BT_DEV0				0x07000005			//蓝牙模式0
#define   SP_BT_DEV1				0x07000006			//蓝牙模式1
#define   SP_BT_DEV2				0x07000007			//蓝牙模式2
#define   SP_BT_DEV3				0x07000008			//2.4G模式
#define   SP_BT_DEV4				0x07000009			//USB模式
#define   SP_TEST_EMI				0x0700000a			//无线进入测试
#define   SP_KB_Mode				0x07000015			//无线进入测试
#define   SP_Screen_Left			0x0700000B			//screen left
#define   SP_Screen_Right			0x0700000C			//screen right

#define   SP_Home_key				0x0700000D			//HOME key
#define		SP_MUTE_key				0x0700000E			//HOME key

#define   SP_Windows_Mode		0x07000020			//进入Windows
#define   SP_Mac_Mode				0x07000021			//进入Mac

#define   SP_Save_Time			0x07000022			//

#define   SP_O_Mode		     0x07000012			//组合键白光定义
#define   SP_L_Mode				 0x0700000F			//组合键白光定义
#define		SP_LED_OFF			 0x07000013
//****************************************************************
//byte0：固定0x08
//byte1：0灯效切换，1灯效方向，2颜色切换，3亮度切换，4速度切换，5启动游戏高手录制，6游戏高手保存，7录制/保存，8复位，9灯效模式指定
//byte2：0循环，1+/左，2-/右，如果byte1为9，具体数字值代表当前模式
//byte3：0主键区，1附灯1，2附灯2
#define   MAXLEDMODE1		   	17			 //0~11
//灯光模式设定
#define   KEY_LED_MODE0     		0x08090000		//直接设定为模式0
#define   KEY_LED_MODE1     		0x08090100		//直接设定为模式1
#define   KEY_LED_MODE2    			0x08090200		//直接设定为模式2
#define   KEY_LED_MODE3   			0x08090300		//直接设定为模式3

#define   MAXLEDMODE2		   			36			 //0~9
#define   KEY_LED_MODE20 				0x08091300		//直接设定为模式20
#define   KEY_LED_MODE21 				0x08092100		//直接设定为模式21
#define   KEY_LED_MODE22 				0x08092200		//直接设定为模式22

#define   KEY_LED_MODEL 				0x08000000		//直接设定为模式+
#define   KEY_LED_MODEI 				0x08000100		//直接设定为模式-
#define   KEY_LED_MODED 				0x08000200		//直接设定为模式LOOP

#define   KEY_Logo_MODEL 				0x08000101		//直接设定为模式+
#define   KEY_Logo_MODEI 				0x08000201		//直接设定为模式-
#define   KEY_Logo_MODED 				0x08000001		//直接设定为模式LOOP

#define   KEY_Define_LED_MODEL 	0x08000300		//直接设定为模式+
#define   KEY_Define_LED_MODEI 	0x08000400		//直接设定为模式-
#define   KEY_Define_LED_MODED 	0x08000500		//直接设定为模式LOOP


//灯光方向设定
#define   KEY_LED_DirectionL 	  0x08010000		//灯效方向LOOP
#define   KEY_LED_DirectionI 	  0x08010100		//灯效方向左
#define   KEY_LED_DirectionD 	  0x08010200		//灯效方向右

#define   MAXLEDCOLORMODE			  0x07
//灯光颜色设定
#define   KEY_LED_COLOR_MODEI		0x08020100		//直接设定为颜色+
#define   KEY_LED_COLOR_MODED		0x08020200		//直接设定为颜色-
#define   KEY_LED_COLOR_MODEL		0x08020000		//直接设定为颜色LOOP

#define   KEY_Logo_COLOR_MODEI	0x08020101		//直接设定为颜色+
#define   KEY_Logo_COLOR_MODED	0x08020201		//直接设定为颜色-
#define   KEY_Logo_COLOR_MODEL	0x08020001		//直接设定为颜色LOOP

#define   MAXLEDLUM							0x04
//灯光亮度luminance设定
#define   KEY_LED_LUMINI				0x08030100		//直接设定为模式+
#define   KEY_LED_LUMIND				0x08030200		//直接设定为模式-
#define   KEY_LED_LUMINL				0x08030000		//直接设定为模式LOOP

#define   MAXLEDBREATH					0x03
//灯光亮度呼吸速度breath设定
#define   KEY_LED_BREATHI     	0x08040100		//直接设定为呼吸速度+
#define   KEY_LED_BREATHD     	0x08040200		//直接设定为呼吸速度-
#define   KEY_LED_BREATHL 			0x08040000		//直接设定为呼吸速度LOOP

//游戏高手
#define   SP_LED_REC_Start		 0x08050000	 	 //LED录制键启动
#define   SP_LED_REC_Save			 0x08060000	 	 //LED录制键保存
#define   SP_LED_REC					 0x08070000	 	 //LED录制键启动/保存


#define   SP_LED_REC_Reset		 0x08080000	 	 //LED恢复出厂设置
#define   SP_KB_REC_Reset		   0x08ff0000	 	 //键盘恢复出厂设置


#define		MAXLOGOSPEED				0x04
#define		MAXLOGOLUMIAN				0x04
#define		MAXLOGOCOLOR				0x07
#define		MAXLOGOMODE					0x07


//****************************************************************
#define   MAXREPRATE		   	0x03			 //0~3
//ReportRate设定
#define   KEY_REPORT_RATE0    	0x09000000		//直接设定为125
#define   KEY_REPORT_RATE1    	0x09000001		//直接设定为250
#define   KEY_REPORT_RATE2    	0x09000002		//直接设定为500
#define   KEY_REPORT_RATE3			0x09000003		//直接设定为1000
#define   KEY_REPORT_RATEI   		0x09010000		//回报率档位加
#define   KEY_REPORT_RATED   	 	0x09020000		//回报率档位减
#define   KEY_REPORT_RATEL 			0x09030000		//回报率档位循环

//****************************************************************
//FN键
#define   KEY_Fn1          			0x0d000000
#define   KEY_Fn2          			0x0d010000
//****************************************************************
//电源键
#define   KEY_Power       		0x10000001
#define   KEY_Sleep       		0x10000002
#define   KEY_WakeUp      		0x10000004
/*
code const U32 KeyMatrix[126]=
{
		KEY_ESC,0,KEY_F1,KEY_F2,KEY_F3,KEY_F4,KEY_F5,KEY_F6,KEY_F7,KEY_F8,KEY_F9,KEY_F10,KEY_F11,KEY_F12,KEY_PRINT,KEY_SCRLOCK,KEY_PAUSE,0,0,0,0,
//-------------------------------------------------------------------------------------------------------------------------------------------	
		KEY_TILDE,KEY_1,KEY_2,KEY_3,KEY_4,KEY_5,KEY_6,KEY_7,KEY_8,KEY_9,KEY_0,KEY_Underscore,KEY_EqualSign,KEY_Backspace,KEY_INS,KEY_HOME,KEY_PGUP,KEY_NUMLOCK,KEY_NUM_DIV,KEY_NUM_MUL,KEY_NUM_MINUS,
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		KEY_TAB,KEY_Q,KEY_W,KEY_E,KEY_R,KEY_T,KEY_Y,KEY_U,KEY_I,KEY_O,KEY_P,KEY_L_Brackets,KEY_R_Brackets,KEY_Slash,KEY_DEL,KEY_END,KEY_PGDN,KEY_NUM_7,KEY_NUM_8,KEY_NUM_9,KEY_NUM_PLUS,
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		KEY_CAPSLOCK,KEY_A,KEY_S,KEY_D,KEY_F,KEY_G,KEY_H,KEY_J,KEY_K,KEY_L,KEY_Semicolon,KEY_Quotation,0,KEY_ENTER,0,0,0,KEY_NUM_4,KEY_NUM_5,KEY_NUM_6,0,
//----------------------------------------------------------------------------------------------------------------------------------------------------
//		KEY_L_SHIFT,KEY_Z,KEY_X,KEY_C,KEY_V,KEY_B,KEY_N,KEY_M,KEY_COMMA,KEY_PERIOD,KEY_Interrogation,0,KEY_R_SHIFT,0,0,KEY_UpArrow,0,KEY_NUM_1,KEY_NUM_2,KEY_NUM_3,KEY_NUM_ENTER,
		KEY_L_SHIFT,0,KEY_Z,KEY_X,KEY_C,KEY_V,KEY_B,KEY_N,KEY_M,KEY_COMMA,KEY_PERIOD,KEY_Interrogation,0,KEY_R_SHIFT,0,KEY_UpArrow,0,KEY_NUM_1,KEY_NUM_2,KEY_NUM_3,KEY_NUM_ENTER,

	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		KEY_L_CTRL,KEY_L_WIN,KEY_L_ALT,0,0,KEY_SPACEBAR,0,0,KEY_R_ALT,KEY_R_WIN,KEY_APP,0,KEY_R_CTRL,0,KEY_LeftArrow,KEY_DownArrow,KEY_RightArrow,KEY_NUM_0,0,KEY_NUM_DOT,0,
};
*/

/*
code const U32 KeyMatrix[126]=
{
		KEY_ESC,0,KEY_F1,KEY_F2,KEY_F3,KEY_F4,KEY_F5,KEY_F6,KEY_F7,KEY_F8,KEY_F9,KEY_F10,KEY_F11,KEY_F12,KEY_PRINT,KEY_SCRLOCK,KEY_PAUSE,0,0,0,0,
//-------------------------------------------------------------------------------------------------------------------------------------------	
		KEY_TILDE,KEY_1,KEY_2,KEY_3,KEY_4,KEY_5,KEY_6,KEY_7,KEY_8,KEY_9,KEY_0,KEY_Underscore,KEY_EqualSign,KEY_Backspace,KEY_INS,KEY_HOME,KEY_PGUP,KEY_NUMLOCK,KEY_NUM_DIV,KEY_NUM_MUL,KEY_NUM_MINUS,
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		KEY_TAB,KEY_Q,KEY_W,KEY_E,KEY_R,KEY_T,KEY_Y,KEY_U,KEY_I,KEY_O,KEY_P,KEY_L_Brackets,KEY_R_Brackets,KEY_Slash,KEY_DEL,KEY_END,KEY_PGDN,KEY_NUM_7,KEY_NUM_8,KEY_NUM_9,KEY_NUM_PLUS,
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		KEY_CAPSLOCK,KEY_A,KEY_S,KEY_D,KEY_F,KEY_G,KEY_H,KEY_J,KEY_K,KEY_L,KEY_Semicolon,KEY_Quotation,0,KEY_ENTER,0,0,0,KEY_NUM_4,KEY_NUM_5,KEY_NUM_6,0,
//----------------------------------------------------------------------------------------------------------------------------------------------------

//	KEY_L_SHIFT,KEY_Z,KEY_X,KEY_C,KEY_V,KEY_B,KEY_N,KEY_M,KEY_COMMA,KEY_PERIOD,KEY_Interrogation,0,KEY_R_SHIFT,0,0,KEY_UpArrow,0,KEY_NUM_1,KEY_NUM_2,KEY_NUM_3,KEY_NUM_ENTER,
		KEY_L_SHIFT,KEY_Z,KEY_X,KEY_C,KEY_V,KEY_B,KEY_N,KEY_M,KEY_COMMA,KEY_PERIOD,KEY_Interrogation,0,0,KEY_R_SHIFT,0,KEY_UpArrow,0,KEY_NUM_1,KEY_NUM_2,KEY_NUM_3,KEY_NUM_ENTER,

	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//		KEY_L_CTRL,KEY_L_WIN,KEY_L_ALT,0,0,KEY_SPACEBAR,0,0,KEY_R_ALT,KEY_R_WIN,KEY_APP,0,KEY_R_CTRL,0,KEY_LeftArrow,KEY_DownArrow,KEY_RightArrow,KEY_NUM_0,0,KEY_NUM_DOT,0,
		KEY_L_CTRL,KEY_L_WIN,KEY_L_ALT,0,0,KEY_SPACEBAR,0,0,KEY_R_ALT,KEY_R_WIN,KEY_APP,0,0,KEY_R_CTRL,KEY_LeftArrow,KEY_DownArrow,KEY_RightArrow,KEY_NUM_0,0,KEY_NUM_DOT,0,
};

*/
/****************************************************************************************/


//code const U8 scan_out[8]={
//    	0xfe,
//    	0xfd,
//    	0xfb,
//    	0xf7,
//    	0xef,
//    	0xdf,
//    	0xbf,
//    	0x7f
//     };

#define KEY_SCAN_TIME_USB_MODE   			2           //1ms
#define KEY_SCAN_TIME_WIRELESS_MODE   2           //1ms

#define USB_KEY_PRESS_DEBOUNCE_CNT   2
#define TP24G_KEY_PRESS_DEBOUNCE_CNT   2

#define KEY_RELEASE_DEBOUNCE_CNT  6
#endif
