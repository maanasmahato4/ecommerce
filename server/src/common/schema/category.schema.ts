import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type categoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
    @Prop({type: String, required: true})
    category: string
}

export const categorySchema = SchemaFactory.createForClass(Category);