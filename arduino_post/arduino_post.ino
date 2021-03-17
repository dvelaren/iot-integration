// Libraries
#include <WiFi101.h>
#include <ArduinoJson.h>

// Secrets
#include "arduino_secrets.h"

// Pin definitions
#define LED_TX 6

// Helpers
#define NUMELEMENTS(A) (sizeof(A) / sizeof(A[0])) // Obtain number of elements

// Constants
const unsigned long POSTINGINTERVAL = 2000;

// Variables
char ssid[] = SECRET_SSID; // your network SSID (name)
char pass[] =
    SECRET_PASS; // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;       // the WiFi radio's status
char serverUrl[] = "192.168.83.247"; // Backend URL
unsigned long lastConnectionTime =
    0; // last time you connected to the server, in milliseconds
char* sensorNames[] = {"temp", "hum"};
float sensorValues[NUMELEMENTS(sensorNames)] = {25.7, 80};

// Initialize the WiFi client library
WiFiClient client;

// Functions
void printWiFiData() {
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  printMacAddress(mac);
}

void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print the MAC address of the router you're attached to:
  byte bssid[6];
  WiFi.BSSID(bssid);
  Serial.print("BSSID: ");
  printMacAddress(bssid);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.println(rssi);

  // print the encryption type:
  byte encryption = WiFi.encryptionType();
  Serial.print("Encryption Type:");
  Serial.println(encryption, HEX);
  Serial.println();
}

void printMacAddress(byte mac[]) {
  for (int i = 5; i >= 0; i--) {
    if (mac[i] < 16) {
      Serial.print("0");
    }
    Serial.print(mac[i], HEX);
    if (i > 0) {
      Serial.print(":");
    }
  }
  Serial.println();
}

int connectWiFi(int status = WL_IDLE_STATUS) {
  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(5000);
  }

  // you're connected now, so print out the data:
  Serial.println("You're connected to the network");
  printCurrentNet();
  printWiFiData();
  return status;
}

void httpRequest(String method, char server[],
                 unsigned int port, String endpoint,
                 char* keys[], float values[]) {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();
  String body = "{";
  for (unsigned int i = 0; i <= NUMELEMENTS(values); i++) {
    if (i != 0) body += ", ";
    body += "\"" + String(keys[i]) + "\": ";
    body += String(values[i]);
  }
  body += "}";

  // if there's a successful connection:
  if (client.connect(server, port)) {
    Serial.println("Connected to: " + String(server) + ":" + String(port));
    Serial.print(method + " " + endpoint + " HTTP/1.1\r\n" +
                 "Host: " + server + ":" + String(port) + "\r\n" +
                 "Content-Type: application/json\r\n" +
                 "Content-Length: " + body.length() + "\r\n" +
                 "Connection: close\r\n\r\n" + body + "\r\n\r\n");
    // send the HTTP POST request:
    client.print(method + " " + endpoint + " HTTP/1.1\r\n" + 
                 "Host: " + server + ":" + String(port) + "\r\n" +
                 "Content-Type: application/json\r\n" +
                 "Content-Length: " + body.length() + "\r\n" +
                 "Connection: close\r\n\r\n" + body + "\r\n\r\n");
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        return;
      }
    }
    while (client.available()) {
      // String line = client.readStringUntil('\r');
      // Serial.print(line);
      // Allocate the JSON document
      // Use arduinojson.org/v6/assistant to compute the capacity.
      // Skip HTTP headers
      char endOfHeaders[] = "\r\n\r\n";
      if (client.find(endOfHeaders)) {
        const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
        DynamicJsonDocument doc(capacity);

        // Parse JSON object
        DeserializationError error = deserializeJson(doc, client);
        if (error) {
          Serial.print(F("deserializeJson() failed: "));
          Serial.println(error.f_str());
          client.stop();
          return;
        }
        // Extract values
        Serial.print("Response: ");
        Serial.println(doc["success"].as<boolean>());
        client.stop();
      }
    }
    // note the time that the connection was made:
    lastConnectionTime = millis();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

void setup() {
  // Pin config
  pinMode(LED_TX, OUTPUT);

  // Output cleaning
  digitalWrite(LED_TX, LOW);

  // Comms
  Serial.begin(9600);
  status = connectWiFi();
}

void loop() {
  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > POSTINGINTERVAL) {
    // digitalWrite(LED_TX, HIGH);
    httpRequest("POST", serverUrl, 5000, "/data", sensorNames, sensorValues);
    // digitalWrite(LED_TX, LOW);
  }
}