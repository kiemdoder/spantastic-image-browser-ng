import {Component, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {Topic} from "./models/topic";
import {UnsplashService} from "./services/unsplash/unsplash.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spantastic unsplash browser';
  picturesMaximized = false;

  @ViewChild(MatDrawer) drawer!: MatSidenav;

  constructor(public unsplashService: UnsplashService) {
    unsplashService.loadTopics();
  }

  toggleSideNav() {
    this.drawer.toggle();
  }

  topicSelected(topic: Topic) {
    this.unsplashService.loadPictures(topic);
  }
}
