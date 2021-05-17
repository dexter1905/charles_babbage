import { WeatherService } from "./../../services/weather.service";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { ISearchResult } from "../../models/IWeatherData.interface";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  @ViewChild("searchInput") searchInput;
  searchResults: ISearchResult[];
  @Output() selectedCity = new EventEmitter<any>();
  /*Error Variables tbd*/
  city: any;

  constructor(private weatherService: WeatherService) {}
  ngOnInit() {}

  search(term) {
    /*
            CHALLENGE
                - if user has typed something in the input field,
                  call weatherService.searchLocation() with the searched term
                  and assign the results to searchResults array
                - if input field is empty, clear the searchResults array
        */
      //  console.log(term);
      if(term){
        //do something
        this.weatherService.searchLocation(term).subscribe(data => this.searchResults= data);
      } else {
        this.clear();
      }
  }

  selectedLocation(cityDetails: ISearchResult) {
    /*
            CHALLENGE
              After user clicked on a city name from the search results, this function should be called.
              This function should perform the following actions
              - make the input field empty
              - clear all the results
              - send the cityid (woeid) to the parent component (AppComponent)
        */
       this.clear();
       this.selectedCity.emit(cityDetails);
  }

  clear(){
    this.searchResults=[];
  }
}
