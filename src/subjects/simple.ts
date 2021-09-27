import { catchError, interval, of, Subject } from "rxjs";

// create a subject that can subscribe
const ms = new Subject();
ms.subscribe(i => console.log(i));

// create an observable that creates data
const obs = interval(500);

// let the subject subscribe to the observable
const subscriber = obs.subscribe(ms);

// after two sec inject a value
setTimeout(() => ms.next(1000), 2000);

// after 5 sec stop by unsubscribing
setTimeout(() => subscriber.unsubscribe(), 5000);