import {Picture} from "../../models/picture";
import {partitionPictures} from "./picture-scroller.component";

function createPictures(num: number) {
  return Array.from({length: num}).map((_, i) => ({
    id: 'id' + i,
    description: 'description' + i,
    urlSmall: 'small' + i,
    urlRegular: 'regular' + i
  }))
}

describe('PictureScrollerComponent', () => {
  it('should partition pictures for picture frames', () => {
    const pictures1: Picture[] = createPictures(4);
    const picturePairs = partitionPictures(pictures1);
    expect(picturePairs.length).toBe(2);
    expect(picturePairs[0].picture1.id).toBe('id0');
    expect(picturePairs[0].picture2?.id).toBe('id1');
    expect(picturePairs[1].picture1.id).toBe('id2');
    expect(picturePairs[1].picture2?.id).toBe('id3');

    const pictures2: Picture[] = createPictures(3);
    const picturePairs2 = partitionPictures(pictures2);
    expect(picturePairs2.length).toBe(2);
    expect(picturePairs2[1].picture1.id).toBe('id2');
    expect(picturePairs2[1].picture2).toBeFalsy();
  })
})
