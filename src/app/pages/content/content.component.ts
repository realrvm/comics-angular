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
  private readonly blob = this.contentService.getImage
  private readonly imagesLimit = this.contentService.dataLength
  private content = this.contentService.content

  private readonly effect = effect(
    () => {
      if (this.content() && !this.blob()) {
        const url = URL.createObjectURL(this.content() as Blob)
        const image = this.image() as ElementRef<HTMLImageElement>
        image.nativeElement.src = url
        this.contentService.imgId.set(1)
      }
      if (this.blob()) {
        const url = URL.createObjectURL(this.blob() as Blob)
        const image = this.image() as ElementRef<HTMLImageElement>
        image.nativeElement.src = url
      }
    },
    { allowSignalWrites: true },
  )

  handleOnImgClick() {
    //this.contentService.imgId.update((prev) => prev + 1)
    console.log('1')
  }

  handlePress(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') {
      this.contentService.imgId.update((prev) => {
        if (prev === undefined || prev === 1) return 1
        return prev - 1
      })
    }

    if (event.code === 'ArrowRight') {
      const limit = this.imagesLimit()

      this.contentService.imgId.update((prev) => {
        if (prev === undefined) return 1
        return prev + 1 < limit - 1 ? prev + 1 : limit - 1
      })
    }
  }
}
