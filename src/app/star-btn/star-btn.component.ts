import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-btn',
  templateUrl: './star-btn.component.html',
  styleUrls: ['./star-btn.component.css']
})
export class StarBtnComponent {

  private _icon: 'star' | 'star_border';

  @Input() selected = false;
  @Input() number: number;
  @Output() status: EventEmitter<StarOutput> = new EventEmitter<StarOutput>();

  set icon(x) {
    this.selected ? this._icon = 'star' : this._icon = 'star_border';
  }

  get icon() {
    return this._icon;
  }

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
