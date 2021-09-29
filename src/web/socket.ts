import { merge } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck, tap } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";
const urlTemp = "wss://wpss-videocourse.webpubsub.azure.com/client/hubs/machine?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHNzLXZpZGVvY291cnNlLndlYnB1YnN1Yi5henVyZS5jb20vY2xpZW50L2h1YnMvbWFjaGluZSIsImlhdCI6MTYzMjk0ODIwNiwiZXhwIjoxNjMzMDM0NjA2LCJzdWIiOiJUZW1wZXJhdHVyZSJ9.JO5n78mdOAZqzFU1JKZDa3GPAzoSFOVjqz48nJ6XhBg";
const urlBelt = "wss://wpss-videocourse.webpubsub.azure.com/client/hubs/machine?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHNzLXZpZGVvY291cnNlLndlYnB1YnN1Yi5henVyZS5jb20vY2xpZW50L2h1YnMvbWFjaGluZSIsImlhdCI6MTYzMjk0ODE3NiwiZXhwIjoxNjMzMDM0NTc2LCJzdWIiOiJCZWx0U3BlZWQifQ.qLLzM646_1Tf2uRTLL5p6aM5e-Oo0T6g7O6T8hl7EDc";
const urlPress = "wss://wpss-videocourse.webpubsub.azure.com/client/hubs/machine?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHNzLXZpZGVvY291cnNlLndlYnB1YnN1Yi5henVyZS5jb20vY2xpZW50L2h1YnMvbWFjaGluZSIsImlhdCI6MTYzMjk0ODE4OSwiZXhwIjoxNjMzMDM0NTg5LCJzdWIiOiJQcmVzc3VyZSJ9.vmyhY1agvOftmWZUQar_prbSyoLbFvbGHJLGAf3BYzA";

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
