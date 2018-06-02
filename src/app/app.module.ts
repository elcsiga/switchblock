import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import {PageNotFoundViewComponent} from './views/page-not-found-view/page-not-found-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule, MatMenuModule, MatCardModule, MatDialogModule, MatChipsModule
} from '@angular/material';
import {BackendService} from './services/backend/backend.service';
import {FormsModule} from '@angular/forms';
import { HomeViewComponent } from './views/home-view/home-view.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './@ngrx/reducers';
import {UserService} from './services/user/user.service';
import { SwitchDetailsComponent } from './components/switch-details/switch-details.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full', component: HomeViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: '**', component: PageNotFoundViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    PageNotFoundViewComponent,
    HomeViewComponent,
    SwitchDetailsComponent,
    HeaderComponent
  ],
  entryComponents: [
    SwitchDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatChipsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    BackendService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
