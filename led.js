
//import required modules

var awsIot = require('aws-iot-device-sdk');
//var rpio = require('rpio');
console.log('starting');

//initialize GPIO21 to low
//rpio.open(40, rpio.OUTPUT, rpio.LOW);
console.log('GPIO21');

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(21, 'out'); //use GPIO pin 4 as output

//setup paths to certificates
var device = awsIot.device({
   keyPath: './cert/myraspi.private.key',
  certPath: './cert/myraspi.cert.pem',
    caPath: './cert/root-CA.crt',
  clientId: 'myraspi',
    region: 'us-west-2',
	host: 'a3gtmzhen03hjs.iot.us-west-2.amazonaws.com'
});

device
  .on('connect', function() {
	console.log('on connect...');
    //subscribe to the LED topic
    device.subscribe('$aws/things/myraspi/shadow/update/delta');
    //device.subscribe('LED');
    });
//$aws/things/myraspi/shadow/update/delta
//{"state":{
//"light":"on"
//}}

device
  .on('message', function(topic, payload) {

    // convert the payload to a JSON object
    var payload = JSON.parse(payload.toString());
    console.log(payload);

    //check for TOPIC name
    if(topic == '$aws/things/myraspi/shadow/update/delta' || topic == 'LED'){
        if(payload.state.light == 'on'){
         //rpio.write(40, rpio.HIGH);
			LED.writeSync(1); //turn LED on or off depending on the button state (0 or 1)
        } else {
        	 LED.writeSync(0);
        }
    }


  });
