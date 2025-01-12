import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  loadingBool = new BehaviorSubject<boolean>(false);
  logingBool = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoading(value: boolean) {
    this.loadingBool.next(value);
  }

  getLoading(): Observable<boolean> {
    return this.loadingBool.asObservable();
  }

  getLogin() {
    return this.logingBool.asObservable();
  }

  setLogin(value: boolean) {
    this.logingBool.next(value);
  }
}
