import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VacationsService } from './vacations.service';
import { Vacation } from './entities/vacation.entity';
import { CreateVacationInput } from './dto/create-vacation.input';
import { UpdateVacationInput } from './dto/update-vacation.input';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';

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

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Vacation)
  createVacation(@Args('createVacationInput') createVacationInput: CreateVacationInput
  ): Promise<Vacation> {
    return this.vacationsService.create(createVacationInput);
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Vacation)
  updateVacation(@Args('updateVacationInput') updateVacationInput: UpdateVacationInput) {
    return this.vacationsService.update(updateVacationInput.id, updateVacationInput);
  }

  // @UseGuards(FirebaseGuard)
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
