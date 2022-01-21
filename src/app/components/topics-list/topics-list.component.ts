import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Topic} from "../../models/topic";
import {UnsplashService} from "../../services/unsplash/unsplash.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsListComponent {

  loading = true;
  topics: Topic[] = [];
  selectedTopicId = '';

  @Output() select = new EventEmitter<Topic>();

  private subscription = new Subscription();

  constructor(private unsplashService: UnsplashService) {
    this.subscription.add(unsplashService.topics$.subscribe(topics => {
        this.topics = topics;
        if (topics.length > 0) {
          this.selectedTopicId = topics[0].id;
        }
        this.loading = false;
    }));
  }

  topicClicked(topic: Topic) {
    this.selectedTopicId = topic.id;
    this.select.emit(topic);
  }
}
