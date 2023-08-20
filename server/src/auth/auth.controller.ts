import { Controller, Body, Post, Res, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInDto, SignUpDto } from 'src/common/dto/auth.dto';
import { LocalAuthGuard } from 'src/common/guards/local.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async SignUp(@Body() signUpCreds: SignUpDto, @Res() res: Response) {
        return await this.authService.signUp(signUpCreds, res);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async SignIn(@Body() singInCreds: SignInDto, @Res() res: Response) {
        return await this.authService.signIn(singInCreds, res);
    }

    @Post('/signout')
    async SignOut(@Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
        try {
            res.clearCookie('access_token');
            return { message: "success" }
        }
        catch(err){
            throw new BadRequestException("Error while signing out!")
        }
       
    }
}
