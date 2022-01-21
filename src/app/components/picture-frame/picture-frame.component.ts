import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Picture} from "../../models/picture";

@Component({
  selector: 'app-picture-frame',
  templateUrl: './picture-frame.component.html',
  styleUrls: ['./picture-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureFrameComponent {

  @Input() picture1!: Picture;
  @Input() picture2!: Picture;

  constructor() { }

}
