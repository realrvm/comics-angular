import { NgOptimizedImage } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core'

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SidebarComponent } from '@azra/ui/sidebar'

import { ContentStore } from './content.store'

@Component({
  selector: 'azra-content',
  standalone: true,
  imports: [ResponsiveDirective, SidebarComponent, NgOptimizedImage],
  templateUrl: './content.component.html',
  styles: `
    :host {
      @apply block h-screen bg-black p-4;
    }
  `,
  host: {
    '(document:keydown)': 'handlePress($event)',
  },
  providers: [ContentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  private readonly contentStore = inject(ContentStore)

  public readonly desktop = Responsive.DESKTOP
  public readonly handset = Responsive.HANDSET

  private readonly order = this.contentStore.order
  public path = computed(() => `arc/${this.order()}.jpg`)

  handleOnImgClick() {
    this.contentStore.incrementOrder()
  }

  handlePress(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft' && this.order() > 1) {
      this.contentStore.decrementOrder()
    }

    if (event.code === 'ArrowRight') {
      this.contentStore.incrementOrder()
    }
  }
}
