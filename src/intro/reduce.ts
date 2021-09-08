import { Observable, Subject, of, from } from 'rxjs';
import { reduce, tap } from 'rxjs/operators';

interface Data {
  id: number,
  isValid: boolean
}

const data: Data[] = [
  { id: 1, isValid: false },
  { id: 2, isValid: true },
  { id: 3, isValid: true },
  { id: 4, isValid: false },
];

const init = 0;

var obs =
  from(data)
  .pipe(tap(i => console.log(` Input value = ${i.id} `)))
  .pipe(reduce((accumulated: number, val: Data) => val.isValid ? ++accumulated : accumulated, init))
  .pipe(tap(i => console.log(` Number of invalid items: ${i} `)));

obs.subscribe(); 
