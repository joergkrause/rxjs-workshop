import { Subject } from 'rxjs';

var sub = new Subject();

function trigger() {
  sub.next(Math.random());
}

sub.subscribe(val => console.log(val));
sub.subscribe(val => console.log(val));

trigger();

// siehe auch Observable: observable/cold-observable1.ts