import { Injectable } from '@nestjs/common';
import { ServicesService } from 'src/services/services.service';

import * as services from './data/services.json';
import * as hairdressers from './data/hairdressers.json';
import * as points from './data/points.json';
import * as users from './data/users.json';
import * as extras from './data/extras.json';

import { Service } from 'src/services/entities/service.entity';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { VacationsService } from 'src/vacations/vacations.service';
import { Vacation } from 'src/vacations/entities/vacation.entity';
import { ObjectId } from 'mongodb';
import { PointsService } from 'src/points/points.service';
import { Point } from 'src/points/entities/point.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { UsersService } from 'src/users/users.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Role, User } from 'src/users/entities/user.entity';
import { ExtrasService } from 'src/extras/extras.service';
import { Extra } from 'src/extras/entities/extra.entity';

@Injectable()
export class SeedService {
    constructor(
        private servicesService: ServicesService,
        private hairdressersService: HairdressersService,
        private vacationsService: VacationsService,
        private pointsService: PointsService,
        private appointmentsService: AppointmentsService,
        private usersService: UsersService,
        private extrasService: ExtrasService
    ) {}
    
    //services

    async addServicesFromJson(): Promise<Service[]> {
        let servicesArray:Service[] = [];
        for (let service of services) {
            const s = new Service();
            s.name = service.name;
            s.description = service.description;
            s.price = service.price;
            s.duration = service.duration;
            s.utilities = service.utilities;

            servicesArray.push(s);
        }

        return this.servicesService.saveAll(servicesArray);
    }

    async deleteAllServices(): Promise<void> {
        return this.servicesService.truncate();
    }

    // hairdressers

    async addHairdressersFromJson(): Promise<Hairdresser[]> {
        const hairdressersArray:Hairdresser[] = [];

        for (const hairdresser of hairdressers) {
            const h = new Hairdresser();
            let newServicesId = [];
            for (const service of hairdresser.services) {
                const s = await this.servicesService.findOneByName(service.name);
                newServicesId.push(s.id);
            }

            //set data
            h.uid = hairdresser.uid;
            h.name = hairdresser.name;
            h.servicesId = newServicesId;
            h.vacationDays = hairdresser.vacationDays;
            h.daysOff = hairdresser.daysOff;

            hairdressersArray.push(h);
        }

        return this.hairdressersService.saveAll(hairdressersArray);
    }

    async deleteAllHairdressers(): Promise<void> {
        return this.hairdressersService.truncate();
    }

    // vacations

    async addVacationsFromJson(): Promise<Vacation[]> {
        const vacationsArray:Vacation[] = [];
        const h:Hairdresser[] = await this.hairdressersService.findAll();
        let i = 0;
        for(const hairdresser of h) {
            const v = new Vacation();

            v.hairdresserId = new ObjectId(hairdresser.id);
            v.startDate = new Date();
            v.endDate = new Date(v.startDate.setDate(v.startDate.getDate() + i));
            v.isApproved = true;

            vacationsArray.push(v);
            i++;
        }
        return this.vacationsService.saveAll(vacationsArray);
    }

    async deleteAllVacations(): Promise<void> {
        return this.vacationsService.truncate();
    }

    // points

    async addPointsFromJson(): Promise<Point[]> {
        const pointsArray:Point[] = [];
        for(const point of points) {
            const p = new Point();
            p.uid = point.uid;
            p.userName = point.userName;
            p.totalPoints = point.totalPoints;
            p.usablePoints = point.usablePoints;
            p.isPublic = point.isPublic;

            pointsArray.push(p);
        }
        return this.pointsService.saveAll(pointsArray);
    }

    async deleteAllPoints(): Promise<void> {
        return this.pointsService.truncate();
    }

    // appointments

    async addAppointmentsFromJson(): Promise<Appointment[]> {
        const appointmentsArray:Appointment[] = [];

        return this.appointmentsService.saveAll(appointmentsArray);
    }

    async deleteAllAppointments(): Promise<void> {
        return this.appointmentsService.truncate();
    }

    // users

    async addUsersFromJson(): Promise<User[]> {
        const usersArray:User[] = [];
        
        for(const user of users){
            const u = new User();
            u.uid = user.uid;
            u.userName = user.userName;
            u.locale = user.locale;
            u.role = user.role as Role;

            usersArray.push(u);
        }

        return this.usersService.saveAll(usersArray);
    }

    async deleteAllUsers(): Promise<void> {
        return this.usersService.truncate();
    }

    // extras

    async addExtrasFromJson(): Promise<Extra[]> {
        const extrasArray:Extra[] = [];
        for(const extra of extras){
            const e = new Extra();
            e.name = extra.name;
            e.description = extra.description;
            e.price = extra.price;
            e.utilities = extra.utilities;
            extrasArray.push(e);
        }

        return this.extrasService.saveAll(extrasArray);
    }

    async deleteAllExtras(): Promise<void> {
        return this.extrasService.truncate();
    }
}
