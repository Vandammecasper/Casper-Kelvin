import { Injectable } from '@nestjs/common';
import { ServicesService } from 'src/services/services.service';

import * as services from './data/services.json';
import * as hairdressers from './data/hairdressers.json';
import * as vacations from './data/vacations.json';

import { Service } from 'src/services/entities/service.entity';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
import { VacationsService } from 'src/vacations/vacations.service';
import { Vacation } from 'src/vacations/entities/vacation.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class SeedService {
    constructor(
        private servicesService: ServicesService,
        private hairdressersService: HairdressersService,
        private vacationsService: VacationsService,
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
}
