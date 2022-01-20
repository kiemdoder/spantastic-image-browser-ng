import {Component, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {BehaviorSubject} from "rxjs";
import {Picture} from "./models/picture";
import {Topic} from "./models/topic";
import {UnsplashApiService} from "./services/unsplash/unsplash-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spantastic unsplash browser';
  picturesMaximized = false;
  // pictures = Array.from({length: 200}).map((_, i) => ({
  //   id: 'id' + i,
  //   description: 'description ' + i,
  //   urlSmall: 'small-url-' + i,
  //   urlRegular: 'regular-url-' + i
  // }))
  pictures$ = new BehaviorSubject<Picture[]>([]);

  @ViewChild(MatDrawer) drawer!: MatSidenav;

  constructor(private unsplashApiService: UnsplashApiService) {
  }

  toggleSideNav() {
    this.drawer.toggle();
  }

  topicSelected(topic: Topic) {
    this.unsplashApiService.loadPictures(topic.id).subscribe(pictures => this.pictures$.next(pictures));
  }
}
