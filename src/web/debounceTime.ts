import { Observable, Subject, of, from, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


const input = document.querySelector<HTMLInputElement>("input") as NonNullable<HTMLInputElement>;

var obs =
  fromEvent(input, "input")
  .pipe(tap(i => console.log(` Input value = ${i} `)))
  .pipe(debounceTime(500))
  .pipe(distinctUntilChanged())
  .pipe(tap(i => console.log(` Output: ${i} `)));

obs.subscribe(); 
