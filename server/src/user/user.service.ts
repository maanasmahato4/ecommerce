import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { UpdateUserDto, UserDto } from 'src/common/dto/user.dto';
import { User, UserDocument } from 'src/common/schema/user.schema';
import { Request } from "express";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async getUsers(req: Request) {
        let filter: any = {};
        if (!(req.query.role == "all")) {
            filter.roles = req.query.role || "all";
        }
        return await this.userModel.find(filter);
    }

    async createUser(UserData: UserDto) {
        const createdUser = new this.userModel(UserData);
        return await createdUser.save()
    }

    async updateUser(id: string, UserData: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, UserData);
        return updatedUser;
    }

    async deleteUser(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return deletedUser;
    }

    async findByEmail(userEmail: string) {
        const user = await this.userModel.findOne({ email: userEmail });
        return user;
    }
}
