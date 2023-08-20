import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CheckOutDocument = HydratedDocument<CheckOut>

@Schema()

export class CheckOut {
    @Prop({ type: String, required: true })
    userId: string;
    
    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: String, required: true, default: false })
    status: boolean
}

export const CheckOutSchema = SchemaFactory.createForClass(CheckOut);