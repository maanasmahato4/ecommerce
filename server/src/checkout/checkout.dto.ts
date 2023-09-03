import {IsNotEmpty, IsEmail} from "class-validator";

export class CheckOutDto {
    @IsNotEmpty()
    userId: String;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    cartItems: Array<any>;
}