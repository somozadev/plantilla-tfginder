import { Component, ViewChild, OnInit } from '@angular/core';
import { IonList, Config } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  tfgs: any[] = [];
  ios: boolean;

  constructor(
    public confData: ConferenceData,
    public config: Config
  ) { }

  ngOnInit() {
    this.confData.getTfgs().subscribe((tfgs: any[]) => {
      this.tfgs = tfgs;
      console.log(tfgs);
    });
    this.ios = this.config.get('mode') === 'ios';
  }

}
