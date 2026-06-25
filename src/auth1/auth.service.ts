import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const { password: _, ...rest } = user.toObject();
    return rest;
  }

  async register(name: string, email: string, password: string) {
    return this.usersService.create(name, email, password);
  }
}
