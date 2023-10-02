import { HairdressersService } from './hairdressers.service';
import { Hairdresser } from './entities/hairdresser.entity';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
export declare class HairdressersResolver {
    private readonly hairdressersService;
    private readonly servicesService;
    constructor(hairdressersService: HairdressersService, servicesService: ServicesService);
    findAll(): Promise<Hairdresser[]>;
    findOne(uid: string): Promise<Hairdresser>;
    createHairdresser(createHairdresserInput: CreateHairdresserInput): Promise<Hairdresser>;
    updateHairdresser(updateHairdresserInput: UpdateHairdresserInput): string;
    removeHairdresser(id: string): string;
    services(hairdresser: Hairdresser): Promise<Service[]>;
}
