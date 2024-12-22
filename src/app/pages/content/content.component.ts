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

import { DebounceDirective, Responsive, ResponsiveDirective } from '@azra/core'
import { SidebarComponent } from '@azra/ui/sidebar'

import { ContentService } from './content.service'
import { getCorrectValue } from './content.utils'

@Component({
  selector: 'azra-content',
  imports: [ResponsiveDirective, DebounceDirective, SidebarComponent, NgClass],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-screen bg-black p-4;
    }
  `,
  host: {
    '(document:keyup)': 'handleOnPress($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  private readonly contentService = inject(ContentService)
  private readonly subject = this.contentService.subject
  private readonly blob$ = this.contentService.comicBlob$
  private readonly destroyRef = inject(DestroyRef)

  public readonly desktop = Responsive.DESKTOP
  public readonly handset = Responsive.HANDSET

  public image = viewChild<ElementRef<HTMLImageElement>>('img')
  public hasNoImage = signal<boolean>(true)

  ngOnInit(): void {
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

  public handleOnPress(event: KeyboardEvent): void {
    event.stopPropagation()

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    const value = this.subject.getValue()

    if (event.code === 'ArrowLeft') {
      this.subject.next(getCorrectValue(value))
    }

    if (event.code === 'ArrowRight') {
      this.subject.next(value + 1)
    }
  }
}
