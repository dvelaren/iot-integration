# Arduino POST example

This example allows to send variables from the Arduino MKR1000 (WiFi101 library) to a backend server using HTTP POST protocol.

## Requirements
_Hardware:_
- [Arduino MKR1000](https://store.arduino.cc/usa/arduino-mkr1000)

_Software:_
- [WiFi101 library](https://www.arduino.cc/reference/en/libraries/wifi101/)
- [ArduinoJson library](https://arduinojson.org/)


## Setup

1. Edit `arduino_secrets.h` with your respective SSID and PASSWORD

2. Open `arduino_post.ino` and edit the following constants and variables:
    - POSTINGINTERVAL: time interval (in miliseconds) to send a POST request.
    - serverUrl: DNS of the backend URL.
    - sensorNames: Backend sensor key names

3. Upload the code and check serial monitor.