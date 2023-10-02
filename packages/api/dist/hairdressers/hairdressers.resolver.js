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
exports.HairdressersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const hairdressers_service_1 = require("./hairdressers.service");
const hairdresser_entity_1 = require("./entities/hairdresser.entity");
const create_hairdresser_input_1 = require("./dto/create-hairdresser.input");
const update_hairdresser_input_1 = require("./dto/update-hairdresser.input");
let HairdressersResolver = exports.HairdressersResolver = class HairdressersResolver {
    constructor(hairdressersService) {
        this.hairdressersService = hairdressersService;
    }
    findAll() {
        return this.hairdressersService.findAll();
    }
    findOne(uid) {
        return this.hairdressersService.findOne(uid);
    }
    createHairdresser(createHairdresserInput) {
        return this.hairdressersService.create(createHairdresserInput);
    }
    updateHairdresser(updateHairdresserInput) {
        return this.hairdressersService.update(updateHairdresserInput.id, updateHairdresserInput);
    }
    removeHairdresser(id) {
        return this.hairdressersService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [hairdresser_entity_1.Hairdresser], { name: 'hairdressers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairdressersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => hairdresser_entity_1.Hairdresser, { name: 'hairdresser' }),
    __param(0, (0, graphql_1.Args)('uid', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HairdressersResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => hairdresser_entity_1.Hairdresser),
    __param(0, (0, graphql_1.Args)('createHairdresserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hairdresser_input_1.CreateHairdresserInput]),
    __metadata("design:returntype", Promise)
], HairdressersResolver.prototype, "createHairdresser", null);
__decorate([
    (0, graphql_1.Mutation)(() => hairdresser_entity_1.Hairdresser),
    __param(0, (0, graphql_1.Args)('updateHairdresserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_hairdresser_input_1.UpdateHairdresserInput]),
    __metadata("design:returntype", void 0)
], HairdressersResolver.prototype, "updateHairdresser", null);
__decorate([
    (0, graphql_1.Mutation)(() => hairdresser_entity_1.Hairdresser),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HairdressersResolver.prototype, "removeHairdresser", null);
exports.HairdressersResolver = HairdressersResolver = __decorate([
    (0, graphql_1.Resolver)(() => hairdresser_entity_1.Hairdresser),
    __metadata("design:paramtypes", [hairdressers_service_1.HairdressersService])
], HairdressersResolver);
//# sourceMappingURL=hairdressers.resolver.js.map