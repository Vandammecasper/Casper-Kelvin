import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { Role } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [Service], { name: 'services' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('id') id: string): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Service)
  createService(@Args('createServiceInput') createServiceInput: CreateServiceInput
  ): Promise<Service> {
    return this.servicesService.create(createServiceInput);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Service)
  updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput
  ): Promise<Service>  {
    return this.servicesService.update(updateServiceInput.id, updateServiceInput);
  }

  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard)
  @Mutation(() => Service)
  removeService(@Args('id', { type: () => Int }) id: string) {
    return this.servicesService.remove(id);
  }
}
