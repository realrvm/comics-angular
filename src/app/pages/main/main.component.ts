import { Component } from '@angular/core';
import { ContainerComponent } from '@core/widgets/container/container.component';
import { AboutDrawerComponent } from '@core/widgets/drawers/about-drawer/about-drawer.component';
import { ContactsDrawerComponent } from '@core/widgets/drawers/contacts-drawer/contacts-drawer.component';
import { HeaderComponent } from '@core/widgets/header/header.component';

@Component({
  selector: 'azra-main',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderComponent,
    AboutDrawerComponent,
    ContactsDrawerComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
