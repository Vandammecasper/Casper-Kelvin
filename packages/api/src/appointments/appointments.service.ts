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

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: MongoRepository<Appointment>,
    private readonly hairdresserService: HairdressersService,
    private readonly serviceService: ServicesService,
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
    //TODO: get id of hairdresser from uid
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

  completeAppointment(id: string) {
    return this.appointmentRepository.updateOne({ _id: new ObjectId(id) }, { $set: { isCompleted: true } });
    //TODO: update the points of the user
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

      const newAppointment = new Appointment();
      newAppointment.date = new Date(CreateAppointmentInput.date);
      newAppointment.totalTime = totalTime;
      newAppointment.uid = uid;
      newAppointment.userName = userName;
      newAppointment.hairdresserId = new ObjectId(CreateAppointmentInput.hairdresserId);
      newAppointment.servicesId = servicesObjectId;
      newAppointment.extras = CreateAppointmentInput.extras;
      newAppointment.price = totalPrice;
      newAppointment.addedPoints = addedPoints;
      newAppointment.isCompleted = false;

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
