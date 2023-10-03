"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeedCommand = void 0;
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./seed.service");
const nestjs_command_1 = require("nestjs-command");
let DatabaseSeedCommand = exports.DatabaseSeedCommand = class DatabaseSeedCommand {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async seedServices() {
        console.info('seeding database with services...');
        const birds = await this.seedService.addServicesFromJson();
        console.log('...done with length: ', birds.length);
    }
    async deleteAllServices() {
        console.info('deleting all services...');
        await this.seedService.deleteAllServices();
        console.log('...done');
    }
    async deleteAllHairdressers() {
        console.info('deleting all hairdressers...');
        await this.seedService.deleteAllHairdressers();
        console.log('...done');
    }
    async seedHairdressers() {
        console.info('seeding database with hairdressers...');
        const hairdressers = await this.seedService.addHairdressersFromJson();
        console.log('...done with length: ', hairdressers.length);
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:services',
        describe: 'seed database with services from json file',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedServices", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:services:reset',
        describe: 'delete all services from database',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deleteAllServices", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:hairdressers:reset',
        describe: 'delete all hairdressers from database',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deleteAllHairdressers", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:hairdressers',
        describe: 'seed database with hairdressers from json file',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedHairdressers", null);
exports.DatabaseSeedCommand = DatabaseSeedCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], DatabaseSeedCommand);
//# sourceMappingURL=seed.command.js.map