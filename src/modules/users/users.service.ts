import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<HydratedDocument<User>[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

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

  async update(id: string, updateData: any): Promise<User | null> {
    const dataToUpdate = { ...updateData };

    if (dataToUpdate.password && dataToUpdate.password.trim() !== '') {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 12);
    } else {
      delete dataToUpdate.password;
    }

    delete dataToUpdate['confirm-password'];

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dataToUpdate, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    await this.userModel.findByIdAndDelete(id).exec();
    return 'User deleted successfully';
  }
}
