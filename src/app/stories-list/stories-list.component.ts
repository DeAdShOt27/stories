import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModelComponent } from '../common/model/model.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent {
  constructor(private apiService:ApiService, private dialog: MatDialog){}
  private onDestroy$: Subject<void> = new Subject<void>();
  title = 'task';
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  stories = [];
  tag: string = 'story';

  ngOnInit(){
    this.getStories();
    const interval$ = interval(10000);
    interval$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.getStories();
    });
  }

  getStories(){
    this.apiService.getStories(this.tag).subscribe((response: any) => {
      console.log(response);
      this.stories = response.hits;
    }, (error) => {
      console.log('error :', error);
    });
  }
  openModal(story = {}) {
    console.log("🏴‍☠️ ~ story:", story)
    this.dialog.open(ModelComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '500px',
      height: '',
      position: {
          top: '5vh',
          left: '35vw'
      },
      panelClass:'makeItMiddle',
      data:story
    });
  }

  ngOnDestroy() {
    // to prevent the memory leakage
    this.onDestroy$.complete();
  }
}
