import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  public aboutDrawerVisibility = signal<boolean>(false)

  public contactsDrawerVisibility = signal<boolean>(false)

  public setAboutDrawerVisibility(isVisible: boolean): void {
    this.aboutDrawerVisibility.set(isVisible)
  }

  public setContactsDrawerVisibility(isVisible: boolean): void {
    this.contactsDrawerVisibility.set(isVisible)
  }
}
