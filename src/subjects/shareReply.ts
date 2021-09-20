import { interval } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

const obs$ = interval(1000);
const shared$ = obs$.pipe(
  take(4),
  shareReplay(3)
);
shared$.subscribe(x => console.log('sub A: ', x));
shared$.subscribe(y => console.log('sub B: ', y));