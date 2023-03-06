import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage {
  tutor: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const tutorId = this.route.snapshot.paramMap.get('speakerId');
      if (data && data.tutors) {
        for (const tutor of data.tutors) {
          if (tutor && tutor.id === tutorId) {
            this.tutor = tutor;
            break;
          }
        }
      }
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(tutor: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + tutor.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + tutor.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + tutor.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(tutor: any) {
    const mode = 'ios'; // this.config.get('mode');
    const buttons = [];
    if(tutor.email){
      buttons.push({
        text: `Email ( ${tutor.email} )`,
        icon: mode !== 'ios' ? 'mail' : null,
        handler: () => {
          window.open('mailto:' + tutor.email);
        }
      });
    }
    if (tutor.phone) {
      buttons.push(
        {
          text: `Call ( ${tutor.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + tutor.phone);
          }
        }
      );
    }
    buttons.push({
      text: 'Cancel',
      role: 'cancel'
    });
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + tutor.name,
      buttons:buttons
    });

    await actionSheet.present();
  }
}
