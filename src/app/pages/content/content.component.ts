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

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SidebarComponent } from '@azra/ui/sidebar'

import { ContentService } from './content.service'

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [ResponsiveDirective, SidebarComponent, NgClass],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-screen bg-black p-4;
    }
  `,
  host: {
    '(document:keydown)': 'handlePress($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  private readonly contentService = inject(ContentService)
  private readonly subject = this.contentService.subject
  private readonly blob$ = this.contentService.blob$
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

        image.nativeElement.src = url
      }
    })
  }

  handleOnImgClick(event: MouseEvent) {
    event.stopPropagation()

    const value = this.getCorrectValue()

    this.subject.next(value + 1)
  }

  handlePress(event: KeyboardEvent) {
    event.stopPropagation()

    const value = this.getCorrectValue()

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    if (event.code === 'ArrowLeft') {
      this.subject.next(value - 1)
    }

    if (event.code === 'ArrowRight') {
      this.contentService.subject.next(value + 1)
    }
  }

  private getCorrectValue() {
    const value = this.subject.getValue()

    return value < 2 ? 1 : value
  }
}
