import { connectable, merge, of } from "rxjs";
import { filter, map } from "rxjs/operators";

const chars$ = of("A", "b", "C", "D", "e", "f", "G");
// auskommentieren: streams werden nacheinander verarbeitet
// einkommentieren: streams werden parallel verarbeitet (share)
const connectableChars$ = connectable(chars$);

const lower$ = connectableChars$.pipe(
  filter(x => x.toLowerCase() === x),
  map(x => `Klein: ${x}`)
);

const upper$ = connectableChars$.pipe(
  filter(x => x.toLowerCase() !== x),
  map(x => `Groß: ${x}`)
);

merge(lower$, upper$).subscribe(console.log);

connectableChars$.connect();
//chars$.connect();