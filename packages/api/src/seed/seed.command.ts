import { Injectable } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { Command } from "nestjs-command";

@Injectable()
export class DatabaseSeedCommand {
    constructor(private readonly seedService: SeedService) {}

    // services commands

    @Command({
        command: 'seed:database:services',
        describe: 'seed database with services from json file',
    })
    async seedServices() {
        console.info('seeding database with services...');
        const birds = await this.seedService.addServicesFromJson();
        console.log('...done with length: ', birds.length);
    }

    @Command({
        command: 'seed:database:services:reset',
        describe: 'delete all services from database',
    })
    async deleteAllServices() {
        console.info('deleting all services...');
        await this.seedService.deleteAllServices();
        console.log('...done');
    }

    // hairdressers commands

    @Command({
        command: 'seed:database:hairdressers:reset',
        describe: 'delete all hairdressers from database',
    })
    async deleteAllHairdressers() {
        console.info('deleting all hairdressers...');
        await this.seedService.deleteAllHairdressers();
        console.log('...done');
    }

    @Command({
        command: 'seed:database:hairdressers',
        describe: 'seed database with hairdressers from json file',
    })
    async seedHairdressers() {
        console.info('seeding database with hairdressers...');
        const hairdressers = await this.seedService.addHairdressersFromJson();
        console.log('...done with length: ', hairdressers.length);
    }
}