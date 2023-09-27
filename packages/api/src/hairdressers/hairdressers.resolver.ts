import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HairdressersService } from './hairdressers.service';
import { Hairdresser } from './entities/hairdresser.entity';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';

@Resolver(() => Hairdresser)
export class HairdressersResolver {
  constructor(private readonly hairdressersService: HairdressersService) {}

  

  @Query(() => [Hairdresser], { name: 'hairdressers' })
  findAll() {
    // return [
    //   {
    //     id: '1',
    //     name: 'Pieter',
    //   },
    // ];
    return this.hairdressersService.findAll();
  }

  @Query(() => Hairdresser, { name: 'hairdresser' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.hairdressersService.findOne(id);
  }

  @Mutation(() => Hairdresser)
    createHairdresser(
      @Args('createHairdresserInput') createHairdresserInput: CreateHairdresserInput
    ): Promise<Hairdresser> {
      return this.hairdressersService.create(createHairdresserInput);
    }

  @Mutation(() => Hairdresser)
  updateHairdresser(@Args('updateHairdresserInput') updateHairdresserInput: UpdateHairdresserInput) {
    return this.hairdressersService.update(updateHairdresserInput.id, updateHairdresserInput);
  }

  @Mutation(() => Hairdresser)
  removeHairdresser(@Args('id', { type: () => Int }) id: string) {
    return this.hairdressersService.remove(id);
  }
}
