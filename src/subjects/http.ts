import { AsyncSubject, map } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

// https://indepth.dev/reference/rxjs/subjects/async-subject

if(typeof window === 'undefined') {
  global.XMLHttpRequest = require("xhr2");
} 

const google$ = ajax
  .get('https://google.de')
  .pipe(map(res => console.log(`${res.loaded} bytes`)))
  ;
const async$ = new AsyncSubject();
google$.subscribe(async$);

async$.complete();

