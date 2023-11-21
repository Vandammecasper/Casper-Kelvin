import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VacationsService } from './vacations.service';
import { Vacation } from './entities/vacation.entity';
import { CreateVacationInput } from './dto/create-vacation.input';
import { UpdateVacationInput } from './dto/update-vacation.input';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';
import { Role } from 'src/users/entities/user.entity';

@Resolver(() => Vacation)
export class VacationsResolver {
  constructor(private readonly vacationsService: VacationsService,
    private readonly hairdressersService: HairdressersService) {}

  // @UseGuards(FirebaseGuard)
  @Query(() => [Vacation], { name: 'vacations' })
  findAll() {
    return this.vacationsService.findAll();
  }

  // @UseGuards(FirebaseGuard)
  @Query(() => Vacation, { name: 'vacation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.vacationsService.findOne(id);
  }

  @Query(() => [Vacation], { name: 'vacationsByHairdresserId' })
  findByHairdresserId(@Args('hairdresserId', { type: () => String }) hairdresserId: string) {
    return this.vacationsService.findByHairdresserId(hairdresserId);
  }

  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Vacation)
  createVacation(@Args('createVacationInput') createVacationInput: CreateVacationInput
  ): Promise<Vacation> {
    return this.vacationsService.create(createVacationInput);
  }

  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Vacation)
  updateVacation(@Args('updateVacationInput') updateVacationInput: UpdateVacationInput) {
    return this.vacationsService.update(updateVacationInput.id, updateVacationInput);
  }

  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Vacation)
  removeVacation(@Args('id', { type: () => Int }) id: number) {
    return this.vacationsService.remove(id);
  }

  // Resolver for the hairdresser field of the Vacation type
  @ResolveField()
  hairdresser(@Parent() vacation: Vacation): Promise<Hairdresser> {
    return this.hairdressersService.findOne(vacation.hairdresserId.toString());
  }
}
