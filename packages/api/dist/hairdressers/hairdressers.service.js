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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HairdressersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hairdresser_entity_1 = require("./entities/hairdresser.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const services_service_1 = require("../services/services.service");
let HairdressersService = exports.HairdressersService = class HairdressersService {
    constructor(birdRepository, serviceService) {
        this.birdRepository = birdRepository;
        this.serviceService = serviceService;
    }
    findAll() {
        return this.birdRepository.find();
    }
    findOne(uid) {
        return this.birdRepository.findOne({ where: { uid } });
    }
    async create(createHairdresserInput) {
        try {
            var servicesObjectId = [];
            await createHairdresserInput.servicesId.forEach(element => {
                const service = this.serviceService.findOne(element);
                if (!service) {
                    throw new Error('Service not found');
                }
                servicesObjectId.push(new mongodb_1.ObjectId(element));
            });
            const newHairdresser = new hairdresser_entity_1.Hairdresser();
            newHairdresser.uid = createHairdresserInput.uid;
            newHairdresser.name = createHairdresserInput.name;
            newHairdresser.servicesId = servicesObjectId;
            return this.birdRepository.save(newHairdresser);
        }
        catch (error) {
            console.log(error);
        }
    }
    update(id, updateHairdresserInput) {
        return `This action updates a #${id} hairdresser`;
    }
    remove(id) {
        return `This action removes a #${id} hairdresser`;
    }
};
exports.HairdressersService = HairdressersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hairdresser_entity_1.Hairdresser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_service_1.ServicesService])
], HairdressersService);
//# sourceMappingURL=hairdressers.service.js.map