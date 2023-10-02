import { Injectable } from '@nestjs/common';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Hairdresser } from './entities/hairdresser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HairdressersService {
  
  constructor(
    @InjectRepository(Hairdresser)
    private readonly birdRepository: Repository<Hairdresser>,
  ) {}

  findAll() {
    // return `This action returns all hairdressers`;
    return this.birdRepository.find();
  }

  findOne(uid: string) {
    return this.birdRepository.findOne({ where: { uid } });
  }

  create(createHairdresserInput: CreateHairdresserInput): Promise<Hairdresser> {
    const newHairdresser = new Hairdresser();
    newHairdresser.uid = createHairdresserInput.uid;
    newHairdresser.name = createHairdresserInput.name;
    return this.birdRepository.save(newHairdresser);
  }

  update(id: string, updateHairdresserInput: UpdateHairdresserInput) {
    return `This action updates a #${id} hairdresser`;
  }

  remove(id: string) {
    return `This action removes a #${id} hairdresser`;
  }
}
