import { fromEvent } from 'rxjs';

const obs = fromEvent(document, "dblclick");

obs.subscribe((ev) => console.log(`You clicked on a ${(ev.target as Element).tagName}`));
