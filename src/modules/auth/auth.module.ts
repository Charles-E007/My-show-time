import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serialization/session.serializer';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/user.schema';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, SessionSerializer, RolesGuard],
})
export class AuthModule {}
