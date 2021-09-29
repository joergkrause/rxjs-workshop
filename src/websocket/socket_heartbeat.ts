import { Observable, of, race, Subject, Subscription, throwError, timer } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { catchError, concatMap, delay, filter, tap } from "rxjs/operators";

// Make injectable if used in Angular
class SocketServices {

  private webSocketSubject: WebSocketSubject<any> | null = null;
  private heartbeatSubscription: Subscription | null = null;
  private dataSubscription: Subscription | null = null;
  private type: string = 'Temperature';
  
  connected = false;
  networkError = false;

  stopHeartbeat(): void {
    if (this.heartbeatSubscription) {
      this.heartbeatSubscription.unsubscribe();
    }
  }

  startHeartbeat(): void {
    this.stopHeartbeat();
    this.networkError = false;

    const heartbeat$ = timer(1_000, 30_000)
      .pipe(
        tap(() => this.connect().next('ping')),
        concatMap(_ => {
          return race(
            of('timeout').pipe(delay(3_000)),
            this.connect().pipe(filter(m => m === 'pong'), catchError(() => of('error')))
          );
        })
      );

    this.heartbeatSubscription = heartbeat$.subscribe(msg => {
      if (msg === 'pong') {
        this.networkError = false;
      } else {
        this.networkError = true;
        this.webSocketSubject?.complete();
        this.webSocketSubject = null;
      }
    });
  }
  connect(): WebSocketSubject<any> {
    if (!this.webSocketSubject) {
      const closeSubject = new Subject<CloseEvent>();
      closeSubject.subscribe(_ => {
        this.webSocketSubject = null;
        if (this.connected) {
          this.networkError = true;
        }
      });

      this.webSocketSubject = webSocket({
        url: 'ws://localhost:8080/sensor',
        closeObserver: closeSubject,
        openObserver: {
          next: () => console.log('connection open')
        }
      });

      this.startListening();

      this.startHeartbeat();
    }
    return this.webSocketSubject;
  }

  disconnect(): void {
    if (this.webSocketSubject) {
      this.stopHeartbeat();
      this.networkError = false;

      this.webSocketSubject.complete();
      this.webSocketSubject = null;
    }
  }

  private getDataObservable(): Observable<any> {
    if (!this.webSocketSubject) {
      return throwError(() => new Error('websocket subject not set'));
    }
    switch (this.type) {
      case 'Temperature':
        return this.webSocketSubject.multiplex(() => 'machine', () => 'Temperature', message => message.temperature);
      case 'Belt':
        return this.webSocketSubject.multiplex(() => 'machine', () => 'BeltSpeed', message => message.speed);
      default:
        return throwError(() => new Error('Invalid Type'));
    }
  }

  private startListening(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = this.getDataObservable().subscribe(data => {
      // TODO: Do something with data
    });
  }

}