import { Observable } from "rxjs";
import { webSocket } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "<Add your WSS endpoint here>";

const subject = webSocket(url);

subject
  .multiplex(() => 'subscribe-temp', () => 'unsubscribe-temp', (message: any) => message.Value > 0)
  .subscribe((data: any) => console.log(`${data.Device} = ${data.Value}`));

subject.next({ Value: 15 });