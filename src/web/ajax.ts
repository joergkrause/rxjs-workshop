import { ajax } from "rxjs/ajax";
import { map, pluck, tap } from "rxjs/operators";

const url = "<Replace with your endoint>";
const headers: Record<string, string> = {
  "Accept": "application/json"
};

ajax.getJSON(url, headers)
  .pipe(map((response : any) => response.url))
  .pipe(tap((url: any) => {
    let out = document.querySelector('output')!;
    out.innerText = url;
  }))
  .subscribe();