import { webSocket } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "<Add your WSS endpoint here>";

const subject = webSocket({
  url,
  binaryType: 'arraybuffer',
  serializer: (msg: Uint8Array) => {
    const offset = msg.byteOffset;
    const length = msg.byteLength;
    return msg.buffer.slice(offset, offset + length);
  },
  deserializer: msg => new Uint8Array(msg.data as ArrayBuffer),
});

subject.subscribe((data: any) => console.log(`${data}`));