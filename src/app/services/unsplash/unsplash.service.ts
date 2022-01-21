import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Topic} from "../../models/topic";
import {Picture} from "../../models/picture";
import {UnsplashApiService} from "./unsplash-api.service";

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  topics$ = new BehaviorSubject<Topic[]>([]);
  pictures$ = new BehaviorSubject<Picture[]>([])

  constructor(private unsplashApiService: UnsplashApiService) { }

  loadTopics() {
    this.unsplashApiService.loadTopics().subscribe(topics => {
      this.topics$.next(topics);
      if (topics?.length > 0) {
        this.loadPictures(topics[0]);
      }
    });
  }

  loadPictures(topic: Topic) {
    this.unsplashApiService.loadPictures(topic.id).subscribe(pictures => this.pictures$.next(pictures));
  }
}
