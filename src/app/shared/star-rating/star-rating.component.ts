import { startWith } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
@Input() rating: number;
starWidth: number;
@Output() notify: EventEmitter<string>= new EventEmitter<string>();
onClick(){
  this.notify.emit('clicked');
}
  constructor() { }
//sets up the size of the star rating depending on the
//rating that has been entered
  public ngOnChanges(): void{
    this.starWidth = this.rating * 90 / 5;
    console.log(this.starWidth);
  }

}
