/* ================== [Inclusion de librerias] ===========*/

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

/*=================== [Macros y definiciones] ============*/

#define DHTPIN                4
#define DHTTYPE               DHT11 
#define MSG_BUFFER_SIZE       50
#define BUILTIN_LED           2
#define DEFAULT_PUBLISH_TIME  5000
#define MIN_PUBLISH_TIME      1000
#define MAX_PUBLISH_TIME      10000

/*============= [inicio de librerias] ===========*/

WiFiClient espClient;
PubSubClient client(espClient);
//Inicializamos el sensor DHT11
DHT dht(DHTPIN,DHTTYPE);

/*============= [Prototipo de funciones] =================*/

void setup_wifi(void);
void callback(char* topic, byte* payload, unsigned int length);
void reconnect(void);

/*============== [definicion de variables ] ===================*/

static uint32_t PublishTime = DEFAULT_PUBLISH_TIME;
unsigned long  lastMsg      = 0;
char msg[MSG_BUFFER_SIZE];

/*============== [definicion de constantes] =================*/

const char* ssid               = "Speddy";
const char* password           = "J0319";
const char* mqtt_server        = "192.168.1.39";
const String MQTT_TOPIC_LED    = "state/led";
const String MQTT_TOPIC_TIME   = "config/publish_time"; 
const String MQTT_TOPIC_DATOS  = "publish/data";

void setup_wifi(){

     delay(10);
     // We start by connecting to a WiFi network
     Serial.println(); 
     Serial.print("Connecting to ");
     Serial.println(ssid);

     WiFi.mode(WIFI_STA);
     WiFi.begin(ssid, password);

     while (WiFi.status() != WL_CONNECTED) {
           delay(500);
           Serial.print(".");
     }

    randomSeed(micros());

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length){

     if(strcmp(topic, MQTT_TOPIC_LED.c_str())==0){
        Serial.print("Message arrived [");
        Serial.print(topic);
        Serial.print("] ");
        for (int i = 0; i < length; i++) {
            Serial.print((char)payload[i]);
        }
        
        Serial.println(); 
    
        if ((char)payload[0] == '1'){
           digitalWrite(BUILTIN_LED, HIGH);   
           Serial.println("LED ON");
        }
        else if ((char)payload[0] == '0'){
           digitalWrite(BUILTIN_LED, LOW); 
           Serial.println("LED OFF");
        }
        else{
          Serial.println("unknown character");    
        } 
    }
    else if(strcmp(topic, MQTT_TOPIC_TIME.c_str())==0){
       payload[length] = '\0';
        // convert string value to int valie
       uint32_t publishTime = atoi((const char *)payload);
       // Check if value received is correct.
       if (publishTime >= MIN_PUBLISH_TIME && publishTime <= MAX_PUBLISH_TIME){
            Serial.print("Publish time will change to ");
            Serial.print((const char *)payload);
            Serial.print(" ms");
            // Change publish time
            PublishTime = publishTime;
       }else{
            Serial.print("Invalid publish time, must be between MIN_REPORT_TIME and MAX_REPORT_TIME ms.");
       }
        Serial.println();
    }
    else{
        Serial.println("Unknown topic received!");
    }
}


void reconnect(){
  // Loop until we're reconnected
    while (!client.connected()) {
         Serial.print("Attempting MQTT connection...");
         // Create a random client ID
         String clientId = "ESP32Client-";
         clientId += String(random(0xffff), HEX);
         // Attempt to connect
         if (client.connect(clientId.c_str())){
         Serial.println("connected");
         // Once connected, publish an announcement...
         //client.publish("datos", "hello world");  
         // ... and resubscribe
         client.subscribe(MQTT_TOPIC_LED.c_str());
         client.subscribe(MQTT_TOPIC_TIME.c_str());
         }else {
           Serial.print("failed, rc=");
           Serial.print(client.state());
           Serial.println(" try again in 5 seconds");
           // Wait 5 seconds before retrying
           delay(5000);
         }
   }
} 

void setup(){
  
     pinMode(BUILTIN_LED, OUTPUT);    
     Serial.begin(115200);
     setup_wifi();
     dht.begin();
     client.setServer(mqtt_server, 1883);
     client.setCallback(callback);
     client.subscribe(MQTT_TOPIC_LED.c_str());
     client.subscribe(MQTT_TOPIC_TIME.c_str());
}

void loop(){

     if (!client.connected()) {
        reconnect();
     }
  
     client.loop();
     float t = dht.readTemperature();
     float h = dht.readHumidity();
     unsigned long now = millis();
  
    if (now - lastMsg > PublishTime){
        lastMsg = now;
        snprintf(msg, MSG_BUFFER_SIZE, "{\"temperatura\":\"%.2f\", \"humedad\":\"%.2f\"}", t, h);
        Serial.print("Publish message: ");
        Serial.println(msg);
        client.publish(MQTT_TOPIC_DATOS.c_str(), msg);
    }  
    delay(1);
}
