import { ajax } from "rxjs/ajax";
import { map, pluck, tap } from "rxjs/operators";

const url = "https://func-workshop-pre.azurewebsites.net/api/status/Temperature?code=eytgBEusvmFUk9MPyBJLXsR4Jdjt8CReBVQYCVLayinxnd2PCcIaKw==";
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