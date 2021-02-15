# Home Automation System
## Prototype v0.1 Setup:
---
### **Raspberry Pi**


#### 1. Install Mosquitto MQTT Broker
Open a new terminal and install Mosquitto
```
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
sudo apt clean
```
#### 2. Set up Zetta
Install Node.js and NPM [download node.js](https://nodejs.org/en/download/)\
Verify node and npm are installed correctly with ```node -v``` and ```npm -v```
Make sure zetta-server is on Pi\
Navigate to the zetta-server directory\
Open a new terminal and navigate to the zetta-server directory\
Initialize Node.js using ```npm init``` with all defaults\
Install zetta Node.js module with ```npm install zetta --save```\
Install Mqtt.js module with with ```npm install mqtt```\
To test, run ```node index.js``` to start the server\
Zetta server should start and discover the LED device and Temp sensor device\

#### 3. Interact with Zetta Server
On the Pi, a tool like advanced REST client or cURL can be used to interact with the zetta api\
Use a get request in ARC or run ```curl http://127.0.0.1:1337``` to see the Zetta API.\
Use ```curl http://127.0.0.1:1337/servers/Prototype%20Zetta%20Server``` to see the devices.\
The URL can be followed to individual devices, which each have their unique id.\
To transition the state of the LED, use ```curl -i -X POST [href link to device] -d'action=turn-on'```\
Alternatively, a REST client can be used for POST requests as well.

### **Arduino**
Navigate to the mqtt_arduino directory\
In arduino_secrets.h, change USER and PASS to the wifi network that the Pi is connected to\
In mqtt_arduino.ino, change the broker address to the ip address of the Pi\
Open sketch in Arduino IDE [download Arduino IDE](https://www.arduino.cc/en/software)\
Go to Arduino Library Manager (Tools -> Manage Libraries) and install ArduinoMqttClient and WiFiNINA libraries\
Upload sketch to Arduino board


### **Hardware**
* Raspberry Pi 4
* Arduino Nano 33 Iot
* 5mm LED
* TMP36 temperature sensor





---