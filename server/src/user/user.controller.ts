import { Controller, Post, Body, Get, Req, Query, UseGuards, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'src/user/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from "express";
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';


@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('/')
    async GetUsers(@Req() req: Request) {
        return await this.userService.getUsers(req)
    }

    @Post('/create')
    async CreateUser(@Body() userCreds: UserDto) {
        return await this.userService.createUser(userCreds);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put('/:id')
    async UpdateUser(@Param('id') id: string, @Body() userCreds: UpdateUserDto) {
        return await this.userService.updateUser(id, userCreds);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete('/:id')
    async DeleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }

    @Post("/find")
    async FindByEmail(@Body() userEmail: string): Promise<UserDto> {
        return await this.userService.findByEmail(userEmail);
    }
}
