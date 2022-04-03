import { Injectable } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceService) { 

  }

  async showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      //title: item ? 'Edit Item'
      message: item ? "Please edit item..." : "Please enter item...",
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
            if (index !== undefined){
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    (await prompt).present();
  }

}
