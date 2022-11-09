import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  logged = false;
  user: User;
  isInLogin = false;
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.isInLogin = event.url === '/login';
        console.log(this.isInLogin)
      }
    });
    this.auth.getUserState().subscribe(user => {
      this.logged = false;
      if(user){
        this.user = user;
        this.logged = true;
      }
      console.log(user, this.logged);
    });

    this.auth.verifyState();
  }
}
