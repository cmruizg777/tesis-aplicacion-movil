import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }
  async presentAlertConfirm(header, message, okHandler, cancelHandler) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: `${header}`,
      message: `${message}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          //id: 'cancel-button',
          handler: cancelHandler
        }, {
          text: 'Aceptar',
          //id: 'confirm-button',
          handler: okHandler
        }
      ]
    });

    await alert.present();
  }
  async presentAlert(title:string, subtitle: string, message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
