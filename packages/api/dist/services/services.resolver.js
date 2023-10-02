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
exports.ServicesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const services_service_1 = require("./services.service");
const service_entity_1 = require("./entities/service.entity");
const create_service_input_1 = require("./dto/create-service.input");
const update_service_input_1 = require("./dto/update-service.input");
let ServicesResolver = exports.ServicesResolver = class ServicesResolver {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    findAll() {
        return this.servicesService.findAll();
    }
    findOne(id) {
        return this.servicesService.findOne(id);
    }
    createService(createServiceInput) {
        return this.servicesService.create(createServiceInput);
    }
    updateService(updateServiceInput) {
        return this.servicesService.update(updateServiceInput.id, updateServiceInput);
    }
    removeService(id) {
        return this.servicesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [service_entity_1.Service], { name: 'services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => service_entity_1.Service, { name: 'service' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)('createServiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_input_1.CreateServiceInput]),
    __metadata("design:returntype", Promise)
], ServicesResolver.prototype, "createService", null);
__decorate([
    (0, graphql_1.Mutation)(() => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)('updateServiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_service_input_1.UpdateServiceInput]),
    __metadata("design:returntype", Promise)
], ServicesResolver.prototype, "updateService", null);
__decorate([
    (0, graphql_1.Mutation)(() => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesResolver.prototype, "removeService", null);
exports.ServicesResolver = ServicesResolver = __decorate([
    (0, graphql_1.Resolver)(() => service_entity_1.Service),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesResolver);
//# sourceMappingURL=services.resolver.js.map