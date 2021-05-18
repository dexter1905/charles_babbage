import { ICityWeather } from "./../models/IWeatherData.interface";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IWeatherRawData } from "../models/IWeatherRawData.interface";
import { ISearchResult, IWeatherData } from "../models/IWeatherData.interface";

// const baseUrl = "assets/mock/cities.json";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  // baseUrl = 'https://myopenproxy.herokuapp.com/https://www.metaweather.com';
  baseUrl = "assets/mock/cities.json";

  searchLocation(term): Observable<ISearchResult[]> {
    /*
      CHALLANGE
       - get list of cities based on the searched string
       sample url: baseUrl/api/location/search/?query=paris
    */
    //  const url = baseUrl+"/api/location/search/?query="+term;
    const url = this.baseUrl;
    //  const url = this.baseUrl+"/api/location/search/?query="+term;
    return this.http.get<ISearchResult[]>(url);
  }

  getCityDetails(woeid): Observable<IWeatherData> {
    /*
      woeid is the city id(number).
      you can use below sample url to fetch the city weather details
      sample url : baseUrl/api/location/111111
    */
    const url = "assets/mock/mockCityData.json";

    /*
      CHALLENGE
       - fetch the city weather data
       - transform the received data to required "IWeatherData" format using transformRawData() func
    */
    return this.http
      .get(url)
      .pipe(map((response: IWeatherRawData) => this.transformRawData(response)));
  }

  transformRawData(rawData: IWeatherRawData) {
    const transformedWeather: Array<ICityWeather> = [];
    // console.log(rawData);
    rawData.consolidated_weather.forEach(function (obj) {
      // console.log(obj);
      const date = obj.applicable_date;
      const temperature = obj.the_temp;
      const weather_name = obj.weather_state_name;
      const weather_image = `https://www.metaweather.com/static/img/weather/.svg`;

      transformedWeather.push({date,temperature,weather_name,weather_image} as ICityWeather);
    });

    return {
      city: rawData.title,
      country: rawData.parent.title,
      weather: transformedWeather,
    };
  }
}
