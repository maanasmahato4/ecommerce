import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckOutDto } from 'src/common/dto/checkout.dto';
import { CheckOut, CheckOutDocument, } from 'src/common/schema/checkOut.schema';
import {Request} from "express";

@Injectable()
export class CheckoutService {
    constructor(
        @InjectModel(CheckOut.name) private checkOutModel: Model<CheckOutDocument>
    ) { }

    async getOrderCount(req: Request) {
        let filter: any = {};
        if(req.query.status != ""){
            filter.status = req.query.status;
        }
        try {
            return await this.checkOutModel.countDocuments(filter);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllOrders() {
        try {
            return await this.checkOutModel.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOrders(id: string) {
        try {
            return await this.checkOutModel.find({userId: id});
        } catch (error) {
            throw new Error(error);
        }
    }
    async CheckOut(checkOutData: CheckOutDto) {
        try {
            const savedCheckOut = new this.checkOutModel(checkOutData);
            return await savedCheckOut.save();
        } catch (error) {
            throw new Error(error);
        }
    }

    async UpdateOrder(id: string, checkOutData: CheckOutDto) {
        try {
            const updatedOrder = await this.checkOutModel.findByIdAndUpdate(id, checkOutData);
            return updatedOrder;
        } catch (error) {
            throw new Error(error);
        }
    }

    async DeleteOrder(id: string) {
        try {
            const deletedOrder = await this.checkOutModel.findByIdAndDelete(id);
            return deletedOrder;
        } catch (error) {
            throw new Error(error);
        }
    }
}
