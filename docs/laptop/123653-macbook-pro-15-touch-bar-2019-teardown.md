---
title: "MacBook Pro 15\" Touch Bar 2019 Teardown"
---

> 📖 原教程：[iFixit #123653](https://www.ifixit.com/Teardown/MacBook+Pro+15-Inch+Touch+Bar+2019+Teardown/123653) · 难度：**中等** · 耗时：No estimate · 品类：MacBook Pro 15" Touch Bar 2019

Apple’s newest MacBook Pro is its fastest yet, featuring an optional eight-core processor—a first in a MacBook—and a mysterious new keyboard material. Since it’s unlikely that Apple’s going to expound on this ‘material,’ and we’re never satisfied with an unsolved mystery, it’s time [guide|111509|once again|new_window=true] to take a closer look at the [https://ifixit.org/blog/10229/macbook-pro-keyboard/|infamous] butterfly keyboard. Put on your detective hat and join us for a teardown!

Looking for more thrilling teardown mysteries? Follow us on [https://www.facebook.com/iFixit|Facebook], [https://www.instagram.com/ifixit/|Instagram], and [https://twitter.com/ifixit|Twitter] for all the latest teardown news. For news delivered, sign up for our [https://www.ifixit.com/Newsletter|newsletter].

## 需要的工具

- Mako Driver Kit - 64 Precision Bits
- Spudger
- Suction Handle
- iFixit Opening Picks (Set of 6)
- Tweezers

## 步骤

### 第 1 步

On paper, this new 2019 MacBook Pro is only a spec bump—but just how bumpy is it? Let's recap:
15.4" LED-backlit IPS Retina display with True Tone, 2880 x 1800 resolution (220 dpi), P3 wide color gamut
2.6 GHz 6-core Intel Core i7 (Turbo Boost up to 4.5 GHz) paired with a Radeon Pro 555X
16 GB of 2400 MHz DDR4 SDRAM
256 GB PCIe-based SSD
802.11ac Wi-Fi and Bluetooth 5.0
Four Thunderbolt 3 (USB-C) ports
Our teardown victim bears the familiar A1990 model number, but a new EMC number: '''3359'''.

![步骤图](https://guide-images.cdn.ifixit.com/igi/pLZMp1XoQ1uQHyGx.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/nAZKqoBkPKwXUTdp.medium)

### 第 2 步

Last time, we needed two [https://www.ifixit.com/Teardown/MacBook+Pro+13-Inch+Touch+Bar+2018+Teardown/111384|different|new_window=true] [https://www.ifixit.com/Teardown/MacBook+Pro+13-Inch+Touch+Bar+2018+Keyboard+Teardown/111509|teardowns|new_window=true] to get to the bottom of one of these laptops—so for once, let's skip the formalities.
Just like a cooking show, we cut out the nitty and get to the gritty—''voilà!'' It's open!
If you ''are'' curious about how to get inside, it's exactly the same procedure as the 2018 edition ... which we [https://www.ifixit.com/Device/MacBook_Pro_15%22_Touch_Bar_2018|already have guides for|new_window=true]!
As promised, this is looking ''mostly'' like a spec bump—the hardware appears visually indistinguishable from last time. Let's pull the board and look closer.

![步骤图](https://guide-images.cdn.ifixit.com/igi/rRX4GqLuONxEqaMu.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/EiBtjodFPtFPQFej.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/sTmBYrHCumcoTQyU.medium)

### 第 3 步

With zero modular components, there's no chance of upgrading any of this hardware. Speak now or forever hold your chips:
9th-generation Intel Core [https://ark.intel.com/content/www/us/en/ark/products/191045/intel-core-i7-9750h-processor-12m-cache-up-to-4-50-ghz.html|i7-9750H|new_window=true] 6-core processor
16x SK Hynix [https://www.skhynix.com/products.view.do?vseq=2005&cseq=73|H5AN8G8NAFR|new_window=true] 8 Gb DDR4 SDRAM (16 GB total)
AMD Radeon Pro 555X GPU
4x Micron [https://www.micron.com/products/graphics-memory/gddr5/part-catalog/mt51j256m32hf-70|MT51J256M32HF-70:B |new_window=true] 8 Gb GDDR5 RAM (4 GB total)
Apple T2 APL1027 339S00533 coprocessor, layered over 1 GB Micron D9VLN LPDDR4 memory
Toshiba TSB3226AW8815TWNA1 and TSB3226XZ2939TWNA1 flash storage (256 GB total)
Intel [https://ark.intel.com/content/www/us/en/ark/products/97400/intel-jhl7540-thunderbolt-3-controller.html|JHL7540|new_window=true] Thunderbolt 3 controller

![步骤图](https://guide-images.cdn.ifixit.com/igi/LWMIrFZIcqS4bOZU.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/icydeEDPySWDGFNV.medium)

### 第 4 步

More chips for your perusal:
Intel [https://ark.intel.com/content/www/us/en/ark/products/140579/mobile-intel-qms380-chipset.html|SR40F|new_window=true] platform controller hub
Texas Instruments CD3215C00Z (likely power controllers)
338S00267-A0 (likely Apple PMIC)
TPS51980A power controller
339S00458 (likely Apple Wi-Fi/Bluetooth module)
Intersil [https://www.renesas.com/us/en/www/doc/datasheet/isl6277a.pdf|6277A|new_window=true] PWM modulator
Cirrus Logic CS42L83A audio codec

![步骤图](https://guide-images.cdn.ifixit.com/igi/YhqovQvwYpxYrVRO.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/u4CsKSjCD4cNNc6d.medium)

### 第 5 步

Onward to the keyboard! Let's recap this butterfly's metamorphosis so far.
After making its debut in the 2015 [https://www.ifixit.com/Teardown/Retina+MacBook+2015+Teardown/39841#s89872|Retina MacBook|new_window=true], the butterfly keyboard landed on the MacBook Pro line for the first time in 2016 (pictured at left).
Designed to be super thin while accommodating off-center key presses, the keyboard proved controversial because of its extremely short throw—but soon proved unreliable as well.
In summer of 2018, [https://www.apple.com/support/keyboard-service-program-for-mac-notebooks/|Apple launched a repair program|new_window=true], privately blaming dust for jamming the keys—and released updated models with a [https://www.ifixit.com/Teardown/MacBook+Pro+13-Inch+Touch+Bar+2018+Teardown/111384#s213288|silicone membrane|new_window=true] protecting the key switches (middle image). [https://www.wsj.com/graphics/apple-still-hasnt-fixed-its-macbook-keyboard-problem/|But problems have persisted.|new_window=true]
Lastly, 2019's butterfly switch revision keeps the silicone membrane, but tweaks the materials in the springy metal dome and the plasticky material that covers it.

![步骤图](https://guide-images.cdn.ifixit.com/igi/eXHaNFhocAKEqlaL.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/AqPyHDd52eQoSRVn.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/BNLWCGgmXE5paTah.medium)

### 第 6 步

Now that we have some context, let's go layer by layer through the ''key'' components of 2019's butterfly switch:
Topping it all off is the key cap. This has a handy label to tell users which key is broken.
The hinged white bracket is the "butterfly" mechanism controlling the key's motion—stabilizing it so as to travel up and down without tilting or wobbling.
Nesting within that bracket is a transparent cover that flexes with each key press, while keeping contaminants away from the dome switch underneath. The black dot at its center concentrates the force of your key press onto the switch.
The main character of this assembly is the springy [https://computer.howstuffworks.com/keyboard3.htm|metal dome switch|new_window=true]. It deforms when the key is pressed, bridging the board's six contacts—and then bounces back when you release the key.
Underneath the dome switch are [https://d3nevzfk7ii3be.cloudfront.net/igi/51uBdQFmJVvGpANN.full|six metal pads|new_window=true]. A keystroke registers whenever the top center pad is shorted to any of the other five pads.
To wrap it up, the silicone membrane covers the butterfly mechanism to keep debris from getting in and jamming it.

![步骤图](https://guide-images.cdn.ifixit.com/igi/yLThEr4A6JUH1Tiv.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/CZtAUxkQQbYuc4uB.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/sqBfCt3gdgTHNKud.medium)

### 第 7 步

So, what changed this year? First, the transparent switch cover material.
The cover in the 2018 model is semi-opaque, somewhat tacky, and feels like silicone. The new model is clearer and smooth to the touch.
To confirm that the materials are indeed different, we analyzed them using Fourier Transform Infrared (FTIR) spectroscopy. Thanks to Eric Beaton and [https://mate.calpoly.edu/|Cal Poly's Materials Engineering department|new_window=true] for their equipment and expertise!
[https://www.innovatechlabs.com/newsroom/672/stuff-works-ftir-analysis/|FTIR analysis|new_window=true] works by shining infrared light at a material and measuring how much light is absorbed and at what wavelengths. This data acts like a fingerprint that can be used to identify the material.
[https://d3nevzfk7ii3be.cloudfront.net/igi/BEMRhhgRkWg1eyIn.full|The differing peaks and valleys|new_window=true] on the [https://www.innovatechlabs.com/newsroom/1882/interpreting-analyzing-ftir-results/|FTIR spectra|new_window=true] for the two samples show us that they ''are'' different materials. But what are they?
When comparing these FTIR spectra to that of known polymers, the closest match for the 2018 model is either poly(acetylene) with aromatic urethane side groups, or a type of TPU (which seems more likely). The 2019 model is a match for polyamide (commonly known as nylon).
What this ''doesn't'' tell us is, just what problem Apple's engineers tried to solve using this updated material. Send us your ideas!

![步骤图](https://guide-images.cdn.ifixit.com/igi/6royuiqXZUwbhDp3.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/eJ5oakGkDFFD2qHW.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/r6tPSIrNQvN4LC4g.medium)

### 第 8 步

What else changed? We think the metal dome switch may have. Let's look closer.
The dome is like a really tiny [https://www.fillmorecontainer.com/media/catalog/product/r/l/rl-070_bong.jpg|jam lid|new_window=true] or [https://www.snapple.com/images/snapple_facts/snapple_fact_fbpreview.jpg|new_window=true|Snapple cap]—you press down and it springs back up.
If anything changes about the dome—if it's cracked or deformed—the key may behave erratically. Likewise, if the prongs break or bend, the key stops working.
There are myriad possible reasons for this switch to crack or wear out—manufacturing defects, plain old fatigue, prolonged heat, moisture, outgassing from other components, and corrosion are all common culprits.
It's entirely possible that ''several'' of these factors are contributing to switch failures, which could explain why Apple is having such a hard time untangling the problem. Fourth time's the charm?
These switches are also magnetized from the factory. Best guess as to their composition: ferritic stainless steel, with a thin polymer coating on the bottom. The difference in surface finish from the 2018 version (left) to the 2019 (right) indicates Apple may be using a revised heat treatment, or alloy, or possibly both.

![步骤图](https://guide-images.cdn.ifixit.com/igi/KD6QFnlXyuTjPLjL.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/6M4WAMWEQadGiEXI.medium)

![步骤图](https://guide-images.cdn.ifixit.com/igi/QfrjTQJeVTddWDbl.medium)

### 第 9 步

That's all she wrote!
Or perhaps "[https://www.wsj.com/graphics/apple-still-hasnt-fixed-its-macbook-keyboard-problem/|new_window=true|TThat's all sh wott]"
For now, at least. We'd love to hear from any materials engineers in the audience, and we'd love to take a peek at any failed keys we can get our hands on.
Meanwhile, the fundamental problem with this laptop remains—if the slightest thing ever goes wrong, you’ll be replacing half the machine. Even if the keyboard is ''perfect'' this time, you’re taking a gamble on [https://ifixit.org/blog/16943/macbook-pro-flexgate-repair-program/|everything else|new_window=true]. Our advice? Save your money.
With that, you can probably guess where this laptop lands on the repairability scale ...

![步骤图](https://guide-images.cdn.ifixit.com/igi/WHRF1SulmbeaQHp1.medium)

### 第 10 步：Final Thoughts

The 2019 MacBook Pro 15" with Touch Bar earns a '''1 out of 10''' on our repairability scale (10 is easiest to repair):
The trackpad can be removed and replaced with very little drama.
The processor, RAM, and flash memory are soldered to the logic board. Repairs and upgrades will be impractical at best.
The top case assembly, including the keyboard, battery, speakers, ''and'' Touch Bar, is glued together—making all those components impractical to replace separately.
The Touch ID sensor doubles as the power switch, and is paired with the T2 chip on the logic board. Fixing a broken power switch may require help from Apple, or a new logic board.

![步骤图](https://guide-images.cdn.ifixit.com/igi/qxEqsNUJhNPopNhV.medium)

---

*内容来自 [iFixit](https://www.ifixit.com)，遵循 CC BY-NC-SA 协议，仅作个人学习用途。*
