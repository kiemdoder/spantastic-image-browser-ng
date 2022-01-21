import {fakeAsync, flush, TestBed} from "@angular/core/testing";
import {of, skip, takeLast} from "rxjs";
import {UnsplashApiService} from "./unsplash-api.service";
import {UnsplashService} from "./unsplash.service";

function createPictures(num: number, offset = 0) {
  return Array.from({length: num}).map((_, i) => ({
    id: 'id' + i + offset,
    description: 'description' + i + offset,
    urlSmall: 'small' + i + offset,
    urlRegular: 'regular' + i + offset
  }))
}

describe('UnsplashService', () => {

  it('should load first pictures page', () => {
    const unsplashApiService = jasmine.createSpyObj('UnsplashService', ['loadPictures']);
    unsplashApiService.loadPictures.and.returnValue(of(createPictures(5)));
    TestBed.configureTestingModule({
      providers: [
        {provide: UnsplashApiService, useValue: unsplashApiService},
        UnsplashService
      ]
    });
    const unsplashService = TestBed.inject(UnsplashService);
    unsplashService.loadPicturesFirstPage({id: 'id1', name: 'topic1', totalPhotos: 31});
    unsplashService.pictures$.subscribe(pictures => {
      expect(pictures.pictures.length).toBe(5);
      expect(pictures.pictures[0].id).toBe('id0');
      expect(pictures.pictures[4].id).toBe('id4');
      expect(pictures.firstPage).toBeTrue();
    })
  })

  it('should load next pictures page', () => {
    const unsplashApiService = jasmine.createSpyObj('UnsplashService', ['loadPictures']);
    unsplashApiService.loadPictures.and.returnValue(of(createPictures(5)));
    unsplashApiService.loadPictures.and.returnValue(of(createPictures(5, 5)));

    TestBed.configureTestingModule({
      providers: [
        {provide: UnsplashApiService, useValue: unsplashApiService},
        UnsplashService
      ]
    });
    const unsplashService = TestBed.inject(UnsplashService);
    unsplashService.loadPicturesFirstPage({id: 'id1', name: 'topic1', totalPhotos: 31});
    unsplashService.loadPicturesNextPage();
    unsplashService.pictures$.pipe(takeLast(1)).subscribe(pictures => {
      expect(pictures.pictures.length).toBe(10);
      expect(pictures.pictures[0].id).toBe('id0');
      expect(pictures.pictures[4].id).toBe('id4');
      expect(pictures.pictures[9].id).toBe('id9');
      expect(pictures.firstPage).toBeFalse();
    })
  });
})
