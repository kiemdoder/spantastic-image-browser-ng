import {Component, EventEmitter, Output} from '@angular/core';
import {Topic} from "../../models/topic";
import {UnsplashApiService} from "../../services/unsplash/unsplash-api.service";

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent {

  loading = true;
  topics: Topic[] = [];
  selectedTopicId = '';

  @Output() select = new EventEmitter<Topic>();

  constructor(private unsplashApiService: UnsplashApiService) {
    unsplashApiService.loadTopics().subscribe(topics => {
      this.topics = topics;
      if (topics.length > 0) {
        this.selectedTopicId = topics[0].id;
      }
      this.loading = false;
    });
  }

  topicClicked(topic: Topic) {
    this.selectedTopicId = topic.id;
    this.select.emit(topic);
  }
}
