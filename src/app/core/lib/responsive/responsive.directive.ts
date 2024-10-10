import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'

import { Responsive } from '../constants/constants'
import { ResponsiveService } from './responsive.service'

@Directive({
  selector: '[azraResponsive]',
  standalone: true,
  providers: [ResponsiveService],
})
export class ResponsiveDirective {
  private readonly templateRef = inject(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)
  private readonly responsiveService = inject(ResponsiveService)
  public azraResponsive = input<Responsive>()

  private effect = effect(() => {
    const width = this.responsiveService.width()

    if (width === this.azraResponsive()) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  })
}
