import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { Responsive, ResponsiveDirective } from '@azra/core'
import { SpriteComponent } from '@azra/icons'
import { ContentService } from '@azra/pages'

@Component({
  selector: 'azra-sidebar',
  standalone: true,
  imports: [ResponsiveDirective, SpriteComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router)
  private readonly contentService = inject(ContentService)
  public readonly chapters = this.contentService.contentData.asReadonly()

  public handset = Responsive.HANDSET
  public desktop = Responsive.DESKTOP

  public onChapterClick(title: string) {
    this.contentService.findComicByChapterClick(title)
  }

  public goHome() {
    this.router.navigate([''])
  }
}
