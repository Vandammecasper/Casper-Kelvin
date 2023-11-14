import { Module } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtrasResolver } from './extras.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Extra])
  ],
  providers: [ExtrasResolver, ExtrasService],
  exports: [ExtrasService]
})
export class ExtrasModule {}
