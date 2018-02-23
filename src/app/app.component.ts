import { Component } from '@angular/core';
import {DataService} from './data.service'
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import {Http, Response} from '@angular/http';
//import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weather = {};
  usersUrl : string;
  setposition;
  
constructor(public http: Http)
//constructor(private dataservice : DataService)
    {
        this.usersUrl = '';
   }

   title = 'Weather App';
  coorodinate_lon = null;
  coorodinate_lat = null;
  max_temp = null;
  min_temp = null;
  temp_celsius;
  speed_km = null;
  wind_speed = null;
  error_handler = true;
  geolocation = {};
  content_handler;
  windSpeedContant = 3.6;
  tempConstant = 273.15;


ngOnInit()
{

if (!localStorage.getItem('handler'))
{

  localStorage.setItem('handler','1');
} 
  navigator.geolocation.getCurrentPosition((pos)=>this.setPosition(pos)) //Request user location
  navigator.geolocation.watchPosition(function (position) { // check if user allowed location trackin from the app
  localStorage.setItem('handler','1');
  console.log("i'm tracking your location!");
  console.log(position); 
},

 function (error) { // user has not rated us permission to access thier location
  if (error.code == error.PERMISSION_DENIED)
      localStorage.setItem('handler','0');
      console.log("you denied me your location :(");
      alert("you denied me your location :(");
      
      return true;
});

this.content_handler = localStorage.getItem('handler');
}

public getWeather(url) // Extract data from weather object 
  {
    return this.http.get(url)
    .map((results: Response) => results.json())
     .subscribe(weather => {
            this.weather = weather;
            this.max_temp = this.convertCelsius(this.weather['main']['temp_max']);
            this.min_temp = this.convertCelsius(this.weather['main']['temp_min']);
            this.wind_speed  = this.convertWindSpeed(this.weather['wind']['speed']);
            console.log(this.weather);
    });

  }

setPosition(position) { // connect to openweather api and store info inside object
  this.coorodinate_lon = position.coords.longitude;
  this.coorodinate_lat = position.coords.latitude;
  this.usersUrl ='http://api.openweathermap.org/data/2.5/weather?lat='+this.coorodinate_lat+'&lon='+this.coorodinate_lon+'&appid=53f9d8e4213222cf517d86dc406d67fc';
  this.getWeather(this.usersUrl);
}

public convertCelsius(temp_kelvin) //convert kelvin to celsius
{
  this.temp_celsius = temp_kelvin - this.tempConstant;
  return this.temp_celsius;
}

public convertWindSpeed(speed_ms) // convert ms to km
{
  this.speed_km = speed_ms * this.windSpeedContant;
  return this.speed_km.toFixed(2);
}

public locationReset() // reset location
{
  this.coorodinate_lat = null;
  this.coorodinate_lon = null;
  location.reload(); 
}


}
