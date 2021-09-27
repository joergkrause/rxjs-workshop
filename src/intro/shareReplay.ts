import { interval } from 'rxjs';
import { shareReplay, take, repeat } from 'rxjs/operators';

const obs$ = interval(1000);
const shared$ = obs$.pipe(
  // nimm 4
  take(4),
  // wiederhole 3 x für jeden Subscriber  
  // shareReplay(3)
  // 
  // repeat(3)
);
shared$.subscribe(x => console.log('sub A: ', x));
shared$.subscribe(y => console.log('sub B: ', y));