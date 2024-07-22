import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DEBOUNCE_TIME,
  DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
} from '@shared/constants';
import { debounceTime, fromEvent, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private width = signal<number>(window.innerWidth);
  private destroyRef = inject(DestroyRef);

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

  public isDesktopWidth = computed(() => {
    return this.width() > DESKTOP_BREAKPOINT;
  });

  public isMobileWidth = computed(() => {
    return this.width() > MOBILE_BREAKPOINT;
  });

  public calcWindowWidth() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        tap((w) => this.width.set((w.target as Window).innerWidth)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
