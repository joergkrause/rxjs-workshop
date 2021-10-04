import { Observable, fromEvent, interval } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

// UI
const btn = document.querySelector<HTMLInputElement>("button")!;
// click triggered observable A
const clicks = fromEvent(btn, 'click');
// switchMap löst mit Observable A das Observable B aus (B ist der Ausgabestrom)
// jedes erneute Auftreten eines Objects auf A startet den Prozess neu
// solange Elemente auf B auftreten, kann A nicht mehr liefern (switch=umschalten nach B)
var obs = interval(1000)
  .pipe(tap(i => console.log(`Input = ${i}`)))
  // .pipe(take(10))
  .pipe(switchMap((event) => clicks));

obs.subscribe(x => console.log(`Output = ${x.type}`)); 