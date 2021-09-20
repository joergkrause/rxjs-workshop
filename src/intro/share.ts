import { Observable, Subject, of, from } from 'rxjs';
import { share, tap } from 'rxjs/operators';

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
    .pipe(tap(i => console.log(` Input value: ${i.id} `)))
    .pipe(share());

obs.subscribe(value => console.log(` Observer A: ${value.id}=${value.isValid}`));

obs.subscribe(value => console.log(` Observer B: ${value.id}=${value.isValid}`));
