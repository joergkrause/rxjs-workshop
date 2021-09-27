import { Observable, fromEvent, interval } from 'rxjs';
import { combineLatestWith, map, tap } from 'rxjs/operators';

// UI
const z1 = document.querySelector<HTMLInputElement>("[name='z1']") as NonNullable<HTMLInputElement>;
const z2 = document.querySelector<HTMLInputElement>("[name='z2']") as NonNullable<HTMLInputElement>;
const out = document.querySelector<HTMLOutputElement>("output") as NonNullable<HTMLOutputElement>;
// Jede Änderung löst ein Event aus
const num1$ = fromEvent(z1, 'input');
const num2$ = fromEvent(z2, 'input');
// egal was die letzten Wert gelten
num1$
  .pipe(combineLatestWith(num2$))
  .pipe(map(([n1, n2]) => Number((<HTMLInputElement>n1.target).value) + Number((<HTMLInputElement>n2.target).value)))
  .pipe(tap(val => console.log(val)))
  .subscribe(result => out.innerText = result.toString());

// nicht num1$.subscribe, sonst kommt der Eingabestrom