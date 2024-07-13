import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private aboutSubject = new Subject<boolean>();
  public aboutDrawerVisible$ = this.aboutSubject.asObservable();

  private contactsSubject = new Subject<boolean>();
  public contactsDrawerVisible$ = this.contactsSubject.asObservable();

  public setAboutDrawerVisible(isVisible: boolean): void {
    this.aboutSubject.next(isVisible);
  }

  public setContactsDrawerVisible(isVisible: boolean): void {
    this.contactsSubject.next(isVisible);
  }
}
