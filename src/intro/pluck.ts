import { Observable, Subject, of, from } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

interface Data {
  id: number,
  isValid: boolean
}

const data: Data[] = [
  { id: 1, isValid: true },
  { id: 2, isValid: false },
  { id: 3, isValid: true },
  { id: 4, isValid: false },
];

var obs =
  from(data)
  .pipe(tap(i => console.log(` Input value = ${i.id} `)))
  .pipe(pluck('isValid'))
  .pipe(tap(i => console.log(` Items is valid: ${i} `)));

obs.subscribe(); 
