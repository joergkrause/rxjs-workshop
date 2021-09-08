import { Observable, Subject, of, interval } from 'rxjs';
import { take, map, filter, tap } from 'rxjs/operators';

var obs = interval(500)
  .pipe(take(5))
  .pipe(tap(i => console.log(i)));

// 2 subscribers for one souece stream

obs.subscribe(value => console.log("Observer A received " + value));
obs.subscribe(value => console.log("Observer B received " + value));