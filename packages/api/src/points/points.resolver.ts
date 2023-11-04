import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PointsService } from './points.service';
import { Point } from './entities/point.entity';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';
import { Role } from 'src/users/entities/user.entity';

@Resolver(() => Point)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  //TODO: ask about this
  // @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard) // , RolesGuard)  
  @Query(() => [Point], { name: 'points' })
  findAll(@Args('sort', { type: () => Boolean }) isSort: boolean) {
    return this.pointsService.findAll(isSort);
  }

  @Query(() => [Point], { name: 'pointsPublic' })
  findAllPublic(@Args('sort', { type: () => Boolean }) isSort: boolean) {
    return this.pointsService.findAllPublic(isSort);
  }

  @Query(() => Point, { name: 'point' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.findOne(id);
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Point, { name: 'pointByUid' })
  findOneByUid(@FirebaseUser() user: UserRecord) {
    return this.pointsService.findOneByUid(user.uid);
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Int, { name: 'rank' })
  getRank(@FirebaseUser() user: UserRecord) {
    return this.pointsService.getRank(user.uid);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Point)
  createPoint(@Args('createPointInput') createPointInput: CreatePointInput,
    @FirebaseUser() user: UserRecord
  ): Promise<Point> {
    return this.pointsService.create(user.uid, user.displayName, createPointInput);
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
