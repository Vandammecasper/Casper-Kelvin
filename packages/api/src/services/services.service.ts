import { Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  
  findAll() {
    return this.serviceRepository.find();
  }

  findOne(id: string) {
    return this.serviceRepository.findOne({ where: { id } });
  }

  create(createServiceInput: CreateServiceInput) {
    const newService = new Service();
    newService.name = createServiceInput.name;
    newService.description = createServiceInput.description;
    newService.price = createServiceInput.price;
    newService.duration = createServiceInput.duration;
    newService.utilities = createServiceInput.utilities;
    return this.serviceRepository.save(newService);
  }

  update(id: string, updateServiceInput: UpdateServiceInput) {
    return this.serviceRepository.save({ ...updateServiceInput, id: id });
  }

  remove(id: string) {
    return this.serviceRepository.delete(id);
  }
}
