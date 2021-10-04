import { merge } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck, tap } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

const urlTemp = "<Add your WSS endpoint here>";
const urlBelt = "<Add your WSS endpoint here>";
const urlPress = "<Add your WSS endpoint here>";

const subject = merge(
  webSocket(urlTemp)
  .pipe(tap((d: any) => console.log('Temp', d))),
  webSocket(urlBelt)
  .pipe(tap((d: any) => console.log('Belt', d))),
  webSocket(urlPress)
  .pipe(tap((d: any) => console.log('Press', d)))
);

const out = document.querySelector<HTMLOutputElement>('output')!;

subject.subscribe((data: any) => out.innerText = `${data.Device} = ${data.Value}`);
