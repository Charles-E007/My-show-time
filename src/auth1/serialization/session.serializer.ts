import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: any) => void) {
    done(null, user._id.toString());
  }

  async deserializeUser(id: string, done: (err: any, user?: any) => void) {
    try {
      const user = await this.usersService.findOne(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
