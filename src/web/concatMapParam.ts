import { fromEvent, Observable, Subscriber } from 'rxjs';
import { concatMap, debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

const input = document.querySelector<HTMLInputElement>("input")!;

// fetch (Promise) als Observable darstellen
function ObservableFetch(param: number /* Closure */): Observable<any> {
  const data$ = new Observable((observer) => {
    // Achtung! Serveradresse muss passen oder CORS header setzen
    fetch(`http://127.0.0.1:8080/sample.json?p=${param}`)
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
  return data$;
}

const obs = fromEvent(input, "input")
  .pipe(debounceTime(500))
  .pipe(distinctUntilChanged())
  .pipe(concatMap((evt: Event) => ObservableFetch(+(evt.target as HTMLInputElement).value)))
  .pipe(tap((val: any) => console.log(`Output ${val.length}`)));

obs.subscribe(val => console.log("Subscribe received:", val)); 
