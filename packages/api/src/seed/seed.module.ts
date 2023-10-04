import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServicesModule } from 'src/services/services.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { HairdressersModule } from 'src/hairdressers/hairdressers.module';
import { VacationsModule } from 'src/vacations/vacations.module';

@Module({
    imports: [ServicesModule, HairdressersModule, VacationsModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],

})
export class SeedModule {
}
