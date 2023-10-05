import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PointsService } from './points.service';
import { Point } from './entities/point.entity';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';

@Resolver(() => Point)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  @Query(() => [Point], { name: 'points' })
  findAll() {
    return this.pointsService.findAll();
  }

  @Query(() => Point, { name: 'point' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.findOne(id);
  }

  @Mutation(() => Point)
  createPoint(@Args('createPointInput') createPointInput: CreatePointInput
  ): Promise<Point> {
    return this.pointsService.create(createPointInput);
  }

  @Mutation(() => Point)
  updatePoint(@Args('updatePointInput') updatePointInput: UpdatePointInput) {
    return this.pointsService.update(updatePointInput.id, updatePointInput);
  }

  @Mutation(() => Point)
  removePoint(@Args('id', { type: () => Int }) id: number) {
    return this.pointsService.remove(id);
  }
}
