import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

/*
  Generated class for the Barcode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html'
})
export class BarcodePage {
  upcCode: string = "";
  errorMessage: string = "";
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BarcodePage Page');
  }

  scanBarcode() {
    BarcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log('Barcode Results: ' + JSON.stringify(barcodeData))
      this.upcCode = barcodeData.UPC_E;
    }, (err) => {
      // An error occurred
      console.log('Barcode Error: ' + JSON.stringify(err));
      this.errorMessage = "The Cordova plugin is not available.  Please test on a device or re-install the plugin.";
    });
  }

}
