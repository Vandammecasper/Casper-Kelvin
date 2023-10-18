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

    // vacations commands

    @Command({
        command: 'seed:database:vacations:reset',
        describe: 'delete all vacations from database',
    })
    async deleteAllVacations() {
        console.info('deleting all vacations...');
        await this.seedService.deleteAllVacations();
        console.log('...done');
    }

    @Command({
        command: 'seed:database:vacations',
        describe: 'seed database with vacations from json file',
    })
    async seedVacations() {
        console.info('seeding database with vacations...');
        const vacations = await this.seedService.addVacationsFromJson();
        console.log('...done with length: ', vacations.length);
    }

    // points commands

    @Command({
        command: 'seed:database:points:reset',
        describe: 'delete all points from database',
    })
    async deleteAllPoints() {
        console.info('deleting all points...');
        await this.seedService.deleteAllPoints();
        console.log('...done');
    }

    @Command({
        command: 'seed:database:points',
        describe: 'seed database with points from json file',
    })
    async seedPoints() {
        console.info('seeding database with points...');
        const points = await this.seedService.addPointsFromJson();
        console.log('...done with length: ', points.length);
    }

    // appointments commands

    @Command({
        command: 'seed:database:appointments:reset',
        describe: 'delete all appointments from database',
    })
    async deleteAllAppointments() {
        console.info('deleting all appointments...');
        await this.seedService.deleteAllAppointments();
        console.log('...done');
    }

    @Command({
        command: 'seed:database:appointments',
        describe: 'seed database with appointments from json file',
    })
    async seedAppointments() {
        console.info('seeding database with appointments...');
        const appointments = await this.seedService.addAppointmentsFromJson();
        console.log('...done with length: ', appointments.length);
    }

    // users commands

    @Command({
        command: 'seed:database:users:reset',
        describe: 'delete all users from database',
    })
    async deleteAllUsers() {
        console.info('deleting all users...');
        await this.seedService.deleteAllUsers();
        console.log('...done');
    }

    @Command({
        command: 'seed:database:users',
        describe: 'seed database with users from json file',
    })
    async seedUsers() {
        console.info('seeding database with users...');
        const users = await this.seedService.addUsersFromJson();
        console.log('...done with length: ', users.length);
    }
}