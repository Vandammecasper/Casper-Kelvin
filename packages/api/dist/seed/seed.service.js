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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("../services/services.service");
const services = require("./data/services.json");
const service_entity_1 = require("../services/entities/service.entity");
const hairdressers_service_1 = require("../hairdressers/hairdressers.service");
let SeedService = exports.SeedService = class SeedService {
    constructor(servicesService, hairdressersService) {
        this.servicesService = servicesService;
        this.hairdressersService = hairdressersService;
    }
    async addServicesFromJson() {
        let servicesArray = [];
        for (let service of services) {
            const s = new service_entity_1.Service();
            s.name = service.name;
            s.description = service.description;
            s.price = service.price;
            s.duration = service.duration;
            s.utilities = service.utilities;
            servicesArray.push(s);
        }
        return this.servicesService.saveAll(servicesArray);
    }
    async deleteAllServices() {
        return this.servicesService.truncate();
    }
    async deleteAllHairdressers() {
        return this.hairdressersService.truncate();
    }
};
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_service_1.ServicesService,
        hairdressers_service_1.HairdressersService])
], SeedService);
//# sourceMappingURL=seed.service.js.map