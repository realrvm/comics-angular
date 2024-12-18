import { NgClass } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { DebounceDirective } from '@azra/core'

import { ContentService } from './content.service'

@Component({
  selector: 'azra-content-handset',
  standalone: true,
  imports: [DebounceDirective, NgClass],
  template: `
    <div class="w-full">
      @if (hasNoImage()) {
        <p class="text-beige text-2xl font-vinque">Loading...</p>
      }
      <img
        #img
        class="object-contain w-full"
        [ngClass]="hasNoImage() ? 'h-0' : 'h-full'"
        [alt]="hasNoImage() ? '' : 'azra_image'"
        (debounceClick)="handleOnImgClick()"
        azraDebounce
        [debounceTime]="250"
        tabindex="-1"
      />
    </div>
  `,
  styles: `
    :host {
      @apply block h-screen bg-black p-1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentHandsetComponent implements OnInit {
  private readonly contentService = inject(ContentService)
  private readonly subject = this.contentService.subject
  private readonly blob$ = this.contentService.comicBlob$
  private readonly destroyRef = inject(DestroyRef)

  public hasNoImage = signal<boolean>(true)

  public image = viewChild<ElementRef<HTMLImageElement>>('img')

  ngOnInit(): void {
    this.blob$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((blob) => {
      if (blob) {
        this.hasNoImage.set(false)

        const url = URL.createObjectURL(blob as Blob)

        const image = this.image() as ElementRef<HTMLImageElement>

        image.nativeElement.src = url
      }
    })
  }

  public handleOnImgClick(): void {
    const value = this.subject.getValue()

    this.subject.next(value + 1)
  }
}
