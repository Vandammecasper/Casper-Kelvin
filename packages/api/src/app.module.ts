import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { HairdressersModule } from './hairdressers/hairdressers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';
import { SeedModule } from './seed/seed.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { VacationsModule } from './vacations/vacations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27031/api-thebarber',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),
    ConfigModule.forRoot(),

    HairdressersModule,

    ServicesModule,

    AuthenticationModule,

    VacationsModule,
    
    SeedModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
