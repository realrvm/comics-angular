import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [''],
})
export class SvgIconComponent {
  public icon = input<string>('');
  public id = input<string>('');

  public get href(): string {
    return `svg/${this.icon()}.svg#${this.id()}`;
  }
}
