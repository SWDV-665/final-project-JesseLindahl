import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService) {

  }

  loadItem() {
    return this.dataService.getItems();
  }

  async removeItem(item, index){
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();

    this.dataService.removeItem(index);
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + "...",
      duration: 3000
    });
    (await toast).present();
    this.showEditItemPrompt(item, index);
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
            this.dataService.addItem(item);
          }
        }
      ]
    });
    (await prompt).present();
  }

  async showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      //title: 'Edit Item',
      message: "Please edit item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
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
            this.dataService.editItem(item, index);
          }
        }
      ]
    });
    (await prompt).present();
  }
}
