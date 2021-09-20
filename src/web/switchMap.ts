import { Observable, fromEvent, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

// UI
const btn = document.querySelector<HTMLInputElement>("button") as NonNullable<HTMLInputElement>;
// click triggered observable A
const clicks = fromEvent(btn, 'click');
// stream aus 5 Zahlen ist Observable B
const fiveNumbers = interval(1000).pipe(take(5));
// switchMap löst mit Observable A das Observable B aus (B ist der Ausgabestrom)
// jedes erneute Auftreten eines Objects auf A startet den Prozess neu
var obs = clicks.pipe(switchMap((event) => fiveNumbers));

obs.subscribe(x => console.log(x)); 
