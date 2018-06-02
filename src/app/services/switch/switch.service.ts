import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Store} from '@ngrx/store';
import {State} from '../../@ngrx/reducers';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor(
    private backendService: BackendService,
    private store: Store<State>
  ) { }

  load() {
    this.backendService.get({ url: 'switches'})
      .then( res => this.store.dispatch({
        type: 'set-switches',
        switches: res.switches
      }));
  }

  toggleSwitch( collectionId: number, switchId: number) {
    this.backendService.post({
      url: 'switch/toggle',
      body: {
        collectionId: collectionId,
        switchId: switchId
      }
    })
      .then( res => this.store.dispatch( {
        type: 'set-switches',
        switches: res.switches
      }));
  }
}
