import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { Hairdresser } from './entities/hairdresser.entity';
import { Repository } from 'typeorm';
export declare class HairdressersService {
    private readonly birdRepository;
    constructor(birdRepository: Repository<Hairdresser>);
    findAll(): Promise<Hairdresser[]>;
    findOne(uid: string): Promise<Hairdresser>;
    create(createHairdresserInput: CreateHairdresserInput): Promise<Hairdresser>;
    update(id: string, updateHairdresserInput: UpdateHairdresserInput): string;
    remove(id: string): string;
}
