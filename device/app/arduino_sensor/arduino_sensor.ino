#include<Wire.h>

const int MPU=0x68;  // I2C address of the MPU-9155

int16_t AcX,AcY,AcZ,Tmp,GyX,GyY,GyZ;

void setup(){

  Wire.begin();

  Wire.beginTransmission(MPU);

  Wire.write(0x6B);  // PWR_MGMT_1 register

  Wire.write(0);     // set to zero (wakes up the MPU-9155)

  Wire.endTransmission(true);

  Serial.begin(9600);
  Serial.println("X,Y,Z");

}

void loop(){

  Wire.beginTransmission(MPU);

  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)

  Wire.endTransmission(false);

  Wire.requestFrom(MPU,14,true);  // request a total of 14 registers

  AcX=Wire.read()<<8|Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)     

  AcY=Wire.read()<<8|Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)

  AcZ=Wire.read()<<8|Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)

//  Tmp=Wire.read()<<8|Wire.read();  // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
//
//  GyX=Wire.read()<<8|Wire.read();  // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
//
//  GyY=Wire.read()<<8|Wire.read();  // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
//
//  GyZ=Wire.read()<<8|Wire.read();  // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)

//  Serial.print("AcX = "); 
  Serial.print(AcX);
  Serial.print(',');
//  Serial.print(" | AcY = "); 
  Serial.print(AcY);
  Serial.print(',');
  //Serial.print(" | AcZ = "); 
  Serial.println(AcZ);

  //Serial.print(" | Tmp = "); Serial.print(Tmp/340.00+36.53);  //equation for temperature in degrees C from datasheet

//  Serial.print(" | GyX = "); Serial.print(GyX);
//
//  Serial.print(" | GyY = "); Serial.print(GyY);
//
//  Serial.print(" | GyZ = "); Serial.println(GyZ);

  delay(200);

}


//#include <Wire.h>
//
//#include "MAX30105.h"  //Get it here: http://librarymanager/All#SparkFun_MAX30105
//#include "heartRate.h"
//MAX30105 particleSensor;
//
//// 심박수.
//const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
//byte rates[RATE_SIZE]; //Array of heart rates
//byte rateSpot = 0;
//long lastBeat = 0; //Time at which the last beat occurred
//
//float beatsPerMinute;
//int beatAvg;
//int cnt = 0;
//
//
//void setup() {
//  // put your setup code here, to run once:
//  Serial.begin(115200);
//  Serial.println("Initializing...");
//
//    if (particleSensor.begin(Wire, I2C_SPEED_FAST) == false) //Use default I2C port, 400kHz speed
//  {
//    Serial.println("MAX30105 was not found. Please check wiring/power. ");
//    while (1);
//  }
//  //온도
//  //The LEDs are very low power and won't affect the temp reading much but
//  //you may want to turn off the LEDs to avoid any local heating
//  //particleSensor.setup(0); //Configure sensor. Turn off LEDs
//  //particleSensor.setup(); //Configure sensor. Use 25mA for LED drive
//  //심박
//  particleSensor.setup(); //Configure sensor with default settings
//  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
//  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
//  //온도
//  particleSensor.enableDIETEMPRDY(); //Enable the temp ready interrupt. This is required.
//}
//
//void loop() {
//  float temperature = particleSensor.readTemperature();
//  
//
//
//  cnt++ ;
//  
//  long irValue = particleSensor.getIR();
//
//  if (checkForBeat(irValue) == true)
//  {
//    //We sensed a beat!
//    long delta = millis() - lastBeat;
//    lastBeat = millis();
//
//    beatsPerMinute = 60 / (delta / 1000.0);
//
//    if (beatsPerMinute < 255 && beatsPerMinute > 20)
//    {
//      rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
//      rateSpot %= RATE_SIZE; //Wrap variable
//
//      //Take average of readings
//      beatAvg = 0;
//      for (byte x = 0 ; x < RATE_SIZE ; x++)
//        beatAvg += rates[x];
//      beatAvg /= RATE_SIZE;
//    }
//  }
//  Serial.print("temperatureC=");
//  Serial.print(temperature, 4);
////  Serial.println();
//  if(cnt%1==0){
//    cnt = 0;
//    
//    Serial.print("IR=");
//    Serial.print(irValue);
//    Serial.print(", BPM=");
//    Serial.print(beatsPerMinute);
//    Serial.print(", Avg BPM=");
//    Serial.print(beatAvg);
//
//    if (irValue < 50000)
//      Serial.print(" No finger?");
//    Serial.println();
//  }
//  
//
//}
