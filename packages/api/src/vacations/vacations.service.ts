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

  async findByUid(uid: string) {
    const hairdresser = await this.hairdressersService.findOneByUid(uid);
    if (!hairdresser) {
      throw new Error('Hairdresser not found');
    }
    
    return this.vacationRepository.find({ where: { hairdresserId: new ObjectId(hairdresser.id) } });
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

      const vacations = await this.vacationRepository.find({ where: { hairdresserId: new ObjectId(hairdresser.id) } });

      const isOverlapping = vacations.some(vacation => {
        return (
          (vacation.startDate < createVacationInput.endDate &&
            vacation.endDate > createVacationInput.startDate)
        );
      });
      
      if (isOverlapping) {
        throw new Error('Vacation already exists');
      }

      let totalVacationDays = 0;
      const startDate = new Date(createVacationInput.startDate);
      const endDate = new Date(createVacationInput.endDate);
      while (startDate <= endDate) {
        if (!hairdresser.daysOff.includes(startDate.getDay())) {
          totalVacationDays++;
        }
        startDate.setDate(startDate.getDate() + 1);
      }


      if (totalVacationDays > hairdresser.vacationDays) {
        throw new Error('Not enough vacation days');
      }

      //TODO: add substract vacation days from hairdresser
      const test = await this.hairdressersService.subtractVacationDays(hairdresser.id.toString(), totalVacationDays);

      const newVacation = new Vacation();
      newVacation.hairdresserId = new ObjectId(hairdresser.id);
      newVacation.startDate = createVacationInput.startDate;
      newVacation.endDate = createVacationInput.endDate;
      newVacation.isApproved = false;

      return this.vacationRepository.save(newVacation);
    }catch(error) {
      console.log(error);
    }
  }

  approveVacation(id: string) {
    return this.vacationRepository.update(new ObjectId(id), { isApproved: true });
  }

  update(id: number, updateVacationInput: UpdateVacationInput) {
    return `This action updates a #${id} vacation`;
  }

  remove(id: string) {
    return this.vacationRepository.delete(new ObjectId(id));
  }

  // for seeding

  async saveAll(vacations: Vacation[]): Promise<Vacation[]> {
    return this.vacationRepository.save(vacations);
  }

  truncate(): Promise<void> {
    return this.vacationRepository.clear();
  }
}
