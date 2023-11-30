import { Injectable } from '@nestjs/common';
import { CreateVacationInput } from './dto/create-vacation.input';
import { UpdateVacationInput } from './dto/update-vacation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { Repository } from 'typeorm';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class VacationsService {

  constructor(
    @InjectRepository(Vacation)
    private readonly vacationRepository: Repository<Vacation>,
    private readonly hairdressersService: HairdressersService,
  ) {}

  findAll() {
    return this.vacationRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.vacationRepository.findOne({ _id: new ObjectId(id) });
  }

  findByHairdresserId(hairdresserId: string) {
    // @ts-ignore
    return this.vacationRepository.find({ where: { hairdresserId } });
  }

  async create(
      uid: string,
      createVacationInput: CreateVacationInput
    ): Promise<Vacation> {
    try{
      const hairdresser = await this.hairdressersService.findOneByUid(uid);
      if (!hairdresser) {
        throw new Error('Hairdresser not found');
      }
      const newVacation = new Vacation();
      newVacation.hairdresserId = new ObjectId(hairdresser.id);
      newVacation.startDate = createVacationInput.startDate;
      newVacation.endDate = createVacationInput.endDate;
      newVacation.isRepeat = createVacationInput.isRepeat;
      newVacation.isApproved = false;
      return this.vacationRepository.save(newVacation);
    }catch(error) {
      console.log(error);
    }
  }

  approveVacation(id: string): Promise<Vacation> {
    return this.vacationRepository.save({ _id: new ObjectId(id), isApproved: true });
  }

  update(id: number, updateVacationInput: UpdateVacationInput) {
    return `This action updates a #${id} vacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacation`;
  }

  // for seeding

  async saveAll(vacations: Vacation[]): Promise<Vacation[]> {
    return this.vacationRepository.save(vacations);
  }

  truncate(): Promise<void> {
    return this.vacationRepository.clear();
  }
}
