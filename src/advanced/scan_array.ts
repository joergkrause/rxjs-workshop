import { interval } from 'rxjs';
import { scan, map, distinctUntilChanged } from 'rxjs/operators';

// Accumulate values in an array, emit random values from this array.
const scanObs = interval(1000)
  .pipe(
    scan((a: Array<any>, c) => [...a, c], []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
  )
  .subscribe(console.log);