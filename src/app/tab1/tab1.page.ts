import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  items = [
    {
    name: "Milk",
    quantity: 2
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Banana",
      quantity: 3
    },
    {
      name: "Sugar",
      quantity: 1
    },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  async removeItem(item, index){
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();

    this.items.splice(index, 1);
  }

  addItem() {
    console.log("Adding Item");
    this.showPrompt();
  }

  async showPrompt() {
    const prompt = this.alertCtrl.create({
      //title: 'Login',
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    (await prompt).present();
  }
}
