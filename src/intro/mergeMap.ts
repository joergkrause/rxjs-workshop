import { Observable, Subject, of, from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

interface Data {
  id: number,
  isValid: boolean
}

const dataSource1: Data[] = [
  { id: 1, isValid: true },
  { id: 2, isValid: false },
  { id: 3, isValid: true },
  { id: 4, isValid: false },
];

const dataSource2: Data[] = [
  { id: 5, isValid: true },
  { id: 6, isValid: false },
  { id: 7, isValid: true },
  { id: 8, isValid: false },
];

var groupOfData = of(dataSource1, dataSource2);
    
var obs = from(dataSource1).pipe(mergeMap((data) => data as any));

obs.subscribe(value => console.log(` Observer A: ${value}`));

