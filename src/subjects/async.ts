import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`Observer A: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`Observer B: ${v}`)
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5