import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-btn',
  templateUrl: './star-btn.component.html',
  styleUrls: ['./star-btn.component.css']
})
export class StarBtnComponent {

  public icon: 'star' | 'star_border' = 'star_border';

  @Input() selected = false;

  @Input() number: number;
  @Output() status: EventEmitter<StarOutput> = new EventEmitter<StarOutput>();

  onClick() {
    this.selected = !this.selected;
    this.status.emit({
      position: this.number,
      selected: this.selected
    });
  }

}

export interface StarOutput {
  position: number;
  selected: boolean;
}
