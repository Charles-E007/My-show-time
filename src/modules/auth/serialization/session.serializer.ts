import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
// import { UsersService } from '../../users/users.service';

@Injectable()
// export class SessionSerializer extends PassportSerializer {
//   constructor(private usersService: UsersService) {
//     super();
//   }

//   serializeUser(user: any, done: (err: any, id?: any) => void) {
//     done(null, user._id.toString());
//   }

//   async deserializeUser(id: string, done: (err: any, user?: any) => void) {
//     try {
//       const user = await this.usersService.findOne(id);
//       done(null, user);
//     } catch (err) {
//       done(err);
//     }
//   }
// }
export class SessionSerializer extends PassportSerializer {
  // serializeUser(user: any, done: (err: Error, user: any) => void): any {
  //   done(null, user);
  // }

  // deserializeUser(
  //   payload: any,
  //   done: (err: Error, payload: string) => void,
  // ): any {
  //   done(null, payload);
  // }

  serializeUser(user: any, done: (err: Error | null, user: any) => void) {
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error | null, payload: any) => void,
  ) {
    done(null, payload);
  }
}
