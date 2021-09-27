import { interval, ReplaySubject, Subject } from 'rxjs';
import { shareReplay, take, repeat, pluck } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// instead of using shareReplay, use ReplaySubject
const shareWithReplay = new ReplaySubject();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  pluck('url')
)
.subscribe(val => shareWithReplay.next(val));

// subscribe to ReplaySubject instead
// logged: 'my path'
shareWithReplay.subscribe(console.log);

// simulate route change
routeEnd.next({data: {}, url: 'my-path'});

// https://www.learnrxjs.io/learn-rxjs/operators/multicasting/sharereplay