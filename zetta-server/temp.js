// Temp Sensor Device

var Device = require('zetta-device');
var util = require('util');
var mqtt = require('mqtt');

//connect to mqtt broker
var client = null;
client = mqtt.connect();

var TempDevice = module.exports = function (_name, _topic) {
  Device.call(this);
  this.name = _name;
  this.topic = _topic;
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
  
  client.subscribe(this.topic + "data");
  // mqtt listener
  client.on('message', function(topic, message, packet) {
    console.log(message.toString());
    this.reading = message.toString();
  });

};