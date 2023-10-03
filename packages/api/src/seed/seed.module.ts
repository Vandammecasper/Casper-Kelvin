import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServicesModule } from 'src/services/services.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { HairdressersModule } from 'src/hairdressers/hairdressers.module';

@Module({
    imports: [ServicesModule, HairdressersModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],

})
export class SeedModule {
}
