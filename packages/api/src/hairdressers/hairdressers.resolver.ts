import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { HairdressersService } from './hairdressers.service';
import { Hairdresser } from './entities/hairdresser.entity';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
import { All, UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';
import { Role } from 'src/users/entities/user.entity';

@Resolver(() => Hairdresser)
export class HairdressersResolver {
  constructor(private readonly hairdressersService: HairdressersService,
    private readonly servicesService: ServicesService) {}

  // @UseGuards(FirebaseGuard)
  @Query(() => [Hairdresser], { name: 'hairdressers' })
  findAll() {
    return this.hairdressersService.findAll();
  }

  // @UseGuards(FirebaseGuard)
  @Query(() => Hairdresser, { name: 'hairdresser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.hairdressersService.findOne(id);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Hairdresser)
  createHairdresser(
    @Args('createHairdresserInput') createHairdresserInput: CreateHairdresserInput
  ): Promise<Hairdresser> {
    return this.hairdressersService.create(createHairdresserInput);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Hairdresser)
  updateHairdresser(@Args('updateHairdresserInput') updateHairdresserInput: UpdateHairdresserInput) {
    return this.hairdressersService.update(updateHairdresserInput.id, updateHairdresserInput);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Hairdresser)
  removeHairdresser(@Args('id', { type: () => Int }) id: string) {
    return this.hairdressersService.remove(id);
  }

  // Resolver for the services field of the Hairdresser type
  @ResolveField()
  services(@Parent() hairdresser: Hairdresser): Promise<Service[]> {
    return this.servicesService.findByIds(hairdresser.servicesId);
  }
}
