import {IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";


export class ProductDto {
    @ApiProperty({type: String, title: "productName", required: true})
    @IsNotEmpty()
    productName: string;

    @ApiProperty({type: String, title: "productDescription", required: true})
    @IsNotEmpty()
    productDescription: string

    @ApiProperty({type: Number, title: "inStock", required: true})
    @IsNotEmpty()
    inStock: number

    @ApiProperty({type: String, title: "category", required: true})
    @IsNotEmpty()
    category: string

    @ApiProperty({type: String, title: "brandName", required: true})
    @IsNotEmpty()
    brandName: string

    @ApiProperty({type: Number, title: "price", required: true})
    @IsNotEmpty()
    price: number

    @ApiProperty({type: Number, title: "discount", required: true})
    @IsNotEmpty()
    discount: number

    @ApiProperty({type: String, title: "images", required: true})
    @IsNotEmpty()
    imageUrls: Array<String>
}