import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsResolver } from './points.resolver';

@Module({
  providers: [PointsResolver, PointsService],
})
export class PointsModule {}


// TODO: points.module, points.resolver, points.service
// TODO: seeding of the points