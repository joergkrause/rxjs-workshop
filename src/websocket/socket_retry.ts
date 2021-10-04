import { ajax } from "rxjs/ajax";
import { delay, pluck, retryWhen } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "<Add your WSS endpoint here>";

const subject: WebSocketSubject<any> = webSocket(url);

subject
  .pipe(retryWhen((errors) => errors.pipe(delay(10_000))))
  .subscribe((data: any) => console.log(`${data.Device} = ${data.Value}`));