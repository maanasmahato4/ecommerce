import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type CheckOutDocument = HydratedDocument<CheckOut>

@Schema()

export class CheckOut {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'user', required: true })
    userId: User;
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true, default: "unlisted" })
    status: string;

    @Prop({type: Array<any>, required: true})
    cartItems: Array<any>;
}

export const CheckOutSchema = SchemaFactory.createForClass(CheckOut);