import {IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class CategoryDto {
    @ApiProperty({type: String, title: "category", required: true})
    @IsNotEmpty()
    category: string
}