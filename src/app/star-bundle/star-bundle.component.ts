import { Component, OnInit } from '@angular/core';
import { StarService, LIMITS } from '../services/star.service';

@Component({
  selector: 'app-star-bundle',
  templateUrl: './star-bundle.component.html',
  styleUrls: ['./star-bundle.component.css']
})
export class StarBundleComponent implements OnInit {

  public filledStars = 6;
  total$ = this.starService.total$;
  filledStars$ = this.starService.starCount$;
  page$ = this.starService.page$;
  limit$ = this.starService.limit$;
  totalPages$ = this.starService.totalPages$;
  isLastPage$ = this.starService.isLastPage$;
  stars$ = this.starService.stars$;

  limits = LIMITS;

  constructor( private starService: StarService) { }

  ngOnInit() {
  }

  setLimit(num: number) {
    this.starService.setLimit(num);
  }

  onNext() {
    console.log('netx');
  }

  shiftPage(num) {
    this.starService.shiftPage(num);
  }

  test(ev) {
    this.starService.updateCount(ev.position)
  }
}
