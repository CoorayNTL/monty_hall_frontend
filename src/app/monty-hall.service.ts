import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}


export class MontyHallService {
  doors: any[] = [];
  totalDoors: number = 3;
  state: string = 'PICK';
  pickedDoor: any;
  autoMode: boolean = false;
  timeoutId: any;
  switchWinRate: string = '0%';
  stayWinRate: string = '0%';
  stats = {
    totalSwitchPlays: 0,
    totalStayPlays: 0,
    totalSwitchWins: 0,
    totalStayWins: 0
  };

  url = 'monty-hall'; // controller name in the API

  constructor(private http: HttpClient) { }

  public getMontyHall(): Observable<any> {
    return this.http.get(this.url);
  }

  



}
