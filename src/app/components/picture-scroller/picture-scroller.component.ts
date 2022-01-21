import {AfterViewChecked, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {Carousel} from "primeng/carousel";
import {Subscription} from "rxjs";
import {UnsplashService} from "../../services/unsplash/unsplash.service";

interface PicturePair {
  picture1: Picture;
  picture2?: Picture;
}

function partition(pics: Picture[]): PicturePair[] {
  function* part(itr: Iterator<Picture>) {
    while (true) {
      const first = itr.next();
      const second = itr.next();

      if (!first.done && second.done) {
        yield {picture1: first.value};
      }

      if (!first.done && !second.done) {
        yield {picture1: first.value, picture2: second.value};
      }

      if (first.done || second.done) {
        break;
      }
    }
  }

  const iter = pics[Symbol.iterator]();
  return Array.from(part(iter))
}

@Component({
  selector: 'app-picture-scroller',
  templateUrl: './picture-scroller.component.html',
  styleUrls: ['./picture-scroller.component.scss']
})
export class PictureScrollerComponent implements OnDestroy, AfterViewChecked {

  groupedPictures!: PicturePair[];

  @Input() showNavButtons = false;

  @ViewChild(Carousel) carousel!: Carousel;

  private subscription!: Subscription;

  constructor(public unsplashService: UnsplashService) {}

  ngAfterViewChecked(): void {
    if (!this.subscription) {
      this.subscription = this.unsplashService.pictures$.subscribe(pictures => {
        this.groupedPictures = partition(pictures);

        // Reset carousel after new pictures were loaded.
        this.carousel.page = 1;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
