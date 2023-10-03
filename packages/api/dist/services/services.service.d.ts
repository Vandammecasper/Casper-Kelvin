import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
export declare class ServicesService {
    private readonly serviceRepository;
    constructor(serviceRepository: Repository<Service>);
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
    findByIds(ids: ObjectId[]): Promise<Service[]>;
    findOneByName(name: string): Promise<Service>;
    create(createServiceInput: CreateServiceInput): Promise<Service>;
    update(id: string, updateServiceInput: UpdateServiceInput): Promise<{
        id: string;
        name: string;
        description: string;
        price: number;
        duration: number;
        utilities: string[];
    } & Service>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    saveAll(services: Service[]): Promise<Service[]>;
    truncate(): Promise<void>;
}
