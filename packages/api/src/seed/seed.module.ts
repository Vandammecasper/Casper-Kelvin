import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServicesModule } from 'src/services/services.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { HairdressersModule } from 'src/hairdressers/hairdressers.module';
import { VacationsModule } from 'src/vacations/vacations.module';
import { PointsModule } from 'src/points/points.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { UsersModule } from 'src/users/users.module';
import { ExtrasModule } from 'src/extras/extras.module';

@Module({
    imports: [ServicesModule, HairdressersModule, VacationsModule, PointsModule, AppointmentsModule, ExtrasModule, UsersModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],

})
export class SeedModule {
}
