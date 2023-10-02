import { Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

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
    // @ts-ignore
    return this.serviceRepository.findOne({ _id: new ObjectId(id) });
  }

  findByIds(ids: ObjectId[]): Promise<Service[]> {
    const services = ids.map((id) => {
      // @ts-ignore
      return this.serviceRepository.findOne({ _id: id });
    });

    return Promise.all(services);
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
