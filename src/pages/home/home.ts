import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { TourPage } from '../tour/tour';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messageCount: number = 32;
  user: string = 'Ionites';

  constructor(public navCtrl: NavController, translate: TranslateService, public modalCtrl: ModalController) {
    translate.setDefaultLang('en');
    translate.use('en');
    //testApp = 'XYZ';
    translate.get('HOME.MESSAGE', {user: 'world'}).subscribe((res:string) => {
      console.log(res);
      var x: string = translate.instant('HOME.TAB', {user: 'world'});
      console.log('instant:' + x);
    });
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(TourPage);
    let modal = this.modalCtrl.create(TourPage);
    modal.present();
  }
}
