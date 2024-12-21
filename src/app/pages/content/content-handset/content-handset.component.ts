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
import { Router } from '@angular/router'

import { DebounceDirective } from '@azra/core'

import { ContentService } from '../content.service'
import { getCorrectValue } from '../content.utils'

@Component({
  selector: 'azra-content-handset',
  standalone: true,
  imports: [DebounceDirective, NgClass],
  templateUrl: './content-handset.component.html',
  styles: `
    :host {
      @apply block bg-black p-1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentHandsetComponent implements OnInit {
  private readonly contentService = inject(ContentService)
  private readonly subject = this.contentService.subject
  private readonly blob$ = this.contentService.comicBlob$
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)

  public hasNoImage = signal<boolean>(true)
  public currentImageNumber = signal(1)

  public image = viewChild<ElementRef<HTMLImageElement>>('img')

  ngOnInit(): void {
    this.subject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((num) => this.currentImageNumber.set(num))

    this.blob$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((blob) => {
      if (blob) {
        this.hasNoImage.set(false)

        const url = URL.createObjectURL(blob as Blob)

        const image = this.image() as ElementRef<HTMLImageElement>

        if (image) image.nativeElement.src = url
      }
    })
  }

  public handleOnImgClick(): void {
    const value = this.subject.getValue()

    this.subject.next(value + 1)
  }

  public goToChapters(): void {
    this.router.navigate(['/content'])
  }

  public onNextSlideClick(): void {
    const value = this.subject.getValue()
    this.subject.next(value + 1)
  }

  public onPrevSlideClick(): void {
    const value = this.subject.getValue()
    this.subject.next(getCorrectValue(value))
  }

  public goToMainPage(): void {
    this.router.navigate(['/'])
  }
}
