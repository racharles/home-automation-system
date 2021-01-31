// Temp Sensor Device

var Device = require('zetta-device');
var util = require('util');
var mqtt = require('mqtt');

//connect to mqtt broker
var client = null;
client = mqtt.connect();

var TempDevice = module.exports = function (_name, _client) {
  Device.call(this);
  this.name = _name;
  this.client = _client;
  this.reading = null;

  Device.call(this);
}
util.inherits(TempDevice, Device);


TempDevice.prototype.init = function (config) {
  // Set up the state machine
  config
    .type('temp')
    .monitor('reading')
    .name(this.name)

  var self = this;
  setInterval(function() {
    client.subscribe('home/arduino/temp/data');
    self.reading = 0;
  }, 1000);
};