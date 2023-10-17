import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { HairdressersService } from './hairdressers.service';
import { Hairdresser } from './entities/hairdresser.entity';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';

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

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Hairdresser)
  createHairdresser(
    @Args('createHairdresserInput') createHairdresserInput: CreateHairdresserInput
  ): Promise<Hairdresser> {
    return this.hairdressersService.create(createHairdresserInput);
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Hairdresser)
  updateHairdresser(@Args('updateHairdresserInput') updateHairdresserInput: UpdateHairdresserInput) {
    return this.hairdressersService.update(updateHairdresserInput.id, updateHairdresserInput);
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Hairdresser)
  removeHairdresser(@Args('id', { type: () => Int }) id: string) {
    return this.hairdressersService.remove(id);
  }

  // @UseGuards(FirebaseGuard)
  // Resolver for the services field of the Hairdresser type
  @ResolveField()
  services(@Parent() hairdresser: Hairdresser): Promise<Service[]> {
    return this.servicesService.findByIds(hairdresser.servicesId);
  }
}
