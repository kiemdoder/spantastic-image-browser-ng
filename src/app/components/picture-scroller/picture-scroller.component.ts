import { Component, OnInit } from '@angular/core';
import {Picture} from "../../models/picture";

@Component({
  selector: 'app-picture-scroller',
  templateUrl: './picture-scroller.component.html',
  styleUrls: ['./picture-scroller.component.scss']
})
export class PictureScrollerComponent implements OnInit {

  pictures: Picture[] = [1, 2, 3, 4, 5, 6, 7 ,8, 9].map(i => ({
    id: i.toString(),
    description: 'description ' + i,
    urlSmall: 'url-small-' + i,
    urlRegular: 'url-regular-' + i
  }));

  constructor() { }

  ngOnInit(): void {
  }

}
