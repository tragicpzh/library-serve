import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import {
  Observable,
  interval,
  of,
  from,
  concat,
  Subject,
  Subscription,
  BehaviorSubject,
} from 'rxjs';
const subject = new BehaviorSubject(null);
const sockets = [];

@WebSocketGateway(4000)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private subscription: Subscription;
  private heartCheck: Subscription;
  private closeTimeout: any;
  private socketID: string;

  handleConnection(client: WebSocket, request: IncomingMessage) {
    this.heartCheck = interval(2000).subscribe(x => {
      client.send(
        JSON.stringify({
          type: 'heartCheck',
          count: sockets.length,
        }),
      );
    });
    this.subscription = subject.subscribe(data => {
      client.send(JSON.stringify(data));
    });
    this.socketID = request.url.replace('/', '');
    sockets.push(this.socketID);
    console.log('连接成功');
    this.closeTimeout && clearTimeout(this.closeTimeout);
    const that = this;
    this.closeTimeout = setTimeout(() => {
      that.heartCheck.unsubscribe();
      that.subscription.unsubscribe();
      console.log(that.socketID);
      const socketIndex = sockets.findIndex(x => x === that.socketID);
      socketIndex >= 0 && sockets.splice(socketIndex, 1);
      that.socketID = null;
      client.close(3001, 'server lost connection');
      console.log('失去连接');
    }, 4000);
  }

  handleDisconnect() {
    this.heartCheck.unsubscribe();
    this.subscription.unsubscribe();
    const socketIndex = sockets.findIndex(x => x === this.socketID);
    socketIndex >= 0 && sockets.splice(socketIndex, 1);
    this.socketID = null;
    this.closeTimeout && clearTimeout(this.closeTimeout);
    console.log('连接断开');
  }

  @SubscribeMessage('send')
  onSend(client, data): Observable<WsResponse<any>> {
    subject.next({
      type: 'send',
      data: data,
    });
    return null;
  }

  @SubscribeMessage('heartCheck')
  onHeartCheck(client, data): Observable<WsResponse<any>> {
    console.log('yes');
    clearTimeout(this.closeTimeout);
    return null;
  }
}
