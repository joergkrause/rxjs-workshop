import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 1000 /* windowTime */);
 
subject.subscribe({
  next: (v) => console.log(`Observer A: ${v}`)
});
 
let i = 1;
const timer = setInterval(() => subject.next(i++), 100);
 
setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`Observer B: ${v}`)
  });
}, 1000);

setTimeout(() => {
  clearInterval(timer);
  console.log('Stop interval')
}, 2000);