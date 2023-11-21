import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    UsersModule
  ],
  providers: [ServicesResolver, ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
