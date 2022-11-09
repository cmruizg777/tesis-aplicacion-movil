import { NavController } from '@ionic/angular';
import { ApiService } from './api.service';
import { User } from './../models/user';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;
  $_userState = new Subject<User>();
  constructor(private api: ApiService, private nvctrl: NavController) {

  }
  getUserState(){
    return this.$_userState.asObservable();
  }
  verifyState(){
    this.setCurrentUser();
    this.$_userState.next(this.currentUser);
  }

  login(username: string, password: string ) {
    const user: User = {username, password: null, token : null};
    return new Promise<boolean>((resolve, reject)=>{
      this.api.post('login', {username, password}).subscribe((data:any) => {
        if(data.token){
          data.username = username;
          this.setSession(data);
          user.token = data.token;
          this.currentUser = user;
          this.$_userState.next(this.currentUser);
          resolve(true);
        }else{
          this.logout();
          this.currentUser = null;
          this.$_userState.next(this.currentUser);
          resolve(false)
        }
      }, e => {
        reject(e)
      });
    })
  }

  private setSession(authResult) {
      //const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem('username', authResult.username);
      localStorage.setItem('token', authResult.token);
      localStorage.setItem("expires_at", authResult.expires_at );
  }

  logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
      this.setCurrentUser();
      this.nvctrl.navigateRoot('/login')
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
  setCurrentUser(){
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    this.currentUser = new User(username);
    this.currentUser.token = token ;
    if(!token || !username) this.currentUser = null;
    this.$_userState.next(this.currentUser);
  }
}
