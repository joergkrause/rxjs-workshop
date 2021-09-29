import { interval } from "rxjs";
import { reduce, scan, take } from "rxjs/operators";


const obs$ = interval(1000).pipe(take(5));

// replace reduce with scan to see diff
obs$
  .pipe(reduce((result, current) => result + current, 0))
  .subscribe(res => console.log(res));