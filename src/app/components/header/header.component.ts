import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {activeCollectionSelector, State, User} from '../../@ngrx/reducers';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {SwitchService} from '../../services/switch/switch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  switches$: Observable<any>;
  activeCollection$: Observable<any>;

  constructor(
    private store: Store<State>,
    private userService: UserService,
    private switchService: SwitchService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.userService.load();
    this.switchService.load();

    this.user$ = this.store.select('user');
    this.switches$ = this.store.select('switches');
    this.activeCollection$ = this.store.select(activeCollectionSelector);
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.userService.logout();
  }
  selectCollection(collectionIndex: number) {
    this.store.dispatch({
      type: 'set-active-collection-index',
      collectionIndex: collectionIndex
    });
  }
}
