import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serialization/session.serializer';
import { UsersService } from '../modules/users/users.service';
import { User, UserSchema } from '../modules/users/user.schema';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
