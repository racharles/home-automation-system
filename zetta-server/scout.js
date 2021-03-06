// Zetta Scout

var Scout = require("zetta-scout");
var util = require('util');
var mqtt = require('mqtt');
var MqttScout = require('./led.js');
var LedDevice = require('./led.js');
var TempDevice = require("./temp.js");

var client = null; //mqtt client

var MqttScout = module.exports = function() {
    client = mqtt.connect();
    Scout.call(this);
}
util.inherits(MqttScout, Scout);


MqttScout.prototype.init = function(next) {
    var self = this;
    var led_topic = "home/arduino/led/"; // mqtt topic
    var temp_topic = "home/arduino/temp/"; // mqtt topic
    self.discover(LedDevice, "arduino-led",led_topic); // discover LED device
    self.discover(TempDevice, "arduino-temp",temp_topic);
    next();
}