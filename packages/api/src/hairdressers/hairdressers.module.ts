import { Module } from '@nestjs/common';
import { HairdressersService } from './hairdressers.service';
import { HairdressersResolver } from './hairdressers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hairdresser } from './entities/hairdresser.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hairdresser]),
    ServicesModule
  ],
  providers: [HairdressersResolver, HairdressersService],
  exports: [HairdressersService],
})
export class HairdressersModule {}
