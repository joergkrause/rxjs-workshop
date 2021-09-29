import { timer, fromEvent, merge } from 'rxjs';
import {
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  filter,
  mapTo,
  map,
  tap,
  pluck
} from 'rxjs/operators';

let currentNumber = 0;

// elems
const input: any = document.getElementById('range');

const updateHTML = (id: string, val:number) => (document.getElementById(id)!.innerHTML = val.toString());

// streams
const enter$ = fromEvent(input, 'keyup').pipe(
  pluck('code'),
  filter(code => code === 'Enter')
);

enter$
  .pipe(
    map(() => parseInt(input.value)),
    switchMap(endRange => {
      console.log('switch');
      return timer(0, 20).pipe(
        mapTo(endRange > currentNumber ? 1 : -1),
        startWith(currentNumber),
        scan((acc, curr) => acc + curr),
        takeWhile(endRange > currentNumber
          ? (val: number) => val <= endRange
          : (val: number) => val >= endRange)
      );
    }),
    tap(v => (currentNumber = v)),
    startWith(currentNumber)
  )
  .subscribe(val => updateHTML('display', val));