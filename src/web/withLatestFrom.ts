import { Observable, fromEvent, interval } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';

// UI
const btn = document.querySelector<HTMLInputElement>("button") as NonNullable<HTMLInputElement>;
// click triggered observable A
const clicks = fromEvent(btn, 'click');

var timer = interval(1000).pipe(tap(i => console.log(`Input = ${i}`)));
// timer ist hier implizit abonniert
var obs = clicks.pipe(withLatestFrom(timer));

obs.subscribe(x => {
  const [evt, num] = x;
  console.log(`Output = ${evt.type} => timer is currently ${num}`)
});