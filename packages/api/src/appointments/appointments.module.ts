import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { HairdressersModule } from 'src/hairdressers/hairdressers.module';
import { ServicesModule } from 'src/services/services.module';
import { PointsModule } from 'src/points/points.module';
import { ExtrasModule } from 'src/extras/extras.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    HairdressersModule,
    ServicesModule,
    PointsModule,
    ExtrasModule,
  ],
  providers: [AppointmentsResolver, AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
