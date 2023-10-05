import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { ServicesService } from 'src/services/services.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly hairdresserService: HairdressersService,
    private readonly serviceService: ServicesService,
  ) {}
  
  findAll() {
    return this.appointmentRepository.find();
  }
  
  findOne(id: string) {
    //@ts-ignore
    return this.appointmentRepository.findOne({ _id: new ObjectId(id) });
  }
  
  async create(createAppointmentInput: CreateAppointmentInput
    ): Promise<Appointment> {
    try{
      console.log("teststs");
      let servicesObjectId = [];
      let totalPrice = 0;
      let addedPoints = 0;

      await createAppointmentInput.servicesId.forEach(async element => {
        const service = await this.serviceService.findOne(element);
        if (!service) {
          throw new Error('Service not found');
        }
        totalPrice += service.price;
        addedPoints += 1;
        servicesObjectId.push(new ObjectId(element));
      });

      const hairdresser = await this.hairdresserService.findOne(createAppointmentInput.hairdresserId);

      if (!hairdresser) {
        throw new Error('Hairdresser not found');
      }

      const newAppointment = new Appointment();
      newAppointment.date = createAppointmentInput.date;
      newAppointment.uid = createAppointmentInput.uid;
      newAppointment.userName = createAppointmentInput.userName;
      newAppointment.hairdresserId = new ObjectId(createAppointmentInput.hairdresserId);
      newAppointment.servicesId = servicesObjectId;
      newAppointment.extras = createAppointmentInput.extras;
      newAppointment.price = totalPrice;
      newAppointment.addedPoints = addedPoints;
      newAppointment.isCompleted = false;

      return this.appointmentRepository.save(newAppointment);

    }catch(error){
      console.log(error);
    }
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  // functions for seeding

  saveAll(appointments: Appointment[]): Promise<Appointment[]> {
    return this.appointmentRepository.save(appointments);
  }

  truncate(): Promise<void> {
    return this.appointmentRepository.clear();
  }
}
