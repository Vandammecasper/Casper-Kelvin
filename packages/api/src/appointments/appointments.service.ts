import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Between, Repository, MongoRepository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { ServicesService } from 'src/services/services.service';
import { ObjectId } from 'mongodb';
import * as dayjs from 'dayjs';
import { PointsService } from 'src/points/points.service';
import { ExtrasService } from 'src/extras/extras.service';
import { VacationsService } from 'src/vacations/vacations.service';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: MongoRepository<Appointment>,
    private readonly hairdresserService: HairdressersService,
    private readonly serviceService: ServicesService,
    private readonly pointsService: PointsService,
    private readonly extrasService: ExtrasService,
    private readonly vacationsService: VacationsService,
  ) {}
  
  findAll() {
    return this.appointmentRepository.find();
  }

  findByUid(uid: string, isOpen: boolean) {
    if (isOpen) {
      return this.appointmentRepository.find({where: {uid: uid, isCompleted: false}, order: {date: 'ASC'}});
    }
    return this.appointmentRepository.find({where: {uid: uid}, order: {date: 'ASC'}});
  }

  async findByHairdresserUid(uid: string) {
    let hairdresserId;
   await this.hairdresserService.findOneByUid(uid).then((hairdresser) => {
      if (!hairdresser) {
        throw new Error('Hairdresser not found');
      }
      console.log(hairdresser.id);
      hairdresserId = hairdresser.id;
    });
    const test = this.appointmentRepository.find({where: {hairdresserId: new ObjectId(hairdresserId)}, order: {date: 'ASC'}});
    return test
  }

  async completeAppointment(id: string) {
    const updateResult = await this.appointmentRepository.updateOne({ _id: new ObjectId(id) }, { $set: { isCompleted: true } });
    
    if (updateResult.matchedCount > 0) {
      // @ts-ignore
      const updatedAppointment = await this.appointmentRepository.findOne({ _id: new ObjectId(id) });
      console.log(updatedAppointment.addedPoints);
      await this.pointsService.addPoints(updatedAppointment?.uid, updatedAppointment?.addedPoints);
      return updatedAppointment;
    }
    throw new Error(`Appointment with id ${id} not found`);
  }
  
  findOne(id: string) {
    //@ts-ignore
    return this.appointmentRepository.findOne({ _id: new ObjectId(id) });
  }
  
  async create(
    uid: string,
    userName: string,
    CreateAppointmentInput: CreateAppointmentInput
    ): Promise<Appointment> {
    try{
      let servicesObjectId = [];
      let totalPrice = 0;
      let addedPoints = 0;
      let totalTime = 0;

      // if the UID is found and isComplete is false, throw an error
      const testAppointment = await this.appointmentRepository.findOne({where: {uid: uid}})
      if(testAppointment)
        if(testAppointment.isCompleted == false)
          throw new Error('UID already exists');

      // if the hairdresserId is not found, throw an error
      const hairdresser = await this.hairdresserService.findOne(CreateAppointmentInput.hairdresserId);

      if (!hairdresser) {
        throw new Error('Hairdresser not found');
      }

      // if the extraId is not found, throw an error
      const extra = await this.extrasService.findOne(CreateAppointmentInput.extraId);
      
      if (!extra) {
        throw new Error('Extra not found');
      }

      totalPrice += extra.price;
     
      // if the serviceId is not found, throw an error
      for (const serviceId of CreateAppointmentInput.servicesId) {
        const service = await this.serviceService.findOne(serviceId);
        if (!service) {
          throw new Error('Service not found');
        }
        totalPrice += service.price;
        addedPoints += 1;
        totalTime += service.duration;
        servicesObjectId.push(new ObjectId(serviceId));
      }
      
      // if there is an appointment between appointment.date and appointment.date + totalTime, throw an error
      const endDate = dayjs(CreateAppointmentInput.date).add(totalTime, 'minute').toDate() // manipulate

      const appointments = await this.appointmentRepository.find({
        where: {
          date: {
            $gte: CreateAppointmentInput.date,
            $lt: endDate,
          },
          isCompleted: false, // Optional: Only consider incomplete appointments
          hairdresserId: new ObjectId(CreateAppointmentInput.hairdresserId),
        },
      });
      
      if (appointments.length > 0) {
        throw new Error('There is already an appointment on that date');
      }

      // if the date is not in a hairdresser vacation, throw an error
      const vacations = await this.vacationsService.findByHairdresserId(hairdresser.id);

      vacations.forEach(vacation => {
        if (vacation.startDate <= CreateAppointmentInput.date && vacation.endDate >= CreateAppointmentInput.date) {
          throw new Error('Hairdresser is on vacation');
        }
      });
      // TODO: check for day off

      //subtract points if isPointsUsed is true
      if(CreateAppointmentInput.isPointsUsed){
        const points = await this.pointsService.subtractPoints(uid, 5);
        totalPrice /= 2;
      }

      const newAppointment = new Appointment();
      newAppointment.date = new Date(CreateAppointmentInput.date);
      newAppointment.totalTime = totalTime;
      newAppointment.uid = uid;
      newAppointment.userName = userName;
      newAppointment.hairdresserId = new ObjectId(CreateAppointmentInput.hairdresserId);
      newAppointment.servicesId = servicesObjectId;
      newAppointment.extraId = new ObjectId(extra.id);
      newAppointment.price = totalPrice;
      newAppointment.addedPoints = addedPoints;
      newAppointment.isCompleted = false;
      newAppointment.isPointsUsed = CreateAppointmentInput.isPointsUsed;

      return this.appointmentRepository.save(newAppointment);

    }catch(error){
      console.log(error);
    }
  }

  // if isCompleted is true, then update the points of the user
  // async updateIsCompleted(id: string): Promise<Appointment> {
  //   // @ts-ignore
  //   const appointment = await this.appointmentRepository.findOne({ _id: new ObjectId(id) });
  //   if (!appointment) {
  //     throw new Error(`Appointment with id ${id} not found`);
  //   }
  //   if (appointment.isCompleted) {
  //     throw new Error(`Appointment with id ${id} is already completed`);
  //   }
  //   appointment.isCompleted = true;

  //   // TODO: update the points of the user

  //   return this.appointmentRepository.save(appointment);
  // }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: string) {
    return this.appointmentRepository.deleteOne({ _id: new ObjectId(id) });
  }

  // functions for seeding

  saveAll(appointments: Appointment[]): Promise<Appointment[]> {
    return this.appointmentRepository.save(appointments);
  }

  truncate(): Promise<void> {
    return this.appointmentRepository.clear();
  }
}
