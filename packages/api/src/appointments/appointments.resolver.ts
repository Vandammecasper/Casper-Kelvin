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
import { ExtrasService } from 'src/extras/extras.service';
import { Extra } from 'src/extras/entities/extra.entity';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AllowedRoles } from 'src/users/decorators/role.decorator';
import { Role } from 'src/users/entities/user.entity';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService,
    private readonly servicesService: ServicesService,
    private readonly hairdressersService: HairdressersService,
    private readonly extrasService: ExtrasService) {}

  
  @AllowedRoles(Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Appointment], { name: 'appointmentsByUid' })
  findByUid(
    @FirebaseUser() user: UserRecord,
    @Args('isOpen', { type: () => Boolean }) isOpen: boolean
  ) {
    return this.appointmentsService.findByUid(user.uid, isOpen);
  }
  
  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [Appointment], { name: 'appointmentsByHairdresserUid' })
  findByHairdresserId(@FirebaseUser() user: UserRecord) {
    return this.appointmentsService.findByHairdresserUid(user.uid);
  }

  @AllowedRoles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => Appointment, { name: 'completeAppointment' })
  completeAppointment(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.completeAppointment(id);
  }
  
  @UseGuards(FirebaseGuard)
  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.appointmentsService.findOne(id);
  }
  
  @UseGuards(FirebaseGuard)
  @Mutation(() => Appointment)
  createAppointment(
    @Args('CreateAppointmentInput') CreateAppointmentInput: CreateAppointmentInput,
    @FirebaseUser() user: UserRecord
  ): Promise<Appointment> {
    console.log(user.uid);
    return this.appointmentsService.create(user.uid, user.displayName, CreateAppointmentInput);
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

  //Resolver for the extra field of the Appointment type
  @ResolveField()
  extra(@Parent() appointment: Appointment): Promise<Extra> {
    return this.extrasService.findOne(appointment.extraId.toString());
  }
}
