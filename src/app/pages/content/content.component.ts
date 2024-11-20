import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core'

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SidebarComponent } from '@azra/ui/sidebar'

import { ContentService } from './content.service'

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [ResponsiveDirective, SidebarComponent],
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
export class ContentComponent {
  private readonly contentService = inject(ContentService)

  public readonly desktop = Responsive.DESKTOP
  public readonly handset = Responsive.HANDSET

  public image = viewChild<ElementRef<HTMLImageElement>>('img')
  private readonly res = this.contentService.getImage

  private readonly effect = effect(
    () => {
      if (this.res()) {
        const url = URL.createObjectURL(this.res() as Blob)
        const image = this.image() as ElementRef<HTMLImageElement>
        image.nativeElement.src = url
      }
    },
    { allowSignalWrites: true },
  )

  handleOnImgClick() {
    this.contentService.imgId.update((prev) => prev + 1)
  }

  handlePress(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') {
      this.contentService.imgId.update((prev) => {
        if (prev === 1) return 1
        return prev - 1
      })
    }

    if (event.code === 'ArrowRight') {
      this.contentService.imgId.update((prev) => prev + 1)
    }
  }
}
