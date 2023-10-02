import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [Service], { name: 'services' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.servicesService.findOne(id);
  }

  @Mutation(() => Service)
  createService(@Args('createServiceInput') createServiceInput: CreateServiceInput
  ): Promise<Service> {
    return this.servicesService.create(createServiceInput);
  }

  @Mutation(() => Service)
  updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput
  ): Promise<Service>  {
    return this.servicesService.update(updateServiceInput.id, updateServiceInput);
  }

  @Mutation(() => Service)
  removeService(@Args('id', { type: () => Int }) id: string) {
    return this.servicesService.remove(id);
  }
}
