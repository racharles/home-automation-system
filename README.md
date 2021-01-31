# home-automation-system
### Prototype v0 Setup
#### Raspberry Pi:
install Mosquitto MQTT Broker:
```
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
sudo apt clean
```

make sure zetta-server is on Pi\
open terminal and navigate to zetta-server directory\
run ```node index.js```\
Zetta server should start, led device discovered

On the pi, a tool like REST client can be used to interact with the zetta api, or cURL in the terminal.\
Send a post request to the LED device defined by the zetta server with action=turn-on or turn-off\

#### Arduino:
connect led to pins D2 and GND\
in arduino_secrets.h, change the SSID and PASS to the wifi network that the raspberry pi is connected to\
in mqtt_arduino.ino, change broker address to the ip address of the raspberry pi\
upload sketch to arduino
