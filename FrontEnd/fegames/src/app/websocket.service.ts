import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  public socket$: Subject<any>;
  private url = "ws://localhost:80/wsGames";

  constructor() {
    this.socket$ = new Subject<any>();
  }

  public connect(url: string): Observable<Event> {
    this.socket = new WebSocket(url);

    const observable = new Observable<Event>((observer) => {
      this.socket.onmessage = (event) => observer.next(event);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = (event) => observer.complete();

      return () => {
        this.socket.close();
      };
    });

    const openObservable = new Observable<Event>((observer) => {
      this.socket.onopen = (event) => {
        observer.next(event);
        observer.complete();
      };
    });

    openObservable.subscribe(() => {
      console.log('WebSocket connection established');
    });

    observable.subscribe((messageEvent) => {
      this.socket$.next(messageEvent);
    });
    

    return openObservable;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMovement(idMatch: number, movement: string) {
    this.connect(this.url).subscribe(() => {
      const message = {
        type: 'MOVEMENT',
        idMatch: idMatch,
        movement: movement,
      };
      this.socket.send(JSON.stringify(message));
    });
  }

  sendChat(target: string, message: string) {
    this.connect(this.url).subscribe(() => {
      const chatMessage = {
        type: 'CHAT',
        target: target,
        message: message,
      };
      this.socket.send(JSON.stringify(chatMessage));
    });
  }

  sendBroadcast(message: String): Promise<void> {
    return new Promise((resolve) => {
      this.connect(this.url).subscribe(() => {
        const broadcastMessage = {
          type: 'BROADCAST',
          message: message,
        };
        console.log(JSON.stringify(broadcastMessage));
        this.socket.send(JSON.stringify(broadcastMessage));
        resolve();
      });
    });
  }
}