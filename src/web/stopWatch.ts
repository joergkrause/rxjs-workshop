// https://www.learnrxjs.io/learn-rxjs/recipes/stop-watch
import { fromEvent, interval, merge, noop, NEVER } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';

interface State {
  count: boolean;
  countup: boolean;
  speed: number;
  value: number;
  increase: number;
}

const getElem = (id: string): HTMLInputElement => document.querySelector(`#${id}`)!;
const getVal = (id: string): number => parseInt(getElem(id)['value']);
const fromClick = (id: string) => fromEvent(getElem(id), 'click');
const fromClickAndMapTo = (id: string, obj: {}) => fromClick(id).pipe(mapTo(obj));
const fromClickAndMap = (id: string, fn: () => {}) => fromClick(id).pipe(map(fn));
const setValue = (val: number) => (getElem('counter').innerText = val.toString());

const events$ = merge(
  fromClickAndMapTo('start', { count: true }),
  fromClickAndMapTo('pause', { count: false }),
  fromClickAndMapTo('reset', { value: 0 }),
  fromClickAndMapTo('countup', { countup: true }),
  fromClickAndMapTo('countdown', { countup: false }),
  fromClickAndMap('setto', () => ({ value: getVal('value') })),
  fromClickAndMap('setspeed', () => ({ speed: getVal('speed') })),
  fromClickAndMap('setincrease', () => ({ increase: getVal('increase') }))
);

const stopWatch$ = events$.pipe(
  startWith({
    count: false,
    speed: 1000,
    value: 0,
    countup: true,
    increase: 1
  }),
  scan((state: State, curr): State => ({ ...state, ...curr }), {} as State),
  tap((state: State) => setValue(state.value)),
  switchMap((state: State) =>
    state.count
      ? interval(state.speed).pipe(
          tap(
            _ =>
              (state.value += state.countup ? state.increase : -state.increase)
          ),
          tap(_ => setValue(state.value))
        )
      : NEVER
  )
);

stopWatch$.subscribe();