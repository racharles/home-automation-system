/**
 * Zetta Server Prototype v0.1
 *
 * Zetta Server running on Raspberry Pi sends message to switch LED on and off through MQTT broker.
 * At same time, Zetta Server receives continous temperature data from Arduino.
 * Arduino sends temperature data and listens for MQTT message to switch LED on and off.
 *
 * HW:
 * Raspberry Pi 4
 * Arduino Nano 33 Iot
 * LED
 * TMP36 temperature sensor
 *
 * @summary Zetta Server that collects temperature data and switches LED on and off through MQTT
 * @author Rachel Bai
 * Last modified: 2/7/2021
 */

process.EventEmitter = require('events').EventEmitter; // fixes zetta v1.5.1
var zetta = require('zetta');
var mqttScout = require('./scout.js');


zetta()
  .name('Prototype Zetta Server v0.1')
  .use(mqttScout)
  .listen(1337, function() {
     console.log('Zetta is running at http://127.0.0.1:1337');
});

