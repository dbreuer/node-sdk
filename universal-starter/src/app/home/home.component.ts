import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import { OptimizelyService } from '../optimizely.service';


@Component({
  selector: 'home',
  template: `
  <h3>{{ message }}</h3>
  <h5>[firstVariation]: {{ firstVariation }}</h5>
  <h5>[secondVariation]: {{ secondVariation }}</h5>
  <h3>[variationValue]: {{ variationValue }}</h3>
  `
})
export class HomeComponent implements OnInit {
  public message: string;

  firstVariation: boolean; // has a first variation
  secondVariation: boolean; // has a second variation
  variationValue: string;  // which variation

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _optimizelyService: OptimizelyService
  ) {}

  ngOnInit() {
    this.message = 'Hello';
    // Check is it browser!
    if (isPlatformBrowser(this.platformId)) {
      this._optimizelyService.setVariation().then(
        variation => {

          this.variationValue = variation;

          if (variation === "firstVariation") {
            this.firstVariation = true;
            this.secondVariation = false;
          } else if (variation === "secondVariation") {
            // execute code for noButton
            this.firstVariation = false;
            this.secondVariation = true;
          } else {
            // execute default code
            this.firstVariation = false;
            this.secondVariation = false;
          }
        },
        err => {
          // console.warn("setVariation subscribe: ", err);
        }
      ).catch(optError => console.log(optError));
    }
  }
}