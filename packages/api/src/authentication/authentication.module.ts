import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseService } from './firebase.service';
import { FirebaseAuthStrategy } from './firebase.strategy';

@Module({
    imports: [PassportModule],
  providers: [FirebaseService, FirebaseAuthStrategy],
})
export class AuthenticationModule {}
