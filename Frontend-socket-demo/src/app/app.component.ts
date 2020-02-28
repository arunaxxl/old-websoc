/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { UserIdleService } from 'angular-user-idle';
import { Idle } from 'idlejs/dist';
import { LayoutService , WebSocketService } from './@core/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private WebSocketService:WebSocketService,private layoutservice: LayoutService,private analytics: AnalyticsService, private seoService: SeoService,private userIdle: UserIdleService) {
    this.checkIdleState();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  checkIdleState(){
      //Start watching for user inactivity.
      this.userIdle.startWatching();

      // Start watching when user idle is starting and reset if user action is there.
      this.userIdle.onTimerStart().subscribe(count=> {
      var eventList= ["click", "mouseover","keydown","DOMMouseScroll","mousewheel",
      "mousedown","touchstart","touchmove","scroll","keyup"];

      for(let event of eventList) {
        document.body.addEventListener(event, () =>{
          this.getIdleStateFromSocket(false);
          this.userIdle.resetTimer();
        });
      }
      });

      // Start watch when time is up.
      this.userIdle.onTimeout().subscribe(() => {
          this.getIdleStateFromSocket(true);
          // this.WebSocketService.alaramIconColorChange(true);
      })

  }

      getIdleStateFromSocket(state){
        this.WebSocketService.checkIdleState(state);
      }
}
