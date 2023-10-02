import { HairdressersService } from './hairdressers.service';
import { Hairdresser } from './entities/hairdresser.entity';
import { CreateHairdresserInput } from './dto/create-hairdresser.input';
import { UpdateHairdresserInput } from './dto/update-hairdresser.input';
export declare class HairdressersResolver {
    private readonly hairdressersService;
    constructor(hairdressersService: HairdressersService);
    findAll(): Promise<Hairdresser[]>;
    findOne(uid: string): Promise<Hairdresser>;
    createHairdresser(createHairdresserInput: CreateHairdresserInput): Promise<Hairdresser>;
    updateHairdresser(updateHairdresserInput: UpdateHairdresserInput): string;
    removeHairdresser(id: string): string;
}
