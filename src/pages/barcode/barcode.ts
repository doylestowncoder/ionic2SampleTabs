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
  barcodeValue: string = "";
  barcodeFormat: string = "";
  barcodePDF417Value: string = "";
  barcodePDF417Format: string = "";
  errorMessage: string = "";
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BarcodePage Page');
  }

  scanBarcode() {
    BarcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log('Barcode Results: ' + JSON.stringify(barcodeData))
      this.barcodeValue = barcodeData.text;
      this.barcodeFormat = barcodeData.format;
    }, (err) => {
      // An error occurred
      console.log('Barcode Error: ' + JSON.stringify(err));
      this.errorMessage = "The Cordova plugin is not available.  Please test on a device or re-install the plugin.";
    });
  }

  scanPDF417Barcode() {
    BarcodeScanner.scan({
      "preferFrontCamera" : true, // iOS and Android
      "showFlipCameraButton" : true, // iOS and Android
      "showTorchButton" : true, // iOS and Android
      "disableAnimations" : true, // iOS
      "prompt" : "Place a barcode inside the scan area", // supported on Android only
      "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
    }).then((barcodeData) => {
      // Success! Barcode data is here
      console.log('Barcode Results: ' + JSON.stringify(barcodeData))
      this.barcodePDF417Value = barcodeData.text;
      this.barcodePDF417Format = barcodeData.format;
    }, (err) => {
      // An error occurred
      console.log('Barcode Error: ' + JSON.stringify(err));
      this.errorMessage = "The Cordova plugin is not available.  Please test on a device or re-install the plugin.";
    });
  }

}
