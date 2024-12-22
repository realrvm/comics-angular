import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { InputNumber } from 'primeng/inputnumber'

import {
  LocalStorageService,
  Responsive,
  ResponsiveDirective,
} from '@azra/core'
import { SpriteComponent } from '@azra/icons'
import { ContentService } from '@azra/pages'

@Component({
  selector: 'azra-sidebar',
  imports: [
    ResponsiveDirective,
    SpriteComponent,
    NgClass,
    FormsModule,
    InputNumber,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router)
  private readonly contentService = inject(ContentService)
  public readonly chapters = this.contentService.contentData.asReadonly()
  private readonly localStorageService = inject(LocalStorageService)
  private readonly localStorageValue = this.localStorageService.get(
    'azraLastImageNumber',
  ) as string

  public handset = Responsive.HANDSET
  public desktop = Responsive.DESKTOP
  public comicId = 1

  public onChapterClick(title: string): void {
    this.router.navigate(['content'])
    this.contentService.findComicByChapterClick(title)
  }

  public onChapterClickHandset(title: string): void {
    this.router.navigate(['content-handset'])
    this.contentService.findComicByChapterClick(title)
  }

  public goHome(): void {
    this.router.navigate([''])
  }

  public toTheLastComicRead(): void {
    const lastReadComicId = Number(this.localStorageValue) || 1

    this.router.navigate(['content-handset'])
    this.contentService.toTheComic(lastReadComicId)
  }

  public onGetComicId(): void {
    this.router.navigate(['content-handset'])

    if (this.comicId < 1 && this.comicId === null) {
      this.contentService.toTheComic(1)
    } else {
      this.contentService.toTheComic(this.comicId)
    }
  }
}
