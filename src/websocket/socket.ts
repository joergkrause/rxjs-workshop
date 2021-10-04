import { webSocket } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "<Add your WSS endpoint here>";

const subject = webSocket(url);

subject.subscribe((data: any) => console.log(`${data.Device} = ${data.Value}`));