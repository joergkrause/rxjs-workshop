import { fromEvent, Observable, Subscriber } from 'rxjs';
import { mergeMap, distinctUntilChanged, tap } from 'rxjs/operators';

const input = document.querySelector<HTMLInputElement>("input") as NonNullable<HTMLInputElement>;

// fetch (Promise) als Observable darstellen
const data$ = new Observable((observer) => {
  // Achtung! Serveradresse muss passen oder CORS header setzen
  fetch('http://127.0.0.1:8080/sample.json')
    .then(response => response.json())
    .then(data => {
      // Simulation eines langamen Servers
      setTimeout(() => {
        observer.next(data);
        observer.complete();
      }, 1000);
    })
    .catch(err => observer.error(err));
});

const obs = fromEvent(input, "input")
  .pipe(distinctUntilChanged())
  // concatMap wartet auf das Ergebnis des letzten Aufrufs 
  // 4 Änderungen innerhalb einer Sekunde werden dann in 4 x 1 sec gesendet (quasi synchron)
  .pipe(mergeMap(value => data$))
  .pipe(tap((val: any) => console.log(`Output ${val.length}`)));

obs.subscribe(val => console.log("Subscribe received:", val)); 
