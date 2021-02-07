// Zetta Scout

var Scout = require("zetta-scout");
var util = require('util');
var mqtt = require('mqtt');
var MqttScout = require('./led.js');
var LedDevice = require('./led.js');

var client = null; //mqtt client

var MqttScout = module.exports = function() {
    client = mqtt.connect();
    Scout.call(this);
}
util.inherits(MqttScout, Scout);


MqttScout.prototype.init = function(next) {
    var self = this;
    var led_topic = "home/arduino/led/"; // mqtt topics
    var temp_topic = "home/arduino/temp/"
    self.discover(LedDevice, led_topic); // discover LED device
    self.discover(TempDevice, temp_topic); // discover temp sensor device
    next();
}