---
title: "iRobot Roomba 980 Not Charging - Transistor Replacement"
---

> 📖 原教程：[iFixit #184235](https://www.ifixit.com/Guide/iRobot+Roomba+980+Not+Charging+-+Transistor+Replacement/184235) · 难度：**中等** · 耗时：No estimate · 品类：Irobot Roomba 980

[video|https://youtu.be/K3aggf3IBCc]

## 步骤

### 第 1 步：Charging dock is the cause

On this device, the replacement battery is fairly new.
The charging dock is flashing green.
Check if the Roomba charges with a lab power supply:
You will need 19.4 V DC at about 1.25 A. Pay attention to the correct connection for the + and - socket.
When connecting, the voltage drops to 13.6 V - the voltage of the replacement battery; the maximum charging current of about 600 mA is flowing.

### 第 2 步：Opening the charging dock

Disassemble the charging dock until you can reach the circuit boards. One of them is the switching power supply, and one controls the charging process.
Use an isolation transformer whenever possible when working with mains voltage on the switching power supply.
One of the transistors on the control board is significantly discolored; this is likely the cause. You can desolder it and test it with a transistor tester, for example.

![步骤图](https://guide-images.cdn.ifixit.com/igi/FxMOKgS5XQGQApQM.medium)

### 第 3 步：Finding a replacement transistor

The original PNP transistor STN790A is not very easy to find; a BDP948 is a suitable replacement. It can handle 45 V, up to 3A, and has the same housing (SOT223), so it should fit.
Be careful when soldering; capacitors may still be charged. Discharge them first.
The transistor must be well-soldered and sit flush so that it can dissipate its heat.

![步骤图](https://guide-images.cdn.ifixit.com/igi/oWepNShwNBMrSTNB.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/N2kUbbBIoRuLZyXb.medium)

### 第 4 步：Test

Without a connected Roomba, there is 2.87 V at the contacts. When the Roomba is connected, the transistor switches and the voltage rises to 13.4 V - the replacement battery is charged again.

## 完成

Follow these steps in reverse order to reassemble your device.

---

*内容来自 [iFixit](https://www.ifixit.com)，遵循 CC BY-NC-SA 协议，仅作个人学习用途。*
