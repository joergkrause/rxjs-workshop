import { fromEvent, Observable, Subscriber } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';

const input = document.querySelector<HTMLInputElement>("input") as NonNullable<HTMLInputElement>;

function smartSearch(param: any): Observable<any> {
  const data$ = new Observable((observer) => {
    // Achtung! Serveradresse muss passen oder CORS header setzen
    fetch(`http://127.0.0.1:8080/sample.json?${param}`)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          observer.next(data);
          observer.complete();
        }, 5000);
      })
      .catch(err => observer.error(err));
  });  
  return data$;
}

const obs = fromEvent(input, "keyup")
  .pipe(map(evt => (<any>evt.target).value), startWith(''), debounceTime(400))
  .pipe(distinctUntilChanged())
  .pipe(tap((val: any) => console.log(`Input ${val}`)))
  // Setze alternativ concatMap ein, um den Unterschied zu sehen
  .pipe(switchMap(value => smartSearch(value)))
  .pipe(tap((val: any) => console.log(`Output ${val.length}`)));

obs.subscribe(val => console.log("Subscribe received:", val)); 

/**
 * switchMap
 * Input 
switchMapAhead.ts:25 Input H
switchMapAhead.ts:25 Input Ha
switchMapAhead.ts:25 Input Hal
switchMapAhead.ts:25 Input Hall
switchMapAhead.ts:25 Input Hallo
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
 * 
 */

/**
 * concatMap
 * Input 
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
switchMapAhead.ts:25 Input H
switchMapAhead.ts:25 Input Ha
switchMapAhead.ts:25 Input Hal
switchMapAhead.ts:25 Input Hall
switchMapAhead.ts:25 Input Hallo
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
switchMapAhead.ts:28 Output 3
switchMapAhead.ts:30 Subscribe received: (3) [{…}, {…}, {…}]
 */