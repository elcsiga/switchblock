import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  data = {
    username: '',
    password: ''
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.data);
  }
}
