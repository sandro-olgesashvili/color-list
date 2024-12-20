import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  subject = new Subject();

  constructor() {}

  getId(): Observable<any> {
    return this.subject.asObservable();
  }

  setId(id: number) {
    this.subject.next(id);
  }
}
