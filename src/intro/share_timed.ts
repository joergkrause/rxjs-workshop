import { Observable, Subject, of, from, interval } from 'rxjs';
import { share, tap, take } from 'rxjs/operators';

interface Data {
  id: number,
  isValid: boolean
}

const data: Data[] = [
  { id: 1, isValid: true },
  { id: 2, isValid: false },
  { id: 3, isValid: true },
  { id: 4, isValid: false },
];

var obs =
  interval(500).pipe(take(5))
    .pipe(tap(i => console.log(` Side effect A (tap): ${i} `)))
    .pipe(share());

obs.subscribe(value => console.log(` Observer A: ${value} `));

obs.subscribe(value => console.log(` Observer B: ${value} <--`));
