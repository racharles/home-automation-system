// LED Device

var Device = require('zetta-device');
var util = require('util');
var mqtt = require('mqtt');

//connect to mqtt broker
var client = null;
client = mqtt.connect();

var LedDevice = module.exports = function (_name, _topic) {
  Device.call(this);
  this.name = _name;
  this.topic = _topic;

  Device.call(this);
}
util.inherits(LedDevice, Device);


LedDevice.prototype.init = function (config) {
  // Set up the state machine
  config
    .type('led')
    .state('off')
    .name(this.name)
    // Define the transitions allowed by the state machine
    .when('off', { allow: ['turn-on']}) // TODO: fix transitions
    .when('on', { allow: ['turn-off']})

    // Map the transitions to JavaScript methods
    .map('turn-off', this.turnOff)
    .map('turn-on', this.turnOn)

  var self = this;
};


LedDevice.prototype.turnOff = function (cb) {
  console.log("turnoff");
    client.publish(this.topic + "control", "off"); //publish off signal to mqtt topic
  this.state = 'off';
  cb();
}

LedDevice.prototype.turnOn = function (cb) {
  console.log("turnon");
  client.publish(this.topic + "control", "on"); //publish on signal to mqtt topic
  this.state = 'on';
  cb();
}