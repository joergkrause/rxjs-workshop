import { Subject, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck, tap } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "<Add your WSS endpoint here>";
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