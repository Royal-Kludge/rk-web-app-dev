#include "Variable.h"

//start address 0xa400,total 512bytes



//存储到flash地址开始
const U8 code profile_active_data[PROFILE_SIZE]={//128个byte存储状态
	0,//CurrentProfile
	3,//CurrentReportRate:0~3
	3,//CurrentRepeat:0~3
	0,//CurrentDebounce:0~3
	0,//CurrentMacroMode:如果值的高4bit都为0，低4bit在0~3，表示是固定时间的macro，如果高4bit不为0，则macro的延时由实际录制时间决定
	0,//保留
	19,//CurrentLedMode:0x00~0x29		LedModeLumian
	0x04,//保留	LedModeSpeed
	0x0b,//保留	LedModeColor
	0,	//保留	10	LedModeSelect
	11,//11,// 	CurrentLedMode1
	0x20,//All Key Lock	CurrentLedMode2		
	1,//13
	0,//StatusLedMode1：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//StatusLedMode2：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//Log背光模式:0:红蓝霓虹渐变,红\蓝\紫常亮,关灯OFF,使用APP和FN组合循环切换	
	0,//Log背光亮度+呼吸速度: 0~3 -- 4s,6s,8s,10s	
	0,//保留	18
	0,//保留
	0,//保留20
	0,//保留
	0,//保留
	0,//CurrentReportRate:0~3
	0X99,//CurrentRepeat:0~3		24
	10,//休眠时间 步进30s
	0,//CurrentMacroMode:如果值的高4bit都为0，低4bit在0~3，表示是固定时间的macro，如果高4bit不为0，则macro的延时由实际录制时间决定
	0,//保留
	0,//CurrentLedMode:0x00~0x29
	0,//保留
	0,//保留
	0,//保留
	0,//Win lock
	0,//All Key Lock		
	0,//Swap ASDW ←↑↓→
	0,//StatusLedMode1：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//StatusLedMode2：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//Log背光模式:0:红蓝霓虹渐变,红\蓝\紫常亮,关灯OFF,使用APP和FN组合循环切换	
	0,//Log背光亮度+呼吸速度: 0~3 -- 4s,6s,8s,10s
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
//LED Profile0条件下灯光模式状态	
//以下为不同LED亮灯模式下的亮度及呼吸速度,目前定义为最高5级亮度，5级变化速度
//每个模式使用1个byte来存储状态
//低4bit为LED亮度控制，高4bit速度控制 
	Bin(11111111),//LED_MODE 0	关灯   亮度
	Bin(11111111),//LED_MODE 0	       颜色+速度 
  
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
  
	Bin(00010100),         //保留
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留  		
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留 
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留
	Bin(00010111),         //保留  	  
  
	Bin(00010100),         //保留 
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
	
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留	
	0x5a,//保留
	0xa5//保留
};
const U8 code profile_backup_data[PROFILE_SIZE]=   //128个byte存储状态
{
	0,//CurrentProfile
	3,//CurrentReportRate:0~3
	3,//CurrentRepeat:0~3
	0,//CurrentDebounce:0~3
	0,//CurrentMacroMode:如果值的高4bit都为0，低4bit在0~3，表示是固定时间的macro，如果高4bit不为0，则macro的延时由实际录制时间决定
	0,//保留
	19,//CurrentLedMode:0x00~0x29		LedModeLumian
	0x04,//保留	LedModeSpeed
	0x0b,//保留	LedModeColor
	0,	//保留	10	LedModeSelect
	11,//11,// 	CurrentLedMode1
	0x20,//All Key Lock	CurrentLedMode2		
	1,//13
	0,//StatusLedMode1：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//StatusLedMode2：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//Log背光模式:0:红蓝霓虹渐变,红\蓝\紫常亮,关灯OFF,使用APP和FN组合循环切换	
	0,//Log背光亮度+呼吸速度: 0~3 -- 4s,6s,8s,10s	
	0,//保留	18
	0,//保留
	0,//保留20
	0,//保留
	0,//保留
	0,//CurrentReportRate:0~3
	0X99,//CurrentRepeat:0~3		24
	10,//休眠时间 步进30s
	0,//CurrentMacroMode:如果值的高4bit都为0，低4bit在0~3，表示是固定时间的macro，如果高4bit不为0，则macro的延时由实际录制时间决定
	0,//保留
	0,//CurrentLedMode:0x00~0x29
	0,//保留
	0,//保留
	0,//保留
	0,//Win lock
	0,//All Key Lock		
	0,//Swap ASDW ←↑↓→
	0,//StatusLedMode1：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//StatusLedMode2：状态LED的亮灯模式: 7种颜色+1种渐变
	0,//Log背光模式:0:红蓝霓虹渐变,红\蓝\紫常亮,关灯OFF,使用APP和FN组合循环切换	
	0,//Log背光亮度+呼吸速度: 0~3 -- 4s,6s,8s,10s
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
//LED Profile0条件下灯光模式状态	
//以下为不同LED亮灯模式下的亮度及呼吸速度,目前定义为最高5级亮度，5级变化速度
//每个模式使用1个byte来存储状态
//低4bit为LED亮度控制，高4bit速度控制 
	Bin(11111111),//LED_MODE 0	关灯   亮度
	Bin(11111111),//LED_MODE 0	       颜色+速度 
  
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
  
	Bin(00010100),         //保留
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留  		
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留 
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留
	Bin(00010111),         //保留  	  
  
	Bin(00010100),         //保留 
	Bin(00010111),         //保留  
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
  
	Bin(00010100),         //保留  
	Bin(00010111),         //保留 
	
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留
	Bin(00010100),         //保留	
	0x5a,//保留
	0xa5//保留
};
const U8 code Profile_tab_temp[256]={0,0,0,0};

