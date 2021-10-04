import { map, Observable, of } from "rxjs";
import { concatAll, exhaustAll, mergeAll, switchAll } from "rxjs/operators";

const namesObservable = of('Pete', 'Mike');
// Schritt 1: Simpel
//   .pipe(map((name => `${name} is awesome`)));

// Schritt 2: Komplexe Daten aus 2. Quelle
function http(name: string) {
  return of(`${name} is awesome! (msg #1)`,  `${name} is awesome! (msg #2)`);
}

namesObservable
  // Map auf ein Observable (cross join) --> ohne "flattening strategie"
  .pipe(map(name => http(name)), concatAll() /* Schritt 5: , mergeAll(), switchAll(), concatAll, exhaustAll / */)
  // Schritt 3 bevor: Naiv (Ausgabe unten)
  .subscribe(result => console.log('Result', result));
  // Schritt 4: Wir müssen den inneren Observer subscriben
  // .subscribe((result: Observable<any>) => result.subscribe(inner => console.log('Result', inner)));

  // Schritt 5 siehe oben

// Result Observable { _subscribe: [Function (anonymous)] }
// Result Observable { _subscribe: [Function (anonymous)] }

// merge / mergeAll / mergeMap ==> keine Strategie / alles (JOIN)
// switch                      ==> der erste Wert im inneren Stream übernimmt (SWITCH)
// concat                      ==> erst Alle vom ersten / dann alle vom inneren (QUEUE)
// exhaust                     ==> alle vom ersten / wenn während dess im inneren was auftaucht, wird es ignoriert
//                                 ist der erste fertig, werden Werte vom inneren verarbeitet

/// https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b
/// https://stackblitz.com/edit/i-switched-a-map-examples
