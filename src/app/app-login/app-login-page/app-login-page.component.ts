import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

import { AppMenuService } from '../../app-menu/app-menu.service';

@Component({
  selector: 'app-app-login-page',
  templateUrl: './app-login-page.component.html',
  styleUrls: ['./app-login-page.component.scss'],
  /* We need to turn off view encapsulation so our component styles affects the child ADF components */
  encapsulation: ViewEncapsulation.None
})
export class AppLoginPageComponent implements OnInit {

  constructor(private menuService: AppMenuService,
              private router: Router) { }

  ngOnInit() {
  }

  onLoginSuccess($event) {
    console.log('Successful login: ' + $event.value);

    // Tell parent component that successful login has happened and menu should change
    this.menuService.fireMenuChanged();

    // Now, navigate somewhere...
    this.router.navigate(['/process-apps']);
  }

  onLoginError($event) {
    console.log('Failed login: ' + $event.value);
  }
}
