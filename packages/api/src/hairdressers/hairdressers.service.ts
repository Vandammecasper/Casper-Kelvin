import { Injectable } from '@nestjs/common';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Hairdresser } from './entities/hairdresser.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class HairdressersService {
  
  constructor(
    @InjectRepository(Hairdresser)
    private readonly hairdresserRepository: Repository<Hairdresser>,
    private readonly serviceService: ServicesService,
  ) {}

  findAll() {
    return this.hairdresserRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.hairdresserRepository.findOne({ _id: new ObjectId(id) });
  }

  findOneByUid(uid: string) {
    return this.hairdresserRepository.findOne({where: {uid: uid}});
  }

  async create(
    createHairdresserInput: CreateHairdresserInput
    ): Promise<Hairdresser> {
      try {

        var servicesObjectId = [];

        await createHairdresserInput.servicesId.forEach(element => {
          const service = this.serviceService.findOne(element);
          if (!service) {
            throw new Error('Service not found');
          }
          servicesObjectId.push(new ObjectId(element));
        });

        const newHairdresser = new Hairdresser();
        newHairdresser.uid = createHairdresserInput.uid;
        newHairdresser.name = createHairdresserInput.name;
        newHairdresser.servicesId = servicesObjectId;
        return this.hairdresserRepository.save(newHairdresser);
    } catch (error) {
      console.log(error);
    }
  }

  update(id: string, updateHairdresserInput: UpdateHairdresserInput) {
    return `This action updates a #${id} hairdresser`;
  }

  remove(id: string) {
    return `This action removes a #${id} hairdresser`;
  }

  // functions for seeding
  saveAll(hairdressers: Hairdresser[]): Promise<Hairdresser[]> {
    return this.hairdresserRepository.save(hairdressers);
  }

  truncate(): Promise<void> {
    return this.hairdresserRepository.clear();
  }
}
