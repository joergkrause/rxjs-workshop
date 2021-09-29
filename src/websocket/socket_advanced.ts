import { Subject, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck, tap } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "wss://wpss-videocourse.webpubsub.azure.com/client/hubs/machine?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHNzLXZpZGVvY291cnNlLndlYnB1YnN1Yi5henVyZS5jb20vY2xpZW50L2h1YnMvbWFjaGluZSIsImlhdCI6MTYzMjk0NTA5NCwiZXhwIjoxNjMzMDMxNDk0LCJzdWIiOiJUZW1wZXJhdHVyZSJ9.YMv8Hur1t0gXJBYiZst0yPNiLfnf0QfJK4I8zLjo0Ck";
const closeSubject = new Subject<CloseEvent>();

const subject: WebSocketSubject<any> = webSocket({
  url,
  closeObserver: closeSubject,
  openObserver: {
    next: () => console.log('Connection opened')
  }
});
// Simuliere close 30 sec
timer(30000).pipe(tap(() => subject.complete())).subscribe();

subject.subscribe((data: any) => console.log(`${data.Device} = ${data.Value}`));
closeSubject.subscribe(() => console.log('Connection closed'));