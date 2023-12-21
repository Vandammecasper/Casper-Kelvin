import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { Server, Socket } from 'socket.io';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { FirebaseWebsocketGuard } from 'src/authentication/guards/firebase.websocket.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway(+process.env.WS_PORT || 3004, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  },
})
export class NotificationsGateway
  // implements OnGatewayConnection, OnGatewayDisconnect
  {

  constructor(
    // private readonly appointmentsService: AppointmentsService,
  ) {}

  @WebSocketServer() //An alternative for afterInit()
  server: Server

  @UseGuards(FirebaseWebsocketGuard)
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  // Send notification to hairdressers if a new appointment is made
  async sendNewAppointment(roomName: string, appointment: Appointment){
    // const appointment = await this.appointmentsService.findOne(appointmentId);
    console.log('🚀 ~ file: notifications.gateway.ts ~ line 100 ~ NotificationsGateway ~ sendNewAppointment ~ appointment', appointment);
    this.server.emit('newAppointment', appointment);
  }
}
