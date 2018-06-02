import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {State, User} from '../../@ngrx/reducers';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private backendService: BackendService,
    private store: Store<State>
  ) { }

  login( data: {username: string, password: string}) {
    this.backendService.post({
      url: 'login',
      body: data
    })
      .then( () => window.location.href = '/' )
      .catch( err => console.error(err));
  }

  logout() {
    this.backendService.get({
      url: 'logout'
    })
      .then( () => window.location.href = '/' )
      .catch( err => console.error(err));
  }

  load() {
    this.backendService.get({
      url: 'user'
    })
      .then( res => this.store.dispatch({
        type: 'set-user',
        user: res.user
      }))
      .catch( err => console.error(err));
  }
}
