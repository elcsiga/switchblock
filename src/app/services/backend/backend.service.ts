import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import * as moment from 'moment';
import {defaultSwitches} from './defaultData';
import {JSONP_HOME} from '@angular/http/src/backends/browser_jsonp';
import {stringify} from 'querystring';

export interface Params {
  url: string;
  body?: any;
}

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private switches;

  constructor() {
    try{
      this.switches = JSON.parse(window.localStorage.getItem('switches')) || defaultSwitches;
    } catch (e) {
      this.switches = defaultSwitches;
    }
  }

  post( params: Params ): Promise<any> {
    switch (params.url) {
      case 'login': {
        if (params.body.username === 'cat' && params.body.password === 'cat') {

          // simulating a cookie header
          Cookies.set('user', 'cat');

          return Promise.resolve({
            status: 200,
          });
        } else {
          return Promise.reject({
            status: 401
          });
        }
      }
      case 'switch/toggle': {
        const collection = this.switches.find(c => c.id === params.body.collectionId);
        const _switch = collection.switches.find(s => s.id === params.body.switchId);

        if (_switch.status === 'off') {
          _switch.status = 'on';
          _switch.switchingHistory.push({
            'turnOnTime': moment().format(),
            'turnOffTime': null
          });
        } else {
          _switch.status = 'off';
          _switch.switchingHistory[ _switch.switchingHistory.length - 1 ].turnOffTime = moment().format();
        }

        window.localStorage.setItem('switches', JSON.stringify(this.switches));

        return Promise.resolve({
          status: 200,
          switches: this.switches
        });
      }
      default: return Promise.reject({
        status: 500
      });
    }
  }

  get( params: Params ): Promise<any> {
    switch (params.url) {
      case 'user': {
        // simulating that the cookie has been sent
        const userNameInCookie = Cookies.get('user');
        if (userNameInCookie) {
          return Promise.resolve({
            status: 200,
            user: { name: userNameInCookie }
          });
        } else {
          return Promise.reject({
            status: 401,
            message: 'Not authenticated'
          });
        }
      }
      case 'logout': {
        Cookies.remove('user');
        return Promise.resolve({
          status: 200,
        });
      }
      case 'switches': {
        // (too) simple authorization
        if (Cookies.get('user')) {
          return Promise.resolve({
            status: 200,
            switches: this.switches
          });
        } else {
          return Promise.reject({
            status: 401,
            message: 'Not authenticated'
          });
        }
      }
      default: return Promise.reject({
        status: 500
      });
    }
  }
}
