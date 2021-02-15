// Temp Sensor Device

var Device = require('zetta-device');
var util = require('util');
var mqtt = require('mqtt');
var fs = require('fs');

// connect to mqtt broker
var client = null;
client = mqtt.connect();

// create and open new txt file to write to
var logger = fs.createWriteStream('data.txt', {
    flags: 'a' // append to prevent overwriting
})


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
        // write temp value and timestamp to data.txt
        logger.write(getDate());
        logger.write(" " + this.reading + "\n");
    });
};

function getDate() {
    // returns timestamp in YYYY-DD-MM HH:MM:SS format
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let seconds = date_ob.getSeconds();
    let minutes = date_ob.getMinutes();
    let hours = date_ob.getHours();

    // convert date & time into a string with YYYY-DD-MM HH:MM:SS format
    time = year + "-" + date + "-" + month + " " + hours + ":" + minutes + ":" + seconds;
    return time;
}