import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService,
    private readonly servicesService: ServicesService,
    private readonly hairdressersService: HairdressersService) {}

  
  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Appointment], { name: 'appointmentsByUid' })
  findByUid(@FirebaseUser() user: UserRecord) {
    return this.appointmentsService.findByUid(user.uid);
  }

  // TODO: add user guard
  @UseGuards(FirebaseGuard)
  @Query(() => [Appointment], { name: 'appointmentsByHairdresserId' })
  findByHairdresserId(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.findByHairdresserId(id);
  }

  //TODO add user guard
  @UseGuards(FirebaseGuard)
  @Mutation(() => Appointment, { name: 'completeAppointment' })
  completeAppointment(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.completeAppointment(id);
  }
  
  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.findOne(id);
  }
  
  @UseGuards(FirebaseGuard)
  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    @FirebaseUser() user: UserRecord
  ): Promise<Appointment> {
    console.log(user.uid);
    return this.appointmentsService.create(user.uid, user.displayName, createAppointmentInput);
  }

  @Mutation(() => Appointment)
  updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentsService.update(updateAppointmentInput.id, updateAppointmentInput);
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.remove(id);
  }

  //Resolver for the hairdresser field of the Appointment type
  @ResolveField()
  hairdresser(@Parent() appointment: Appointment): Promise<Hairdresser> {
    return this.hairdressersService.findOne(appointment.hairdresserId.toString());
  }

  //Resolver for the services field of the Appointment type
  @ResolveField()
  services(@Parent() appointment: Appointment): Promise<Service[]> {
    return this.servicesService.findByIds(appointment.servicesId);
  }
}
