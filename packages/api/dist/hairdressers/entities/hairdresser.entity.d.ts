import { Service } from 'src/services/entities/service.entity';
import { ObjectId } from 'typeorm';
export declare class Hairdresser {
    id: string;
    uid: string;
    name: string;
    services: Service[];
    servicesId: ObjectId[];
}
