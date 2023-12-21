import { Module } from '@nestjs/common';
import { HairdressersService } from './hairdressers.service';
import { HairdressersResolver } from './hairdressers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hairdresser } from './entities/hairdresser.entity';
import { ServicesModule } from 'src/services/services.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hairdresser]),
    ServicesModule,
    UsersModule
  ],
  providers: [HairdressersResolver, HairdressersService],
  exports: [HairdressersService],
})
export class HairdressersModule {}
