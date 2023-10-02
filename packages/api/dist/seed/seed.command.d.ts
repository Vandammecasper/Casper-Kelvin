import { SeedService } from "./seed.service";
export declare class DatabaseSeedCommand {
    private readonly seedService;
    constructor(seedService: SeedService);
    seedServices(): Promise<void>;
    deleteAllServices(): Promise<void>;
    deleteAllHairdressers(): Promise<void>;
}
