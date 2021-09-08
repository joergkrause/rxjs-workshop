import { Observable, Subject, of, from } from 'rxjs';
import { take, map, filter, tap } from 'rxjs/operators';

interface Data {
  id: number,
  isValid: boolean
}

const data: Data[] = [
  { id: 1, isValid: false },
  { id: 2, isValid: true},
  { id: 3, isValid: false },
  { id: 4, isValid: true },
];

var obs =
  from(data)
  .pipe(tap(i => console.log(` Input value = ${i.id} `)))
  .pipe(filter((d: Data) => d.isValid))
  .pipe(tap(i => console.log(` isValid `)));

obs.subscribe(); 
