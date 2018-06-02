import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {activeCollectionSelector, State, User} from '../../@ngrx/reducers';
import {Observable} from 'rxjs';
import {BackendService} from '../../services/backend/backend.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';
import {SwitchDetailsComponent} from '../../components/switch-details/switch-details.component';
import {SwitchService} from '../../services/switch/switch.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  activeCollection$: Observable<any>;

  constructor(
    private store: Store<State>,
    private backendService: BackendService,
    public dialog: MatDialog,
    private sweitchService: SwitchService
  ) {
  }

  ngOnInit() {
    this.activeCollection$ = this.store.select(activeCollectionSelector);
  }

  toggleSwitch( collectionId: number, switchId: number) {
    this.sweitchService.toggleSwitch( collectionId, switchId)
  }

  getInfo( _switch: any ): string {
    const history = _switch.switchingHistory;
    return history.length === 0 ? 'Initially off'
      : history[ history.length-1 ].turnOffTime
        ? 'Last turned off ' + moment(history[ history.length - 1 ].turnOffTime).fromNow()
        : 'Last turned on ' +  moment(history[ history.length - 1 ].turnOnTime).fromNow();
  }

  openDetails( collectionId: number, _switch: any ): void {
    this.dialog.open(SwitchDetailsComponent, {
      width: '600px',
      data: {
        switch: _switch,
        collectionId: collectionId
      }
    });
  }
}
