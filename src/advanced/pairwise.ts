import { Observable, Subject, of, from } from 'rxjs';
import { pairwise, tap } from 'rxjs/operators';

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
  .pipe(pairwise())
  .pipe(tap(i => console.log(i[0], i[1])));

obs.subscribe(); 
