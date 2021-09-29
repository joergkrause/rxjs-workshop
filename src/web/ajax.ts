import { ajax } from "rxjs/ajax";
import { pluck, tap } from "rxjs/operators";

const url = "https://func-workshop-pre.azurewebsites.net/api/status/Temperature?code=eytgBEusvmFUk9MPyBJLXsR4Jdjt8CReBVQYCVLayinxnd2PCcIaKw==";
const headers: Record<string, string> = {
  "Accept": "application/json"
};

ajax.getJSON(url, headers)
  .pipe(pluck('url'))
  .pipe(tap((url: any) => {
    let out = document.querySelector('output')!;
    out.innerText = url;
  }))
  .subscribe();