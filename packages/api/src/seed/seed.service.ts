import { Injectable } from '@nestjs/common';
import { ServicesService } from 'src/services/services.service';

import * as services from './data/services.json';
import * as hairdressers from './data/hairdressers.json';
import * as vacations from './data/vacations.json';
import * as points from './data/points.json';

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
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeedService {
    constructor(
        private servicesService: ServicesService,
        private hairdressersService: HairdressersService,
        private vacationsService: VacationsService,
        private pointsService: PointsService,
        private appointmentsService: AppointmentsService,
        private usersService: UsersService
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

    //hairdressers

    async addHairdressersFromJson(): Promise<Hairdresser[]> {
        const hairdressersArray:Hairdresser[] = [];
        // const services = await this.servicesService.findAll();

        for (const hairdresser of hairdressers) {
            const h = new Hairdresser();
            // const service = await this.servicesService.findOneByName(hairdresser.name);
            let newServicesId = [];
            for (const service of hairdresser.services) {
                const s = await this.servicesService.findOneByName(service.name);
                newServicesId.push(s.id);
            }

            //set data
            h.uid = hairdresser.uid;
            h.name = hairdresser.name;
            h.servicesId = newServicesId;

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

        for(const vacation of vacations) {
            const v = new Vacation();

            v.hairdresserId = new ObjectId(h[0].id);
            v.startDate = new Date(vacation.startDate);
            v.endDate = new Date(vacation.endDate);

            vacationsArray.push(v);
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

    //TODO: add appointments from json
    async addAppointmentsFromJson(): Promise<Appointment[]> {
        const appointmentsArray:Appointment[] = [];

        return this.appointmentsService.saveAll(appointmentsArray);
    }

    async deleteAllAppointments(): Promise<void> {
        return this.appointmentsService.truncate();
    }

    // users

    //TODO: add users from json
    async addUsersFromJson(): Promise<User[]> {
        const appointmentsArray:User[] = [];

        return this.usersService.saveAll(appointmentsArray);
    }

    async deleteAllUsers(): Promise<void> {
        return this.usersService.truncate();
    }
}
