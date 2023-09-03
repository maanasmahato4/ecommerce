import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema({timestamps: true})
export class Product {
    @Prop({ type: String, required: true })
    productName: string

    @Prop({ type: Array<String>, required: true })
    imageUrls: Array<String>

    @Prop({ type: String, required: true })
    productDescription: string

    @Prop({ type: Number, required: true })
    inStock: number

    @Prop({ type: String, required: true })
    category: string

    @Prop({ type: String, required: true })
    brandName: string

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: Number, required: true })
    discount: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)