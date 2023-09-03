import { Injectable, BadRequestException, ConflictException, NotFoundException, HttpStatus } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';
import { SignUpDto, SignInDto } from 'src/auth/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    async signUp(signUpCreds: SignUpDto, res: Response): Promise<string | any> {
        const user = await this.userService.findByEmail(signUpCreds.email);
        if (user && user.email === signUpCreds.email) throw new ConflictException("User with this email already exists!");
        const UserData = {
            username: signUpCreds.username,
            email: signUpCreds.email,
            password: await bcrypt.hash(signUpCreds.password, 8),
            roles: signUpCreds.roles
        }
        try {
            const newUser = await this.userService.createUser(UserData);
            const payload = { id: newUser.id, username: newUser.username, email: newUser.email, roles: newUser.roles };
            const token = this.jwtService.sign(payload);
            res.cookie('access_token', token, { httpOnly: true });
            return res.status(HttpStatus.OK).json({ access_token: token });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async signIn(singInCreds: SignInDto, res: Response) {
        const user = await this.userService.findByEmail(singInCreds.email);
        if (!user) throw new NotFoundException();
        const payload = { id: user.id, username: user.username, email: user.email, roles: user.roles };
        try {
            const token = this.jwtService.sign(payload);
            res.cookie('access_token', token, { httpOnly: true });
            return res.status(HttpStatus.OK).json({ access_token: token });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async validateUser(creds: {email: string, password: string}) {
        const data = await this.userService.findByEmail(creds.email);
        if (!data) { return null }
        if (!(await bcrypt.compare(creds.password, data.password))) { return null; }
        return data;
    }
}
