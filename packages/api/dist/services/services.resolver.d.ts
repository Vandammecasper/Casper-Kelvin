import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
export declare class ServicesResolver {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
    createService(createServiceInput: CreateServiceInput): Promise<Service>;
    updateService(updateServiceInput: UpdateServiceInput): Promise<Service>;
    removeService(id: string): Promise<import("typeorm").DeleteResult>;
}
