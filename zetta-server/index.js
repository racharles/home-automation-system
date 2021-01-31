/**
 * Zetta Server Prototype v0
 *
 * Zetta Server running on Raspberry Pi sends message to switch LED on and off through MQTT broker.
 * Arduino listens for MQTT message, switches LED on and off.
 *
 * HW:
 * Raspberry Pi 4
 * Arduino Nano 33 Iot
 * LED
 *
 * @summary Zetta Server that switches LED on and off through MQTT
 * @author Rachel Bai
 * Last modified: 1/31/2021
 */

process.EventEmitter = require('events').EventEmitter; // fixes zetta v1.5.1
var zetta = require('zetta');
var mqttScout = require('./scout.js');


zetta()
  .name('Prototype Zetta Server')
  .use(mqttScout)
  .listen(1337, function() {
     console.log('Zetta is running at http://127.0.0.1:1337');
});

