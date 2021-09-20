import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

const input = document.querySelector<HTMLInputElement>("input") as NonNullable<HTMLInputElement>;

var obs =
  // Event löst aus, jeder Change erzeugt ein Object im Stream
  fromEvent(input, "input")
  // Ausgabe
  .pipe(tap(i => console.log(` Input value = ${(i.target as HTMLInputElement).value} `)))
  // ignoriere für 500 ms jeden weiteren Wert
  .pipe(debounceTime(500))
  // schaue, ob der gelieferte Wert (nach 500ms Puffer) neu ist
  .pipe(distinctUntilChanged())
  // gib aus
  .pipe(tap(i => console.log(` Output: ${(i.target as HTMLInputElement).value} `)));

obs.subscribe(); 
