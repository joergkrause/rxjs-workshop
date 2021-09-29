import { ajax } from "rxjs/ajax";
import { pluck } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

Object.assign(global, { WebSocket: require('ws') });

const url = "wss://wpss-videocourse.webpubsub.azure.com/client/hubs/machine?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHNzLXZpZGVvY291cnNlLndlYnB1YnN1Yi5henVyZS5jb20vY2xpZW50L2h1YnMvbWFjaGluZSIsImlhdCI6MTYzMjk0NTA5NCwiZXhwIjoxNjMzMDMxNDk0LCJzdWIiOiJUZW1wZXJhdHVyZSJ9.YMv8Hur1t0gXJBYiZst0yPNiLfnf0QfJK4I8zLjo0Ck";

const subject = webSocket(url);

subject.subscribe((data: any) => console.log(`${data.Device} = ${data.Value}`));