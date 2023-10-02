import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
import { HairdressersService } from 'src/hairdressers/hairdressers.service';
export declare class SeedService {
    private servicesService;
    private hairdressersService;
    constructor(servicesService: ServicesService, hairdressersService: HairdressersService);
    addServicesFromJson(): Promise<Service[]>;
    deleteAllServices(): Promise<void>;
    deleteAllHairdressers(): Promise<void>;
}
