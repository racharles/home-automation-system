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
    var topic = "home/arduino/led/control"; // mqtt topic
    self.discover(LedDevice, "arduino"); // discover LED device
    next();
}