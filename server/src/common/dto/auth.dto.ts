import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class SignInDto {
    @ApiProperty({type: String, title: "email", required: true})
    @IsEmail()
    email: string;

    @ApiProperty({type: String, title: "password", required: true})
    @IsNotEmpty()
    password: string;
}

export class SignUpDto {
    @ApiProperty({type: String, title: "username", required: true})
    @IsNotEmpty()
    username: string;

    @ApiProperty({type: String, title: "email", required: true})
    @IsEmail()
    email: string;

    @ApiProperty({type: String, title: "password", required: true})
    @IsNotEmpty()
    password: string;

    @ApiProperty({type: String, title: "roles", required: true})
    @IsNotEmpty()
    roles: string;
}