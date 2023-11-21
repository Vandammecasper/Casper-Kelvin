import { Module } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtrasResolver } from './extras.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Extra]),
    UsersModule
  ],
  providers: [ExtrasResolver, ExtrasService],
  exports: [ExtrasService]
})
export class ExtrasModule {}
