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
];

const dataSource2: Data[] = [
  { id: 5, isValid: true },
  { id: 6, isValid: false },
  { id: 7, isValid: true },
  { id: 8, isValid: false },
];

// Erstes Observable triggered den Abruf des zweiten (das wird dann 3 x ausgegeben)
var obs = from(dataSource1).pipe(mergeMap((data) => dataSource2));

obs.subscribe(value => console.log(` Observer A: ${value.id}`));

