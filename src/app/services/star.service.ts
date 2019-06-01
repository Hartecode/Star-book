import { Injectable } from '@angular/core';
import { BehaviorSubject,  combineLatest  } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

const starsArr = new Array(1000).fill('').map((x, i) => i + 1 );
const LIMIT_LOW = 25;
const LIMIT_MID = 50;
const LIMIT_HIGH = 100;
export const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private totalBS = new BehaviorSubject(starsArr.slice(0, LIMIT_LOW));
  private starCountBS = new BehaviorSubject(7);
  private pageBS = new BehaviorSubject(0);
  private limitBS = new BehaviorSubject(LIMIT_LOW);
  private startsWithBS = new BehaviorSubject('');

  total$ = this.totalBS.asObservable();
  page$ = this.pageBS.asObservable();
  starCount$ = this.starCountBS.asObservable();
  limit$ = this.limitBS.asObservable().pipe(distinctUntilChanged());
  totalPages$ = this.limit$.pipe(
    map((limit) => Math.ceil(1000 / limit)),
  );
  isLastPage$ = combineLatest(this.totalPages$, this.page$).pipe(
    map(([totalPages, page]) => totalPages === page + 1),
  );
  startsWith$ = this.startsWithBS.asObservable();

  stars$ = combineLatest(this.page$, this.limit$, this.startsWith$).pipe(
    map(([page, limit, startsWith]) => {
        const params: any = {
            offset: page * limit,
            limit: limit,
        };

        // Only add if exists, otherwise error on server
        if (startsWith) {
            params.nameStartsWith = startsWith;
        }

        return starsArr.slice(limit * page, limit * (page + 1));
    }),
    shareReplay(1),
  );

  shiftPage(num) {
    this.page$
        .pipe(
            take(1),
            tap((page) => {
                const newPage = page + num;
                if (newPage < 0) return;

                this.pageBS.next(newPage);
            }),
        )
        .subscribe();
  }

  setLimit(num) {
      this.limitBS.next(num);
  }

  setStartsWith(text) {
      this.startsWithBS.next(text);
  }

  updateCount(num) {
    this.starCountBS.next(num);
  }
}
