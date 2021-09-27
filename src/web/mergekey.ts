import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

const btn = <HTMLButtonElement>document.querySelector("button");
const input = <HTMLInputElement>document.querySelector("input");

// Extend with switchMap
const obs = merge(
  fromEvent(btn, "click"),
  fromEvent(input, "keyup").pipe(filter((key: Event) => (<KeyboardEvent>key).key === "Enter"))
);

const div = <HTMLDivElement>document.querySelector("div");

obs.subscribe((ev) => div.innerHTML = input.value);
