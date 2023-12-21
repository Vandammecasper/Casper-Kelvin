import { Module } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { VacationsResolver } from './vacations.resolver';
import { HairdressersModule } from 'src/hairdressers/hairdressers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacation]),
    HairdressersModule,
    UsersModule
  ],
  providers: [VacationsResolver, VacationsService],
  exports: [VacationsService],
})
export class VacationsModule {}
