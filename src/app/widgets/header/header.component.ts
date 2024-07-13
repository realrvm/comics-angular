import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { debounceTime, fromEvent, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@shared/svg-icon/svg-icon.component';
import { MenuComponent } from '@widgets/menu/menu.component';
import { DEBOUNCE_TIME, MOBILE_BREAKPOINT } from '@shared/constants';

@Component({
  selector: 'azra-header',
  standalone: true,
  imports: [SvgIconComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private width = signal<number>(window.innerWidth);

  public isDesktopWidth = computed(() => {
    return this.width() > MOBILE_BREAKPOINT;
  });

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        tap((w) => this.width.set((w.target as Window).innerWidth)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
