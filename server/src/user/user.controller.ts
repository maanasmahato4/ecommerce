import { Controller, Post, Body, Get, Req, Query, UseGuards, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'src/common/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from "express";
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';


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
