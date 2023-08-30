import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true})
export class User {
    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({type: String, required: true, default: 'user'})
    roles: string;
}

export const UserSchema  = SchemaFactory.createForClass(User);