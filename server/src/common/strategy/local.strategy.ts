import {Injectable, BadRequestException, NotFoundException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService: UserService
    ){
        super({usernameField: 'email'})
    }

    async validate(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException("user not found")
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException("wrong credentials");
        }
        return user;
    }
}