#include "Variable.h"

//start address 0xa400,total 512bytes



//�洢��flash��ַ��ʼ
const U8 code profile_active_data[PROFILE_SIZE]={//128��byte�洢״̬
	0,//CurrentProfile
	3,//CurrentReportRate:0~3
	3,//CurrentRepeat:0~3
	0,//CurrentDebounce:0~3
	0,//CurrentMacroMode:���ֵ�ĸ�4bit��Ϊ0����4bit��0~3����ʾ�ǹ̶�ʱ���macro�������4bit��Ϊ0����macro����ʱ��ʵ��¼��ʱ�����
	0,//����
	19,//CurrentLedMode:0x00~0x29		LedModeLumian
	0x04,//����	LedModeSpeed
	0x0b,//����	LedModeColor
	0,	//����	10	LedModeSelect
	11,//11,// 	CurrentLedMode1
	0x20,//All Key Lock	CurrentLedMode2		
	1,//13
	0,//StatusLedMode1��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//StatusLedMode2��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//Log����ģʽ:0:�����޺罥��,��\��\�ϳ���,�ص�OFF,ʹ��APP��FN���ѭ���л�	
	0,//Log��������+�����ٶ�: 0~3 -- 4s,6s,8s,10s	
	0,//����	18
	0,//����
	0,//����20
	0,//����
	0,//����
	0,//CurrentReportRate:0~3
	0X99,//CurrentRepeat:0~3		24
	10,//����ʱ�� ����30s
	0,//CurrentMacroMode:���ֵ�ĸ�4bit��Ϊ0����4bit��0~3����ʾ�ǹ̶�ʱ���macro�������4bit��Ϊ0����macro����ʱ��ʵ��¼��ʱ�����
	0,//����
	0,//CurrentLedMode:0x00~0x29
	0,//����
	0,//����
	0,//����
	0,//Win lock
	0,//All Key Lock		
	0,//Swap ASDW ��������
	0,//StatusLedMode1��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//StatusLedMode2��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//Log����ģʽ:0:�����޺罥��,��\��\�ϳ���,�ص�OFF,ʹ��APP��FN���ѭ���л�	
	0,//Log��������+�����ٶ�: 0~3 -- 4s,6s,8s,10s
	0,
	0,
	0,
	0,
	0,	
	0,
	0,
	0,			
	0,	
	0,
	0,
	0,
	0x64,	
	1,
	1,
	0,			
	0,	
	0x01,		//0~55
//LED Profile0�����µƹ�ģʽ״̬	
//����Ϊ��ͬLED����ģʽ�µ����ȼ������ٶ�,Ŀǰ����Ϊ���5�����ȣ�5���仯�ٶ�
//ÿ��ģʽʹ��1��byte���洢״̬
//��4bitΪLED���ȿ��ƣ���4bit�ٶȿ��� 
	Bin(11111111),//LED_MODE 0	�ص�   ����
	Bin(11111111),//LED_MODE 0	       ��ɫ+�ٶ� 
  
	Bin(00010100),//LED_MODE 1  
	Bin(00010111),//LED_MODE 1  	
  
	Bin(00010100),//LED_MODE 2  
	Bin(00010111),//LED_MODE 2  
  
	Bin(00010100),//LED_MODE 3  
	Bin(00010111),//LED_MODE 3  
  
	Bin(00010100),//LED_MODE 4  
	Bin(00010111),//LED_MODE 4
  
	Bin(00010100),//LED_MODE 5  
	Bin(00010111),//LED_MODE 5  
  
	Bin(00010100),//LED_MODE 6  
	Bin(00010111),//LED_MODE 6  
  
	Bin(00010100),//LED_MODE 7  
	Bin(00010111),//LED_MODE 7  
  
	Bin(00010100),//LED_MODE 8  
	Bin(00010111),//LED_MODE 8 
  
	Bin(00010100),//LED_MODE 9   
	Bin(00010111),//LED_MODE 9  	
  
	Bin(00010100),//LED_MODE 10  
	Bin(00010111),//LED_MODE 10  
  
	Bin(00010100),//LED_MODE 11  
	Bin(00010111),//LED_MODE 11  
  
	Bin(00010100),//LED_MODE 12  
	Bin(00010111),//LED_MODE 12 
  
	Bin(00010100),//LED_MODE 13  
	Bin(00010111),//LED_MODE 13  
  
	Bin(00010100),//LED_MODE 14  
	Bin(00010111),//LED_MODE 14  
  
	Bin(00010100),//LED_MODE 15   
	Bin(00010111),//LED_MODE 15  
  
	Bin(00010100),//LED_MODE 16	
	Bin(00010111),//LED_MODE 16	
  
	Bin(00010100),//LED_MODE 17  
	Bin(00010111),//LED_MODE 17  
	
	Bin(00010100),//LED_MODE 18  
	Bin(00010111),//LED_MODE 18  
  
	Bin(00010100),//LED_MODE 19 
	Bin(00010111),//LED_MODE 19 
  
	Bin(00010100),         //����
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //����  		
  
	Bin(00010100),         //����  
	Bin(00010111),         //����
  
	Bin(00010100),         //����  
	Bin(00010111),         //����  
  
	Bin(00010100),         //���� 
	Bin(00010111),         //����  
  
	Bin(00010100),         //����
	Bin(00010111),         //����  	  
  
	Bin(00010100),         //���� 
	Bin(00010111),         //����  
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
	
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����	
	0x5a,//����
	0xa5//����
};
const U8 code profile_backup_data[PROFILE_SIZE]=   //128��byte�洢״̬
{
	0,//CurrentProfile
	3,//CurrentReportRate:0~3
	3,//CurrentRepeat:0~3
	0,//CurrentDebounce:0~3
	0,//CurrentMacroMode:���ֵ�ĸ�4bit��Ϊ0����4bit��0~3����ʾ�ǹ̶�ʱ���macro�������4bit��Ϊ0����macro����ʱ��ʵ��¼��ʱ�����
	0,//����
	19,//CurrentLedMode:0x00~0x29		LedModeLumian
	0x04,//����	LedModeSpeed
	0x0b,//����	LedModeColor
	0,	//����	10	LedModeSelect
	11,//11,// 	CurrentLedMode1
	0x20,//All Key Lock	CurrentLedMode2		
	1,//13
	0,//StatusLedMode1��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//StatusLedMode2��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//Log����ģʽ:0:�����޺罥��,��\��\�ϳ���,�ص�OFF,ʹ��APP��FN���ѭ���л�	
	0,//Log��������+�����ٶ�: 0~3 -- 4s,6s,8s,10s	
	0,//����	18
	0,//����
	0,//����20
	0,//����
	0,//����
	0,//CurrentReportRate:0~3
	0X99,//CurrentRepeat:0~3		24
	10,//����ʱ�� ����30s
	0,//CurrentMacroMode:���ֵ�ĸ�4bit��Ϊ0����4bit��0~3����ʾ�ǹ̶�ʱ���macro�������4bit��Ϊ0����macro����ʱ��ʵ��¼��ʱ�����
	0,//����
	0,//CurrentLedMode:0x00~0x29
	0,//����
	0,//����
	0,//����
	0,//Win lock
	0,//All Key Lock		
	0,//Swap ASDW ��������
	0,//StatusLedMode1��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//StatusLedMode2��״̬LED������ģʽ: 7����ɫ+1�ֽ���
	0,//Log����ģʽ:0:�����޺罥��,��\��\�ϳ���,�ص�OFF,ʹ��APP��FN���ѭ���л�	
	0,//Log��������+�����ٶ�: 0~3 -- 4s,6s,8s,10s
	0,
	0,
	0,
	0,
	0,	
	0,
	0,
	0,			
	0,	
	0,
	0,
	0,
	0x64,	
	1,
	1,
	0,			
	0,	
	0x01,		//0~55
//LED Profile0�����µƹ�ģʽ״̬	
//����Ϊ��ͬLED����ģʽ�µ����ȼ������ٶ�,Ŀǰ����Ϊ���5�����ȣ�5���仯�ٶ�
//ÿ��ģʽʹ��1��byte���洢״̬
//��4bitΪLED���ȿ��ƣ���4bit�ٶȿ��� 
	Bin(11111111),//LED_MODE 0	�ص�   ����
	Bin(11111111),//LED_MODE 0	       ��ɫ+�ٶ� 
  
	Bin(00010100),//LED_MODE 1  
	Bin(00010111),//LED_MODE 1  	
  
	Bin(00010100),//LED_MODE 2  
	Bin(00010111),//LED_MODE 2  
  
	Bin(00010100),//LED_MODE 3  
	Bin(00010111),//LED_MODE 3  
  
	Bin(00010100),//LED_MODE 4  
	Bin(00010111),//LED_MODE 4
  
	Bin(00010100),//LED_MODE 5  
	Bin(00010111),//LED_MODE 5  
  
	Bin(00010100),//LED_MODE 6  
	Bin(00010111),//LED_MODE 6  
  
	Bin(00010100),//LED_MODE 7  
	Bin(00010111),//LED_MODE 7  
  
	Bin(00010100),//LED_MODE 8  
	Bin(00010111),//LED_MODE 8 
  
	Bin(00010100),//LED_MODE 9   
	Bin(00010111),//LED_MODE 9  	
  
	Bin(00010100),//LED_MODE 10  
	Bin(00010111),//LED_MODE 10  
  
	Bin(00010100),//LED_MODE 11  
	Bin(00010111),//LED_MODE 11  
  
	Bin(00010100),//LED_MODE 12  
	Bin(00010111),//LED_MODE 12 
  
	Bin(00010100),//LED_MODE 13  
	Bin(00010111),//LED_MODE 13  
  
	Bin(00010100),//LED_MODE 14  
	Bin(00010111),//LED_MODE 14  
  
	Bin(00010100),//LED_MODE 15   
	Bin(00010111),//LED_MODE 15  
  
	Bin(00010100),//LED_MODE 16	
	Bin(00010111),//LED_MODE 16	
  
	Bin(00010100),//LED_MODE 17  
	Bin(00010111),//LED_MODE 17  
	
	Bin(00010100),//LED_MODE 18  
	Bin(00010111),//LED_MODE 18  
  
	Bin(00010100),//LED_MODE 19 
	Bin(00010111),//LED_MODE 19 
  
	Bin(00010100),         //����
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //����  		
  
	Bin(00010100),         //����  
	Bin(00010111),         //����
  
	Bin(00010100),         //����  
	Bin(00010111),         //����  
  
	Bin(00010100),         //���� 
	Bin(00010111),         //����  
  
	Bin(00010100),         //����
	Bin(00010111),         //����  	  
  
	Bin(00010100),         //���� 
	Bin(00010111),         //����  
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
  
	Bin(00010100),         //����  
	Bin(00010111),         //���� 
	
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����
	Bin(00010100),         //����	
	0x5a,//����
	0xa5//����
};
const U8 code Profile_tab_temp[256]={0,0,0,0};

