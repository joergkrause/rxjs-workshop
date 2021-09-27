import { AsyncSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

if(typeof window === 'undefined') {
  global.XMLHttpRequest = require("xhr2");
} 

const google$ = ajax('https://google.de');
const async$ = new AsyncSubject();
google$.subscribe(async$);

async$.subscribe(val => console.log((val as any).toString().length));

setTimeout(() => {
  async$.subscribe(val => console.log((val as any).response));
}, 1000);