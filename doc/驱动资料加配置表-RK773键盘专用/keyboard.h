
#ifndef  _KEYBOARD_H
#define  _KEYBOARD_H
#define   TOTAL_SCANLINE   21
////////////////////////////////
#define   KEY_BUF_END      0x08
#define   KEY_BUF_START    0x02
///////////////////////////////

#define   key_error        0x00

//==========================================================
//KEY_TYPE DEFINE
//==========================================================
#define		MS_KB					0x00			//���̰���
#define		MS_Mouse			0x01			//���?
#define		KB_Consumer		0x02			//���̶�ý��		
#define		KB_Macro			0x03			//�갴��
#define		KB_Define			0x04			//�Զ����?
#define		KB_Function		0x07			//���̹��ܼ�
#define		KB_LED_Dispose 0x08			//����LED����
#define		KB_ReportRate 0x09			//���̱�����
#define		KB_FN					0x0D			//����FN��
//****************************************************************
//��ֵ��ʽ�������£���4byte�ķ�ʽ���д洢
//0xaa bb cc dd
//aa:��ʾ������ģʽ
//bb:������չ
//cc:����ʵ��Ӧ�þ���
//dd:����ʵ��Ӧ�þ��� 
//****************************************************************
//��ͨ����0x0000ccdd
//bb:�ɼ���moddify key��������ϼ�����?
//cc:Ϊ����ļ��?
//dd:Ϊ����ļ��?
#define   KEY_A            	0x04
#define   KEY_B            	0x05
#define   KEY_C            	0x06
#define   KEY_D            	0x07
#define   KEY_E            	0x08
#define   KEY_F            	0x09
#define   KEY_G            	0x0a
#define   KEY_H            	0x0b
#define   KEY_I            	0x0c
#define   KEY_J            	0x0d
#define   KEY_K            	0x0e
#define   KEY_L            	0x0f
#define   KEY_M            	0x10
#define   KEY_N            	0x11
#define   KEY_O            	0x12
#define   KEY_P            	0x13
#define   KEY_Q            	0x14
#define   KEY_R            	0x15
#define   KEY_S            	0x16
#define   KEY_T            	0x17
#define   KEY_U            	0x18
#define   KEY_V            	0x19
#define   KEY_W            	0x1a
#define   KEY_X            	0x1b
#define   KEY_Y            	0x1c
#define   KEY_Z            	0x1d

#define   KEY_ESC          	0x29       
#define   KEY_TAB          	0x2b
#define   KEY_CAPSLOCK     	0x39
#define   KEY_Backspace    	0x2a
#define   KEY_ENTER        	0x28
#define   KEY_SPACEBAR     	0x2c

#define   KEY_TILDE        	0x35   //bo lang
#define   KEY_Underscore    0x2d   //xia hua xian
#define   KEY_EqualSign     0x2e   //deng hao
#define   KEY_L_Brackets    0x2f   //zuo zhong kuo hao
#define   KEY_R_Brackets    0x30   //you zhong kuo hao
#define   KEY_Slash         0x31   //xie gang      //shu xian
#define   KEY_Semicolon     0x33   //fen hao
#define   KEY_Quotation     0x34   //yin hao
#define   KEY_COMMA         0x36   //dou hao
#define   KEY_PERIOD        0x37   //ju hao
#define   KEY_Interrogation	0x38   //dun hao
//////////////////////////////
#define   KEY_1          		0x1e
#define   KEY_2          		0x1f
#define   KEY_3          		0x20
#define   KEY_4          		0x21
#define   KEY_5          		0x22
#define   KEY_6          		0x23
#define   KEY_7          		0x24
#define   KEY_8          		0x25
#define   KEY_9          		0x26
#define   KEY_0          		0x27
////////////////////////////////
#define   KEY_F1         		0x3a
#define   KEY_F2         		0x3b
#define   KEY_F3         		0x3c
#define   KEY_F4         		0x3d
#define   KEY_F5         		0x3e
#define   KEY_F6         		0x3f
#define   KEY_F7         		0x40
#define   KEY_F8         		0x41
#define   KEY_F9         		0x42
#define   KEY_F10        		0x43
#define   KEY_F11        		0x44
#define   KEY_F12        		0x45
#define   KEY_F13        		0x68
#define   KEY_F14        		0x69
#define   KEY_F15        		0x6A
         
#define   KEY_PRINT		   		0x46
#define   KEY_SCRLOCK    		0x47
#define   KEY_PAUSE      		0x48
#define   KEY_INS        		0x49
#define   KEY_HOME       		0x4a
#define   KEY_PGUP       		0x4b
#define   KEY_DEL        		0x4c
#define   KEY_END        		0x4d
#define   KEY_PGDN       		0x4e

#define   KEY_RightArrow 		0x4f
#define   KEY_LeftArrow  		0x50
#define   KEY_DownArrow  		0x51
#define   KEY_UpArrow    		0x52

#define   KEY_NUMLOCK    		0x53
#define   KEY_NUM_DIV    		0x54
#define   KEY_NUM_MUL    		0x55
#define   KEY_NUM_MINUS  		0x56        
#define   KEY_NUM_PLUS   		0x57
#define   KEY_NUM_ENTER  		0x58
#define   KEY_NUM_DOT    		0x63

#define   KEY_NUM_1       	0x59
#define   KEY_NUM_2       	0x5a
#define   KEY_NUM_3       	0x5b
#define   KEY_NUM_4       	0x5c            
#define   KEY_NUM_5       	0x5d
#define   KEY_NUM_6       	0x5e
#define   KEY_NUM_7       	0x5f
#define   KEY_NUM_8       	0x60
#define   KEY_NUM_9       	0x61
#define   KEY_NUM_0       	0x62

#define   KEY_CODE29      	0x31
#define   KEY_CODE42      	0x32
#define   KEY_CODE45      	0x64
#define   KEY_APP         	0x65
#define   KEY_CODE107     	0x85
#define   KEY_CODE56      	0x87
#define   KEY_CODE133     	0x88
#define   KEY_CODE14      	0x89
#define   KEY_CODE132     	0x8a
#define   KEY_CODE131     	0x8b
#define   KEY_CODE151     	0x90   //key_Hangul
#define   KEY_CODE150     	0x91   //Key_Hanja

//****************************************************************
//Modify key
#define   KEY_L_CTRL       		0x00010000
#define   KEY_L_SHIFT      		0x00020000
#define   KEY_L_ALT        		0x00040000
#define   KEY_L_WIN        		0x00080000
#define   KEY_R_CTRL       		0x00100000
#define   KEY_R_SHIFT      		0x00200000
#define   KEY_R_ALT        		0x00400000
#define   KEY_R_WIN        		0x00800000
//****************************************************************
//macro�е�modify key����
#define   CTRL_L      			0xe0
#define   SHIFT_L      			0xe1
#define   ALT_L        			0xe2
#define   WIN_L        			0xe3
#define   CTRL_R       			0xe4
#define   SHIFT_R      			0xe5
#define   ALT_R        			0xe6
#define   WIN_R        			0xe7
//****************************************************************
//macro�е�mouse key����
#define   MOUSE_L      			0x01
#define   MOUSE_R      			0x02
#define   MOUSE_M      		  0x04
#define   MOUSE_B4     		  0x08
#define   MOUSE_B5     		  0x10
#define   MOUSE_LT     			0xff
#define   MOUSE_RT        	0x01
#define   MOUSE_UP     		  0xff
#define   MOUSE_DN     		  0x01
//****************************************************************
//��ϼ�����? 
#define   KEY_win_shift_4	  	  0x000a0000 | KEY_4	
#define   KEY_win_shift_3	  	  0x000a0000 | KEY_3
#define   KEY_win_shift_ctrl_4	0x000b0000 | KEY_4	
#define   KEY_WIN_D	  			    0x00080000 | KEY_D
#define   KEY_WIN_SPACEBAR	  	0x00080000 | KEY_SPACEBAR//SIRI
#define   KEY_WIN_TAB	  		    0x00080000 | KEY_TAB//�����񴰿�
#define   KEY_WIN_E	  			    0x00080000 | KEY_E//�����б�

#define   KEY_ALT_SPACEBAR	  	0x00040000 | KEY_SPACEBAR//SIRI

#define   KEY_CTRL_UP	  		    0x00010000 | KEY_UpArrow	
#define   KEY_CTRL_DN	  		    0x00010000 | KEY_DownArrow	

#define   KEY_CTRL_C	  		    0x00010000 | KEY_C	
#define   KEY_CTRL_V	  		    0x00010000 | KEY_V
#define   KEY_ALT_TAB	  		    0x0004002B
//****************************************************************
//BYTE1:1�����?2�Ҽ���3�м���4ǰ������5���˼���6��ڡ�?7�Ұڡ�8�Ϲ��֡�9�¹��֡�10X����11X���ҡ�12Y���ϡ�13Y����
//BYTE2:0xff��������0����һ�Σ����·������룬�ͷŷ��ͷ��룩��1˫����2������
//BYTE3:�����ظ�ʱ�䣬0Ĭ�ϼ��ʱ��?
//Mouse key
#define   KEY_L_BUTTON			    0x01010100
#define   KEY_R_BUTTON			    0x01020100
#define   KEY_M_BUTTON			    0x01030100
#define   KEY_RB0_BUTTON		    0x01040100
#define   KEY_RB1_BUTTON		    0x01050100
#define   KEY_TL_BUTTON			    0x01060100
#define   KEY_TR_BUTTON			    0x01070100
#define   KEY_SCROLLUP_BUTTON   0x01080100
#define   KEY_SCROLLDN_BUTTON   0x01090100
#define   KEY_MS_X_L   					0x010A0000
#define   KEY_MS_X_R   					0x010B0000
#define   KEY_MS_Y_L   					0x010C0000
#define   KEY_MS_Y_R   					0x010D0000
//****************************************************************
//��ý���?
#define   KEY_SysBkBrigthInc  0x0200006f
#define   KEY_SysBkBrigthDec  0x02000070
#define   KEY_IOSBack    		  0x02000040//F7

#define   KEY_NextTr      		0x020000b5//0xE8
#define   KEY_PrevTr      		0x020000b6//0xE9
#define   KEY_Stop        		0x020000b7//0xEA
#define   KEY_Eject       		0x020000b8//0xEB
#define   KEY_PlayPause   		0x020000cd//0xEC
#define   KEY_Mute        		0x020000E2//0xED
#define   KEY_VolumI      		0x020000e9//0xEE  //+
#define   KEY_VolumD     	 	  0x020000ea//0xEF  //-

#define   KEY_Media       		0x02000183//F0
#define   KEY_Email       		0x0200018a//F1
#define   KEY_Calculator  		0x02000192//F2
#define   KEY_MyComputer  	  0x02000194//F3
#define   KEY_Search      		0x02000221//F4
#define   KEY_WWW         		0x02000223//F5
#define   KEY_Back        		0x02000224//F6
#define   KEY_Forward     		0x02000225//F7

#define   KEY_iStop       		0x02000226
#define   KEY_Refresh     		0x02000227
#define   KEY_Favorites   		0x0200022a

#define   MAC_F3   		0x0200029F
#define   MAC_F4   		0x020002A0
//****************************************************************
//byte3��0x03��ʾ��macro��byte2��������ʾmacro��ѭ����ʽ��byte1��ѭ������  byte0��������ʾmacro���?
//byte2����ʱ��������
//0x01	ָ��ѭ��������0x02ѭ������������£�?0x03ѭ������ǰ���ɿ�
//Macro Key
#define   KEY_MACRO0       		0x03000000	
#define   KEY_MACRO1       		0x03000001

//****************************************************************
//ͨ��ð�ݶ˿ڷ����Զ���ļ�ֵ�������������⹦�ܴ�����������?�̶������ӣ�
//�Զ����?
#define   KEY_Define1      		0x04000001	
#define   KEY_Define2      		0x04000002
//****************************************************************
//���⹦�ܼ�
#define   SP_SWAP_ASDW			0x07000000		 //ȡ��ASWD�뷽��
#define   SP_Winlock			  0x07000001		 //WIN Lock
#define   SP_Allkeylock     0x07000002	 	 //���м���ס
#define   SP_MACRO_REC0		  0x07000003	 	 //MACRO¼�Ƽ�
#define   SP_ProfileReset		0x07000004		 //���в����ָ�Ĭ��

#define   SP_BT_DEV0			  0x07000005			//����ģʽ0
#define   SP_BT_DEV1			  0x07000006			//����ģʽ1
#define   SP_BT_DEV2			  0x07000007			//����ģʽ2
#define   SP_BT_DEV3			  0x07000008			//2.4Gģʽ
#define   SP_BT_DEV4			  0x07000009			//USBģʽ
#define   SP_TEST_EMI			  0x0700000a			//���߽������?

#define   SP_LedOnOff			  0x0700000b

#define   SP_BatView			  0x0700000c      //电量显示
#define   SP_Power_Mode		  0x0700000c			//电量显示

#define   SP_WinMacMode			0x0700000d
#define   SP_Windows_Mode		0x0700000e			//����Windows
#define   SP_Mac_Mode			  0x0700000f			//����Mac

#define   SP_KB_Mode        0x07000010

#define   SP_O_Mode				0x07000022			//����Mac
#define   SP_L_Mode				0x07000023			//����Mac


//****************************************************************
//byte0���̶�0x08
//byte1��0��Ч�л���1��Ч����2��ɫ�л���3�����л���4�ٶ��л���5������Ϸ����¼�ƣ�6��Ϸ���ֱ��棬7¼��/���棬8��λ��9��Чģʽָ��
//byte2��0ѭ����1+/��2-/�ң����byte1Ϊ9����������ֵ������ǰģʽ
//byte3��0��������1����1��2����2
#define   MAXLEDMODE1		   	17			 //0~11
//�ƹ�ģʽ�趨
#define   KEY_LED_MODE0       0x08090000		//ֱ���趨Ϊģʽ0
#define   KEY_LED_MODE1       0x08090100		//ֱ���趨Ϊģʽ1
#define   KEY_LED_MODE2    		0x08090200		//ֱ���趨Ϊģʽ2
#define   KEY_LED_MODE3   		0x08090300		//ֱ���趨Ϊģʽ3

#define   MAXLEDMODE2		   		36			 //0~9
#define   KEY_LED_MODE20 			0x08092000		//ֱ���趨Ϊģʽ20
#define   KEY_LED_MODE21 			0x08092100		//ֱ���趨Ϊģʽ21
#define   KEY_LED_MODE22 			0x08092200		//ֱ���趨Ϊģʽ22
//��Ч�л�
#define   KEY_LED_MODEL       0x08000000		//ֱ���趨Ϊģʽ+
#define   KEY_LED_MODEI       0x08000100		//ֱ���趨Ϊģʽ-
#define   KEY_LED_MODED 			0x08000200		//ֱ���趨ΪģʽLOOP

#define   KEY_Define_LED_MODEL  0x08000300		//ֱ���趨Ϊģʽ+
#define   KEY_Define_LED_MODEI  0x08000400		//ֱ���趨Ϊģʽ-
#define   KEY_Define_LED_MODED 	0x08000500		//ֱ���趨ΪģʽLOOP


//��Ч����
#define   KEY_LED_DirectionL 	0x08010000		//��Ч����LOOP
#define   KEY_LED_DirectionI 	0x08010100		//��Ч������
#define   KEY_LED_DirectionD 	0x08010200		//��Ч������

#define   MAXLEDCOLORMODE			0x07
//��ɫ�л�
#define   KEY_LED_COLOR_MODEI  0x08020100		//ֱ���趨Ϊ��ɫ+
#define   KEY_LED_COLOR_MODED  0x08020200		//ֱ���趨Ϊ��ɫ-
#define   KEY_LED_COLOR_MODEL	 0x08020000		//ֱ���趨Ϊ��ɫLOOP

#define   MAXLEDLUM						0x04
//����
#define   KEY_LED_LUMINI     	0x08030100		//ֱ���趨Ϊģʽ+
#define   KEY_LED_LUMIND     	0x08030200		//ֱ���趨Ϊģʽ-
#define   KEY_LED_LUMINL 			0x08030000		//ֱ���趨ΪģʽLOOP

#define   MAXLEDBREATH			0x03
//�ٶ�
#define   KEY_LED_BREATHI   0x08040100		//  +
#define   KEY_LED_BREATHD   0x08040200		//  -
#define   KEY_LED_BREATHL   0x08040000		//  

//¼��
#define   SP_LED_REC_Start  0x08050000	 	 //LED¼�Ƽ�����
#define   SP_LED_REC_Save		0x08060000	 	 //LED¼�Ƽ�����
#define   SP_LED_REC				0x08070000	 	 //LED¼�Ƽ�����/����
#define   SP_LED_REC_Reset  0x08080000	 	 //LED�ָ���������

//logo
#define		  KEY_LOG_MODEL			0x08000001		//ֱ���趨Ϊģʽ+
#define   	KEY_LOG_MODEI 			0x08000101		//ֱ���趨Ϊģʽ-
#define   	KEY_LOG_MODED 			0x08000201		//ֱ���趨ΪģʽLOOP

#define   KEY_LOG_DirectionL 		0x08010001		//��Ч����LOOP
#define   KEY_LOG_DirectionI 		0x08010101		//��Ч������
#define   KEY_LOG_DirectionD 		0x08010201		//��Ч������

#define   KEY_LOG_COLOR_MODEI  		0x08020101		//ֱ���趨Ϊ��ɫ+
#define   KEY_LOG_COLOR_MODED  		0x08020201		//ֱ���趨Ϊ��ɫ-
#define   KEY_LOG_COLOR_MODEL	 	0x08020001		//ֱ���趨Ϊ��ɫLOOP

#define   KEY_LOG_LUMINI     		0x08030101		//ֱ���趨Ϊģʽ+
#define   KEY_LOG_LUMIND     		0x08030201		//ֱ���趨Ϊģʽ-
#define   KEY_LOG_LUMINL 			0x08030001		//ֱ���趨ΪģʽLOOP

#define   KEY_LOG_BREATHI     		0x08040101		//ֱ���趨Ϊ�����ٶ�+
#define   KEY_LOG_BREATHD     		0x08040201		//ֱ���趨Ϊ�����ٶ�-
#define   KEY_LOG_BREATHL 			0x08040001		//ֱ���趨Ϊ�����ٶ�LOOP


#define		MAXLOGOSPEED			0x04
#define		MAXLOGOLUMIAN			0x04
#define		MAXLOGOCOLOR			0x06
#define		MAXLOGOMODE				10
//****************************************************************
#define   MAXREPRATE		   	0x03			 //0~3
//ReportRate�趨
#define   KEY_REPORT_RATE0    0x09000000		//ֱ���趨Ϊ125
#define   KEY_REPORT_RATE1    0x09000001		//ֱ���趨Ϊ250
#define   KEY_REPORT_RATE2    0x09000002		//ֱ���趨Ϊ500
#define   KEY_REPORT_RATE3   	0x09000003		//ֱ���趨Ϊ1000
#define   KEY_REPORT_RATEI   	0x09010000		//�ر��ʵ�λ��
#define   KEY_REPORT_RATED    0x09020000		//�ر��ʵ�λ��
#define   KEY_REPORT_RATEL 		0x09030000		//�ر��ʵ�λѭ��

//****************************************************************
//FN��
#define   KEY_Fn1          		0x0d000000
#define   KEY_Fn2          		0x0d010000
//****************************************************************
//��Դ��
#define   KEY_Power       		0x10000001
#define   KEY_Sleep       		0x10000002
#define   KEY_WakeUp      		0x10000004

#endif







