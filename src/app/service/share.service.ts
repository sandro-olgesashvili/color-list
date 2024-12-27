import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  loader = new BehaviorSubject<boolean>(false);
  constructor() {}

  getLoader() {
    return this.loader.asObservable();
  }

  setLaoder(value: boolean) {
    this.loader.next(value);
  }
}
