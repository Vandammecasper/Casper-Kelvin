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
import { PointsModule } from './points/points.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { ExtrasModule } from './extras/extras.module';
import { CommandModule } from 'nestjs-command';
import { MongoMemoryServer } from 'mongodb-memory-server';

require('dotenv').config();
console.log(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
          const mongo = await MongoMemoryServer.create({
            instance: {
              dbName: process.env.DB_NAME,
            },
          });

          const mongoUri = mongo.getUri();
          console.log('🍃 mongoUri', mongoUri);

          return {
            type: 'mongodb',
            url: `${mongoUri}${process.env.DB_NAME}`,
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        } else {
          return {
            type: 'mongodb',
            url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
            database: process.env.DB_NAME ?? 'api-thebarber-production', // database hier toevogen
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
            directConnection: true, // blijkbaar helpt dit
          }
        }
      },
    }),
    ConfigModule.forRoot(),

    CommandModule,

    HairdressersModule,

    ServicesModule,

    AuthenticationModule,

    VacationsModule,
    
    SeedModule,
    
    PointsModule,
    
    AppointmentsModule,
    
    UsersModule,
    
    ExtrasModule,

  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
