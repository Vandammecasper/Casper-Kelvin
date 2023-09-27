import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
import { Hairdresser } from './entities/hairdresser.entity';
import { Repository } from 'typeorm';
export declare class HairdressersService {
    private readonly birdRepository;
    constructor(birdRepository: Repository<Hairdresser>);
    findAll(): string;
    findOne(id: string): string;
    create(createHairdresserInput: CreateHairdresserInput): Promise<Hairdresser>;
    update(id: string, updateHairdresserInput: UpdateHairdresserInput): string;
    remove(id: string): string;
}
