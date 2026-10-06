---
title: "Guide 7: How to measure the different cables of a robot vacuum dead battery?"
---

> 📖 原教程：[iFixit #218621](https://www.ifixit.com/Guide/Guide+7:+How+to+measure+the+different+cables+of+a+robot+vacuum+dead+battery-/218621) · 难度：**很简单** · 耗时：10 minutes · 品类：Robotic Vacuum Cleaner

## 步骤

### 第 1 步

Taking advantage of the fact that I had a robot vacuum dead battery that came to me from a robot that was beyond repair, which has 5 wires, we are going to reverse-engineer it by disassembling it and seeing the purpose of each one of the wires.
These types of batteries are composed of 4 Li-ion, Lithium Ion 3.7V batteries, model 18650; the output amperage can vary from one model to another, this one is 2200 mA = 2.2 A.
Just remember that Lithium Ion batteries must be recharged with a voltage that increases progressively; they cannot be recharged like lead-acid ones at a fixed voltage.

![步骤图](https://guide-images.cdn.ifixit.com/igi/VbMgiYaNWTHQYQXC.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/vTaOJSOBFXGEFmpt.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/txcWCWY1V4knhgtU.medium)

### 第 2 步

Once the plastic casing is trimmed, we can see that the battery cells are connected in series, which was to be expected: 3.6 x 4 gives us the 14.4 V.
The two thick RED and BLACK battery terminals correspond to the 14.4 V.
The thin wires are soldered to the intermediate connections between each cell; this way, the device can compare the voltage of each of the 4 cells to determine if one is lower than the others. That is the "mystery of these wires."

![步骤图](https://guide-images.cdn.ifixit.com/igi/1KXQ1DOW13hXNilF.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/2UKcq52CTSxDJybL.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/Kc4DBC2aAAyfY2hF.medium)

### 第 3 步

Various views of the wiring.

![步骤图](https://guide-images.cdn.ifixit.com/igi/xdEOOXKUJOjVr5Oc.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/5VWcGjVHhSjuHdCp.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/OPQMy5PFIRPqqc3a.medium)

### 第 4 步

Photo 1: Measurement of total voltage. It is always a value higher than the nominal voltage, in this case 15.60 V.
Photo 2: Measurement between the negative terminal and the yellow wire; we are actually measuring 3 dead batteries in series = 11.58 V.
Photo 3: Measurement between the negative terminal and the center tap of the 4 dead batteries; we are measuring 2 dead batteries, 7.7 V.

![步骤图](https://guide-images.cdn.ifixit.com/igi/Y3vI5pZLOBobTKAa.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/3XnGInAEaTsPrea2.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/1F1TVGwxLLAeAofM.medium)

### 第 5 步

Measurement of the first dead battery, black cable and red center tap.

![步骤图](https://guide-images.cdn.ifixit.com/igi/iDeD3wA4ogufoAE1.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/NYmbbHvcnSbgfBko.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/31ZHSEsSgDog6Lnl.medium)

### 第 6 步

Measure the voltage between the intermediate taps, Red / Black / Yellow wires.
Circuit diagram.

![步骤图](https://guide-images.cdn.ifixit.com/igi/LNvm2gWAEDukSZHL.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/vFs1piPPadNW45vb.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/TvmC1qo2lPcPDEEy.medium)

### 第 7 步

Photo of the hand-drawn schematic; when we don't have more information about something, we perform reverse engineering by disassembling it, measuring, and taking our own personal notes. A different technique helps each person, but this one has always been a great help to me.
Other guides on robotic vacuum cleaner batteries: [[Topic:Robotic Vacuum Cleaner]]
End of the guide.

![步骤图](https://guide-images.cdn.ifixit.com/igi/nJJqDRKXcBGL3qDA.medium)

## 完成

To reassemble your device, follow these instructions in reverse order.

---

*内容来自 [iFixit](https://www.ifixit.com)，遵循 CC BY-NC-SA 协议，仅作个人学习用途。*
