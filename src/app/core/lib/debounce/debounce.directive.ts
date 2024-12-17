import {
  DestroyRef,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, Subject } from 'rxjs'

@Directive({
  selector: '[azraDebounce]',
  standalone: true,
})
export class DebounceDirective implements OnInit {
  public debounceTime = input(500)
  @Output() debounceClick = new EventEmitter()
  private readonly clicks = new Subject()
  private readonly destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.clicks
      .pipe(
        debounceTime(this.debounceTime()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => this.debounceClick.emit(e))
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.clicks.next(event)
  }
}
