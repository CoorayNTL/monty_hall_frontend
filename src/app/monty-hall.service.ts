import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MontyHall } from './monty-hall.model';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}


export class MontyHallService {

  private apiUrl = 'https://localhost:7177/api/monty-hall';

  constructor(private http: HttpClient) {}

  simulateMontyHall(simulationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/simulate`, simulationData);
  }

  getSimulationResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
