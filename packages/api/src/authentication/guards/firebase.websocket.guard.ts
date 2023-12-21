import { CanActivate, ExecutionContext } from "@nestjs/common"
import { FirebaseService } from "../firebase.service"
import { WsException } from "@nestjs/websockets"

export class FirebaseWebsocketGuard implements CanActivate {
    constructor(private readonly firebase: FirebaseService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const client = context.switchToWs().getClient()
      const user = await this.validateUserFromWebSocket(client)
    
      if (!user) {
        throw new WsException('Unauthorized')
      }
      // If the user is authenticated, you can attach it to the WebSocket context
      context.switchToWs().getData().user = user
      return true
    }
  
     private async validateUserFromWebSocket(client: any): Promise<any> {
      if (!client.handshake.headers.authorization) {
        throw new WsException('No authorization header')
      }
      const authToken = client.handshake.headers.authorization.replace(
        'Bearer ',
        '',
      )
      try {
        const user = await this.firebase.getAuth().verifyIdToken(authToken)
        console.log('authToken')
        console.log(authToken)
        console.log('user')
        console.log(user)
        return user
      } catch (err) {
        throw new WsException(err.message)
      }
    }
  }
  