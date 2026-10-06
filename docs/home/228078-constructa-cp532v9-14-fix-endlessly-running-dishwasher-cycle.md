---
title: "Constructa CP532V9/14: Fix endlessly running dishwasher cycle and cold water"
---

> 📖 原教程：[iFixit #228078](https://www.ifixit.com/Guide/Constructa+CP532V9-14:+Fix+endlessly+running+dishwasher+cycle+and+cold+water/228078) · 难度：**中等** · 耗时：2 hours · 品类：Constructa Dishwasher CP532V914

Constructa dishwasher[br]
E-number: CP532V9/14[br]
Type: SD13J1C

Problem: After turning it on, the cycle does not end and the water is cold when opened. Here I will show how to repair this problem and how to identify other sources for this issue.

Use this guide at your own risk. No liability is assumed for any damage or consequential loss.

## 需要的工具

- Soldering Iron
- Pozidriv PZ2 Screwdriver
- multi-meter to measure voltage

## 步骤

### 第 1 步：Accessing the electronics

Unplug the dishwasher. Always work in a de-energized state.
The electronics are located directly under the control buttons on the door.
Remove the cover; the screws are on the bezel behind the door.
Remove the metal plate on the front of the door; the screws are located on the bezel behind the door.
Remove the electronics bracket; the screws are located on the top of the side of the door.
The electronics are in a brown plastic box; unplug the box.
The image serves as a reference for the connectors. They must be fully inserted.

![步骤图](https://guide-images.cdn.ifixit.com/igi/6TQPZUapnrWjscy2.medium)

### 第 2 步：Soldering the PCB

On my PCB, the red marked solder joint was defective.
If your PCB does not have a defect there or at the pins directly below it, see step 3.
Simply resolder this pin with the soldering iron. (Heat it up and add solder)
Plug the PCB back in and reassemble the machine. Step 3 is not necessary.

![步骤图](https://guide-images.cdn.ifixit.com/igi/P4tqPFNmCGPLQXeh.medium)

### 第 3 步：Other potential problems

If the PCB was not the problem, you can search for other possibilities yourself. Unfortunately, I do not have a repair guide for this, only a diagnostic guide so that you know where the problem lies.
The flow heater is located at the bottom on the right side (your right side when you are standing in front of the machine). The side panel must be removed. The flow heater has the white cover in the middle of the picture. This can be ordered under part number 00491756.
The resistance must be approximately 25Ω between the left and right terminals (red cable and green-white cable).
The force sensitive squeeze button is the black body between the thick terminals. It is connected to the green-white and red-white cables. You can pull it out, and when pressing the gray button, there must be 0 Ω between its terminals, otherwise it is an open circuit.
The thermistor is above the flow heater, where two red cables go in. A value of 0 Ω must be measurable between the two red cables.
The thermistor is above the flow heater where two red cables go in. A 0Ω must be measurable between the two red cables.
If the measurements for one of these flow heater components were not as described, the component is defective.

![步骤图](https://guide-images.cdn.ifixit.com/igi/wpAixiiVHTiimoEs.medium)

## 完成

Follow the steps in reverse order to reassemble the device.

---

*内容来自 [iFixit](https://www.ifixit.com)，遵循 CC BY-NC-SA 协议，仅作个人学习用途。*
