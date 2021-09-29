import { timer, of } from 'rxjs';
import { concatMapTo, tap } from 'rxjs/operators';

// This could be any observable
const source$ = of(1, 2, 3);

console.log('Start script, wait 3 sec');

timer(3000)
  .pipe(concatMapTo(source$))
  .subscribe(console.log);