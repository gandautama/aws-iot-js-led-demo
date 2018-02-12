# aws-iot-js-led-demo
Using AWS's IoT platform with the js SDK to control an LED connected to a Raspberry Pi using MQTT

This is fork version of aws-iot-js-led-demo which differs in:

1. Use shadow instead of real device.

2. Uses onoff GPIO library instead of rpio.
    $ npm install onoff
   Tutorial in https://www.w3schools.com/nodejs/nodejs_raspberrypi_gpio_intro.asp

3. Different json test in AWS:
topic
$aws/things/myraspi/shadow/update/delta

test json:
{"state":{
"light":"on"
}}


