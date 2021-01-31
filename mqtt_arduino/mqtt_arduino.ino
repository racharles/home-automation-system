/*
Arduino MQTT for Prototype v0

Subscribes to another mqtt topic to control a LED.
*/

#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>

#include "arduino_secrets.h"
char ssid[] = SECRET_SSID; // your network SSID (name)
char pass[] = SECRET_PASS; // your network password (use for WPA, or use as key for WEP)

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "192.168.0.191";               // Address of the MQTT broker, which is on raspberry pi
int port = 1883;                                     // default mqtt port
const char sub_topic[] = "home/arduino/led/control"; //subscribes to this topic
const char post_topic[] = "home/arduino/temp/data"; //post to this topic
unsigned long previousMillis_temp = 0;
const long temp_interval = 1000;
String subMessage = "";

int ledPin = 2;

void setup()
{
    //Initialize serial
    Serial.begin(9600);

    pinMode(ledPin, OUTPUT);

    // attempt to connect to Wifi network:
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    while (WiFi.begin(ssid, pass) != WL_CONNECTED)
    {
        // failed, retry
        Serial.print(".");
        delay(5000);
    }

    Serial.println("You're connected to the network");
    Serial.println();
    Serial.print("Attempting to connect to the MQTT broker: ");
    Serial.println(broker);

    while (!mqttClient.connect(broker, port))
    {
        Serial.print("MQTT connection failed! Error code = ");
        Serial.println(mqttClient.connectError());
    }

    Serial.println("You're connected to the MQTT broker");
    Serial.println();
    // subscribe to the topic
    mqttClient.subscribe(sub_topic);
}

void loop()
{
    // call poll() regularly to allow the library to send MQTT keep alives
    mqttClient.poll();
    // message handler
    int messageSize = mqttClient.parseMessage();

    if (messageSize)
    {
        subMessage = "";
        // received a message, print out the topic and contents
        Serial.print("Received a message with topic '");
        Serial.print(mqttClient.messageTopic());
        Serial.print("', length ");
        Serial.print(messageSize);
        Serial.println(" bytes:");

        // use the Stream interface to print the contents
        while (mqttClient.available())
        {
            subMessage = subMessage + (char)mqttClient.read();
        }
        Serial.println(subMessage);

        // LED transitions
        if (subMessage == "on")
        {
            digitalWrite(ledPin, HIGH);
        }
        else if (subMessage == "off")
        {
            digitalWrite(ledPin, LOW);
        }
    }
    // send message, the Print interface can be used to set the message contents
    // read the input on analog pin 0:

    // unsigned long currentMillis = millis();

    // if (currentMillis - previousMillis_temp >= temp_interval)
    // {
    //     previousMillis_temp = currentMillis; //reset timing

    //     int sensorValue = analogRead(tempPin);
    //     float voltage = sensorValue * 3.3; // converting reading to voltage, using 3.3v here
    //     voltage /= 1024.0;
    //     float temperature = (voltage - 0.5) * 100; //converting from 10 mv per degree wit 500 mV offset

    //     mqttClient.beginMessage(post_topic);
    //     mqttClient.print("TEMP ");
    //     mqttClient.print(temperature);
    //     mqttClient.endMessage();
    //     //debug
    //     //unsigned long millisdelay = millis() - previousMillis_temp;
    //     //Serial.println(millisdelay);
    // }
}
