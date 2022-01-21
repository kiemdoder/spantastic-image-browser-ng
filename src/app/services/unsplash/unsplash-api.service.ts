import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UnsplashConfig} from "./unsplash-config";
import {Topic} from "../../models/topic";
import {Picture} from "../../models/picture";

const unsplashHost = 'https://api.unsplash.com';

@Injectable({
  providedIn: 'root'
})
export class UnsplashApiService {

  constructor(private httpClient: HttpClient) {
  }

  loadTopics(): Observable<Topic[]> {
    return this.httpClient.get<any[]>(
      unsplashHost + '/topics',
      {
        params: {'per_page': 100},
        headers: {Authorization: `Client-ID ${UnsplashConfig.accessKey}`}
      }
    ).pipe(
      map(topics => topics.map(topic => ({
        id: topic.id,
        name: topic.title,
        totalPhotos: topic['total_photos']
      })))
    )
  }

  loadPictures(topicId: string, page: number): Observable<Picture[]> {
    return this.httpClient.get<any[]>(
      `${unsplashHost}/topics/${topicId}/photos`,
      {
        params: {
          'per_page': '30',
          page
        },
        headers: {Authorization: `Client-ID ${UnsplashConfig.accessKey}`}
      }
    ).pipe(
      map(photos => photos.map(photo => ({
        id: photo.id,
        description: photo.title,
        urlRegular: photo.urls['regular'],
        urlSmall: photo.urls['small']
      })))
    )
  }
}
