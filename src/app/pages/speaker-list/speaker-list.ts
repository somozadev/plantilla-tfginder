import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  tutors: any[] = [];

  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
      this.confData.getTutors().subscribe((tutors: any[]) => {
      this.tutors = tutors;
    });
  }
}
