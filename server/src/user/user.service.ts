import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { UpdateUserDto, UserDto } from 'src/user/user.dto';
import { User, UserDocument } from 'src/user/user.schema';
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
        try {
            return await this.userModel.find(filter);
        } catch (error) {
            throw new NotFoundException(error);
        }

    }

    async createUser(UserData: UserDto) {
        try {
            const createdUser = new this.userModel(UserData);
            return await createdUser.save()
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    async updateUser(id: string, UserData: UpdateUserDto) {
        try {
            const userExist = await this.userModel.findById(id);
            if (!userExist) {
                throw new NotFoundException(`user with Id:${id} not found!`);
            }
            const updatedUser = await this.userModel.findByIdAndUpdate(id, UserData);
            return updatedUser;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async deleteUser(id: string) {
        try {
            const userExist = await this.userModel.findById(id);
            if (!userExist) {
                throw new NotFoundException(`user with Id:${id} not found!`);
            }
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    async findByEmail(userEmail: string) {
        try {
            const user = await this.userModel.findOne({ email: userEmail });
            return user;
        } catch (error) {
            throw new BadRequestException(error);
        }

    }
}
