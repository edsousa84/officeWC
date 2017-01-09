
DO NOT FORGET TO PLUG PIN RST AND D0 (GPIO16 - USER - WAKE)

# Index: #

 1. GET STARTED
 2. TODO

# 1. GET STARTED #

## How to Install Esptool and Flash nodeMCU ##

You can check a complete tutorial here:

    https://nodemcu.readthedocs.io/en/master/en/flash/

## How to Install Node.js ##

    https://howtonode.org/how-to-install-nodejs

## Cheat Sheet ##


#### Flash example

	python esptool.py --port /dev/ttyUSB1 write_flash -fm dio -fs 32m 0x00000 nodemcu-master-18-modules-2016-10-07-14-52-07-integer.bin 0x3fc000 esp_init_data_default.bin

#### Esp8266 Nodemcu Dev Kit V3 Pins

![http://cdn.frightanic.com/blog/wp-content/uploads/2015/09/esp8266-nodemcu-dev-kit-v3-pins.jpg](docs/esp8266-nodemcu-dev-kit-v3-pins.jpg "I/O map")

#### Esp8266 Nodemcu GPIO Pin Index

![Problem with image: Check NodeMcu documentation](docs/GPIO_nodeMCU_PinIndex.png "NodeMCU GPIO")

#### DO NOT FORGET

 - DO NOT FORGET TO PLUG PIN RST AND D0 (GPIO16 - USER - WAKE)

# 2. TODO #

Ideas:

 - chat/mensagens
 - wait list
 - web Pop-up


LOG:
