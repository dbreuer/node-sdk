import { Injectable } from "@angular/core";

import * as optimizely from "optimizely-server-sdk";
import { HttpClient } from "@angular/common/http";
import * as UUID from 'uuid/v4';
import { Observable } from "rxjs/Observable";
import { Promise, reject } from "q";
import { error } from "util";
import { environment } from "../environments/environment";


const experimentName = environment.OPTIMIZELY_EXPERIMENT_NAME;
const experimentId = environment.OPTIMIZELY_EXPERIMENT_ID;
const tackingEvent = "YOUR_TRACK_EVENT_HERE";

const userId = UUID(); // Could use a cookie service module here
interface Experiment {
  variation: Promise<any>;
}

@Injectable()
export class OptimizelyService {
  optimizelyClient: any;
  variation: any = {
    variation: this.variation || this.setVariation()
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the experiment datafile and setup the client
   *
   * Also trigger the default event (optional)
   * @returns activeInstance {Promise<variation>}
   */
  setVariation(): Promise<any> {
    return Promise((resolve, hasreject) => {
      this.httpClient
      .get(`//cdn.optimizely.com/json/${experimentId}.json`)
      .subscribe( datafile => {
        this.optimizelyClient = optimizely.createInstance({
              datafile: datafile,
              skipJSONValidation: true
            });
        this.optimizelyClient.track(tackingEvent, userId);
        resolve(this.optimizelyClient.activate(experimentName, userId));
      }, (othererror) => {
        hasreject(othererror);
      });
    });
  }

  /**
   * You can set an custom track event trigger
   * @param trackID {string} Tracking Event ID
   */
  setTrack(trackID: string): void {
    // console.log('setTrack', trackID);
    if (!this.optimizelyClient) {
      this.setVariation().then( () => {
        this.optimizelyClient.track(trackID, userId);
      }).catch( (catchError: any) => {
        console.warn('setVariation error', catchError);
      });
    } else {
      this.optimizelyClient.track(trackID, userId);
    }
  }
}
