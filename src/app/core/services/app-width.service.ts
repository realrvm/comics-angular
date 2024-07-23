import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DEBOUNCE_TIME } from '@core/shared/constants';
import { debounceTime, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppWidthService {
  public width = toSignal(this.calcWidth(), {
    initialValue: window.innerWidth,
  });

  public aboutDrawerVisibility = signal<boolean>(false);

  public contactsDrawerVisibility = signal<boolean>(false);

  public setAboutDrawerVisibility(isVisible: boolean): void {
    this.aboutDrawerVisibility.set(isVisible);
  }

  public setContactsDrawerVisibility(isVisible: boolean): void {
    this.contactsDrawerVisibility.set(isVisible);
  }

  private calcWidth() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(DEBOUNCE_TIME),
      map((w) => (w.target as Window).innerWidth),
    );
  }
}
