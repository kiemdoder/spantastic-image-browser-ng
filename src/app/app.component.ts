import {Component, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spantastic unsplash browser';
  picturesMaximized = false;

  @ViewChild(MatDrawer) drawer!: MatSidenav;

  toggleSideNav() {
    this.drawer.toggle();
  }
}
