import {Component, OnInit} from '@angular/core';
import {Topic} from "../../models/topic";
import {UnsplashApiService} from "../../services/unsplash/unsplash-api.service";

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  loading = true;
  topics: Topic[] = [];
  selectedTopicId = '';

  constructor(private unsplashApiService: UnsplashApiService) {
    unsplashApiService.loadTopics().subscribe(topics => {
      this.topics = topics;
      if (topics.length > 0) {
        this.selectedTopicId = topics[0].id;
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
