import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckOutDto } from 'src/checkout/checkout.dto';
import { CheckOut, CheckOutDocument, } from 'src/checkout/checkOut.schema';
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
            throw new NotFoundException(error);
        }
    }

    async getAllOrders() {
        try {
            return await this.checkOutModel.find();
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async getOrders(id: string) {
        try {
            return await this.checkOutModel.find({userId: id});
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
    async CheckOut(checkOutData: CheckOutDto) {
        try {
            const savedCheckOut = new this.checkOutModel(checkOutData);
            return await savedCheckOut.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async UpdateOrder(id: string, checkOutData: CheckOutDto) {
        try {
            const updatedOrder = await this.checkOutModel.findByIdAndUpdate(id, checkOutData);
            return updatedOrder;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async DeleteOrder(id: string) {
        try {
            const deletedOrder = await this.checkOutModel.findByIdAndDelete(id);
            return deletedOrder;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
