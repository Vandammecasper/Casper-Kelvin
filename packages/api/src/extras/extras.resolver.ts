import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExtrasService } from './extras.service';
import { Extra } from './entities/extra.entity';
import { CreateExtraInput } from './dto/create-extra.input';
import { UpdateExtraInput } from './dto/update-extra.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';
import { Role } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Resolver(() => Extra)
export class ExtrasResolver {
  constructor(private readonly extrasService: ExtrasService) {}

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Extra)
  createExtra(@Args('createExtraInput') createExtraInput: CreateExtraInput) {
    return this.extrasService.create(createExtraInput);
  }

  @Query(() => [Extra], { name: 'extras' })
  findAll() {
    return this.extrasService.findAll();
  }

  @Query(() => Extra, { name: 'extra' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.extrasService.findOne(id);
  }

  @Mutation(() => Extra)
  updateExtra(@Args('updateExtraInput') updateExtraInput: UpdateExtraInput) {
    return this.extrasService.update(updateExtraInput.id, updateExtraInput);
  }

  @Mutation(() => Extra)
  removeExtra(@Args('id', { type: () => Int }) id: number) {
    return this.extrasService.remove(id);
  }
}
