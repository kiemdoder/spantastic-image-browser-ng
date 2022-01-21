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
  pictures$ = new BehaviorSubject<{ pictures: Picture[], firstPage: boolean }>({pictures: [], firstPage: true})

  private currentTopic?: Topic;
  private loadedPages = 1;

  constructor(private unsplashApiService: UnsplashApiService) {
  }

  loadTopics() {
    this.unsplashApiService.loadTopics().subscribe(topics => {
      this.topics$.next(topics);
      if (topics?.length > 0) {
        this.currentTopic = topics[0];
        this.loadPicturesFirstPage(this.currentTopic);
      }
    });
  }

  loadPicturesFirstPage(topic: Topic) {
    this.unsplashApiService.loadPictures(topic.id, 1).subscribe(pictures => {
      this.loadedPages = 1;
      this.pictures$.next({pictures, firstPage: true})
    });
  }

  loadPicturesNextPage() {
    if (this.currentTopic) {
      this.loadedPages = this.loadedPages + 1;
      this.unsplashApiService.loadPictures(this.currentTopic.id, this.loadedPages).subscribe(pictures => {
        if (pictures.length > 0) {
          const currentPictures = this.pictures$.value.pictures;
          this.pictures$.next({pictures: currentPictures.concat(pictures), firstPage: false});
        }
      });
    }
  }
}
