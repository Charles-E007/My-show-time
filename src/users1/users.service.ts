import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const exist = await this.userModel.findOne({ email });
    if (exist) throw new ConflictException('Email already exist');

    const hashed = await bcrypt.hash(password, 12);
    const user = new this.userModel({ name, email, password: hashed });
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
