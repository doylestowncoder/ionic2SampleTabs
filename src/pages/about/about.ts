import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FabContainer } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('myFabContainer2') fabContainer2: FabContainer;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  toastToSocialMedia1(position:string, socialSite:string, fab: FabContainer) {
    console.log('Toasting away...');
    var message = 'Mmmm, you buttered my toast on ' + socialSite;
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);

    fab.close();
  }

  toastToSocialMedia2(position:string, socialSite:string) {
    console.log('Toasting away...');
    var message = 'Mmmm, you buttered my toast on ' + socialSite;
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present(toast);

    this.fabContainer2.close();
  }

  showAddModal() {
    alert('Under Construction!!!')
  }

}
