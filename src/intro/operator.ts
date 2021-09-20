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

// custom operator is just an observable
const turnBoolean = (argument: Observable<boolean>): Observable<boolean> => {
  return new Observable<boolean>(subscriber => argument.subscribe({
    next(val) {
      subscriber.next(/* this is */ !val /* the actual operation */);
    },
    error(err) {
      subscriber.error(err);
    },
    complete() {
      subscriber.complete();
    },
  }));
};

var obs =
  from(data)
    .pipe(tap(i => console.log(` Input value: ${i.isValid} `)))
    .pipe(pluck('isValid'))
    .pipe((i: Observable<boolean>) => turnBoolean(i));

obs.subscribe(value => console.log(` Observer: ${value}`));

