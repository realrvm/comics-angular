import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pictures } from '../pictures/pictures';

@Component({
  selector: 'azra-pictures-mobile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pictures-mobile.component.html',
  styleUrl: './pictures-mobile.component.scss',
})
export class PicturesMobileComponent {
  private pictureSubject = new BehaviorSubject<string>('1');
  public pictureUrl$ = this.pictureSubject.asObservable();

  public handleClick() {
    const currentPicture = Number(this.pictureSubject.getValue());
    if (currentPicture < pictures.length) {
      this.pictureSubject.next((currentPicture + 1).toString());
    } else {
      this.pictureSubject.next('1');
    }
  }
}
