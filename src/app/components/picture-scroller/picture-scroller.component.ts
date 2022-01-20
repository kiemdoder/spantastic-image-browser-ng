import {Component, Input} from '@angular/core';
import {Picture} from "../../models/picture";

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
        yield {picture1: first.value, picture2: first.value};
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
export class PictureScrollerComponent {

  groupedPictures!: PicturePair[];
  @Input() set pictures(pics:  Picture[]){
    this.groupedPictures = partition(pics);
  }
}
