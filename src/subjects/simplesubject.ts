import { Subject } from 'rxjs';

var sub$ = new Subject();

// Subscriber
sub$.subscribe(val => console.log(val));

// Emitter
sub$.next('Emit some value');
