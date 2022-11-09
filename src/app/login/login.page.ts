import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  solved = true;
  user: User = new User(null);
  constructor(private auth: AuthService, private navCtrl: NavController, private alert: AlertService) { }

  ngOnInit() {
    this.auth.getUserState().subscribe(user => {
      if(user){
        this.user = user;
        this.navCtrl.navigateRoot('/monitoring');
      }
    });
    this.auth.verifyState();
  }
  login(){
    if(this.user.username != null && this.user.username != "" && this.user.password!=null && this.user.password!=""){
      this.auth.login(this.user.username, this.user.password).then(state => {
        this.navCtrl.navigateRoot('monitoring');
      }, err => {
        if(err.status == 401){
          this.alert.presentAlert('Error!', 'Login fallido', 'Usuario o contraseña incorrectos.')
        }else{
          this.alert.presentAlert('Error!', 'Login fallido', JSON.stringify(err))
        }
      });
    }
  }
}
