import { Component } from '@angular/core';
import { ContainerComponent } from '@widgets/container/container.component';
import { AboutDrawerComponent } from '@widgets/drawers/about-drawer/about-drawer.component';
import { ContactsDrawerComponent } from '@widgets/drawers/contacts-drawer/contacts-drawer.component';
import { HeaderComponent } from '@widgets/header/header.component';

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
