import { Injectable } from '@nestjs/common';
import { CreateExtraInput } from './dto/create-extra.input';
import { UpdateExtraInput } from './dto/update-extra.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ExtrasService {

  constructor(
    @InjectRepository(Extra)
    private readonly extraRepository: MongoRepository<Extra>,
  ) {}

  create(createExtraInput: CreateExtraInput) {
    return this.extraRepository.save(createExtraInput);
  }

  findAll() {
    return this.extraRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.extraRepository.findOne({ _id: new ObjectId(id) });
  }

  update(id: number, updateExtraInput: UpdateExtraInput) {
    return `This action updates a #${id} extra`;
  }

  remove(id: number) {
    return `This action removes a #${id} extra`;
  }
}
